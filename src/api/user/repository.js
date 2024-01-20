const { pool } = require("../../data");

/**
 * 회원 가입
 * @param {string} email 메일 (아이디)
 * @param {string} password 비밀번호
 * @param {string} name 이름
 * @returns
 */
exports.register = async (email, password, name) => {
  const query = `INSERT INTO user
    (email, password, name)
    VALUES (?,?,?)`;
  return await pool(query, [email, password, name]);
};

exports.login = async (email, password) => {
  const query = `SELECT * FROM user WHERE email = ? AND password = ?`;
  let result = await pool(query, [email, password]);
  return result.length < 1 ? null : result[0];
};

exports.find = async (email) => {
  let result = await pool(`SELECT count(*) count FROM user WHERE email = ?`, [
    email,
  ]);
  return result.length < 1 ? null : result[0];
};

exports.findId = async (id) => {
  let result = await pool(
    `SELECT id, name, email, created_at FROM user WHERE id = ?`,
    [id]
  );
  return result.length < 1 ? null : result[0];
};
