require("dotenv").config();

const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");

mongoose.connect(process.env.DATABASE_URL);
const db = mongoose.connection;

db.on("error", (err) => {
  console.log("database connection failure -----------------------", err);
});
db.once("open", () => {
  console.log("Database connection established");
});

app.use(cors());
app.use(express.json());

const menuRouter = require("./routes/menuq");
app.use("/menuq", menuRouter);

app.listen(3000, () => console.log("Server running on port 3000"));
