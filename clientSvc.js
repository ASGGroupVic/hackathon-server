'use strict';

var clientRepo = require('./clientRepository.js');

function getMood(req, res, next) {
  var code = req.params.code;
  console.log('Client: ' + code);

  clientRepo.getMoodForClient(code, function (mood) {
    console.log('Hooray! ' + mood);

    res.send(mood);
    next();
  });
}

function getSentiments(req, res, next) {
  var code = req.params.code;
  console.log('Client: ' + code);

  clientRepo.getSentimentsForClient(code, function (sentiments) {
    res.send(sentiments);
    next();
  });
}

function getClient(req, res, next) {
  var clientCode = req.params.code;
  console.log("Client: " + clientCode);

  clientRepo.getClient(clientCode, function (client) {
    res.send(client);
    next();
  });
}

/*jslint unparam: true*/
function getClients(req, res, next) {
  console.log("Get Clients");

  clientRepo.getClients(function (clients) {
    res.send(clients);
    next();
  });
}
/*jslint unparam: false*/

function getConsultantsbyClientCode(req, res, next) {
  var code = req.params.code;
  console.log('Client: ' + code);

  clientRepo.getConsultantforClients(code, function (consultants) {
    res.send(consultants);
    next();
  });
}

function searchClient(req, res, next) {
  var search = req.params.search;
  console.log('Client Search: ' + search);

  clientRepo.searchClients(search, function (clients) {
    res.send(clients);
    next();
  });
}

function getEngagementsbyClientCode(req, res, next) {
  var code = req.params.code;
  console.log('Client: ' + code);

  clientRepo.getEngagementsforClient(code, function (engagements) {
    res.send(engagements);
    next();
  });
}

module.exports = {
  getMood: getMood,
  getSentiments: getSentiments,
  getClient: getClient,
  getClients: getClients,
  getConsultantsbyClientCode: getConsultantsbyClientCode,
  searchClient: searchClient,
  getEngagementsbyClientCode: getEngagementsbyClientCode
};