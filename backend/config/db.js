const mongoose = require('mongoose');

const db = process.env.MONGO_URI;

mongoose.set('strictQuery', true, 'useNewUrlParser', true);

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(db);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;

