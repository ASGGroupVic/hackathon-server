'use strict';
var restify = require('restify');
var consultantSvc = require('./consultantSvc.js');
var clientSvc = require('./clientSvc.js');
var ping = require('./ping.js');

var server = restify.createServer();
//setup cors
restify.CORS.ALLOW_HEADERS.push('accept');
restify.CORS.ALLOW_HEADERS.push('sid');
restify.CORS.ALLOW_HEADERS.push('lang');
restify.CORS.ALLOW_HEADERS.push('origin');
restify.CORS.ALLOW_HEADERS.push('withcredentials');
restify.CORS.ALLOW_HEADERS.push('x-requested-with');
server.use(restify.CORS());
    
server.use(restify.bodyParser());
server.get('/v1/ping/', ping.getPing);

server.get('/v1/consultant/:email', consultantSvc.getConsultant);
server.get('/v1/consultant/:email/clients', consultantSvc.getClientsOfConsultant);
server.post('/v1/consultant/:email/mood', consultantSvc.postMood);

server.get('/v1/client/:code/mood', clientSvc.getMood);

server.listen(8080, function () {
  console.log('%s listening at %s', server.name, server.url);
});