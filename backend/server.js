// Modules
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const app = express();

// Protected variables
const PORT = process.env.SERV_PORT;
const APP_ID = process.env.APP_ID;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const MONGO_URI = process.env.MONGO_URI;
console.log(
  `* Reading protected variables \n  - PORT: ${PORT}\n  - APP_ID: ${APP_ID}\n  - PRIVATE_KEY: ${PRIVATE_KEY}\n  - MONGO_URI: ${MONGO_URI}`,
); // CL*

// Route files
const authRoutes = require('./routes/authRoutes.js');
const githubRoutes = require('./routes/githubRoutes.js');

// Handle parsing the JSON body of every req and parsing the cookies of every req
app.use(cors());
app.use(express.json());
app.use(cookieParser());

// Configure CORS to allow requests specifically from 'http://localhost:8080' and allow credentials
// app.use(
//   cors({
//     origin: 'http://localhost:8080',
//     credentials: true, // Enable credentials (cookies, authorization headers) to be sent cross-domain
//   }),
// );

// Connect to Mongo DB
mongoose
  .connect(MONGO_URI)
  .then(() => console.log('* Connected to Mongo DB')) // CL*
  .catch(err => console.log(err));

// Route handlers
// app.use('/', express.static(path.resolve(__dirname, '../build')));
app.use('/auth', authRoutes);
app.use('/api/github', githubRoutes);

app.use(express.static(path.join(__dirname, '../build')));
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../build', 'index.html'));
});

// Global error handler
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Error handler caught unknown middleware error',
    status: 500,
    message: { err: `An error occurred ${err}` },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(`> ${errorObj.log} -> ${errorObj.message.err}`); // CL*
  return res.status(errorObj.status).json(errorObj.message);
});

// Listen for incoming requests
app.listen(PORT, () => {
  console.log(`* Server listening @ http://localhost:${PORT}`); // CL*
});
