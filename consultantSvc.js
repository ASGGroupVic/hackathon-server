'use strict';


function getConsultantClientsFromRepo(email, callback) {
  var consultant = {};

  var query = [
    'MATCH (co:Consultant {email:{emailAddress}})-->(en:Engagement)-->(cl:Client)',
    'RETURN cl;'
  ].join('\n');
  
  var params = {
    emailAddress: email
  };
  
  db.query(query, params, function (err, results) {
    if (err) throw err;
    var clients = results.map(function (result) {
      console.log(result["cl"]["data"]);
      return result["cl"]["data"];
    });
    callback(clients);
  });
}

exports.getClientsOfConsultant = function (req, res, next) {
  var email = req.params.email;
  console.log("Consultant: " + email);
  var clients = getConsultantClientsFromRepo(email, function(consultant) {
    res.send(consultant);
    next();
  });

};


function getConsultantFromRepo(email, callback) {
  var consultant = {};

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