const { pool } = require("../../data");

// 리뷰 생성
exports.create = async (content, rating, user, movie) => {
    const query = `INSERT INTO review
    (content, rating, user_id, movie_id)
    VALUES (?, ?, ?, ?)`;
    return await pool(query, [content, rating, user, movie]);
}

// 영화 별 리뷰들 조회
exports.show = async (id) => {
    const query = `SELECT r.id, r.content, r.rating,
    DATE_FORMAT(r.created_at, '%Y-%m-%d') AS created_at
    FROM review r
    JOIN movie m ON r.movie_id = m.id
    WHERE m.id = ?`;
    let result = await pool(query, [id]);
    return result.length < 0 ? null : result;
}

// 유저가 작성한 리뷰들 조회
exports.showByUserID = async (id) => {
    const query = `SELECT r.id, r.content, r.rating,
    DATE_FORMAT(r.created_at, '%Y-%m-%d') AS created_at
    FROM review r
    JOIN user u ON r.user_id = u.id
    WHERE u.id = ?`;
    let result = await pool(query, [id]);
    return result.length < 0 ? null : result;
}