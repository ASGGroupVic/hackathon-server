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