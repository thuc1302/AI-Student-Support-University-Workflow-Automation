const express = require("express");
const controller = require("../controllers/profileController");
const { requireRole } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/profile", requireRole("student"), controller.showProfile);
router.post("/profile/password", requireRole("student"), controller.changePassword);

module.exports = router;
