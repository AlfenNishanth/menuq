const express = require("express");
const router = express.Router();
const Counter = require("../models/counter");

//init
router.post("/counter/init", async (req, res) => {
  const { counterId, seq } = req.body;

  if (!counterId || typeof seq !== "number") {
    return res.status(400).json({ error: "counterId and seq (number) are required" });
  }

  try {
    const result = await Counter.findByIdAndUpdate(
      counterId,
      { $set: { seq } },
      { new: true, upsert: true }
    );

    return res.status(200).json({
      message: `Counter '${counterId}' is now set to ${seq}`,
      data: result,
    });
  } catch (error) {
    console.error("Error updating counter:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

//get count
router.get("/counter/:counterId", async (req, res) => {
  const { counterId } = req.params;
  
  try {
    var counterName = ''; 

    if (counterId == 1) counterName = 'restaurantId';
    else if (counterId == 2) counterName = 'qrCounter'

    const counter = await Counter.findById(counterName);
    
    if (!counter) {
      return res.status(404).json({ 
        message: "Counter not found",
        counterId 
      });
    }
    
    return res.json({
      counterId: counter._id,
      currentSeq: counter.seq
    });
  } catch (error) {
    console.error("Error fetching counter:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
