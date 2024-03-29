const express = require("express");
const router = express.Router();
const logging = require("./middleware/logging");
const verify = require("./middleware/jwtVerify");

// 웹 페이지의 controller
const apiUserController = require("./api/user/controller");
const apiMovieController = require("./api/movie/controller");
const apiFileController = require("./api/file/controller");
const apiReviewController = require("./api/review/controller");

router.use(logging);

// 영화 api 도메인
router.get("/api/movie", apiMovieController.showmovies);
router.get("/api/movie/my", verify, apiMovieController.showMyMovies);
router.get("/api/movie/:id", apiMovieController.show);
router.get("/api/movie/list/:user_id", apiMovieController.showbyUserId);
router.post("/api/movie/register", verify, apiMovieController.store);
router.put("/api/movie/:id/update", verify, apiMovieController.update);
router.delete("/api/movie/:id/delete", verify, apiMovieController.delete);

router.post(
  "/api/file/upload",
  apiFileController.uploadImage.single("image"),
  (req, res) => {
    const uploadFileInfo = req.file;
    const location = uploadFileInfo.location;
    res.send(location);
  }
);

// 유저 기능 도메인
router.post("/api/user/register", apiUserController.register);
router.post("/api/user/login", apiUserController.login);
router.get("/api/user/mypage", verify, apiUserController.mypage);

// 리뷰 api 도메인
router.post("/api/review/:id", verify, apiReviewController.create);
router.get("/api/review/:id", apiReviewController.show);

module.exports = router;
