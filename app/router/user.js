const express = require("express");
const userController = require("../controller/api/userController");
const router = express.Router();
const { authenticateToken } = require("../utils/jwt-helpers");

router.get("/api/user/:id", userController.getUserProfil);

router.post("/api/register", userController.register);
router.post("/api/login", userController.login);

router.delete("/api/user/:id", authenticateToken, userController.delete);

router.post("/api/resetpassword", userController.resetPassword);
router.post("/api/contact", userController.contactForm);

router.patch("/api/newpassword",authenticateToken,userController.setNewPassword); //!

router.patch("/api/user/:id", authenticateToken, userController.edit); //!

router.get("/api/avatar", userController.getAllAvatars);

module.exports = router;
