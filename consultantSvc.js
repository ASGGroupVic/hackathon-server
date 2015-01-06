'use strict';
/*global db*/

function getConsultantClientsFromRepo(email, callback) {
  var query = [
    'MATCH (co:Consultant {email:{emailAddress}})-->(en:Engagement)-->(cl:Client)',
    'RETURN cl;'
  ].join('\n');

  var params = {
    emailAddress: email
  };

  db.query(query, params, function (err, results) {
    if (err) {
      throw err;
    }

    var clients = results.map(function (result) {
      console.log(result.cl.data);
      return result.cl.data;
    });

    callback(clients);
  });
}

exports.getClientsOfConsultant = function (req, res, next) {
  var email = req.params.email;
  console.log("Consultant: " + email);
  getConsultantClientsFromRepo(email, function (consultant) {
    res.send(consultant);
    next();
  });
};


function createMoodForConsultant(email, callback) {
  //Example Create
  //'CREATE (:Consultant {firstName:"Dave", lastName:"Carroll", phone:"0400555666", email:"dave.carr@smsmt.com", employeeId:"007"});'
  // Example Relationship
  // 'match (c:Consultant),(e:Engagement)',
  //'where c.employeeId = "007" AND e.name="Contact Centre Optimisiation"',
  // 'create (c)-[:engagedOn]->(e);'
  var query = [
    'MATCH (mo:Mood {name: "indifferent"}), (cons:Consultant{email: "dave.carr@smsmt.com"}), (client:Client{clientCode: "123"})',
    'MERGE (day:Day {day: toInt("6"), month: toInt("1"), year:toInt("2015")})',
    'MERGE (month:Month {month: toInt("1"), year: toInt("2015")})',
    'MERGE (year:Year {year: toInt("2015")})',
    'MERGE (cal:Calendar {name: "root"})',
    'MERGE (day)-[:AT]-(month)',
    'MERGE (month)-[:AT]-(year)',
    'MERGE (year)-[:AT]-(cal)',
    'CREATE (senti:Sentiment{timeofday:"01:00:00 PM"})-[:AT]->(day)',
    'CREATE (senti)-[:EMOTION]->(mo)',
    'CREATE (senti)-[:TOWARDS]->(client)',
    'CREATE (cons)-[:FELT]->(senti);'
  ].join('\n');

  console.log(query);

  var params = {
    emailAddress: email
  };

  db.query(query, null, function (err, results) {
    if (err) {
      throw err;
    }
    var clients = results.map(function (result) {
      console.log(result);
      return result;
    });
    callback(clients);
  });
}

exports.getClientsOfConsultant = function (req, res, next) {
  var email = req.params.email;
  console.log("Consultant-clients: " + email);
  getConsultantClientsFromRepo(email, function (consultant) {
    res.send(consultant);
    next();
  });
};

function getConsultantMoodsFromRepo(email, callback) {
  console.log("Getting moods for " + email);
  var moods = [
    'happy', 'sad', 'sad', 'angry', 'indifferent'
  ];
  callback(moods);
}

function getConsultantFromRepo(email, callback) {
  var query = [
    'MATCH (n:`Consultant` {email:{emailAddress}})',
    'RETURN n'
  ].join('\n');

  var params = {
    emailAddress: email
  };

  db.query(query, params, function (err, results) {
    if (err) {
      throw err;
    }
    var consultant = results.map(function (result) {
      console.log(result.n.data);
      return result.n.data;
    });
    callback(consultant);
  });
}

exports.getConsultant = function (req, res, next) {
  var email = req.params.email;
  console.log("Consultant: " + email);

  getConsultantFromRepo(email, function (consultant) {
    res.send(consultant);
    next();
  });
};

exports.getMoods = function (req, res, next) {
  var email = req.params.email;
  console.log("Consultant: " + email);

  getConsultantMoodsFromRepo(email, function (moods) {
    res.send(moods);
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