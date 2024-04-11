const express = require("express");
const checkLoggedIn = require("../../lib/checkLoggedIn");
const userCtrl = require("./user.ctrl");

const router = express.Router();

router.post("/register", userCtrl.register);
router.post("/login", userCtrl.login);
router.post("/logout", checkLoggedIn, userCtrl.logout);
router.patch("/updateUserInfo", userCtrl.updateUserInfo);
router.post("/addFriend", checkLoggedIn, userCtrl.addFriend);
router.delete("/deleteFriend/:friendId", checkLoggedIn, userCtrl.deleteFriend);
router.get("/readFriendList", checkLoggedIn, userCtrl.readFriendList);
router.post("/uploadImg", userCtrl.uploadImg);
router.get(
  "/searchFriendEmail/:friendEmail",
  checkLoggedIn,
  userCtrl.searchFriendEmail
);
router.post("/googleRegister", userCtrl.googleRegister);
router.post("/googleLogin", userCtrl.googleLogin);

module.exports = router;