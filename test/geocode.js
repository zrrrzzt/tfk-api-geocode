'use strict';

var wreck = require('supertest');
var server = require('../server');
var config = require('../config');

wreck = wreck('http://localhost:' + config.SERVER_PORT);

describe('geocode', function() {

  before(function() {
    server.start();
  });

  after(function() {
    server.stop();
  });

  describe('GET /geocode/{address}', function() {
    it('responds with json', function(done) {
      wreck
        .get('/geocode/Fylkesbakken 10, 3715 Skien')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, done);
    });
  });

});