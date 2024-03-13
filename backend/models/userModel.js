// const mongoose = require('mongoose');

// const bcrypt = require('bcryptjs');

// require('dotenv').config();

// const Schema = mongoose.Schema;

// const userSchema = new Schema({
//   username: { type: String, required: true, unique: true },
//   // password: { type: String, required: true },
//   firstName: { type: String, required: true },
//   lastName: { type: String, required: true },
//   email: { type: String, required: true },
//   jobs: { type: Array },
// });

//Hashing password
// userSchema.pre('save', async function (next) {
//   try {
//     const salt = await bcrypt.genSalt(10);

//     const hashedPassword = await bcrypt.hash(this.password, salt);

//     this.password = hashedPassword;
//     next();
//   } catch (error) {
//     next(error);
//   }
// });

const User = mongoose.model('user', userSchema);

module.exports = User;
