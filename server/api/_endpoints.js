const Router = require("express");
const Games = require("./games.js");
const IGDB = require("./_authenticateIGDB.js");

const router = Router();

router.use("/games", IGDB, (...args) => Games(...args));

module.exports = router;
