const mongoose = require('mongoose');

require('dotenv').config();

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  access_token: { type: String, required: true },
  refresh_token: { type: String, required: true },
  // repo: { type: String, required: true },
  // workflow_id: { type: String, required: true },
  // email: { type: String, required: true },
  jobs: { type: Array },
});

const User = mongoose.model('user', userSchema);

module.exports = User;
