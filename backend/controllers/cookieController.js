const createJWT = require('../utils/JWT');
const jwt = require('jsonwebtoken');

const cookieController = {};

// Set session cookie
cookieController.setCookie = async (req, res, next) => {
  console.log('* Setting session cookies...');

  // Grab data from res.locals
  const {username, accessToken, refreshToken } = res.locals;

  console.log('  - Username JWT from res.locals: ', username); // CL*
  console.log('  - Access Token JWT from res.locals: ', accessToken); // CL*

  // Set a cookie for Access Token and for Username
  res.cookie('username', username);
  res.cookie('access_token', accessToken);
 
  console.log('  - Access Token and Username cookies set!'); // CL*

  return next();
};

cookieController.decryptCookie = async (req, res, next) => {
  console.log('* Decrypting cookies...');

  // Grab data from res.locals
  const username = jwt.sign({ username: res.locals.apiResponseData.login }, process.env.JWT_SECRET);
  const accessToken = jwt.sign(
    { accessToken: res.locals.authResponseData.access_token },
    process.env.JWT_SECRET,
  );
  console.log('  - Username pulled from res.locals: ', username); // CL*
  console.log('  - Access Token pulled from res.locals: ', accessToken); // CL*

  // Set a cookie for Access Token and for Username
  res.cookie('access_token', accessToken);
  res.cookie('username', username);
  console.log('  - Access Token and Username cookies set!'); // CL*

  return next();
};

module.exports = cookieController;
