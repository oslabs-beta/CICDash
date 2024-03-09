require('dotenv').config();

const githubController = {};
const app = new App({
  appId: process.env.APP_ID,
  privateKey: process.env.PRIVATE_KEY,
});



module.exports = githubController;