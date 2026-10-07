const express = require("express");
const controller = require("../controllers/dashboardController");
const { requireAuth } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/dashboard", requireAuth, controller.dashboard);
router.get("/procedures", requireAuth, controller.procedures);
router.get("/chat", requireAuth, controller.chat);

module.exports = router;