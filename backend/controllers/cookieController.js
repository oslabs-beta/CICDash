// const model = require('../models/models.js');
// const jwt = require('jsonwebtoken');
// const { setJwtCookie, handleServerError } = require('../utils/functions');

const cookieController = {};

// Sets session cookie
cookieController.setCookie = async (req, res, next) => {
  console.log('* Setting session cookie...');

  const username = res.locals.apiResponse_data.login;
  const access_token = res.locals.authResponse_data.access_token;
  const refresh_token = res.locals.authResponse_data.refresh_token;
  console.log('  - Access token pulled from res.locals: ', access_token);

  res.cookie('access_token', access_token);
  res.cookie('username', username);

  console.log('  - Access token cookie set!');
  console.log('res.cookie after setting cookie: ', res.getHeaders());
  return next();
  // try {
  //   // Get the user _id and send it to the frontend as a cookie
  //   const foundUser = await User.findOne({ username });

  //   // Create a JWT token and send it to the frontend via res.locals
  //   const token = jwt.sign({ email }, process.env.JWT_SECRET, {
  //     expiresIn: '1d',
  //   });

  //   setJwtCookie(res, token);
  //   console.log(token);
  //   // res.status(201).json({
  //   //   token: token,
  //   // });
  //   res.locals.userLoginInfo.token = token;
  //   return next();
  // } catch (err) {
  //   handleServerError(res, err);
  // }
};

// Reset session cookie on logout
cookieController.deleteCookie = async (req, res, next) => {
  try {
    res.cookie('jwt-cookie', '', {
      httpOnly: true,
      expires: new Date(0),
    });
    res.cookie('id', '', {
      httpOnly: true,
      expires: new Date(0),
    });
    res.cookie('accountType', '', {
      httpOnly: true,
      expires: new Date(0),
    });
    res.status(200).json({ message: 'User is logged out' });
  } catch (err) {
    handleServerError(res, err);
  }
};

module.exports = cookieController;
