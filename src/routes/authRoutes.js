const express = require("express");
const controller = require("../controllers/authController");

const router = express.Router();

router.get("/", controller.showLogin);
router.get("/login", controller.showLogin);
router.post("/login", controller.login);

router.get("/register", controller.showRegister);
router.post("/register", controller.register);

router.get("/logout", controller.logout);

module.exports = router;