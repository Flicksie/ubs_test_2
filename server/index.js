const express = require("express");
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { setTimeout } = require("timers/promises");
const API = require("./api/_endpoints.js");

const app = express();
const port = process.env.PORT || 3001;

app.use(async (req, res, next) => {
  // FAKE LOADING TIME
  // await setTimeout(3000);
  next();
});

app.use("/api", API);

app.listen(port, () => console.log(`Listening on port ${port}`));
