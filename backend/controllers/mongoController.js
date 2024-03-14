require('dotenv').config();
const axios = require('axios');
const User = require('../models/userModel')

// Protected variables
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
// const app = new App({
//   appId: process.env.CLIENT_ID,
//   privateKey: process.env.CLIENT_SECRET,
// });

const userController = {};

userController.createUser = async (req, res, next) => {
  const { username } = req.
  const exists = await User.findOne({username})
    if(exists) {
      throw Error('Email already in use')
    }

  const user = await User.create(
    username: ,
    access_token: ,
    refresh_token: ,
    jobs: []
  )

  res.locals.user = user;
  return next();
}

userController.addJobs = async (req, res, next) => {
  const {user} = res.params
  const user = await User.findOne({email})
    if(exists) {
      throw Error('Email already in use')
    }

  const user = await User.create(
    username: ,
    // password: { type: String, required: true },
    firstName: ,
    lastName: ,
    email: ,
    jobs: []
  )

  res.locals.user = user;
  return next();
}

module.exports = userController;
