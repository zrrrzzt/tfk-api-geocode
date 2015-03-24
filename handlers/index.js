'use strict';

var Wreck = require('wreck');
var querystring = require('querystring');
var helpers = require('../helpers');
var config = require('../config');
var apiUrl = 'https://maps.googleapis.com/maps/api/geocode/json?';
var qs = {
  API_KEY:config.API_KEY
};

function getGeocode(request, reply) {
  qs.address = request.params.address;
  var url = apiUrl + querystring.stringify(qs);

  Wreck.get(url, function(err, res, payload){
    helpers.handleReply(err, payload, request, reply);
  });
}

module.exports.getGeocode = getGeocode;
