//@ts-check

const express = require('express');
const cors = require('cors');
const { article } = require('./router');
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
//post 요청시 req.body에 코드가 담겨 올 수 있도록 처리 해주는 미들웨어
app.use(express.urlencoded({ extended: true }));

//기능별 라우터 추가
app.use(article);

//상태 확인용
app.get('/', (req, res) => {
  res.send('connect success !!');
});

app.listen(PORT, 'localhost', () => {
  console.log('app listening at http://localhost:3000');
});
