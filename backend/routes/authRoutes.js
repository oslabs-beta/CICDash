//Route: /auth
const express = require('express');

const githubController = require('../controllers/githubController.js');
const cookieController = require('../controllers/cookieController.js');
const databaseController = require('../controllers/databaseController.js');

const router = express();

router.use(
  '/github/callback',
  githubController.auth,
  cookieController.setCookie,
  // githubController.install,//can be deleted. added to access install middleware in GH controller called install
  databaseController.registerUser,
  (req, res, next) => {
    res.redirect('http://localhost:8080/results');
    return next();
  },
);

module.exports = router;
