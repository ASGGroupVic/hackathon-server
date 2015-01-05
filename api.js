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
    },
    {
      name: 'telstra'
    }
  ]
},
{
  name: 'david.carroll',
  email: 'david.carroll@smsmt.com',
  clients: [
    {
      name: 'eNett'
    },
    {
      name: 'grv'
    }

  ]
},
{
  name: 'anthony.pasquale',
  email: 'anthony.pasquale@smsmt.com',
  clients: [
    {
      name: 'smsbench'
    },
    {
      name: 'anz'
    }

  ]
}
];

function getConsultant(req, res, next) {
    console.log("Consultant: " + req.params.id);
    var consultant = {}
    for (var i = consultants.length - 1; i >= 0; i--) {
      if(consultants[i].name == req.params.id)
      {
        consultant = consultants[i];
      }
    };
    res.send(consultant);
    next();
}

var server = restify.createServer();

server.get('/ping/', getPing);
server.get('/consultant/:id', getConsultant);

server.listen(8080, function() {
    console.log('%s listening at %s', server.name, server.url);
});