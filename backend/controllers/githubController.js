require('dotenv').config();
const axios = require('axios');
const githubController = {};
// const app = new App({
//   appId: process.env.APP_ID,
//   privateKey: process.env.PRIVATE_KEY,
// });

// /auth/github/callback
githubController.auth = async (req, res, next) => {
  const requestToken = req.query.code;
  const authResponse = await axios({
    method: 'post',
    url: `https://github.com/login/oauth/access_token?client_id=${APP_ID}&client_secret=${PRIVATE_KEY}&code=${requestToken}`,
    // Set the content type header, so that we get the response in JSON
    headers: {
      accept: 'application/json',
    },
  })
  const test = await authResponse.json();
  console.log('access_token:', test.data.access_token);

  console.log('Getting user info from github API:')
  const apiResponse = await axios({
    method: 'get',
    url: `https://api.github.com/user`,
    headers: {
      Authorization: 'token ' + access_token,
    },
  });
  const test2 = await apiResponse.json();
  console.log('apiResponse.json():', test2);
  return next();
}





module.exports = githubController;