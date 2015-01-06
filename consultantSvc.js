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


function createMoodForConsultant(email, mood, clientCode, callback) {
  //Example Create
  //'CREATE (:Consultant {firstName:"Dave", lastName:"Carroll", phone:"0400555666", email:"dave.carr@smsmt.com", employeeId:"007"});'
  // Example Relationship
  // 'match (c:Consultant),(e:Engagement)',
  //'where c.employeeId = "007" AND e.name="Contact Centre Optimisiation"',
  // 'create (c)-[:engagedOn]->(e);'
  var query = [
    'MATCH (mo:Mood {name: {consultantMood}}), (cons:Consultant{email: {emailAddress}}), (client:Client{clientCode: {clientCode}})',
    'MERGE (day:Day {day: toInt({day}), month: toInt({month}), year:toInt({year})})',
    'MERGE (month:Month {month: toInt({month}), year: toInt({year})})',
    'MERGE (year:Year {year: toInt({year})})',
    'MERGE (cal:Calendar {name: "root"})',
    'MERGE (day)-[:AT]-(month)',
    'MERGE (month)-[:AT]-(year)',
    'MERGE (year)-[:AT]-(cal)',
    'CREATE (senti:Sentiment{timeofday:"06:00:00 PM"})-[:AT]->(day)',
    'CREATE (senti)-[:EMOTION]->(mo)',
    'CREATE (senti)-[:TOWARDS]->(client)',
    'CREATE (cons)-[:FELT]->(senti);'
  ].join('\n');

  console.log(query);

  var date = new Date();
  var params = {
    emailAddress: email,
    consultantMood: mood,
    clientCode: clientCode,
    day: date.getDate(),
    month: date.getMonth()+1,
    year: date.getFullYear()
  };

  console.log(params);

  db.query(query, params, function (err, results) {
    if (err) {
      throw err;
    }
    var clients = results.map(function (result) {
      console.log(result);
      return result;
    });
    callback();
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
  var query = [
    'MATCH (mood: `Mood`)<--(senti: `Sentiment`)<--(cons: `Consultant`{email:{emailAddress}}), (senti)-->(client: `Client`), (senti)-->(day: `Day`)-->(month:`Month`)-->(year: `Year`)',
    'RETURN mood, senti, cons, client, day, month, year'
  ].join('\n');

  var params = {
    emailAddress: email
  };

  db.query(query, params, function (err, results) {
    if (err) {
      throw err;
    }
    var moods = results.map(function (result) {
      console.log(result);
      var data = {
        mood: result.mood.data,
        sentiment: result.senti.data,
        consultant: result.cons.data,
        client: result.client.data,
        day: result.day.data,
        month: result.month.data,
        year: result.year.data
      }
      return data;
    });

    callback(moods);
  });
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

  var email = req.params.email;
  var mood = req.body.mood;
  var clientCode = req.body.client;
  createMoodForConsultant(email, mood, clientCode, function() {
    res.status(200);
    res.json({
      success: true
    });

    next();
  });
};