const express = require("express");
const router = express.Router();
const Restaurant = require("../models/restaurants");

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

//Create one
router.post("/", async (req, res) => {
  try {
    const {
      firebaseUid,
      email,
      phone,
      restaurantName,
      restaurantAddress,
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

//Update one
router.patch("/:id", (req, res) => {});

//Delete one
router.delete("/:id", (req, res) => {});

async function getRestaurant(req, res, next) {
  let restaurant;
  try {
    // restaurant = await Restaurant.findById(req.params.id);
    if (/^[0-9a-fA-F]{24}$/.test(req.params.id)) {
      restaurant = await Restaurant.findById(req.params.id);
    } else {
      // If not a MongoDB ID, search by restaurantId (RX00001, RX00002...)
      restaurant = await Restaurant.findOne({ restaurantId: req.params.id });
    }

    if (restaurant == null) {
      return res.status(404).json({ message: "Cannot find restaurant" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.restaurant = restaurant;
  next();
}

module.exports = router;
