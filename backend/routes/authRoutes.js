const express = require('express');
const githubController = require('../controllers/githubController.js');
const router = express();

// /auth/github
// router.use('/github/callback', (req, res) => res.json('Testing /auth/github/callback'));
router.use('/github/callback', githubController.auth, (req, res) => res.json('/github route finished'));
// router.get('/github', githubController.auth, (req, res) => res.json('/github route finished'));

module.exports = router;