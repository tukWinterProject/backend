const repository = require("./repository");

//영화 생성하기
exports.store = async (req, res) => {
  const user = req.user;
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
    res.send("영화 생성 완료");
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
exports.showmovies = async (req, res) => {
  const item = await repository.showAllMovie();
  res.send(item);
};

//영화 수정하기
exports.update = async (req, res) => {
  const id = req.params.id;
  const body = req.body;

  // const item = await repository.show(id);
  // if (body.user_id !== item.user_id) {
  //   res.send({ result: "fail", message: "타인의 영화를 수정할 수 없습니다." });
  // }

  const result = await repository.update(
    body.title,
    body.release_date,
    body.end_date,
    body.showing,
    body.genre,
    body.image_url,
    id
  );
  if (result.affectedRows > 0) {
    res.send("수정 성공");
  } else {
    res.send({ result: "fail" });
  }
};

//영화 삭제하기
exports.delete = async (req, res) => {
  const id = req.params.id;

  const result = await repository.delete(id);

  res.send("삭제 성공");
};
