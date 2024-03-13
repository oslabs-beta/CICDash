//Route: /auth
const express = require('express');
const githubController = require('../controllers/githubController.js');
const router = express();

router.use('/github/callback', githubController.auth, (req, res) =>
  res.json('/github route finished'),
);

module.exports = router;
