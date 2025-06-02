const mongoose = require("mongoose");

const counterSchema = new mongoose.Schema({
  _id: { type: String, required: true }, // Name of the counter (e.g., "restaurantId")
  seq: { type: Number, default: 0 }, // Current sequence number
});


module.exports = mongoose.model("Counter", counterSchema);