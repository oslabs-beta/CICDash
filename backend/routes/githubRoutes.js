const express = require('express');
const githubController = require('../controllers/githubController.js');
const databaseController = require('../controllers/databaseController.js');

const router = express.Router();

// Handle GET requests to '/api/github/saveRuns' endpoint
router.get(
  '/findRuns',
  githubController.getRunIds,
  databaseController.getUniqueRunIds,
  githubController.getJobs,
  databaseController.saveJobs,
  databaseController.findRuns,
  (req, res) => {
    return res.status(200).json(res.locals.existingRuns);
  },
);

module.exports = router;
