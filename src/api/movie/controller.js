const repository = require("./repository");

//영화 생성하기
exports.store = async (req, res) => {
  const body = req.body;
  const user = req.user;

  const result = await repository.create(
    user.id,
    body.title,
    body.release_date,
    body.end_date,
    body.showing,
    body.genre,
    body.image_url
  );

  if (result.affectedRows > 0) {
    res.send(body);
  } else {
    res.send({ result: "fail" });
  }
};

//개별 영화 조회하기
exports.show = async (req, res) => {
  const id = req.params.id;

  const item = await repository.show(id);

  res.send(item);
};

//유저 아이디로 자기가 등록한 영화 조회하기
exports.showbyUserId = async (req, res) => {
  const user = req.user;

  const item = await repository.showbyUserId(user.id);

  res.send(item);
};

//모든 영화 조회하기
exports.showAllMovie = async (req, res) => {
  const item = await repository.showAllMovie();
  res.send(item);
};
