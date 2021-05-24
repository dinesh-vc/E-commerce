const express = require("express");
const dotenv = require('dotenv').config({
    path: "../.env"
});
const cors = require('cors')
const bodyParser = require('body-parser')
const environment = require('../enviornment');
const mongoose = require("./config/mongoose");
const routes = require("../src/app/routes/routes");
require("./config/mongoose");

const env = process.env.NODE_ENV;
const envconfig = environment[env];
const port = envconfig.port || 3000;
const app = express();
mongoose.connect(envconfig, env);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(cors())

app.use('/', routes);

app.listen(port, () => {
    console.log(`server running on ${port}`)
});