const express = require("express");
const userRouter = require("./user");
const calendarRouter = require("./calendar");
const meetRouter = require("./meet");

const router = express.Router();

router.use("/user", userRouter);
router.use("/calendar", calendarRouter);
router.use("/meet", meetRouter);

module.exports = router;