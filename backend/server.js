require("dotenv").config();

const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");

mongoose.connect(process.env.DATABASE_URL);
const db = mongoose.connection;

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
app.use("/menuq", resRouter);

const menuRouter = require("./routes/menu");
app.use("/menu", menuRouter);

app.listen(8080, () => console.log("Server running on port 8080"));


