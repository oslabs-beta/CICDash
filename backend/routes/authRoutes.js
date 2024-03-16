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
  (req, res, next) => {
    res.redirect('http://localhost:8080/results');
    return next();
  },
);

module.exports = router;
