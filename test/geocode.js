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

  describe('GET /geocode/convert/UTMtoLL', function() {
    it('responds with json', function(done) {
      wreck
        .get('/geocode/convert/UTMtoLL?easting=534969.4&northing=6564263.3&zoneletter=N&zonenumber=32')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, done);
    });
  });

  describe('GET /geocode/convert/LLtoUTM', function() {
    it('responds with json', function(done) {
      wreck
        .get('/geocode/convert/LLtoUTM?lat=59.215987&lng=9.612515')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, done);
    });
  });

});