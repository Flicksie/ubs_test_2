const express = require("express");
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { setTimeout } = require("timers/promises");
const API = require("./api/_endpoints.js");

const app = express();

app.use(async (req, res, next) => {
  // FAKE LOADING TIME
  // await setTimeout(3000);
  next();
});

app.use("/api", API);

// CATCH 404
app.use((req, res) => {
  res.status(404).json({ status: "Error", info: "Endpoint not found" });
});

// ERROR HANDLER
app.use(async (err, req, res) => {
  res.status(500).json({ status: "Error", info: "Internal server error" });
});

module.exports = app;
