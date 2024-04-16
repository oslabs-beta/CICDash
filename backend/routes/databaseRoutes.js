//Route: /auth
const express = require('express');

const githubController = require('../controllers/githubController.js');
const cookieController = require('../controllers/cookieController.js');
const databaseController = require('../controllers/databaseController.js');

const router = express();

router.get('/findRuns', databaseController.findRuns, (req, res, next) => {
  return res.status(200).json(res.locals.existingRuns);
});

module.exports = router;
