const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const mongoose = require("mongoose");
const userDataRoutes = require("./routes/userData");
const authRoutes = require("./routes/auth");
const stsRoutes = require("./routes/sts");
var cors = require('cors');
require('dotenv').config();
var util = require('util')




var app = express();

mongoose
  .connect(
    process.env.MONGO_URL
  )
  .then((res) => {
    console.log(`connected to database: ${res.connections[0]._connectionString}`);
  })
  .catch((err) => {
    console.log(`failed to connect to the database: ${err}`);
  });
  
app.use(cors()) // Use this after the variable declaration
app.use(logger("dev"));
app.set('case sensitive routing', true);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});

app.use("/api/userData", userDataRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/sts", stsRoutes)
module.exports = app;
