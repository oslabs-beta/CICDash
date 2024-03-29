const mongoose = require('mongoose');
const { Schema } = mongoose;

//nested schemas to arrange by propeties. needs to be in reverse order so the schema can be referenced by the following schema.

const stepSchema = new Schema({
  step_name: { type: String, required: true },
  status: { type: String, required: true },
  conclusion: { type: String, required: true },
  number: { type: Number, required: true },
  created_at: { type: Date, required: true },
  started_at: { type: Date, required: true },
  completed_at: { type: Date, required: true },
});

const metricSchema = new Schema({
  head_branch: { type: String, required: true },
  status: { type: String, required: true },
  conclusion: { type: String, required: true },
  created_at: { type: Date, required: true },
  started_at: { type: Date, required: true },
  completed_at: { type: Date, required: true },
  steps: [stepSchema],
});

const jobSchema = new Schema({
  job_id: { type: String, required: true },
  metrics: [metricSchema],
});

const workflowSchema = new Schema({
  workflow: { type: String, required: true },
  jobs: [jobSchema],
});

const repoSchema = new Schema({
  repo: { type: String, required: true },
  workflows: [workflowSchema],
});

const ownerSchema = new Schema({
  owner: { type: String, required: true },
  repos: [repoSchema],
});

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  refresh_token: { type: String, required: true },
  owner: [ownerSchema],
});

const User = mongoose.model('user', userSchema);

module.exports = User;
