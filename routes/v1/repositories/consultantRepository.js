'use strict';
/*global db*/

function getConsultantClients(email, callback) {
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

function getConsultantMoods(email, callback) {
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

function getConsultantSentiments(email, callback) {
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

function getConsultant(email, callback) {
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

function getConsultants(callback) {
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

function searchConsultants(search, callback) {
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

function getLast5ConsultantMoods(email, callback) {
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

module.exports = {
  getConsultantClients: getConsultantClients,
  createMoodForConsultant: createMoodForConsultant,
  getConsultantMoods: getConsultantMoods,
  getConsultantSentiments: getConsultantSentiments,
  getConsultant: getConsultant,
  getConsultants: getConsultants,
  searchConsultants: searchConsultants,
  getLast5ConsultantMoods: getLast5ConsultantMoods
};