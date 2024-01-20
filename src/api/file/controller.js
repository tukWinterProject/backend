const aws = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");
const path = require("path");

const s3 = new aws.S3({
  region: process.env.AWS_S3_REGION,
  accessKeyId: process.env.AWS_S3_ACCESS_KEY,
  secretAccessKey: process.env.AWS_S3_SECRET_KEY,
});

// 확장자 검사 목록
const allowedExtensions = [".png", ".jpg", ".jpeg", ".bmp", ".gif"];

// multer 객체 생성
exports.uploadImage = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.AWS_BUCKET,
    contentType: multerS3.AUTO_CONTENT_TYPE,
    key: (req, file, callback) => {
      // 임의번호 생성
      let randomNumber = "";
      for (let i = 0; i < 8; i++) {
        randomNumber += String(Math.floor(Math.random() * 10));
      }

      // 확장자 검사
      const extension = path.extname(file.originalname).toLowerCase();
      if (!allowedExtensions.includes(extension)) {
        return callback(new Error("확장자 에러"));
      }

      // folder라는 파일 내부에 업로드한 사용자에 따라 임의의 파일명으로 저장
      callback(null, `folder/${randomNumber}_${file.originalname}`);
    },
    // acl 권한 설정
    acl: "public-read-write",
  }),
});
