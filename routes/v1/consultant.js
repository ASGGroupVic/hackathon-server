'use strict';
var express = require('express');
var consultantService = require('./services/consultantService');

var router = express.Router();

router.route('/')
  .get(consultantService.getConsultants);

router.route('/:email')
  .get(consultantService.getConsultantByEmail);

router.route('/:email/clients')
  .get(consultantService.getClientsOfConsultant);

router.route('/:email/mood')
  .get(consultantService.getMoods);

// server.post('/v1/consultant/:email/mood', consultantSvc.postMood);
// server.get('/v1/consultant/:email/mood', consultantSvc.getMoods);
// server.get('/v1/consultant/:email/sentiments', consultantSvc.getSentiments);
// server.get('/v1/consultant/:email/last5mood', consultantSvc.getLast5Moods);
// server.get('/v1/consultant/search/:search', consultantSvc.searchClient);

module.exports = router;