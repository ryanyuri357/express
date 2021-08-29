////////////////
//  Index.js  //
////////////////

// REQ
const debug = require("debug")("app:startup");
//const dbDebugger = require("debug")("app:db");
const config = require("config");
const morgan = require("morgan");
const helmet = require("helmet");
const Joi = require("joi");
const logger = require("./middleware/logger");
const courses = require("./routes/courses");
const home = require("./routes/home");
const express = require("express");
const app = express();

// HTML template generator
app.set("view engine", "pug");
app.set("views", "./views"); //default

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(helmet());
app.use("/api/courses", courses);
app.use("/", home);

// Configuration
console.log("Application: " + config.get("name"));
console.log("Mail Server: " + config.get("mail.host"));
console.log("Mail Password: " + config.get("mail.password"));

// Environment check
if (app.get("env") === "development") {
  app.use(morgan("tiny"));
  debug("Morgan enabled..."); // console log
}

//  More middleware
app.use(logger);

// Listener
const port = process.env.PORT || 3000; // Look for PORT Environment Variable ('set' cmd)
app.listen(port, () => console.log(`Listening on port ${port}`));
