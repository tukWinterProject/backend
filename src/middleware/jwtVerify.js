const jwt = require("jsonwebtoken");

/**
 * JWT 토큰 검증 미들웨어
 * 토큰 검증에 실패하면 에러메시지 출력
 */
module.exports = async (req, res, next) => {
  const token = req.header("token");

  jwt.verify(token, process.env.JWT_KEY, function (err, decoded) {
    if (err) {
      return res.send(err);
    }
    req.user = decoded;
    next();
  });
};
