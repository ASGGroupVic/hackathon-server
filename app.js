var express = require('express');
var app = express();

var api_v1 = require('./routes/v1/api_v1.js');
app.use('/v1', api_v1);

module.exports = app;