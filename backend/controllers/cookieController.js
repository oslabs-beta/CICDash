const cookieController = {};

// Set session cookie
cookieController.setCookie = async (req, res, next) => {
  console.log('* Setting session cookies...');

  // Grab data from res.locals
  const username = res.locals.apiResponseData.login;
  const accessToken = res.locals.authResponseData.access_token;
  console.log('  - Username pulled from res.locals: ', username); // CL*
  console.log('  - Access Token pulled from res.locals: ', accessToken); // CL*

  // Set a cookie for Access Token and for Username
  res.cookie('access_token', accessToken);
  res.cookie('username', username);
  console.log('  - Access Token and Username cookies set!'); // CL*

  return next();
};

module.exports = cookieController;
