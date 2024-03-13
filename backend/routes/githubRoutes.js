const express = require('express');

const githubController = require('../controllers/githubController.js');

const router = express.Router();

// Handle GET requests to '/api/github/getRuns' endpoint
router.get('/getRuns', githubController.getRuns, (req, res) => {
  return res.status(200).json(res.locals.runs);
});

// Handle GET requests to '/api/github/getJobs' endpoint
// router.get('/getJobs', githubController.getRuns, githubController.getJobs, (req, res) => {
//   return res.status(200).json(res.locals.jobs);
// });

module.exports = router;
