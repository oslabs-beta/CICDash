require('dotenv').config();
const express = require("express");
const app = express();
const path = require('path');
const bodyParser = require('body-parser');

const PORT = process.env.SERV_PORT

app.listen(PORT, () => {
  console.log(`Server listening on PORT ${PORT}`);
});