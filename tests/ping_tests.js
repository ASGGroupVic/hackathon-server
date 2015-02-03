/*global describe, it*/
var request = require('supertest');
var app = require('./../app');

// Ping Route
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
// End of Ping route