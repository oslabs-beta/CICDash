require('dotenv').config();
const axios = require('axios');
const { Octokit } = require('@octokit/rest');
const { User } = require('../models/userModel');

// Protected variables
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;

const githubController = {};

// Authorize user via Github to log in
githubController.auth = async (req, res, next) => {
  console.log('* Authorizing login and pulling user data from GitHub...');

  // Grab Authorization Code provided by GitHub after the user logs in w/ GitHub
  const authCode = req.query.code;

  // POST request to Github api using Client ID, Client Credentials, and Authorization Code
  const authResponse = await axios({
    method: 'post',
    url: `https://github.com/login/oauth/access_token?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&code=${authCode}`,
    // Set the content type header, so that we get the response in JSON
    headers: {
      accept: 'application/json',
    },
  });

  // Pass on the authentication data sent back by Github (ie Access Token, Refresh Token)
  res.locals.authResponseData = authResponse.data;
  console.log('  - Authentication data sent back by Github:', authResponse.data); // CL*

  // Grab Access Token from authentication data sent back by Github
  const accessToken = authResponse.data.access_token;
  // console.log('  - Access token:', accessToken); // CL*

  // GET request to Github api for user data using Access Token
  const apiResponse = await axios({
    method: 'get',
    url: `https://api.github.com/user`,
    headers: {
      Authorization: 'token ' + accessToken,
    },
  });

  // Pass on the user data sent back by Github (ie Username)
  res.locals.apiResponseData = apiResponse.data;
  console.log('  - User data sent back by Github:', apiResponse.data); // CL*

  return next();
};

// ---------------------------------------------------------------------------------------------------------------------

// Get the Run Ids
githubController.getRunIds = async (req, res, next) => {
  console.log(`* Getting all run id's...`); // CL*

  // Grab owner and repo from the request
  // const { owner, repo } = req.body;
  const owner = 'ptri-13-cat-snake'; // HARDCODE
  const repo = 'unit-12-testing-gha'; // HARDCODE
  console.log('  - Owner pulled from request object: ', owner);
  console.log('  - Repo pulled from request object: ', repo);

  // Grab Access Token from cookies
  const accessToken = req.cookies.access_token;
  console.log('  - Access Token read from cookies: ', accessToken); // CL*

  // GET request to Github api for user runs data using Access Token
  const apiResponse = await axios({
    method: 'get',
    url: `https://api.github.com/repos/${owner}/${repo}/actions/runs`,
    headers: {
      Authorization: 'token ' + accessToken,
      'X-GitHub-Api-Version': '2022-11-28',
    },
  });

  // Iterate through each run and add it's id to 'runs' array
  const runs = [];
  apiResponse.data.workflow_runs.forEach(run => {
    runs.push(run.id);
  });
  console.log(`  - User workflow run ids: `, runs); // CL*

  // Pass on run ids array
  res.locals.runIds = runs;
  return next();
};

// ---------------------------------------------------------------------------------------------------------------------

githubController.getRuns = async (req, res, next) => {
  console.log('* Getting all runs data...'); // CL*

  // const { owner, repo } = req.body;
  const owner = 'ptri-13-cat-snake';
  const repo = 'unit-12-testing-gha';
  const { runIds } = res.locals;

  // Store response from GET request to Github API for runs
  const runs = [];
  for (const runId of runIds) {
    const runData = await axios({
      method: 'get',
      url: `https://api.github.com/repos/${owner}/${repo}/actions/runs/${runId}/jobs`,
      headers: {
        Authorization: `Bearer ${req.cookies.access_token}`,
        'X-GitHub-Api-Version': '2022-11-28',
      },
      withCredentials: true,
    });

    runs.push(runData.data.jobs);

    res.locals.runs = runs;
  }
  // console.log('  - runs: ', runs); // CL*
  return next();
};

// ---------------------------------------------------------------------------------------------------------------------

githubController.saveRuns = async (req, res, next) => {
  console.log('* Saving runs data to database...'); // CL*

  const owner = 'ptri-13-cat-snake';
  const repo = 'unit-12-testing-gha';
  // const { owner, repo } = req.body;

  const { runs } = res.locals;
  console.log('  - runs passed via res.locals: ', runs);

  // Store response from GET request to Github API for jobs
  for (const run of runs) {
    for (const jobObj of run) {
      const {
        run_id,
        workflow_name,
        head_branch,
        run_attempt,
        status,
        conclusion,
        created_at,
        started_at,
        completed_at,
        name,
        steps,
        run_url,
        node_id,
        head_sha,
        url,
        html_url,
        check_run_url,
        labels,
        runner_id,
        runner_name,
        runner_group_id,
        runner_group_name,
      } = jobObj;

      const runData = {
        repo_owner: owner,
        repo: repo,
        run_id: run_id,
        workflow_name: workflow_name,
        head_branch: head_branch,
        run_attempt: run_attempt,
        status: status,
        conclusion: conclusion,
        created_at: created_at,
        started_at: started_at,
        completed_at: completed_at,
        name: name,
        steps: steps,
        run_url: run_url,
        node_id: node_id,
        head_sha: head_sha,
        url: url,
        html_url: html_url,
        check_run_url: check_run_url,
        labels: labels,
        runner_id: runner_id,
        runner_name: runner_name,
        runner_group_id: runner_group_id,
        runner_group_name: runner_group_name,
      };

      const existingUser = await User.findOne({
        username: req.cookies.username,
      });

      // Check if user exists in database
      if (existingUser) {
        console.log('  - User exists in database!');

        let runExists = false;

        // for (const run of existingUser.runs) {
        //   // If the run.run_id = passed in run.run_id
        //   if (run.run_id === run_id) {
        //     runExists = true;
        //     console.log('  - Run exists in User runs array');
        //   }
        // }

        if (!runExists) {
          await User.findOneAndUpdate(
            { username: req.cookies.username },
            { $addToSet: { runs: runData } },
          );
          console.log('  - User runs array updated!');
        }
      }
    }
  }

  return next();
};

module.exports = githubController;
