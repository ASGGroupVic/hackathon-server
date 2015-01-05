'use strict';
var restify = require('restify');
var consultantSvc = require('./consultantSvc.js');

function getPing(req, res, next) {
  res.send('pong');
  next();
}

function postMood(req, res, next) {
  console.log(req.body.mood);
  res.status(200);
  res.json({
    type: true
  });

  next();
}

var server = restify.createServer();

server.use(restify.bodyParser());
server.get('/v1/ping/', getPing);

server.get('/v1/consultant/:email', consultantSvc.getConsultant);
server.get('/v1/consultant/:email/clients', consultantSvc.getClientsOfConsultant);
server.post('/v1/consultant/:email/mood', postMood);

server.listen(8080, function () {
  console.log('%s listening at %s', server.name, server.url);
});