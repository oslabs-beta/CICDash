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
  databaseController.registerUser,
  (req, res, next) => {
    res.redirect('/results');
    return next();
  },
);

module.exports = router;
