require("dotenv").config();
const express = require("express");
const router = express.Router();
const MenuItem = require("../models/menuItem");

router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const items = await MenuItem.find({ restaurantID: id });

    if (!items.length) {
      return res
        .status(404)
        .json({ message: "No items found for this restaurant" });
    }
    res.json(items);
  } catch (error) {
    console.error("Error while fetching menu for restaurant: ", error);
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
