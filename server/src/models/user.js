const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const validator = require("validator");

const saltRounds = 10;

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Email is invalid");
        }
      },
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      trim: true,
      minLength: 6,
      validate(value) {
        if (value.toLowerCase().includes("password")) {
          throw new Error("Password can not contain a word password");
        }
      },
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    thumbnail: {
      type: String,
      trim: true,
    },
    friends: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    snsId: {
      type: String,
      default: null,
    },
    provider: {
      type: String,
      default: "local",
    },
    token: {
      type: String,
    },
  },
  { timestamps: true }
);

UserSchema.methods.setPassword = async function (password) {
  const result = await bcrypt.hash(password, saltRounds);
  this.password = result;
};

UserSchema.methods.returnHashPassword = async function (password) {
  const result = await bcrypt.hash(password, saltRounds);
  return result;
};

UserSchema.methods.checkPassword = async function (password) {
  const result = await bcrypt.compare(password, this.password);
  return result;
};

UserSchema.statics.findByEmail = function (email) {
  return this.findOne({ email });
};

UserSchema.methods.generateToken = async function () {
  const token = jwt.sign(
    {
      _id: this._id,
      name: this.name,
      email: this.email,
    },
    process.env.JWT_SECRET || "untact-operation-command"
  );
  this.token = token;
  await this.save();
  return token;
};

UserSchema.methods.serialize = function () {
  let data = this.toJSON();
  const { password, ...userWithoutPassword } = data;
  return userWithoutPassword;
};

const User = mongoose.model("User", UserSchema);
module.exports = User;