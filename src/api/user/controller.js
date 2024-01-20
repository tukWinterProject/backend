const jwt = require("./jwt");
const crypto = require("crypto");
const { register, find, login, findId } = require("./repository");

exports.register = async (req, res) => {
  const { email, password, name } = req.body;

  let { count } = await find(email);

  if (count > 0) {
    return res.send({
      result: "fail",
      message: "중복된 이메일이 존재합니다.",
    });
  }
  const result = await crypto.pbkdf2Sync(
    password,
    process.env.SALT_KEY,
    50,
    100,
    "sha512"
  );

  const { affectedRows, insertId } = await register(
    email,
    result.toString("base64"),
    name
  );

  if (affectedRows > 0) {
    // 회원 가입 후 바로 로그인 되는 경우
    //const data = await jwt.jwtSign({ id: insertId, name });
    //res.send({ access_token: data });
    res.send({ result: "success" , message: "회원가입에 성공했습니다!"})
  } else {
    res.send({ result: "fail" });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  let result = crypto.pbkdf2Sync(
    password,
    process.env.SALT_KEY,
    50,
    100,
    "sha512"
  );

  let item = await login(email, result.toString("base64"));

  if (item == null) {
    res.send({ result: "fail" });
  } else {
    const data = await jwt.jwtSign({ id: item.id, name: item.name });
    res.send({ access_token: data });
  }
};

exports.mypage = async (req, res) => {
  const user = req.user;
  console.log(user);

  const item = await findId(user.id);

  if (item == null) {
    res.send({ result: "fail" });
  } else {
    res.send(item);
  }
};
