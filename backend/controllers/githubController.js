require('dotenv').config();
const axios = require('axios');

// Protected variables
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
// const app = new App({
//   appId: process.env.CLIENT_ID,
//   privateKey: process.env.CLIENT_SECRET,
// });

const githubController = {};

// /auth/github/callback
githubController.auth = async (req, res, next) => {
  console.log('* Authorizing login and granting access token...');

  // Grab request token generated at 'login with Github'
  const requestToken = req.query.code;
  // POST request to Github api for access token
  const authResponse = await axios({
    method: 'post',
    url: `https://github.com/login/oauth/access_token?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&code=${requestToken}`,
    // Set the content type header, so that we get the response in JSON
    headers: {
      accept: 'application/json',
    },
  });
  // console.log('  - authResponse.data:', authResponse.data); // CL*

  const access_token = authResponse.data.access_token;
  console.log('  - Access token:', access_token);
  res.locals.authResponse_data = authResponse.data;

  // GET request to Github api for user data
  const apiResponse = await axios({
    method: 'get',
    url: `https://api.github.com/user`,
    headers: {
      Authorization: 'token ' + access_token,
    },
  });
  // console.log('  - apiResponse.data:', apiResponse.data); // CL*
  console.log('  - Access granted!');

  res.locals.apiResponse_data = apiResponse.data;
  return next();
};

githubController.getRuns = async (req, res, next) => {
  console.log(`* Getting all run id's...`); // CL*

  // Store response from GET request to Github API for runs
  const { owner, repo } = req.body;
  console.log(`  - Data sent from frontend: owner: ${owner}, repo: ${repo}`); // CL*

  const runsData = await axios({
    method: 'get',
    owner: owner,
    repo: repo,
    url: `https://api.github.com/repos/${owner}/${repo}/actions/runs`,
    headers: {
      Authorization: `Bearer ${process.env.BEARER_TOKEN}`,
      'X-GitHub-Api-Version': '2022-11-28',
    },
  });

  // Store all the run id's in an array
  const runs = [];
  // console.log('runsData.data.workflow_runs: ', runsData.data.workflow_runs);
  runsData.data.workflow_runs.forEach(run => {
    runs.push(run.id);
  });

  // Pass run id's array on in middelware chain
  console.log(`  - 'runs' array: `, runs); // CL*
  res.locals.runs = runs;
  return next();
};

githubController.getJobs = async (req, res, next) => {
  console.log('* Getting all job metrics...'); // CL*

  const { owner, repo } = req.body;
  const { runs } = res.locals;

  // Store response from GET request to Github API for jobs
  const jobs = [];
  for (const run of runs) {
    const jobData = await axios({
      method: 'get',
      url: `https://api.github.com/repos/${owner}/${repo}/actions/runs/${run}/jobs`,
      headers: {
        Authorization: `Bearer ${process.env.BEARER_TOKEN}`,
        'X-GitHub-Api-Version': '2022-11-28',
      },
    });

    jobs.push(jobData.data.jobs);
    console.log('jobs: ', jobs);
    res.locals.jobs = jobs;
  }
  return next();
};

githubController.saveJobs = async (req, res, next) => {
  const { owner, repo } = req.body;
  const { jobs } = res.locals;
  // Store response from GET request to Github API for jobs
  for (const job of jobs) {
    const jobData = await axios({
      method: 'get',
      url: `https://api.github.com/repos/${owner}/${repo}/actions/runs/${run}/jobs`,
      headers: {
        Authorization: 'Bearer XXXXXXX',
        'X-GitHub-Api-Version': '2022-11-28',
      },
    });
    // console.log('  - jobData.data: ', jobData.data); // CL*
    jobs.push(jobData.data.jobs);
  }

  console.log('  - Jobs: ', jobs); // CL*
  res.locals.jobs = jobs;
  return next();
};

module.exports = githubController;
