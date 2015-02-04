/*jslint node: true */
'use strict';

var express = require('express');
var pingService = require('./services/pingService');

var router = express.Router();

router.route('/')
  .get(pingService.getPing);

module.exports = router;