require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const app = express();
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');

const PORT = process.env.SERV_PORT;

//connect to Mongo DB
connectDB();

//allows cross origin resource sharing
app.use(cors());

//allows JSON data to be parsed
app.use(express.json());

app.listen(PORT, () => {
  console.log(`Server listening on PORT ${PORT}`);
});
