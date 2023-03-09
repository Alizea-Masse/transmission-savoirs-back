const express = require("express");
const userController = require("../controller/api/userController");
const router = express.Router();
const { authenticateToken } = require("../utils/jwt-helpers");

router.get("/api/admin/users", authenticateToken ,userController.getAllUsers);

module.exports = router;

