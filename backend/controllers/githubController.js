require('dotenv').config();
const axios = require('axios');

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

// Get all of the user's workflow run ids for specified repo
githubController.getRunIds = async (req, res, next) => {
  console.log(`* Getting all user's workflow runs id's...`); // CL*

  // Grab owner and repo from the request
  // const { owner, repo } = req.body;
  const owner = 'ptri-13-cat-snake'; // HARDCODE
  const repo = 'unit-12-testing-gha'; // HARDCODE
  console.log('  - Owner pulled from request object: ', owner);
  console.log('  - Repo pulled from request object: ', repo);

  try {
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
    // console.log('  - apiResponse.data.workflow_runs: ', apiResponse.data.workflow_runs); // CL*

    // Iterate through each run and add it's id to 'runs' array
    const runIds = [];
    apiResponse.data.workflow_runs.forEach(runObj => {
      runIds.push(runObj.id);
    });
    console.log(`  - All user's workflow run ids: `, runIds); // CL*

    // Pass run id's array on in middelware chain
    res.locals.allRunIds = runIds;
    return next();
  } catch (err) {
    console.log('error: ' + err.message);
    return next(err);
  }
};

// ---------------------------------------------------------------------------------------------------------------------

// Get all the jobs data associated w/ each workflow run
githubController.getJobs = async (req, res, next) => {
  console.log(`* Getting all the jobs data associated w/ each workflow run...`); // CL*

  // Grab owner and repo from the request
  // const { owner, repo } = req.body;
  const owner = 'ptri-13-cat-snake'; // HARDCODE
  const repo = 'unit-12-testing-gha'; // HARDCODE
  console.log('  - Owner pulled from request object: ', owner);
  console.log('  - Repo pulled from request object: ', repo);

  // Grab run ids array passed from prior middleware
  const runIds = res.locals.runIds;
  console.log('  - Run Ids pulled from res.locals: ', runIds);

  // Grab Access Token from cookies
  const accessToken = req.cookies.access_token;
  console.log('  - Access Token read from cookies: ', accessToken); // CL*

  // Store response from GET request to Github API for jobs data for each run
  const jobsData = [];
  const promises = runIds.map(runId =>
    axios({
      method: 'get',
      url: `https://api.github.com/repos/${owner}/${repo}/actions/runs/${runId}/jobs`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'X-GitHub-Api-Version': '2022-11-28',
      },
      withCredentials: true,
    }),
  );

  // console.log('promises : ', promises);

  const responses = await Promise.all(promises);
  // console.log('responses: ', responses);

  jobsData.push(responses.map(response => response.data.jobs));

  // console.log('  - User jobs data for each workflow run: ', jobsData); // CL*

  // Pass on jobs data array
  res.locals.jobsData = jobsData;
  return next();
};

module.exports = githubController;
