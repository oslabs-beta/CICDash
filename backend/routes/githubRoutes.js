const express = require('express');

const githubController = require('../controllers/githubController.js');

const router = express.Router();


// Handle GET requests to '/api/github/getRunIds' endpoint
router.get('/getRunIds', githubController.getRunIds, (req, res) => {
  return res.status(200).json(res.locals.runs);
});

// Handle GET requests to '/api/github/getRuns' endpoint
router.get('/getRuns', githubController.getRunIds, githubController.getRuns, (req, res) => {
  return res.status(200).json(res.locals.jobs);
});

// Handle GET requests to '/api/github/saveRuns' endpoint
router.get(
  '/saveRuns',
  githubController.refreshToken,
  githubController.getRunIds,
  githubController.getRuns,
  githubController.saveRuns,
  (req, res) => {
    return res.status(200).json(res.locals.jobs);
  },
);

module.exports = router;
