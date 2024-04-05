const mongoose = require('mongoose');
const { Schema } = mongoose;

//nested schemas to arrange by propeties. needs to be in reverse order so the schema can be referenced by the following schema.

// const stepSchema = new Schema({
//   step_name: { type: String, required: true },
//   status: { type: String, required: true },
//   conclusion: { type: String, required: true },
//   number: { type: Number, required: true },
//   created_at: { type: Date, required: true },
//   started_at: { type: Date, required: true },
//   completed_at: { type: Date, required: true },
// });

// const metricSchema = new Schema({
//   head_branch: { type: String, required: true },
//   status: { type: String, required: true },
//   conclusion: { type: String, required: true },
//   created_at: { type: Date, required: true },
//   started_at: { type: Date, required: true },
//   completed_at: { type: Date, required: true },
//   steps: [stepSchema],
// });

// const jobSchema = new Schema({
//   job_id: { type: String, required: true },
//   metrics: [metricSchema],
// });

// const workflowSchema = new Schema({
//   workflow: { type: String, required: true },
//   jobs: [jobSchema],
// });

// const repoSchema = new Schema({
//   repo: { type: String, required: true },
//   workflows: [workflowSchema],
// });

// const ownerSchema = new Schema({
//   owner: { type: String, required: true },
//   repos: [repoSchema],
// });

const runSchema = new Schema({
  repo_owner: { type: String, required: true },
  repo: { type: String, required: true },

  id: { type: Number, required: true },
  run_id: { type: Number, required: true },
  workflow_name: { type: String, required: true },
  head_branch: { type: String, required: true },
  run_url: { type: String, required: true },
  run_attempt: { type: Number, required: true },
  node_id: { type: String, required: true },
  head_sha: { type: String, required: true },
  url: { type: String, required: true },
  html_url: { type: String, required: true },
  status: { type: String, required: true },
  conclusion: { type: String, required: true },
  created_at: { type: Date, required: true }, // CHECK IF OKAY
  started_at: { type: Date, required: true },
  completed_at: { type: Date, required: true },
  name: { type: String, required: true },
  steps: { type: Array, required: true },
  check_run_url: { type: String, required: true },
  labels: { type: Array, required: true },
  runner_id: { type: Number, required: true },
  runner_name: { type: String, required: true },
  runner_group_id: { type: Number, required: true },
  runner_group_name: { type: String, required: true },
});

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  refresh_token: { type: String, required: true },
  runs: [runSchema],
});

const User = mongoose.model('user', userSchema);
const Run = mongoose.model('run', runSchema);

module.exports = { User, Run };

// {
//   user: 'arthurtcheung'
//   refresh_token: 'asd9f879ewr83294ioeasdf3234dde12'
//   data: [
//       {owner: XXX
//       repos:
//         [
//           {repo: YYYY
//           workflows:
// [
//              {workflow: CI
//              jobs: [
//                {job: 123456
//                metrics: {

//         }
//       }

//   },
//   {repo: 2,

//   }
// }}
