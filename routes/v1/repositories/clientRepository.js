/*jslint node: true */
/*global db*/
'use strict';

function getMoodForClient(code, callback) {
  var query = [
    'MATCH (mood:Mood)<--(s: Sentiment)-->(c:Client{clientCode:{cCode}})',
    'RETURN mood.name as name, count(*) as count'
  ].join('\n');

  var params = {
    cCode : code
  };

  db.query(query, params, function (err, results) {
    if (err) {
      throw err;
    }
    var mood = results.map(function (result) {
      console.log(result);
      return result;
    });
    callback(mood);
  });
}

function getSentimentsForClient(clientId, callback) {
  var query = [
    'MATCH (co:`Consultant`)-->(senti:`Sentiment`)-->(day:`Day`)-->(month:`Month`)-->(year: `Year`), (senti)--(cl:`Client`{clientCode:{clientId}}), (senti)--(mood:`Mood`)',
    'OPTIONAL MATCH (senti)-->(tag:`Tag`)',
    'RETURN senti.timeofday as timeofday, day.day as day, day.month as month, day.year as year, mood.name as mood, senti.comment as comment, co.firstName as firstName, co.lastName as lastName, co.email as email, collect(tag.tag) as tags ORDER BY day.year, day.month, day.day, senti.timeofday;'
  ].join('\n');

  var params = {
    clientId: clientId
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

function getClient(clientCode, callback) {
  var query = [
    'MATCH (n:`Client` {clientCode:{cCode}})',
    'RETURN n'
  ].join('\n');

  var params = {
    cCode: clientCode
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

function getClients(callback) {
  var query = [
    'MATCH (n:`Client`)',
    'RETURN n'
  ].join('\n');

  db.query(query, null, function (err, results) {
    if (err) {
      throw err;
    }
    var clients = results.map(function (result) {
      console.log(result.n.data);
      return result.n.data;
    });
    callback(clients);
  });
}

function getConsultantforClients(clientCode, callback) {
  var query = [
    'MATCH (co:Consultant)-->(en:Engagement)-->(cl:Client {clientCode:{cCode}})',
    'RETURN en.name as engagementName, en.completed as completed, co.phone as phone, co.employeeId as employeeId, co.firstName as firstname, co.lastName as lastName, co.email as email'
  ].join('\n');

  var params = {
    cCode: clientCode
  };

  db.query(query, params, function (err, results) {
    if (err) {
      throw err;
    }
    var consultants = results.map(function (result) {
      console.log(result);
      return result;
    });
    callback(consultants);
  });
}

function searchClients(search, callback) {
  var query = [
    'MATCH (cl:Client)',
    'where cl.name =~ "(?i).*' + search + '.*"',
    'RETURN cl;'
  ].join('\n');

  db.query(query, null, function (err, results) {
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

function getEngagementsforClient(clientCode, callback) {
  var query = [
    'MATCH (en:Engagement)-->(cl:Client {clientCode:{cCode}})',
    'RETURN en'
  ].join('\n');

  var params = {
    cCode: clientCode
  };

  db.query(query, params, function (err, results) {
    if (err) {
      throw err;
    }
    var engagements = results.map(function (result) {
      console.log(result.en.data);
      return result.en.data;
    });
    callback(engagements);
  });
}

module.exports = {
  getMoodForClient: getMoodForClient,
  getSentimentsForClient: getSentimentsForClient,
  getClient: getClient,
  getClients: getClients,
  getConsultantforClients: getConsultantforClients,
  searchClients: searchClients,
  getEngagementsforClient: getEngagementsforClient
};