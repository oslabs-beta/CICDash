const router = require('express');
const githubController = require('../controllers/githubController.js');

// /auth/github
router.get('/github/callback', githubController.auth, (req, res) => res.json('/github route finished'));
// router.get('/github', githubController.auth, (req, res) => res.json('/github route finished'));

module.exports = router;