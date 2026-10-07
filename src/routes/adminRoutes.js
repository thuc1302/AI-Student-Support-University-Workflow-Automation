const express = require("express");
const controller = require("../controllers/adminController");
const { requireRole } = require("../middleware/authMiddleware");

const router = express.Router();

router.get(
  "/",
  requireRole("admin"),
  controller.index
);

module.exports = router;