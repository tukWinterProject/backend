require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = process.env.PORT || 3000;
const router = require("./src/router");

app.use("/", router);

//JSON 형식의 본문을 처리하기 위한 미들웨어
app.use(bodyParser.json());

//URL 인코딩된 본문을 처리하기 위한 미들웨어 {폼 데이터}
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(port, () => {
  console.log(`웹서버 구동... ${port}`);
});
