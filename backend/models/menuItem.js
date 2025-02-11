const mongoose = require("mongoose");

const menuItemSchema = new mongoose.Schema({
  restaurantID: { type: String, required: true },
  name: { type: String, required: true },
  description: { type: String },
  type: { type: String, required: true },
  price: { type: Number, required: true },
  variants: { type: Array, default: [] }, // You can customize the schema if variants have a specific structure
  addOns: { type: Array, default: [] }, // Similarly, define a sub-schema if needed
  imageUrl: { type: String },
  available: { type: Boolean, default: true },
  tags: { type: [String], default: [] },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("MenuItem", menuItemSchema);
