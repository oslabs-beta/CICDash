//Route: /auth
const express = require('express');

const githubController = require('../controllers/githubController.js');
const cookieController = require('../controllers/cookieController.js');
const databaseController = require('../controllers/databaseController.js');
const authController = require('../controllers/authController.js');

const router = express();

router.use(
  '/github/callback',
  githubController.auth,
  cookieController.setCookie,
  databaseController.registerUser,
  (req, res, next) => {
    res.redirect('http://localhost:8080/results');
    return next();
  },
);

router.use(
  '/verify',
  authController.verify,
  (req, res, next) => {
    res.status(200).json(res.locals.correctUser);
    return next();
  },
);


module.exports = router;
