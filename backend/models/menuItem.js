const mongoose = require("mongoose");

const menuItemSchema = new mongoose.Schema({
  restaurantID: { type: String, required: true },
  name: { type: String, required: true },
  description: { type: String },
  type: { type: String, required: true },
  price: { type: Number, required: true },
  variants: [
    {
      name: { type: String, required: true }, 
      price: { type: Number, required: true } 
    }
  ],
  addOns: [
    {
      name: { type: String, required: true },
      price: { type: Number, required: true } 
    }
  ],
  imageUrl: { type: String },
  available: { type: Boolean, default: true },
  tags: { type: [String], default: [] },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  vegetarian: { type: Boolean },
  rating: { type: Number, min: 1, max: 5},
  numRatings: { type: Number, default: 0 },
});

module.exports = mongoose.model("MenuItem", menuItemSchema);
