const express = require("express");
const router = express.Router();
const logging = require("./middleware/logging");

router.use(logging);

router.get("/", (req, res) => {
  res.send("Hello World");
});

module.exports = router;
