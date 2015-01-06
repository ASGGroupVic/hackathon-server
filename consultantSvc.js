'use strict';
/*global db*/

function getConsultantClientsFromRepo(email, callback) {
  var query = [
    'MATCH (co:Consultant {email:{emailAddress}})-->(en:Engagement)-->(cl:Client)',
    'RETURN cl.clientCode as clientCode, cl.contact as contact, cl.name as name, collect(en.name) as engagements;'
  ].join('\n');

  var params = {
    emailAddress: email
  };

  db.query(query, params, function (err, results) {
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
    'CREATE (senti:Sentiment{timeofday:{timeOfDay}, comment: {comment}})-[:AT]->(day)',
    'CREATE (senti)-[:EMOTION]->(mo)',
    'CREATE (senti)-[:TOWARDS]->(client)',
    'CREATE (cons)-[:FELT]->(senti)',
    'FOREACH(t in split({tags}, ",") |',
    'MERGE (newTag:Tag{tag:t})',
    'CREATE (senti)-[:TAGGED]->(newTag));'
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
    comment: notes,
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

function getConsultantSentimentsFromRepo(email, callback) {
  var query = [
    'MATCH (co:`Consultant` {email: {emailAddress}})-->(senti:`Sentiment`)-->(day:`Day`)-->(month:`Month`)-->(year: `Year`), (senti)--(cl:`Client`), (senti)--(mood:`Mood`)',
    'OPTIONAL MATCH (senti)-->(tag:`Tag`)',
    'RETURN senti.timeofday as timeofday, day.day as day, day.month as month, day.year as year, mood.name as mood, senti.comment as comment, cl.name as clientName, collect(tag.tag) as tags ORDER BY day.year, day.month, day.day, senti.timeofday;'
  ].join('\n');

  var params = {
    emailAddress: email
  };

  db.query(query, params, function (err, results) {
    if (err) {
      throw err;
    }
    var sentiments = results.map(function (result) {
      console.log(result);
      return result;
    });

    callback(sentiments);
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

exports.getSentiments = function (req, res, next) {
  var email = req.params.email;
  console.log("Consultant: " + email);

  getConsultantSentimentsFromRepo(email, function (sentiments) {
    res.send(sentiments);
    next();
  });
};

exports.postMood = function (req, res, next) {
  var email = req.params.email;
  var mood = req.body.mood;
  var clientCode = req.body.client;
  var notes = req.body.notes;
  var tags = req.body.tags;
  console.log("in postMood: email: " + email + "mood: " + mood + "clientCode: " + clientCode + "notes: " + notes + "tags: " + tags);
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
    'MATCH (co:Consultant)',
    'where co.firstName =~ "(?i).*' + search + '.*"',
    'or co.lastName =~ "(?i).*' + search + '.*"',
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

exports.getLast5Moods = function (req, res, next) {
  var email = req.params.email;
  console.log("Consultant: " + email);

  getLast5ConsultantMoodsFromRepo(email, function (moods) {
    res.send(moods);
    next();
  });
};

function getLast5ConsultantMoodsFromRepo(email, callback) {
  var query = [
    'MATCH (mood: Mood)<--(senti: Sentiment)-->(day:Day)-->(month:Month)-->(year: Year), (senti)--(co:Consultant{email:{emailAddress}})',
    'RETURN  year.year as year, month.month as month, day.day as day, mood.name as mood, count(*) as count order by year.year, month.month, day.day',
    'LIMIT 5'
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