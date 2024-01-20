const express = require("express");
const router = express.Router();
const logging = require("./middleware/logging");

const apiMovieController = require("./api/movie/controller");
const apiFileController = require("./api/file/controller");

router.use(logging);

router.get("/api/movie/:id", apiMovieController.show);
router.get("/api/movie/lists", apiMovieController.showAllMovie);
router.get("/api/movie/list/:user_id", apiMovieController.showbyUserId);
router.post("/api/movie/register", apiMovieController.store);

router.post(
  "/api/file/upload",
  apiFileController.uploadImage.single("image"),
  (req, res) => {
    const uploadFileInfo = req.file;
    const location = uploadFileInfo.location;
    res.send(location);
  }
);

module.exports = router;
