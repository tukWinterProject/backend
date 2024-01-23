const { create, show } = require("./repository");

// 리뷰 생성하기
exports.create = async (req, res) => {
  const user = req.user;
  const body = req.body;
  const movie_id = req.params.id;

  const result = await create(body.content, body.rating, user.id, movie_id);

  if (result.affectedRows > 0) {
    res.send({ result: "success", message: "리뷰 등록에 성공했습니다!" });
  } else {
    res.send({ result: "fail" });
  }
};

// 영화 별 리뷰들 조회하기
exports.show = async (req, res) => {
  const id = req.params.id;

  const items = await show(id);

  res.send(items);
};
