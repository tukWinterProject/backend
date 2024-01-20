const express = require("express");
const router = express.Router();
const logging = require("./middleware/logging");

const verify = require("./middleware/jwtVerify");

// 웹 페이지의 controller
const userController = require("./api/user/controller");

router.use(logging);

router.get("/", (req, res) => {
  res.send("Hello World");
});

// 유저 기능 도메인
router.post("/api/user/register", userController.register);
router.post("/api/user/login", userController.login);
router.get("/api/user/mypage", verify, userController.mypage);

module.exports = router;
