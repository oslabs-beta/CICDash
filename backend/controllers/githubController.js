require('dotenv').config();
const axios = require('axios');
const githubController = {};
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
// const app = new App({
//   appId: process.env.CLIENT_ID,
//   privateKey: process.env.CLIENT_SECRET,
// });

// /auth/github/callback
githubController.auth = async (req, res, next) => {
  const requestToken = req.query.code;
  const authResponse = await axios({
    method: 'post',
    url: `https://github.com/login/oauth/access_token?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&code=${requestToken}`,
    // Set the content type header, so that we get the response in JSON
    headers: {
      accept: 'application/json',
    },
  })
  console.log('authResponse.data:', authResponse.data);

  console.log('access_token:', authResponse.data.access_token);
  const access_token = authResponse.data.access_token;

  console.log('------------------Getting user info from github API:')
  const apiResponse = await axios({
    method: 'get',
    url: `https://api.github.com/user`,
    headers: {
      Authorization: 'token ' + access_token,
    },
  });
  console.log('apiResponse.data:', apiResponse.data);
  return next();
}

//githubController.getRepos
  //https://docs.github.com/en/rest/repos/repos?apiVersion=2022-11-28#list-repositories-for-the-authenticated-user
  //get owners







module.exports = githubController;