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
  .catch((err) => {
    console.error("MongoDB connection failed:", err.message);
  });

app.use((req, res) => {
  return res.status(404).json({
    status: 404,
    data: { data: null, message: "Invalid route" },
  });
});

module.exports = app;
