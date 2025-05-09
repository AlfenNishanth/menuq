const mongoose = require("mongoose");
const Counter = require("./counter");

const restaurantSchema = new mongoose.Schema({

  restaurantId: { type: String, unique: true },
  firebaseUid: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String },
  restaurantName: { type: String, required: true },
  restaurantAddress: { type: String },
  restaurantCity: { type: String },
  restaurantState: { type: String },
  restaurantPincode: { type: String },

  // Geolocation (For maps & nearby search)
  restaurantLocation: {
    type: { type: String, enum: ["Point"], default: "Point" },
    coordinates: { type: [Number] }, // [longitude, latitude]
  },

  noOfSeats: { type: Number },

  // Restaurant category (Predefined & Custom)
  restaurantCategory: {
    type: String,
    // enum: ["Hotel", "Cafe", "Other"],
    // default: "Other",
  },

  //   customCategory: { type: String }, // Only used if "Other" is selected

  // Cuisine type (e.g., Indian, Italian, etc.)
  cuisineType: { type: [String] }, // Array of cuisines

  // Operating hours (Array of time slots)
  operatingHours: [
    {
      day: {
        type: String,
        enum: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
      },
      hours: { type: String }, // Example: "7AM - 11AM, 12PM - 3PM"
    },
  ],

  // Social Media Links (Stored as JSON object)
  socialMedia: {
    type: Map,
    of: String, // Example: { "instagram": "https://instagram.com/restaurant", "facebook": "https://facebook.com/restaurant" }
  },

  resOpen: { type: Boolean, default: true },

  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// **Auto-generate restaurantId before saving**
restaurantSchema.pre("save", async function (next) {
    if (!this.restaurantId) {
      try {
        const counter = await Counter.findByIdAndUpdate(
          { _id: "restaurantId" }, // Unique identifier for restaurant counter
          { $inc: { seq: 1 } }, // Increment sequence number
          { new: true, upsert: true }
        );
  
        this.restaurantId = `RX${counter.seq.toString().padStart(5, "0")}`; // Format: RX00001, RX00002...
        next();
      } catch (err) {
        next(err);
      }
    } else {
      next();
    }
  });

// RestaurantSchema.index({ restaurantLocation: "2dsphere" }); // For geospatial queries

// const Restaurant = mongoose.model("Restaurant", RestaurantSchema);
module.exports = mongoose.model("Restaurant", restaurantSchema);
