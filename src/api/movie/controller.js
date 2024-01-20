const repository = require("./repository");

exports.store = async (req, res) => {
  const body = req.body;

  const result = await repository.create(
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

exports.show = async (req, res) => {
  const id = req.params.id;

  const item = await repository.show(id);

  res.send(item);
};
