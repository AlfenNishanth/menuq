require("dotenv").config();
const express = require("express");
const router = express.Router();
const Restaurant = require("../models/restaurants");
const MenuItem = require("../models/menuItem");
const multer = require("multer");
const { v4 } = require("uuid");
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");

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
    const restaurants = await Restaurant.find();
    res.json(restaurants);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//Get one
router.get("/:id", getRestaurant, (req, res) => {
  res.json(res.restaurant);
});

//Get by restaurantId
router.get("/byId/:id", getRestaurantById, (req, res) => {
  res.json(res.restaurant);
});

//Create one
router.post("/", async (req, res) => {
  try {
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
    res.status(201).json(savedRestaurant); // Respond with the saved restaurant
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update one
router.patch("/:id", async (req, res) => {
  try {
    const firebaseUid  = req.params.id;
    const updates = req.body;

    console.log("firebaseUid: ", firebaseUid);
    const updatedRestaurant = await Restaurant.findOneAndUpdate(
      { firebaseUid }, // Search condition
      updates,
      {
        new: true, // Return the updated document
        runValidators: true, // Ensure validation rules apply
      }
    );

    // If no restaurant found, return a 404 error
    if (!updatedRestaurant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }

    res.status(200).json(updatedRestaurant);
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: err.message });
  }
});

//Delete one
router.delete("/:id", (req, res) => {});

async function getRestaurant(req, res, next) {
  let restaurant;
  try {
    restaurant = await Restaurant.findOne({ firebaseUid: req.params.id });
    // restaurant = await Restaurant.findOne({ restaurantId: req.params.id });

    if (restaurant == null) {
      return res.status(404).json({ message: "Cannot find restaurant" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.restaurant = restaurant;
  next();
}

async function getRestaurantById(req, res, next) {
  let restaurant;
  try {
    const restaurant = await Restaurant.findOne({
      restaurantId: req.params.id,
    });
    if (restaurant == null) {
      return res.status(404).json({ message: "Cannot find restaurant" });
    }
    res.json(restaurant);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  next();
}

//Menu
router.post("/menu", upload.single("image"), async (req, res) => {
  try {
    const {
      restaurantID,
      name,
      description,
      type,
      price,
      variants,
      addOns,
      available,
      tags,
    } = req.body;

    let imageUrl = "";
    if (req.file) {
      console.log("calling upload func");
      imageUrl = await uploadFileToS3(req.file);
    }

    const newMenuItem = new MenuItem({
      restaurantID,
      name,
      description,
      type,
      price,
      variants,
      addOns,
      imageUrl,
      available,
      tags,
    });
    console.log("trying to save to mongo");
    const savedMenuItem = await newMenuItem.save();
    res.status(201).json(savedMenuItem); // Respond with the saved menu item
  } catch (err) {
    console.log(`Error while tyring to create menu: ${err}`);
    res.status(400).json({ message: err.message });
  }
});

//upload file
async function uploadFileToS3(file) {
  console.log("trying to upload file");
  const fileName = `${file.originalname}_${v4()}`;
  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: fileName,
    Body: file.buffer,
    ContentType: file.mimetype,
    // ACL: "public-read",
  };

  const command = new PutObjectCommand(params);
  await s3Client.send(command);
  // Manually construct the URL (this assumes your bucket’s public URL format)
  return `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileName}`;
}

module.exports = router;
