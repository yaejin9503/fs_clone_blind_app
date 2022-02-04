const { Console } = require('console');
const express = require('express');
const router = express.Router();
const query = require('../db/articleQuery');

router.get('/main', async (req, res) => {
  let result;
  try {
    result = await query.readAllArticleTitle();

    const boards = result.recordsets[0];
    const contentLists = result.recordsets[1];

    const contents = [];
    boards.map((board) => {
      let content = contentLists.filter(
        (item) => item.boardID === board.boardId
      );
      let obj = {
        id: board.boardId,
        title: board.title,
        content: content,
      };
      contents.push(obj);
    });
    res.send(contents);
  } catch (e) {
    console.error(e);
  }
});

module.exports = router;
