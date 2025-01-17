const express = require("express");
const Calendar = require("../../models/calendar");

//일정 생성
const createSchedule = async (req, res) => {
  const { title, date, start, end } = req.body;
  const userId = res.locals.user._id;
  const startTime = new Date(date.substr(0, 10) + "T" + start);
  const endTime = new Date(date.substr(0, 10) + "T" + end);
  try {
    const schedule = new Calendar({
      title,
      start: startTime,
      end: endTime,
      user: userId,
    });
    await schedule.save();

    return res.status(201).json({
      success: true,
      schedule,
    });
  } catch (error) {
    return res.status(500).json({
      error,
    });
  }
};

//일정 조회
const readSchedule = async (req, res) => {
  try {
    const schedules = await Calendar.find().populate("user");
    return res.status(200).json({
      success: true,
      schedules,
    });
  } catch (error) {
    return res.status(500).json({
      error,
    });
  }
};

//일정 상세보기
const readScheduleDetail = async (req, res) => {
  const { scheduleId } = req.params;
  try {
    const schedule = await Calendar.findById({ _id: scheduleId });
    return res.status(200).json({
      success: true,
      schedule,
    });
  } catch (error) {
    return res.status(500).json({
      error,
    });
  }
};

//일정 수정
const updateSchedule = async (req, res) => {
  const { title, date, start, end, scheduleId } = req.body;

  const userId = res.locals.user._id;
  const startTime = new Date(date.substr(0, 10) + "T" + start);
  const endTime = new Date(date.substr(0, 10) + "T" + end);
  try {
    let schedule = await Calendar.findById({ _id: scheduleId });
    if (!schedule) {
      return res.status(400).json({
        success: false,
        message: "해당 일정이 존재하지 않습니다.",
      });
    }
    if (schedule.user.toString() !== userId) {
      return res.status(400).json({
        success: false,
        message: "일정 작성자가 아닙니다.",
      });
    }

    schedule = await Calendar.findByIdAndUpdate(
      { _id: scheduleId },
      { title, scheduleId, start: startTime, end: endTime },
      { new: true }
    );

    const schedules = await Calendar.find();
    return res.status(200).json({
      success: true,
      schedules,
    });
  } catch (error) {
    return res.status(500).json({
      error,
    });
  }
};

//일정 삭제
const deleteSchedule = async (req, res) => {
  const userId = res.locals.user._id;
  const { scheduleId } = req.params;
  try {
    let schedule = await Calendar.findById({ _id: scheduleId });
    if (!schedule) {
      return res.status(400).json({
        success: false,
        message: "해당 일정이 존재하지 않습니다.",
      });
    }
    if (schedule.user.toString() !== userId) {
      return res.status(400).json({
        success: false,
        message: "일정 작성자가 아닙니다.",
      });
    }
   
    schedule = await Calendar.findByIdAndDelete({ _id: scheduleId });
    const schedules = await Calendar.find().populate("user");
    return res.status(200).json({
      success: true,
      schedules,
    });
  } catch (error) {
    return res.status(500).json({
      error,
    });
  }
};

module.exports = {
  createSchedule,
  readSchedule,
  readScheduleDetail,
  updateSchedule,
  deleteSchedule,
};
