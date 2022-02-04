const express = require('express');
const router = express.Router();
const query = require('../db/articleQuery');

router.get('/article/:id', async (req, res) => {
  const { id } = req.params;

  let result;
  try {
    result = await query.readOneArticleComment(id);
  } catch (e) {
    console.error(e);
  }

  //article, comment 정보
  const obj = {
    article: result.recordsets[0],
    comments: result.recordsets[1],
  };

  res.send(obj);
});

router.post('/article/comment', async (req, res) => {
  const { articleId, authorEmail, content, mention } = req.body;

  let result;
  try {
    result = await query.addCommentAndSelect(
      articleId,
      authorEmail,
      content,
      mention
    );
  } catch (e) {
    console.error(e);
  }
  //console.log(result);

  res.send(result.recordset);
});

// article add
// router.get('/article/write', async (req, res) => {
//   // const { title, content, writer } = req.body;
//   let result;

//   try {
//     // 넘겨줄 데이터 값이 많아서 req.body로 파라미터값 넘겨줌
//     result = await query.readOneArticleComment(req.body);
//   } catch (e) {
//     console.error(e);
//   }
//   res.send(result.recordsets[0]);
// });

module.exports = router;
