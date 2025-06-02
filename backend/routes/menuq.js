if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const express = require("express");
const router = express.Router();
const Restaurant = require("../models/restaurants");
const MenuItem = require("../models/menuItem");
const logger = require("../logger");
const Counter = require("../models/counter");

const multer = require("multer");
const { v4 } = require("uuid");
const {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
} = require("@aws-sdk/client-s3");

const storage = multer.memoryStorage();
const upload = multer({ storage });

const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

//Get all
router.get("/", async (req, res) => {
  try {
    logger.info("GET /restaurant - Fetching all restaurants");
    const restaurants = await Restaurant.find();
    res.json(restaurants);
  } catch (err) {
    logger.error(`GET /restaurant - Error: ${err.message}`);
    res.status(500).json({ message: err.message });
  }
});

//Get one
router.get("/:id", getRestaurant, (req, res) => {
  logger.info(
    `GET /restaurant/${req.params.id} - Fetching restaurant by firebase UID`
  );
  res.json(res.restaurant);
});

//Get by restaurantId
router.get("/byId/:id", getRestaurantById, (req, res) => {
  logger.info(
    `GET /restaurant/byId/${req.params.id} - Fetching restaurant by restaurant ID`
  );
  res.json(res.restaurant);
});

//Create one
//Create one
router.post("/", async (req, res) => {
  try {
    logger.info(
      `POST /restaurant - Creating new restaurant for: ${req.body.restaurantName}`
    );
    const {
      firebaseUid,
      email,
      phone,
      restaurantName,
      restaurantAddress,
      restaurantCity,
      restaurantState,
      restaurantPincode,
      restaurantLocation,
      noOfSeats,
      restaurantCategory,
      cuisineType,
      operatingHours,
      socialMedia,
      registrationId, // Add this field for RQ ID
    } = req.body;

    const newRestaurant = new Restaurant({
      firebaseUid,
      email,
      phone,
      restaurantName,
      restaurantAddress,
      restaurantCity,
      restaurantState,
      restaurantPincode,
      restaurantLocation,
      noOfSeats,
      restaurantCategory,
      cuisineType,
      operatingHours,
      socialMedia,
    });

    // If registrationId (RQ ID) is provided, set it manually
    if (registrationId && registrationId.startsWith("RQ")) {
      // Validate RQ format
      const rqPattern = /^RQ\d{5}$/;
      if (!rqPattern.test(registrationId)) {
        return res.status(400).json({
          message: "Invalid ID",
        });
      }

      // Check if this RQ ID already exists
      const existingRestaurant = await Restaurant.findOne({
        restaurantId: registrationId,
      });
      if (existingRestaurant) {
        return res.status(409).json({
          message: "Restaurant with this registration ID already exists",
        });
      }

      // Set the RQ ID manually (this will bypass the auto-generation)
      newRestaurant.restaurantId = registrationId;
    }
    // If no registrationId provided, the pre-save hook will generate RX ID automatically

    const savedRestaurant = await newRestaurant.save();
    logger.info(
      `POST /restaurant - Successfully created restaurant with ID: ${
        savedRestaurant.restaurantId || savedRestaurant._id
      }`
    );
    console.log(
      `POST /restaurant - Successfully created restaurant with ID: ${
        savedRestaurant.restaurantId || savedRestaurant._id
      }`
    );
    res.status(201).json(savedRestaurant);
  } catch (err) {
    console.log(`POST /restaurant - Error creating restaurant: ${err.message}`);
    logger.error(
      `POST /restaurant - Error creating restaurant: ${err.message}`
    );
    res.status(400).json({ message: err.message });
  }
});
// Update one
router.patch("/:id", async (req, res) => {
  try {
    const firebaseUid = req.params.id;
    logger.info(`PATCH /restaurant/${firebaseUid} - Updating restaurant`);

    const updates = req.body;
    const updatedRestaurant = await Restaurant.findOneAndUpdate(
      { firebaseUid },
      updates,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedRestaurant) {
      logger.info(`PATCH /restaurant/${firebaseUid} - Restaurant not found`);
      return res.status(404).json({ message: "Restaurant not found" });
    }

    logger.info(
      `PATCH /restaurant/${firebaseUid} - Successfully updated restaurant`
    );
    res.status(200).json(updatedRestaurant);
  } catch (err) {
    logger.error(`PATCH /restaurant/${req.params.id} - Error: ${err.message}`);
    res.status(400).json({ message: err.message });
  }
});

//Delete one
router.delete("/:id", (req, res) => {});

//Toggle status
router.patch("/:id/status", getRestaurant, async (req, res) => {
  try {
    const { resOpen } = req.body;

    if (resOpen === undefined) {
      return res.status(400).json({ message: "resOpen status is required" });
    }

    logger.info(
      `PATCH /restaurant/${req.params.id}/status - Updating restaurant open status to: ${resOpen}`
    );

    res.restaurant.resOpen = resOpen;
    res.restaurant.updatedAt = Date.now();

    const updatedRestaurant = await res.restaurant.save();

    logger.info(
      `PATCH /restaurant/${req.params.id}/status - Successfully updated restaurant status`
    );
    res.status(200).json(updatedRestaurant);
  } catch (err) {
    logger.error(
      `PATCH /restaurant/${req.params.id}/status - Error: ${err.message}`
    );
    res.status(400).json({ message: err.message });
  }
});

async function getRestaurant(req, res, next) {
  let restaurant;
  try {
    logger.info(
      `Middleware getRestaurant - Finding restaurant with firebase UID: ${req.params.id}`
    );
    restaurant = await Restaurant.findOne({ firebaseUid: req.params.id });

    if (restaurant == null) {
      logger.info(
        `Middleware getRestaurant - Restaurant not found for ID: ${req.params.id}`
      );
      return res.status(404).json({ message: "Cannot find restaurant" });
    }
  } catch (err) {
    logger.error(`Middleware getRestaurant - Error: ${err.message}`);
    return res.status(500).json({ message: err.message });
  }
  res.restaurant = restaurant;
  next();
}

async function getRestaurantById(req, res, next) {
  try {
    const id = req.params.id;
    logger.info(
      `Middleware getRestaurantById - Finding restaurant with ID: ${id}`
    );

    // Handle RQ IDs (Registration)
    if (id.startsWith("RQ")) {
      return await handleRQId(req, res, id, next);
    }

    // Handle RX IDs (existing logic)
    const restaurant = await Restaurant.findOne({
      restaurantId: id,
    });

    if (restaurant == null) {
      logger.info(
        `Middleware getRestaurantById - Restaurant not found for ID: ${id}`
      );
      return res.status(404).json({ message: "Cannot find restaurant" });
    }

    res.restaurant = restaurant;
    next();
  } catch (err) {
    logger.error(`Middleware getRestaurantById - Error: ${err.message}`);
    return res.status(500).json({ message: err.message });
  }
}

// New function to handle RQ IDs
async function handleRQId(req, res, id, next) {
  try {
    const rqPattern = /^RQ\d{5}$/;
    if (!rqPattern.test(id)) {
      return res.status(400).json({
        message: "Invalid ID",
      });
    }

    // Extract number from RQ00001 -> 1
    const numericPart = id.replace("RQ", "").replace(/^0+/, "") || "0";
    const idNumber = parseInt(numericPart, 10);

    if (isNaN(idNumber)) {
      return res.status(400).json({ message: "Invalid RQ ID format" });
    }

    // Check counter
    const counter = await Counter.findById("qrCounter");
    if (!counter || idNumber > counter.seq) {
      return res.status(404).json({ message: "Registration ID not valid" });
    }

    // Check if already registered
    const restaurant = await Restaurant.findOne({ restaurantId: id });
    if (restaurant) {
      res.restaurant = restaurant;
      return next();
    }

    // Available for registration
    return res.json({
      message: "Available for registration",
      registrationId: id,
      redirect: "1",
    });
  } catch (err) {
    logger.error(`Error handling RQ ID ${id}: ${err.message}`);
    return res.status(500).json({ message: err.message });
  }
}

//--------------------------------------------------//

// Add these routes to menuq.js

// Update all business hours
router.put("/:id/hours", getRestaurant, async (req, res) => {
  try {
    const { operatingHours } = req.body;

    if (!operatingHours || !Array.isArray(operatingHours)) {
      return res
        .status(400)
        .json({ message: "Valid operating hours array is required" });
    }

    // Validate each day entry
    for (const entry of operatingHours) {
      if (!entry.day || !entry.hours) {
        return res.status(400).json({
          message: "Each operating hour entry must have day and hours",
        });
      }

      // Validate day is one of the allowed values
      const allowedDays = [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ];
      if (!allowedDays.includes(entry.day)) {
        return res.status(400).json({
          message: `Invalid day: ${
            entry.day
          }. Must be one of: ${allowedDays.join(", ")}`,
        });
      }
    }

    logger.info(
      `PUT /restaurant/${req.params.id}/hours - Updating all operating hours`
    );

    res.restaurant.operatingHours = operatingHours;
    res.restaurant.updatedAt = Date.now();

    const updatedRestaurant = await res.restaurant.save();

    logger.info(
      `PUT /restaurant/${req.params.id}/hours - Successfully updated operating hours`
    );
    res.status(200).json(updatedRestaurant);
  } catch (err) {
    logger.error(
      `PUT /restaurant/${req.params.id}/hours - Error: ${err.message}`
    );
    res.status(400).json({ message: err.message });
  }
});

// Update or add single day operating hours
router.patch("/:id/hours", getRestaurant, async (req, res) => {
  try {
    const { day, hours } = req.body;

    if (!day || !hours) {
      return res.status(400).json({ message: "Day and hours are required" });
    }

    // Validate day is one of the allowed values
    const allowedDays = [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ];
    if (!allowedDays.includes(day)) {
      return res.status(400).json({
        message: `Invalid day: ${day}. Must be one of: ${allowedDays.join(
          ", "
        )}`,
      });
    }

    logger.info(
      `PATCH /restaurant/${req.params.id}/hours - Updating operating hours for ${day}`
    );

    // Find the index of the day if it exists
    const dayIndex = res.restaurant.operatingHours.findIndex(
      (entry) => entry.day === day
    );

    if (dayIndex >= 0) {
      // Update existing day
      res.restaurant.operatingHours[dayIndex].hours = hours;
    } else {
      // Add new day
      res.restaurant.operatingHours.push({ day, hours });
    }

    res.restaurant.updatedAt = Date.now();
    const updatedRestaurant = await res.restaurant.save();

    logger.info(
      `PATCH /restaurant/${req.params.id}/hours - Successfully updated operating hours for ${day}`
    );
    res.status(200).json(updatedRestaurant);
  } catch (err) {
    logger.error(
      `PATCH /restaurant/${req.params.id}/hours - Error: ${err.message}`
    );
    res.status(400).json({ message: err.message });
  }
});

// Delete operating hours for a specific day
router.delete("/:id/hours/:day", getRestaurant, async (req, res) => {
  try {
    const { day } = req.params;

    // Validate day is one of the allowed values
    const allowedDays = [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ];
    if (!allowedDays.includes(day)) {
      return res.status(400).json({
        message: `Invalid day: ${day}. Must be one of: ${allowedDays.join(
          ", "
        )}`,
      });
    }

    logger.info(
      `DELETE /restaurant/${req.params.id}/hours/${day} - Removing operating hours for ${day}`
    );

    // Find the index of the day if it exists
    const dayIndex = res.restaurant.operatingHours.findIndex(
      (entry) => entry.day === day
    );

    if (dayIndex >= 0) {
      // Remove the day
      res.restaurant.operatingHours.splice(dayIndex, 1);
      res.restaurant.updatedAt = Date.now();

      const updatedRestaurant = await res.restaurant.save();

      logger.info(
        `DELETE /restaurant/${req.params.id}/hours/${day} - Successfully removed operating hours for ${day}`
      );
      res.status(200).json(updatedRestaurant);
    } else {
      // Day not found
      logger.info(
        `DELETE /restaurant/${req.params.id}/hours/${day} - Day not found in operating hours`
      );
      res.status(404).json({ message: `No operating hours found for ${day}` });
    }
  } catch (err) {
    logger.error(
      `DELETE /restaurant/${req.params.id}/hours/${day} - Error: ${err.message}`
    );
    res.status(400).json({ message: err.message });
  }
});

// POST /api/qr-auth/validate
router.post("/validate-signup", async (req, res) => {
  const { qrId, password } = req.body;
  const VALID_PASSWORD = process.env.QR_SIGNUP_PASSWORD || "sales123";

  const counter = await Counter.findById("qrCounter");
  const idNum = parseInt(qrId?.slice(2));

  if (!qrId || !qrId.startsWith("RQ") || !counter || idNum > counter.seq) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid QR code." });
  }

  if (password !== VALID_PASSWORD) {
    return res
      .status(401)
      .json({ success: false, message: "Incorrect password." });
  }

  return res.status(200).json({ success: true });
});

module.exports = router;
