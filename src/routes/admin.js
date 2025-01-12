const express = require("express");
const AdminController = require("../controllers/AdminController");
const { authenticateToken } = require("../middleware/auth");

const router = express.Router();

router.get("/dashboard", authenticateToken, AdminController.dashboard);
router.get("/sports/new", authenticateToken, AdminController.createSportPage);
router.post("/sports", authenticateToken, AdminController.createSport);
router.get("/sports/:id", authenticateToken, AdminController.updateSport);
router.post(
  "/update-sport/:id",
  authenticateToken,
  AdminController.updateSportsController
);

module.exports = router;
