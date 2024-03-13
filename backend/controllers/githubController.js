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
  const requestToken = req.query.code;
  const authResponse = await axios({
    method: 'post',
    url: `https://github.com/login/oauth/access_token?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&code=${requestToken}`,
    // Set the content type header, so that we get the response in JSON
    headers: {
      accept: 'application/json',
    },
  });
  console.log('authResponse.data:', authResponse.data);

  console.log('access_token:', authResponse.data.access_token);
  const access_token = authResponse.data.access_token;

  console.log('------------------Getting user info from github API:');
  const apiResponse = await axios({
    method: 'get',
    url: `https://api.github.com/user`,
    headers: {
      Authorization: 'token ' + access_token,
    },
  });
  console.log('apiResponse.data:', apiResponse.data);
  res.locals.apiResponse.data = apiResponse.data;
  return next();
};

githubController.getRuns = async (req, res, next) => {
  // Store response from GET request to Github API for runs
  const { owner, repo } = req.body;
  console.log('* owner: ', owner);
  console.log('* repo: ', repo);

  const runsData = await axios({
    method: 'get',
    url: `https://api.github.com/repos/${owner}/${repo}/actions/runs`,
    headers: {
      Authorization: 'Bearer Need to Update',
      'X-GitHub-Api-Version': '2022-11-28',
    },
  });

  // Store all the run id's in an array
  const runs = [];
  runsData.data.forEach(run => {
    runs.push(run[id]);
  });

  // Pass run id's array on in middelware chain
  // console.log('* runs: ', runs);
  res.locals.runs = runs;
};

// githubController.getJobs = (req, res, next) => {
//   const {owner, repo} = req.body;
//   const { runs } = res.locals;
//   // Store response from GET request to Github API for jobs
//   const jobs = [];
//   runs.forEach(async run =>
//     jobs.push(
//       await axios({
//         method: 'get',
//         url: `https://api.github.com/repos/${owner}/${repo}/actions/runs/${run}/jobs',
//         headers: {
//           // Authorization: 'token ' + access_token,
//           'X-GitHub-Api-Version': '2022-11-28',
//         }
//       })

//   );

//   console.log('* jobs: ', jobs);
//   res.locals.jobs = jobs;
// };

module.exports = githubController;
