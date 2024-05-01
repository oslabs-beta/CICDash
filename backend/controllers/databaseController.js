const { User } = require('../models/userModel');

const databaseController = {};

// Save user data to mongodb (create a user profile for our db)
databaseController.registerUser = async (req, res, next) => {
  console.log('* Checking if user is in database...'); // CL*

  // Grab user data passed from prior middleware
  const username = res.locals.apiResponseData.login;
  const accessToken = res.locals.authResponseData.access_token;
  const refreshToken = res.locals.authResponseData.refresh_token;
  console.log('  - username pulled from res.locals: ', username); //---This is the place username comes into play
  console.log('  - Access Token pulled from res.locals: ', accessToken);
  console.log('  - Refresh Token pulled from res.locals: ', refreshToken);

  // Handle existing profile
  const profileExists = await User.findOne({ username: username });
  if (profileExists) {
    console.log(
      '  - User already has a profile in database, updating Access Token w/ Refresh Token',
    ); // CL*
    // console.log('grab the information here')
    const updatedProfile = await User.findOneAndUpdate(
      { username: username },
      { refresh_token: refreshToken },
      { new: true },
    );
    // console.log(' - updated user profile: ', updatedProfile); // CL*

    return next();
  } else {
    console.log('  - User not found in database'); // CL*
    // Handle creating a new profile for user
    const user = await User.create({
      username,
      refresh_token: refreshToken,
      runs: [],
    });
    console.log('  - New user profile added to database'); // CL*

    // Pass on user profile object
    res.locals.user = user;
    return next();
  }
};

////////////////////////////////////////////////////////

databaseController.getUniqueRunIds = async (req, res, next) => {
  console.log(`* Checking if run ids exist in database...`); // CL*

  // Grab owner and repo from the request
  const { owner, repo } = req.query;
  // const owner = 'ptri-13-cat-snake';
  // const repo = 'unit-12-testing-gha';
  const { allRunIds } = res.locals;

  try {
    // Query the database to check if the username has a runs entry with any of the run IDs
    const existingRuns = await User.find(
      {
        username: req.cookies.username,
        runs: { $elemMatch: { run_id: { $in: allRunIds } } },
      },
      {
        'runs.run_id': 1,
      },
    );
    // console.log('existingRuns: ', existingRuns);

    // Extract existing run IDs from the query result
    const existingRunIds = existingRuns.flatMap(user => user.runs.map(run => run.run_id));

    // Filter out unique run IDs
    const uniqueRunIds = allRunIds.filter(runId => !existingRunIds.includes(runId));
    console.log('   - New run ids to add to database: ', uniqueRunIds);

    // Update res.locals.runIds with unique run IDs
    res.locals.runIds = uniqueRunIds;
    return next();
  } catch (error) {
    console.error('Error checking run ids:', error);
  }
};

///////////////////////////////////////////////////////////////////////////////////////////////

// Save all the jobs data associated w/ each workflow run in mongodb
databaseController.saveJobs = async (req, res, next) => {
  // Grab jobs data array passed from prior middleware
  const jobsData = res.locals.jobsData;
  if (!jobsData) {
    console.log(`* No new jobs to save...`); // CL*
    return next();
  } else {
    console.log('* Saving all the jobs data associated w/ each workflow run to mongodb...'); // CL*

    // Grab owner and repo from the request
    const { owner, repo } = req.query;
    // const owner = 'ptri-13-cat-snake'; // HARDCODE
    // const repo = 'unit-12-testing-gha'; // HARDCODE
    console.log('  - Owner pulled from request object: ', owner);
    console.log('  - Repo pulled from request object: ', repo);

    // console.log('  - Jobs data pulled from res.locals: ', jobsData); // CL*

    // Grab Username from cookies
    const username = req.cookies.username;
    console.log('  - Username read from cookies: ', username); // CL*

    // Iterate through jobsData and save each job obj to mongodb
    // NOTE: jobsData is an array of subarrays, where each subarray represents one workflow run.  Each workflow run subarray contains 1+ job objs (depending on how many jobs you have defined for the workflow)
    try {
      // create a bulkOperations array that will store all of the new jobs
      const bulkOperations = [];
      //iterare through the runs
      for (const runArr of jobsData) {
        //iterare through the jobs for each run
        for (const jobObj of runArr) {
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

          const started_at_ms = new Date(started_at);
          const completed_at_ms = new Date(completed_at);

          stepsWithCalc = steps.map(step => {
            const stepWithCalc = { ...step };
            const step_started_at_ms = new Date(step.started_at);
            const step_completed_at_ms = new Date(step.completed_at);
            stepWithCalc.step_completion_time = step_completed_at_ms - step_started_at_ms;
            return stepWithCalc;
          });

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
            job_completion_time_ms: completed_at_ms - started_at_ms,
            name: name,
            steps: stepsWithCalc,
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

          // Add update operation to bulk operations array
          bulkOperations.push({
            updateOne: {
              filter: { username: username },
              update: { $addToSet: { runs: runData } },
            },
          });
        }
      }

      // Execute bulk write operations
      await User.bulkWrite(bulkOperations);

      console.log('  - User runs array updated!');
      return next();
    } catch (error) {
      console.error('Error saving jobs data:', error);
      // Handle error appropriately
      next(error);
    }
  }
};

databaseController.findRuns = async (req, res, next) => {
  console.log(`* Fetching existing runs in database...`); // CL*
  try {
    const { owner, repo } = req.query;
    // Query the database to check if the username has a runs entry with any of the run IDs
    const existingRuns = await User.find({
      username: req.cookies.username,
      runs: {
        $elemMatch: {
          repo_owner: owner,
          repo: repo,
        },
      },
    });
    console.log(` - Sent existing runs to frontend.`);
    console.log(`existingRuns:${existingRuns}`);
    // Update res.locals.runIds with unique run IDs
    res.locals.existingRuns = existingRuns;
    return next();
  } catch (error) {
    console.error('Error finding runs:', error);
  }
};
//

databaseController.saveUsername = async (req, res, next) => {
  console.log(`* saving username?...`); // CL*
  try {
    console.log('view this: ', req.body);
    const { username } = req.body; // Retrieve data from request body
    res.locals.username = { username }; // Store data in res.locals
    return next();
  } catch (error) {
    console.error('Error saving username or repo:', error);
  }
};
///////////////////////////////////////////////////////////////////////////////////////////////

module.exports = databaseController;
