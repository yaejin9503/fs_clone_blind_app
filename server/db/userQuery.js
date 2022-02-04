const pool = require('../config/pool');
const sql = require('mssql');

const createdUser = async function (email, password, salt, nickname) {
  const connectionPool = await pool;

  const request = await connectionPool.request();
  const input = await request
    .input('email', sql.VarChar, email)
    .input('password', sql.VarChar, password)
    .input('salt', sql.VarChar, salt)
    .input('nickname', sql.NVarChar, nickname);

  try {
    const query = await input.execute('F_Create_User');
    return query;
  } catch (err) {
    return err;
  }
};

const findUserSalt = async function (email) {
  const connectionPool = await pool;

  const request = await connectionPool.request();
  const input = await request.input('email', sql.VarChar, email);

  try {
    const query = await input.execute('F_Find_User_Salt');
    return query;
  } catch (err) {
    return err;
  }
};

const loginUser = async function (email, password) {
  const connectionPool = await pool;

  const request = await connectionPool.request();
  const input = await request.input('email', sql.VarChar, email);

  try {
    const query = await input.execute('F_Login_User');
    return query;
  } catch (err) {
    return err;
  }
};

const duplicatedEmailCheck = async function (email) {
  const connectionPool = await pool;

  const request = await connectionPool.request();
  const input = await request.input('email', sql.VarChar, email);

  try {
    const query = await input.execute('F_Duplicated_Email_Check');
    return query;
  } catch (err) {
    return err;
  }
};

module.exports = {
  createdUser,
  findUserSalt,
  loginUser,
  duplicatedEmailCheck,
};
