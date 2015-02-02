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
  var consultant = {};
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
  response.json(consultant);
}

function getClientsOfConsultant(request, response) {
  var email = request.params.email;
  var consultant = getConsultant(email);
  response.json(consultant.clients);
}

function getMoods(request, response) {
  var email = request.params.email;
  var consultant = getConsultant(email);

  response.json(consultant.moods);

}

/*jslint unparam: false*/

module.exports = {
  getConsultants: getConsultants,
  getConsultantByEmail: getConsultantByEmail,
  getClientsOfConsultant: getClientsOfConsultant,
  getMoods: getMoods
};