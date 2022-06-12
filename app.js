const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const mongoose = require("mongoose");
const userDataRoutes = require("./routes/userData");
const authRoutes = require("./routes/auth");
var cors = require('cors')




var app = express();

mongoose
  .connect(
    "mongodb+srv://z123fg:Zz931029@cluster0.cclr5.mongodb.net/?retryWrites=true&w=majority"
  )
  .then((res) => {
    console.log(`connected to database: ${res}`);
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
module.exports = app;
