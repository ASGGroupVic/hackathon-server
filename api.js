'use strict';
var restify = require('restify');

function getPing(req, res, next) {
    res.send('pong');
    next();
}

var consultants = [{
  name: 'test.consultant',
  email: 'test.consultant@smsmt.com',
  clients: [
    {
      name: 'TestClient'
    }
  ]
}];

function getClientsOfConsultant(req, res, next) {
  var email = req.params.email;
  console.log("Consultant: " + email);
  var consultant = getConsultantFromRepo(email)
  
  res.send(consultant.clients);
  next();
}

function getConsultant(req, res, next) {
  var email = req.params.email;
  console.log("Consultant: " + email);
  var consultant = getConsultantFromRepo(email)
  
  res.send(consultant);
  next();
}

function getConsultantFromRepo(email)
{
  var consultant = {};
  for (var i = consultants.length - 1; i >= 0; i--) {
    if(consultants[i].email == email)
    {
      consultant = consultants[i];
    }
  };
  return consultant;
}

function postMood(req, res, next)
{
  console.log(req.body.mood);
  res.status(200);
  res.json({
    type: true
  });
}

var server = restify.createServer();

server.use(restify.bodyParser());
server.get('/v1/ping/', getPing);

server.get('/v1/consultant/:email', getConsultant);
server.get('/v1/consultant/:email/clients', getClientsOfConsultant);
server.post('/v1/consultant/:email/mood', postMood);


server.listen(8080, function() {
    console.log('%s listening at %s', server.name, server.url);
});