const pool = require('../config/pool');
const sql = require('mssql');

const readOneArticleComment = async function (id) {
  const connectionPool = await pool;
  const request = await connectionPool.request();
  const input = await request.input('id', sql.Int, id);
  // .input('PAGE_SIZE', sql.Int, pageSize);

  try {
    const query = await input.execute('Read_One_Article_With_Comment');
    return query;
  } catch (err) {
    return err;
  }
};

module.exports = {
  readOneArticleComment,
};
