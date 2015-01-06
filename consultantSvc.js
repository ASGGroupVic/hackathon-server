'use strict';
var consultantRepo = require('./consultantRepository.js');

function getClientsOfConsultant(req, res, next) {
  var email = req.params.email;
  console.log("Consultant-clients: " + email);
  consultantRepo.getConsultantClients(email, function (consultant) {
    res.send(consultant);
    next();
  });
}

function getConsultant(req, res, next) {
  var email = req.params.email;
  console.log("Consultant: " + email);

  consultantRepo.getConsultant(email, function (consultant) {
    res.send(consultant);
    next();
  });
}

/*jslint unparam: true*/
function getConsultants(req, res, next) {
  consultantRepo.getConsultants(function (consultants) {
    res.send(consultants);
    next();
  });
}

/*jslint unparam: false*/
function getMoods(req, res, next) {
  var email = req.params.email;
  console.log("Consultant: " + email);

  consultantRepo.getConsultantMoods(email, function (moods) {
    res.send(moods);
    next();
  });
}

function getSentiments(req, res, next) {
  var email = req.params.email;
  console.log("Consultant: " + email);

  consultantRepo.getConsultantSentiments(email, function (sentiments) {
    res.send(sentiments);
    next();
  });
}

function postMood(req, res, next) {
  var email = req.params.email;
  var mood = req.body.mood;
  var clientCode = req.body.client;
  var notes = req.body.notes;
  var tags = req.body.tags;
  console.log("in postMood: email: " + email + "mood: " + mood + "clientCode: " + clientCode + "notes: " + notes + "tags: " + tags);
  consultantRepo.createMoodForConsultant(email, mood, clientCode, notes, tags, function () {
    res.status(200);
    res.json({
      success: true
    });

    next();
  });
}

function searchClient(req, res, next) {
  var search = req.params.search;
  console.log('Consultant Search: ' + search);

  consultantRepo.searchConsultants(search, function (clients) {
    res.send(clients);
    next();
  });
}

function getLast5Moods(req, res, next) {
  var email = req.params.email;
  console.log("Consultant: " + email);

  consultantRepo.getLast5ConsultantMoods(email, function (moods) {
    res.send(moods);
    next();
  });
}

module.exports = {
  getClientsOfConsultant: getClientsOfConsultant,
  getConsultant: getConsultant,
  getConsultants: getConsultants,
  getMoods: getMoods,
  getSentiments: getSentiments,
  postMood: postMood,
  searchClient: searchClient,
  getLast5Moods: getLast5Moods
};
