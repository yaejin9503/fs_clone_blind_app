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

  // article, comment 정보
  const obj = {
    article: result.recordsets[0],
    comment: result.recordsets[1],
  };

  res.send(obj);
});

module.exports = router;
