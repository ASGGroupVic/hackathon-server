/*global describe, it*/
var request = require('supertest');
var assert = require('assert');

var app = require('./app');
var consultant = {
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
  };

describe('When I get /ping', function () {
  it('should return 200 status code', function (done) {
    request(app)
      .get('/v1/ping')
      .expect(200, done);
  });

  it('should pong', function (done) {
    request(app)
      .get('/v1/ping')
      .expect(/pong/i, done);
  });
});

describe('When I list /consultant', function () {
  var consultants = ['test.consultant', 'different.consultant'];

  it('should return a 200 status code', function (done) {
    request(app)
      .get('/v1/consultant')
      .expect(200, done);
  });

  it('should return json content-type', function (done) {
    request(app)
      .get('/v1/consultant')
      .expect('Content-Type', /json/, done);
  });
  it('should return multiple consultants', function (done) {
    request(app)
      .get('/v1/consultant')
      .expect(JSON.stringify(consultants), done);
  });
});

describe('When I get a consultant from /consultant/:email', function () {
  it('should return a 200 status code', function (done) {
    request(app)
      .get('/v1/consultant/different.consultant@smsmt.com')
      .expect(200, done);
  });

  it('should return a 404 status code if no consultant exists', function (done) {
    request(app)
      .get('/v1/consultant/fake.consultant@smsmt.com')
      .expect(404, done);
  });

  it('should show error message if no consultant exists', function (done) {
    request(app)
      .get('/v1/consultant/fake.consultant@smsmt.com')
      .expect(/Could not find consultant with email: fake/, done);
  });

  it('should return json content-type', function (done) {
    request(app)
      .get('/v1/consultant/different.consultant@smsmt.com')
      .expect('Content-Type', /json/, done);
  });

  it('should return the correct consultant', function (done) {
    request(app)
      .get('/v1/consultant/different.consultant@smsmt.com')
      // .expect(JSON.stringify(consultant), done);
      .end(function (error, response) {
        if (error) {
          throw error;
        }

        var cons = response.body;

        assert.equal(cons.name, consultant.name);
        assert.equal(cons.email, consultant.email);
        assert.deepEqual(cons.clients, consultant.clients);

        done();
      });
  });
});

describe('When I list the clients of a particular consultant at /consultant/:email/clients', function () {
  it('should return a 404 status code if no consultant exists', function (done) {
    request(app)
      .get('/v1/consultant/fake.consultant@smsmt.com/clients')
      .expect(404, done);
  });

  it('should show error message if no consultant exists', function (done) {
    request(app)
      .get('/v1/consultant/fake.consultant@smsmt.com/clients')
      .expect(/Could not find consultant with email: fake/, done);
  });

  it('should return a 200 status code', function (done) {
    request(app)
      .get('/v1/consultant/different.consultant@smsmt.com/clients')
      .expect(200, done);
  });

  it('should return json content-type', function (done) {
    request(app)
      .get('/v1/consultant/different.consultant@smsmt.com/clients')
      .expect('Content-Type', /json/, done);
  });

  it('should return the clients for the correct consultant', function (done) {
    request(app)
      .get('/v1/consultant/different.consultant@smsmt.com/clients')
      .expect(JSON.stringify(consultant.clients), done);
  });
});

describe('When I get the mood of a particular consultant at /consultant/:email/mood', function () {
  it('should return a 404 status code if no consultant exists', function (done) {
    request(app)
      .get('/v1/consultant/fake.consultant@smsmt.com/mood')
      .expect(404, done);
  });

  it('should show error message if no consultant exists', function (done) {
    request(app)
      .get('/v1/consultant/fake.consultant@smsmt.com/mood')
      .expect(/Could not find consultant with email: fake/, done);
  });

  it('should get a 200 status code', function (done) {
    request(app)
      .get('/v1/consultant/different.consultant@smsmt.com/mood')
      .expect(200, done);
  });

  it('should return the mood for that consultant', function (done) {
    request(app)
      .get('/v1/consultant/different.consultant@smsmt.com/mood')
      .expect(JSON.stringify(consultant.moods), done);
  });
});

var newMood = {
  mood: 'Angry',
  client: '123',
  notes: 'I am #angry sent via api direct',
  tags: 'angry'
};

describe('When I add a mood for a consultant at /consultant/:email/mood', function () {
  it('should return a 201 code', function (done) {
    request(app)
      .post('/v1/consultant/different.consultant@smsmt.com/mood')
      .send('mood=Angry&client=123&notes=I%20am%20%23angry%20sent%20via%20api%20direct&tags=angry')
      .expect(201, done);
  });

  it('should return the mood object', function (done) {
    request(app)
      .post('/v1/consultant/different.consultant@smsmt.com/mood')
      .send('mood=Angry&client=123&notes=I%20am%20%23angry%20sent%20via%20api%20direct&tags=angry')
      .expect(newMood, done);
  });

  it('validates mood', function (done) {
    request(app)
      .post('/v1/consultant/different.consultant@smsmt.com/mood')
      .send('mood=&client=123&notes=I%20am%20%23angry%20sent%20via%20api%20direct&tags=angry')
      .expect(404, done);
  });

  it('validates client', function (done) {
    request(app)
      .post('/v1/consultant/different.consultant@smsmt.com/mood')
      .send('mood=Angry&client=&notes=I%20am%20%23angry%20sent%20via%20api%20direct&tags=angry')
      .expect(404, done);
  });

  it('validates notes', function (done) {
    request(app)
      .post('/v1/consultant/different.consultant@smsmt.com/mood')
      .send('mood=Angry&client=123&notes=&tags=angry')
      .expect(404, done);
  });

  it('does not validate tags', function (done) {
    request(app)
      .post('/v1/consultant/different.consultant@smsmt.com/mood')
      .send('mood=Angry&client=123&notes=I%20am%20%23angry%20sent%20via%20api%20direct&tags=')
      .expect(201, done);
  });
});

describe('When I get the sentiments for a consultant at /v1/consultant/:email/sentiments', function () {
  it('should return a 200 status code', function (done) {
    request(app)
      .get('/v1/consultant/different.consultant@smsmt.com/sentiments')
      .expect(200, done);
  });

  it('should return a 404 status code if the consultant does not exist', function (done) {
    request(app)
      .get('/v1/consultant/fake.consultant@smsmt.com/sentiments')
      .expect(404, done);
  });

  it('should show error message if no consultant exists', function (done) {
    request(app)
      .get('/v1/consultant/fake.consultant@smsmt.com/sentiments')
      .expect(/Could not find consultant with email: fake/, done);
  });

  it('should return json content-type', function (done) {
    request(app)
      .get('/v1/consultant/different.consultant@smsmt.com/sentiments')
      .expect('Content-Type', /json/, done);
  });
});

describe('When I get the last5moods for a consultant at /v1/consultant/:email/last5mood', function () {
  it('should return a 200 status code', function (done) {
    request(app)
      .get('/v1/consultant/different.consultant@smsmt.com/last5mood')
      .expect(200, done);
  });

  it('should return a 404 status code if the consultant does not exist', function (done) {
    request(app)
      .get('/v1/consultant/fake.consultant@smsmt.com/last5mood')
      .expect(404, done);
  });

  it('should show error message if no consultant exists', function (done) {
    request(app)
      .get('/v1/consultant/fake.consultant@smsmt.com/last5mood')
      .expect(/Could not find consultant with email: fake/, done);
  });

  it('should return json content-type', function (done) {
    request(app)
      .get('/v1/consultant/different.consultant@smsmt.com/last5mood')
      .expect('Content-Type', /json/, done);
  });
});

describe('When I get the search for a consultant at /v1/consultant/search/:search', function () {
  it('should return a 200 status code', function (done) {
    request(app)
      .get('/v1/consultant/search/different')
      .expect(200, done);
  });

  it('should return json content-type', function (done) {
    request(app)
      .get('/v1/consultant/search/different')
      .expect('Content-Type', /json/, done);
  });
});

