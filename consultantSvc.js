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


function createMoodForConsultant(email, mood, clientCode, notes, tags, callback) {
  var query = [
    'MATCH (cons:Consultant{email: {emailAddress}}), (client:Client{clientCode: {clientCode}})',
    'MERGE (mo:Mood {name: {consultantMood}})',
    'MERGE (day:Day {day: toInt({day}), month: toInt({month}), year:toInt({year})})',
    'MERGE (month:Month {month: toInt({month}), year: toInt({year})})',
    'MERGE (year:Year {year: toInt({year})})',
    'MERGE (cal:Calendar {name: "root"})',
    'MERGE (day)-[:AT]-(month)',
    'MERGE (month)-[:AT]-(year)',
    'MERGE (year)-[:AT]-(cal)',
    'CREATE (senti:Sentiment{timeofday:{timeOfDay}})-[:AT]->(day)',
    'CREATE (senti)-[:EMOTION]->(mo)',
    'CREATE (senti)-[:TOWARDS]->(client)',
    'CREATE (cons)-[:FELT]->(senti)',
    'CREATE (obs:Observation{timeofday: {timeOfDay}, text: {observation}})-[:AT]->(day)',
    'CREATE (cons)-[:MADE]->(obs)',
    'CREATE (obs)-[:TOWARDS]->(client)',
    'FOREACH(t in split({tags}, ",") |',
    'MERGE (newTag:Tag{tag:t})',
    'CREATE (obs)-[:TAGGED]->(newTag));'
  ].join('\n');

  console.log(query);

  var now = new Date();
  var now_utc = new Date(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(),  now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds());
  var params = {
    emailAddress: email,
    consultantMood: mood,
    clientCode: clientCode,
    day: now_utc.getDate(),
    month: now_utc.getMonth() + 1,
    year: now_utc.getFullYear(),
    timeOfDay: now_utc.toLocaleTimeString(),
    observation: notes,
    tags: tags
  };

  console.log(params);

  db.query(query, params, function (err, results) {
    if (err) {
      throw err;
    }
    results.map(function (result) {
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
    'MATCH (mood: Mood)<--(senti: Sentiment)-[:AT*2]->(month:Month)-->(year: Year), (senti)--(co:Consultant{email:{emailAddress}})',
    'RETURN  year.year as year, month.month as month,mood.name as mood, count(*) as count order by year.year, month.month'
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
      return result;
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

function getConsultantsFromRepo(callback) {
  var query = [
    'MATCH (n:`Consultant`)',
    'RETURN n'
  ].join('\n');

  db.query(query, null, function (err, results) {
    if (err) {
      throw err;
    }
    var consultant = results.map(function (result) {
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
/*jslint unparam: true*/
exports.getConsultants = function (req, res, next) {
  getConsultantsFromRepo(function (consultants) {
    res.send(consultants);
    next();
  });
};
/*jslint unparam: false*/
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
  var notes = req.body.notes;
  var tags = req.body.tags;
  createMoodForConsultant(email, mood, clientCode, notes, tags, function () {
    res.status(200);
    res.json({
      success: true
    });

    next();
  });
};


function searchConsultantsFromRepo(search, callback) {
  var query = [
    'MATCH (co:`Consultant` {firstName:{searchString}})',
    'RETURN co'
  ].join('\n');

  var params = {
    searchString: search
  };


  db.query(query, params, function (err, results) {
    if (err) {
      throw err;
    }
    var clients = results.map(function (result) {
      console.log(result.co.data);
      return result.co.data;
    });
    callback(clients);
  });
}

exports.searchClient = function (req, res, next) {
  var search = req.params.search;
  console.log('Consultant Search: ' + search);

  searchConsultantsFromRepo(search, function (clients) {
    res.send(clients);
    next();
  });
};