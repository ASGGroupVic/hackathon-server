'use strict';
/*global db*/
/*jshint unused:req */

function getMoodForClient(code, callback) {
  var query = [
    'MATCH (mood:Mood)<--(s: Sentiment)-->(c:Client{clientCode:{cCode}})',
    'RETURN mood.name, count(*) as count'
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

exports.getMood = function (req, res, next) {

  var code = req.params.code;
  console.log('Client: ' + code);

  getMoodForClient(code, function (mood) {
    console.log('Hooray! ' + mood);

    res.send(mood);
    next();
  });
};

function getClientFromRepo(clientCode, callback) {
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

exports.getClient = function (req, res, next) {
  var clientCode = req.params.code;
  console.log("Client: " + clientCode);

  getClientFromRepo(clientCode, function (client) {
    res.send(client);
    next();
  });
};


function getClientsFromRepo(callback) {
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

/*jslint unparam: true*/
exports.getClients = function (req, res, next) {
  console.log("Get Clients");

  getClientsFromRepo(function (clients) {
    res.send(clients);
    next();
  });
};
/*jslint unparam: false*/

function getConsultantforClientsFromRepo(clientCode, callback) {
  var query = [
    'MATCH (co:Consultant)-->(en:Engagement)-->(cl:Client {clientCode:{cCode}})',
    'RETURN co'
  ].join('\n');

  var params = {
    cCode: clientCode
  };


  db.query(query, params, function (err, results) {
    if (err) {
      throw err;
    }
    var consultants = results.map(function (result) {
      console.log(result.co.data);
      return result.co.data;
    });
    callback(consultants);
  });
}

exports.getConsultantsbyClientCode = function (req, res, next) {
  var code = req.params.code;
  console.log('Client: ' + code);

  getConsultantforClientsFromRepo(code, function (consultants) {
    res.send(consultants);
    next();
  });
};

