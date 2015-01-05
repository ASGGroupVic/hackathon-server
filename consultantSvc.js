'use strict';


function getConsultantFromRepo(email, callback) {
  var consultant = {};
 
  var neo4j = require('neo4j');
  var db = new neo4j.GraphDatabase('http://hackathondata-env.elasticbeanstalk.com');

  var query = [
    'MATCH (n:`Consultant` {email:{emailAddress}})',
    'RETURN n'
  ].join('\n');
  
  var params = {
    emailAddress: email
  };
  
  db.query(query, params, function (err, results) {
    if (err) throw err;
    var consultant = results.map(function (result) {
      console.log(result["n"]["data"]);
      return result["n"]["data"];
    });
    callback(consultant);
  });
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
  getConsultantFromRepo(email, function(consultant) {
    console.log("horay" + consultant);
 
    res.send(consultant);
    next();
  });
};

exports.postMood = function (req, res, next) {
  console.log(req.body.mood);
  res.status(200);
  res.json({
    type: true
  });

  next();
};