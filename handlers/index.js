'use strict';

var Wreck = require('wreck');
var Converter = require('wsg84-util');
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

function convertLatLngToUTM(request, reply) {
  var latitude = request.query.lat;
  var longitude = request.query.lng;
  var convertded = Converter.LLtoUTM({
    latitude: latitude,
    longitude: longitude
  });

  reply(convertded);
}

function convertUTMToLatLng(request, reply) {
  var easting = request.query.easting;
  var northing = request.query.northing;
  var zoneNumber = request.query.zone;
  var converted = Converter.UTMtoLL({
    easting:easting,
    northing:northing,
    zoneNumber:zoneNumber
  });

  reply(converted);

}

module.exports.getGeocode = getGeocode;

module.exports.convertLatLngToUTM = convertLatLngToUTM;

module.exports.convertUTMToLatLng = convertUTMToLatLng;
