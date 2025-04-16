if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config(); 
}
const express = require("express");
const router = express.Router();
const Restaurant = require("../models/restaurants");
const MenuItem = require("../models/menuItem");
const logger = require('../logger');

const multer = require("multer");
const { v4 } = require("uuid");
const { S3Client, PutObjectCommand, DeleteObjectCommand } = require("@aws-sdk/client-s3");

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
    logger.info('GET /restaurant - Fetching all restaurants');
    const restaurants = await Restaurant.find();
    res.json(restaurants);
  } catch (err) {
    logger.error(`GET /restaurant - Error: ${err.message}`);
    res.status(500).json({ message: err.message });
  }
});

//Get one
router.get("/:id", getRestaurant, (req, res) => {
  logger.info(`GET /restaurant/${req.params.id} - Fetching restaurant by firebase UID`);
  res.json(res.restaurant);
});

//Get by restaurantId
router.get("/byId/:id", getRestaurantById, (req, res) => {
  logger.info(`GET /restaurant/byId/${req.params.id} - Fetching restaurant by restaurant ID`);
  res.json(res.restaurant);
});

//Create one
router.post("/", async (req, res) => {
  try {
    logger.info(`POST /restaurant - Creating new restaurant for: ${req.body.restaurantName}`);
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

    const savedRestaurant = await newRestaurant.save();
    logger.info(`POST /restaurant - Successfully created restaurant with ID: ${savedRestaurant._id}`);
    res.status(201).json(savedRestaurant);
  } catch (err) {
    logger.error(`POST /restaurant - Error creating restaurant: ${err.message}`);
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

    logger.info(`PATCH /restaurant/${firebaseUid} - Successfully updated restaurant`);
    res.status(200).json(updatedRestaurant);
  } catch (err) {
    logger.error(`PATCH /restaurant/${req.params.id} - Error: ${err.message}`);
    res.status(400).json({ message: err.message });
  }
});

//Delete one
router.delete("/:id", (req, res) => {
  // Add implementation if needed
});

async function getRestaurant(req, res, next) {
  let restaurant;
  try {
    logger.info(`Middleware getRestaurant - Finding restaurant with firebase UID: ${req.params.id}`);
    restaurant = await Restaurant.findOne({ firebaseUid: req.params.id });

    if (restaurant == null) {
      logger.info(`Middleware getRestaurant - Restaurant not found for ID: ${req.params.id}`);
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
    logger.info(`Middleware getRestaurantById - Finding restaurant with ID: ${req.params.id}`);
    const restaurant = await Restaurant.findOne({
      restaurantId: req.params.id,
    });
    
    if (restaurant == null) {
      logger.info(`Middleware getRestaurantById - Restaurant not found for ID: ${req.params.id}`);
      return res.status(404).json({ message: "Cannot find restaurant" });
    }
    res.json(restaurant);
  } catch (err) {
    logger.error(`Middleware getRestaurantById - Error: ${err.message}`);
    return res.status(500).json({ message: err.message });
  }
  next();
}

module.exports = router;
