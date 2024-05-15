require('dotenv').config();
const jwt = require('jsonwebtoken');

const createJWT = id => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};

module.exports = createJWT;
