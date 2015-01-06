'use strict';
/*global db*/

function getMoodForClient(code, callback) {
  // NOT THE CORRECT QUERY YET. NEEDS TO CHECK RELATIONS
  // FOR MOOD. - JP
  var query = [
    'MATCH (n: `Client` {clientCode:{cCode}})  ',
    'RETURN n '
  ].join('\n');

  var params = {
    cCode : code
  };

  db.query(query, params, function (err, results) {
    if (err) {
      throw err;
    }
    var mood = results.map(function (result) {
      console.log(result.n.data);
      return result.n.data;
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

exports.getClients = function (req, res, next) {
  console.log("Get Clients");

  getClientsFromRepo(function (clients) {
    res.send(clients);
    next();
  });
};