const express = require("express");
const checkLoggedIn = require("../../lib/checkLoggedIn");
const calendarCtrl = require("./calendar.ctrl");

const router = express.Router();

router.post("/createSchedule", checkLoggedIn, calendarCtrl.createSchedule);
router.get("/readSchedule", calendarCtrl.readSchedule);
router.get("/readScheduleDetail/:scheduleId", calendarCtrl.readScheduleDetail);
router.patch("/updateSchedule", calendarCtrl.updateSchedule);
router.delete("/deleteSchedule/:scheduleId", calendarCtrl.deleteSchedule);

module.exports = router;
