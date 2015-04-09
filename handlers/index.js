'use strict';

var Wreck = require('wreck');
var querystring = require('querystring');
var config = require('../config');
var apiUrl = 'https://maps.googleapis.com/maps/api/geocode/json?';
var qs = {
  API_KEY:config.API_KEY
};

function handleReply(err, data, request, reply) {
  if (err) {
    reply(err);
  } else {
    reply(JSON.parse(data));
  }
}

function getGeocode(request, reply) {
  qs.address = request.params.address;
  var url = apiUrl + querystring.stringify(qs);

  Wreck.get(url, function(err, res, payload){
    handleReply(err, payload, request, reply);
  });
}

module.exports.getGeocode = getGeocode;
