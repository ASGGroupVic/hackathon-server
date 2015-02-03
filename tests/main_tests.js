/*global describe, it*/
var request = require('supertest');
var app = require('./../app');

// Main route
describe('When I get /', function () {
  it('should return a 200 status code', function (done) {
    request(app)
      .get('/')
      .expect(200, done);
  });
  it('should return It is quiet here!', function (done) {
    request(app)
      .get('/')
      .expect(/It is quiet here!/, done);
  });
});
// End of Main route
