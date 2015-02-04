'use strict';
var express = require('express');
var consultantService = require('./services/consultantService');

var bodyParser = require('body-parser');
var urlencode = bodyParser.urlencoded({ extended: false });

var router = express.Router();

router.route('/')
  .get(consultantService.getConsultants);

router.route('/:email')
  .get(consultantService.getConsultantByEmail);

router.route('/:email/clients')
  .get(consultantService.getClientsOfConsultant);

router.route('/:email/mood')
  .get(consultantService.getMoods)
  .post(urlencode, consultantService.addMood);

router.route('/:email/sentiments')
  .get(consultantService.getSentiments)

router.route('/:email/last5mood')
  .get(consultantService.getLast5Moods)

router.route('/search/:search')
  .get(consultantService.searchClient)
  
module.exports = router;