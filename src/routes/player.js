const express = require("express");
const { dashboard, joinSport } = require("../controllers/PlayerController");
const { authenticateToken } = require("../middleware/auth");

const router = express.Router();

router.get("/dashboard", authenticateToken, dashboard);
router.post("/sports/:sportId/join", authenticateToken, joinSport);

module.exports = router;
