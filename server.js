const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const { router } = require("./routes/auth");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", router);

const DB = process.env.MONGO_URI;

mongoose
  .connect(DB)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch(() => {
    console.log("DB disconnected");
  });

app.use((req, res) => {
  return res.status(500).json({
    status: 500,
    data: { data: null, message: "invalid routes" },
  });
});

module.exports = app;
