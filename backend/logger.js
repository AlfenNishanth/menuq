const { createLogger, transports } = require("winston");
const LokiTransport = require("winston-loki");
const options = {
  transports: [
    new LokiTransport({
      labels: { appName: "menuq" },
      host: "http://127.0.0.1:3100",
    }),
  ],
};
const logger = createLogger(options);

module.exports = logger;
