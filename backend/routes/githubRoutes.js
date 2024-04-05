const express = require('express');
const githubController = require('../controllers/githubController.js');

const router = express.Router();

// Handle GET requests to '/api/github/saveRuns' endpoint
router.get(
  '/saveRuns',
  githubController.getRunIds,
  // githubController.getRuns,
  // githubController.saveRuns,
  (req, res) => {
    return res.status(200).json(res.locals.jobs);
  },
);

module.exports = router;
