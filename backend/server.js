require('dotenv').config();
const express = require('express');

const app = express();
const path = require('path');
const bodyParser = require('body-parser');

const PORT = process.env.SERV_PORT;
const APP_ID = process.env.APP_ID;
const PRIVATE_KEY = process.env.PRIVATE_KEY;

const authRoutes = require('./routes/authRoutes');


app.use(express.json());
app.use('/auth', authRoutes);




// global error handler
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Error handler caught unknown middleware error',
    status: 500,
    message: { err: `An error occurred ${err}` },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

app.listen(PORT, () => {
  console.log(`Server listening on PORT ${PORT}`);
});
