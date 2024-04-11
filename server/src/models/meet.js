const mongoose = require("mongoose");

const MeetSchema = new mongoose.Schema(
  {
    host: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    thumbnail: {
      type: String,
      trim: true,
    },
    password: {
      type: String,
      trim: true,
    },
    menu: {
      type: String,
      trim: true,
    },
    muted: {
      type: Boolean,
      required: true,
    },
    videoOff: {
      type: Boolean,
      required: true,
    },
  },
  { timestamps: true }
);

const Meet = mongoose.model("Meet", MeetSchema);

module.exports = Meet;