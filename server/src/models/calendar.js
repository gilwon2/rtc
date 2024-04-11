const mongoose = require("mongoose");

const CalendarSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      maxlength: 30,
    },
    start: {
      type: Date,
      required: true,
      default: Date.now,
    },
    end: {
      type: Date,
      required: false,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const Calendar = mongoose.model("Calendar", CalendarSchema);

export default Calendar;
