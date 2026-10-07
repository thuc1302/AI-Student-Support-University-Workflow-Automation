const express = require("express");
const controller = require("../controllers/aiController");
const { requireRole } = require("../middleware/authMiddleware");

const router = express.Router();

router.post(
  "/chat",
  requireRole("student"),
  controller.chat
);

module.exports = router;