const express = require('express');

const githubController = require('../controllers/githubController.js');

const router = express.Router();

// Handle GET requests to '/api/github/getRuns' endpoint
router.get('/getruns', githubController.getRuns, (req, res) => {
  return res.status(200).json(res.locals.runs);
});

// Handle GET requests to '/api/github/getjobs' endpoint

// ***4/1/2024 adding middleware to grab owner and repo from frontend
router.get(
  '/getjobs', githubController.getRuns,
  githubController.getJobs,
  (req, res) => {
    return res.status(200).json(res.locals.jobs);
  },
);

// adding middleware to grab owner and repo from frontend

module.exports = router;
