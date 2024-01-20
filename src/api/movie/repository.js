const { pool } = require("../../data");

exports.create = async (
  title,
  release_date,
  end_date,
  showing,
  genre,
  image_url
) => {
  const query = `INSERT INTO movie
    (title, release_date, end_date, showing, genre, image_url)
    VALUES (?, ?, ?, ?, ?, ?)`;
  return await pool(query, [
    title,
    release_date,
    end_date,
    showing,
    genre,
    image_url,
  ]);
};

exports.show = async (id) => {
  const query = `SELECT id, title, showing, genre,
      DATE_FORMAT(release_date, '%Y-%m-%d') AS release_date,
      DATE_FORMAT(end_date, '%Y-%m-%d') AS end_date,
      DATE_FORMAT(registration_date, '%Y-%m-%d') AS registration_date,
      image_url
      FROM movie
      WHERE movie.id = ?`;
  let result = await pool(query, [id]);
  return result.length < 0 ? null : result[0];
};
