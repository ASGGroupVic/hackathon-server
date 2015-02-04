/*jslint node: true */
'use strict';

var consultants = [
  {
    name: 'test.consultant',
    email: 'test.consultant@smsmt.com',
    clients: [
      {
        name: 'TestClient'
      }
    ]
  },
  {
    name: 'different.consultant',
    email: 'different.consultant@smsmt.com',
    clients: [
      {
        name: 'DifferentClient'
      }
    ],
    moods: [
      {
        mood: 'Happy',
        month: 10,
        year: 2014
      },
      {
        mood: 'Indifferent',
        month: 11,
        year: 2014
      }
    ]
  },
];

/*jslint unparam: true*/
function getConsultants(request, response) {
  var ids = consultants.map(function (c) {
    return c.name;
  });
  response.json(ids);
}

function getConsultant(email) {
  var consultant = null;
  var i;

  for (i = consultants.length - 1; i >= 0; i--) {
    if (consultants[i].email === email) {
      consultant = consultants[i];
    }
  }

  return consultant;
}

function getConsultantByEmail(request, response) {
  var email = request.params.email;
  var consultant = getConsultant(email);

  if (!consultant) {
    response.status(404).json("Could not find consultant with email: " + email);
  } else {
    response.json(consultant);
  }
}

function getClientsOfConsultant(request, response) {
  var email = request.params.email;
  var consultant = getConsultant(email);

  if (!consultant) {
    response.status(404).json("Could not find consultant with email: " + email);
  } else {
    response.json(consultant.clients);
  }
}

function getMoods(request, response) {
  var email = request.params.email;
  var consultant = getConsultant(email);

  if (!consultant) {
    response.status(404).json("Could not find consultant with email: " + email);
  } else {
    response.json(consultant.moods);
  }
}

function addMood(request, response) {
  // var email = request.params.email;
  // var consultant = getConsultant(email);

  var newMood = request.body;
  if (!newMood.mood || !newMood.client || !newMood.notes) {
    response.sendStatus(404);
    return false;
  }

  //TODO: Add mood here

  response.status(201).json(newMood);
}

function getSentiments(request, response) {
  var email = request.params.email;
  var consultant = getConsultant(email);

  if (!consultant) {
    response.status(404).json("Could not find consultant with email: " + email);
  } else {
    response.json(email);
  }
  //TODO: Get sentiment stuff here
}

function getLast5Moods(request, response) {
  var email = request.params.email;
  var consultant = getConsultant(email);

  if (!consultant) {
    response.status(404).json("Could not find consultant with email: " + email);
  } else {
    response.json(email);
  }
  //TODO: Get Last5Moods stuff here
}

function searchClient(request, response) {
  var search = request.params.search;
  response.json(search);
}

/*jslint unparam: false*/

module.exports = {
  getConsultants: getConsultants,
  getConsultantByEmail: getConsultantByEmail,
  getClientsOfConsultant: getClientsOfConsultant,
  getMoods: getMoods,
  addMood: addMood,
  getSentiments: getSentiments,
  getLast5Moods: getLast5Moods,
  searchClient: searchClient
};