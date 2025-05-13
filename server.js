const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const authRouter = require("./routes/auth");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRouter);

const DB = process.env.MONGO_URI;

mongoose
  .connect(DB)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch(() => {
    console.log("MongoDB connection failed");
  });

app.use((req, res) => {
  return res.status(500).json({
    status: 500,
    data: { data: null, message: "Invalid route" },
  });
});

module.exports = app;
