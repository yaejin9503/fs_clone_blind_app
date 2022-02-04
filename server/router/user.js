const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const query = require('../db/userQuery');
const {
  createHashedPassword,
  makeHashedPassword,
} = require('../module/crypto');

router.post('/user/signup', async (req, res) => {
  const { email, password, nickname } = req.body;
  const { hashedPassword, salt } = await createHashedPassword(password);

  let result;
  try {
    result = await query.createdUser(email, hashedPassword, salt, nickname);
  } catch (e) {
    console.error(e);
  }
  res.send(result.rowsAffected[0] === 1 ? true : false);
});

router.get('/user/duplicheck', async (req, res) => {
  const { email, domain } = req.query;

  const userEmail = email + '@' + domain;
  console.log(userEmail);
  let reuslt;
  try {
    result = await query.duplicatedEmailCheck(userEmail);
  } catch (e) {
    console.error(e);
  }
  res.send(result.recordset[0]);
});

router.post('/user/signin', async (req, res) => {
  const { email, password } = req.body;

  let result;
  try {
    let salt = await query.findUserSalt(email);
    if (salt.recordset.length > 0) {
      salt = salt ? (salt.recordset ? salt.recordset[0].salt : '') : '';
    } else {
      res.send({
        error: true,
        msg: '이메일이 존재하지 않음',
      });
      return;
    }

    const hashedPassword = await makeHashedPassword(salt, password);

    result = await query.loginUser(email);
    const secret = req.app.get('jwt-secret');

    if (result.recordset[0].hashedPassword === hashedPassword) {
      console.log(result.recordset[0]);
      const token = jwt.sign(
        {
          email: email,
          nickname: result.recordset[0].nickname,
        },
        secret,
        {
          expiresIn: '7d',
          issuer: 'blind_clone_coding',
          subject: 'auth',
        }
      );

      res.send({
        error: false,
        msg: '로그인 성공',
        token: token,
        result: result.recordset[0],
      });
    } else {
      res.send({
        error: true,
        msg: '비밀번호 불일치',
      });
    }
  } catch (e) {
    console.error(e);
  }
  //res.send(result.recordsets[0]);
});

router.get('/user/token', (req, res) => {
  const { authorization } = req.headers;
  console.log(req.headers);
  if (!authorization) {
    return res.send(false);
  }

  const token = authorization.split(' ')[1];
  const secret = req.app.get('jwt-secret');
  jwt.verify(token, secret, (err, data) => {
    if (err) {
      res.send(err);
    }
    res.send(data);
  });
});

module.exports = router;
