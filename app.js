/**
 * Module dependencies.
 */
const express = require("express");
const compression = require("compression");
const bodyParser = require("body-parser");
const errorHandler = require("errorhandler");
const dotenv = require("dotenv");
const path = require("path");
var cors = require("cors");
const { router } = require("./routes");

/**
 * Load environment variables from .env file, where API keys and passwords are configured
 */
dotenv.config({ path: ".env" });

/**
 * Create Express server.
 */
const app = express();

/**
 * Express configuration.
 */
app.set("host", "0.0.0.0");
app.set("port", 8080);
app.use(compression());
var corsOptions = {
  credentials: true,
  methods: ["GET", "POST", "OPTIONS", "DELETE", "PUT"],
  allowedHeaders: [
    "If-None-Match",
    "Etag",
    "authorization",
    "simultaneoussession",
    "Access-Control-Allow-Origin",
    "Access-Control-Allow-Headers",
    "Origin",
    "X-Requested-With",
    "Content-Type",
    "CORELATION_ID",
    "x-access-token",
  ],
  origin: function (origin, callback) {
    callback(null, true);
  },
};
app.use(cors(corsOptions));

/**
 */
app.use("/healthcheck", require("express-healthcheck")());

/**
 * Start Express server.
 */
require("./services/db.js");
app.use(router);
app.listen(app.get("port"), () => {
  console.log(
    "%s App is running at http://localhost:%d in %s mode",
    app.get("port"),
    app.get("env")
  );
  console.log("  Press CTRL-C to stop\n");
});

module.exports = app;
