if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
// const { MongoClient } = require("mongodb");

mongoose.connect(process.env.DATABASE_URL);
console.log(process.env.DATABASE_URL);
const db = mongoose.connection;

// db.once("open", async () => {
//   console.log("✅ Database connection established");

//   try {
//     const client = new MongoClient(process.env.DATABASE_URL);
//     await client.connect();
//     const connectedDb = client.db(); // gets default DB from connection string

//     console.log("📂 Using database:", connectedDb.databaseName);

//     const admin = connectedDb.admin();
//     const serverStatus = await admin.serverStatus();
//     const collections = await connectedDb.listCollections().toArray();

//     console.log("🛠 MongoDB version:", serverStatus.version);
//     console.log("📄 Collections:", collections.map((c) => c.name));

//     await client.close();
//   } catch (err) {
//     console.error("⚠️ Could not retrieve MongoDB info:", err.message);
//   }
// });

//prometheus metrics
const client = require("prom-client");
const responseTime = require("response-time");

const collectDefaultMetrics = client.collectDefaultMetrics;

collectDefaultMetrics({ register: client.register });

app.get("/metrics", async (req, res) => {
  res.setHeader("Content-Type", client.register.contentType);
  const metrics = await client.register.metrics();
  res.send(metrics);
});

const reqResTime = new client.Histogram({
  name: "http_express_req_res_time",
  help: "Request response time in milliseconds",
  labelNames: ["method", "route", "status_code"],
  buckets: [1, 50, 100, 200, 400, 500, 800, 1000, 2000],
});

app.use(
  responseTime((req, res, time) => {
    totalRequestCount.inc();
    reqResTime
      .labels({
        method: req.method,
        route: req.url,
        status_code: res.statusCode,
      })
      .observe(time);
  })
);

const totalRequestCount = new client.Counter({
  name: "http_request_count",
  help: "Total number of requests",
});

db.on("error", (err) => {
  console.log("database connection failure -----------------------", err);
});
db.once("open", () => {
  console.log("Database connection established");
});

app.use(cors());
app.use(express.json());

const resRouter = require("./routes/menuq");
app.use("/api/menuq", resRouter);

const menuRouter = require("./routes/menu");
app.use("/api/menu", menuRouter);

//test
app.get("/api/health", async (req, res) => {
  res.send("Menuq is up");
});

app.listen(8080, () => console.log("Server running on port 8080"));
