const express = require('express');
const userRouter = require("./user");
const adRouter = require("./ad");
const categoryRouter = require("./category");
const adminRouter = require("./admin");

const router = express.Router();


router.use(userRouter, adRouter, categoryRouter, adminRouter);

module.exports = router;



