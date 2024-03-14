//Route: /auth
const express = require('express');

const githubController = require('../controllers/githubController.js');
const cookieController = require('../controllers/cookieController.js');
const userController = require('../controllers/userController.js');

const router = express();

router.use(
  '/github/callback',
  githubController.auth,
  cookieController.setCookie,
  userController.registerUser,
  githubController.getRuns,
  // githubController.getJobs,
  (req, res) => res.json('/github route finished'),
);

module.exports = router;
