const pool = require('../config/pool');
const sql = require('mssql');

const readOneArticleComment = async function (id) {
  const connectionPool = await pool;
  const request = await connectionPool.request();
  const input = await request.input('id', sql.Int, id);
  // .input('PAGE_SIZE', sql.Int, pageSize);

  try {
    const query = await input.execute('F_Read_One_Article'); //Read_One_Article_With_Comment
    return query;
  } catch (err) {
    return err;
  }
};

const readAllArticleTitle = async function () {
  const connectionPool = await pool;
  const request = await connectionPool.request();
  try {
    const query = await request.execute('F_Read_BoardList');
    return query;
  } catch (err) {
    return err;
  }
};

const addCommentAndSelect = async function (id, authorEmail, content, mention) {
  const connectionPool = await pool;
  const request = await connectionPool.request();
  const input = await request
    .input('articleId', sql.Int, id)
    .input('authorEmail', sql.NVarChar, authorEmail)
    .input('content', sql.NVarChar, content)
    .input('mention', sql.NVarChar, mention);

  try {
    const query = await input.execute('F_Add_User_Comment');
    return query;
  } catch (err) {
    return err;
  }
};

module.exports = {
  readOneArticleComment,
  readAllArticleTitle,
  addCommentAndSelect,
};
