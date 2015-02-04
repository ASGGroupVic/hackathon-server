/*jslint node: true */
'use strict';

var express = require('express');
var clientService = require('./services/clientService');

var router = express.Router();

router.route('/')
  .get(clientService.getClients);

module.exports = router;