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

function getObservationsForClient(clientId, callback) {
  var query = [
    'MATCH (co:`Consultant`)-->(obs:`Observation`)-->(day:`Day`)-->(month:`Month`)-->(year: `Year`), (obs)--(cl:`Client`{clientCode:{clientId}})',
    'OPTIONAL MATCH (obs)-->(tag:`Tag`)',
    'RETURN obs.timeofday as timeofday, day.day as day, day.month as month, day.year as year, obs.text as observation, co.firstName as firstName, co.lastName as lastName, co.email as email, collect(tag.tag) as tags ORDER BY day.year, day.month, day.day, obs.timeofday;'
  ].join('\n');

  var params = {
    clientId: clientId
  };

  db.query(query, params, function (err, results) {
    if (err) {
      throw err;
    }
    var observations = results.map(function (result) {
      console.log(result);
      return result;
    });

    callback(observations);
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

exports.getObservations = function (req, res, next) {
  var code = req.params.code;
  console.log('Client: ' + code);

  getObservationsForClient(code, function (observations) {
    res.send(observations);
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
    'RETURN en.name as engagementName, co.phone as phone, co.employeeId as employeeId, co.firstName as firstname, co.lastName as lastName, co.email as email'
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

exports.getConsultantsbyClientCode = function (req, res, next) {
  var code = req.params.code;
  console.log('Client: ' + code);

  getConsultantforClientsFromRepo(code, function (consultants) {
    res.send(consultants);
    next();
  });
};

function searchClientsFromRepo(search, callback) {
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

exports.searchClient = function (req, res, next) {
  var search = req.params.search;
  console.log('Client Search: ' + search);

  searchClientsFromRepo(search, function (clients) {
    res.send(clients);
    next();
  });
};


function getEngagementsforClientFromRepo(clientCode, callback) {
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

exports.getEngagementsbyClientCode = function (req, res, next) {
  var code = req.params.code;
  console.log('Client: ' + code);

  getEngagementsforClientFromRepo(code, function (engagements) {
    res.send(engagements);
    next();
  });
};