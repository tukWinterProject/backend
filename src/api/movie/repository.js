const { pool } = require("../../data");

//영화 생성
exports.create = async (
  user,
  title,
  release_date,
  end_date,
  showing,
  genre,
  image_url
) => {
  const query = `INSERT INTO movie
    (user_id, title, release_date, end_date, showing, genre, image_url)
    VALUES (?, ?, ?, ?, ?, ?, ?)`;
  return await pool(query, [
    user,
    title,
    release_date,
    end_date,
    showing,
    genre,
    image_url,
  ]);
};

//개별 영화 정보 가져오기
exports.show = async (id) => {
  const query = `SELECT id, user_id, title, showing, genre,
      DATE_FORMAT(release_date, '%Y-%m-%d') AS release_date,
      DATE_FORMAT(end_date, '%Y-%m-%d') AS end_date,
      DATE_FORMAT(registration_date, '%Y-%m-%d') AS registration_date,
      image_url
      FROM movie
      WHERE movie.id = ?`;
  let result = await pool(query, [id]);
  return result.length < 0 ? null : result[0];
};

//유저별 영화 가져오기
exports.showbyUserId = async (id) => {
  const query = `SELECT m.id, m.user_id, m.title, m.showing, m.genre,
       DATE_FORMAT(m.release_date, '%Y-%m-%d') AS release_date,
       DATE_FORMAT(m.end_date, '%Y-%m-%d') AS end_date,
       DATE_FORMAT(m.registration_date, '%Y-%m-%d') AS registration_date,
       m.image_url
       FROM movie m
       JOIN user u ON m.user_id = u.id
       WHERE u.id = ?
`;
  let result = await pool(query, [id]);
  return result.length < 0 ? null : result;
};

//모든 영화 조회하기
exports.showAllMovie = async () => {
  const query = `SELECT id, user_id, title, showing, genre,
      DATE_FORMAT(release_date, '%Y-%m-%d') AS release_date,
      DATE_FORMAT(end_date, '%Y-%m-%d') AS end_date,
      DATE_FORMAT(registration_date, '%Y-%m-%d') AS registration_date,
      image_url
      FROM movie`;
  let result = await pool(query, []);
  return result.length < 0 ? null : result;
};

//영화 수정하기
exports.update = async (
  title,
  release_date,
  end_date,
  showing,
  genre,
  image_url,
  id
) => {
  const query = `UPDATE movie
    SET title = ?,
        release_date = ?,
        end_date = ?,
        showing = ?,
        genre = ?,
        image_url = ?
    WHERE id = ?`;
  return await pool(query, [
    title,
    release_date,
    end_date,
    showing,
    genre,
    image_url,
    id,
  ]);
};

//영화 삭제하기
exports.delete = async (id) => {
  return await pool(`DELETE FROM movie WHERE id = ?`, [id]);
};
