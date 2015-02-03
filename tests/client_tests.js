/*global describe, it*/
var request = require('supertest');
var assert = require('assert');

var app = require('./../app');

// Client Route
describe('When I list /client', function () {
  var clients = ['test.client', 'different.client'];

  it('should return a 200 status code', function (done) {
    request(app)
      .get('/v1/client')
      .expect(200, done);
  });

  it('should return json content-type', function (done) {
    request(app)
      .get('/v1/client')
      .expect('Content-Type', /json/, done);
  });
  it('should return multiple clients', function (done) {
    request(app)
      .get('/v1/client')
      .expect(JSON.stringify(clients), done);
  });
});
// End of Client Route