const Router = require("express");
const Games = require("./games.js");
const IGDB = require("./_authenticateIGDB.js");

const router = Router();

router.use("/games", IGDB, (...args) => Games(...args));

router.get("/test", (req, res) => res.status(200).json({ message: "OK" }));

module.exports = router;
