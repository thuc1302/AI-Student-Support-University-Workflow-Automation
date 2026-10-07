const express = require("express");
const controller = require("../controllers/requestController");
const { requireAuth, requireRole } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", requireAuth, controller.list);
router.get("/new", requireRole("student"), controller.showCreate);
router.post("/", requireRole("student"), controller.create);
router.get("/:id", requireAuth, controller.detail);
router.post("/:id/update", requireRole("staff", "admin"), controller.update);

module.exports = router;
