'use strict';
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
}, {
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
}, {
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
}];

function getConsultantFromRepo(email) {
  var consultant = {};
  var i = consultants.length - 1;
  for (i; i >= 0; i--) {
    if (consultants[i].email === email) {
      consultant = consultants[i];
    }
  }
  return consultant;
}

exports.getClientsOfConsultant = function (req, res, next) {
  var email = req.params.email;
  console.log("Consultant: " + email);
  var consultant = getConsultantFromRepo(email);
  res.send(consultant.clients);
  next();
};

exports.getConsultant = function (req, res, next) {
  var email = req.params.email;
  console.log("Consultant: " + email);
  var consultant = getConsultantFromRepo(email);
  res.send(consultant);
  next();
};