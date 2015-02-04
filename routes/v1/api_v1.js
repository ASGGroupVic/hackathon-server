var express = require('express');

var router = express.Router();

var ping = require('./ping.js');
router.use('/ping', ping);

var consultant = require('./consultant.js');
router.use('/consultant', consultant);

var client = require('./client.js');
router.use('/client', client);

module.exports = router;