const crypto = require('crypto');

const createSalt = () =>
  new Promise((resolve, reject) => {
    crypto.randomBytes(64, (err, buf) => {
      if (err) reject(err);
      return resolve(buf.toString('base64'));
    });
  });

const createHashedPassword = (plainPassword) =>
  new Promise(async (resolve, reject) => {
    const salt = await createSalt();
    crypto.pbkdf2(plainPassword, salt, 9999, 64, 'sha512', (err, key) => {
      if (err) reject(err);
      return resolve({ hashedPassword: key.toString('base64'), salt });
    });
  });

const makeHashedPassword = (salt, plainPassword) =>
  new Promise(async (resolve, reject) => {
    crypto.pbkdf2(plainPassword, salt, 9999, 64, 'sha512', (err, key) => {
      if (err) reject(err);
      return resolve(key.toString('base64'));
    });
  });

module.exports = {
  createSalt,
  createHashedPassword,
  makeHashedPassword,
};
