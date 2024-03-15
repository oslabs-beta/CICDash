require('dotenv').config();
const axios = require('axios');
const User = require('../models/userModel');

// Protected variables
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
// const app = new App({
//   appId: process.env.CLIENT_ID,
//   privateKey: process.env.CLIENT_SECRET,
// });

const userController = {};

userController.registerUser = async (req, res, next) => {
  console.log('* Registering a new user to the database...'); // CL*

  // Grab user data from res.locals
  const username = res.locals.apiResponse_data.login;
  const access_token = res.locals.authResponse_data.access_token;
  const refresh_token = res.locals.authResponse_data.refresh_token;

  console.log('access_token from register user: ', access_token);

  // Handle existing username
  const exists = await User.findOne({ username: username });
  if (exists) {
    console.log('  - User object already exists in database, update tokens'); // CL*\

    const updatedUser = await User.findOneAndUpdate(
      { username: username },
      {
        access_token: access_token,
        refresh_token: refresh_token,
      },
      { new: true },
    );
    console.log(' - updatedUser: ', updatedUser);
    return next();
  }

  // Create new user object in database
  const user = await User.create({
    username,
    access_token,
    refresh_token,
    jobs: [],
  });
  console.log('  - New user object added to database!');

  res.locals.user = user;
  return next();
};

// userController.getToken = async (req, res, next) => {
//   console.log('* Getting access token from database...'); // CL*

//   // Grab user data from res.locals
//   // const username = res.locals.apiResponse_data.login;
//   // const access_token = res.locals.authResponse_data.access_token;
//   // const refresh_token = res.locals.authResponse_data.refresh_token;

//   // Handle existing username
//   const access_token = await User.findOne({ username: username });
//   if (exists) {
//     return next();
//   }

//   res.locals.access_token = access_token;
//   return next();
// };

// userController.addJobs = async (req, res, next) => {
//   const {user} = res.params
//   const user = await User.findOne({email})
//     if(exists) {
//       throw Error('Email already in use')
//     }

//   const user = await User.create(
//     username: ,
//     // password: { type: String, required: true },
//     firstName: ,
//     lastName: ,
//     email: ,
//     jobs: []
//   )

//   res.locals.user = user;
//   return next();
// }

module.exports = userController;
