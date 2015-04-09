'use strict';

var Wreck = require('wreck');
var Converter = require('wgs84-util');
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
  var latitude = parseFloat(request.query.lat);
  var longitude = parseFloat(request.query.lng);
  var geo = {
    "type": "Point",
    "coordinates": [latitude, longitude]
  };
  var converted = Converter.LLtoUTM(geo);

  reply(converted);
}

function convertUTMToLatLng(request, reply) {
  var easting = parseFloat(request.query.easting);
  var northing = parseFloat(request.query.northing);
  var zoneNumber = parseInt(request.query.zonenumber, 10);
  var zoneLetter = request.query.zoneletter;
  var geo = {
    "type": "Feature",
    "geometry": {
      "type": "Point",
      "coordinates": [easting, northing]
    },
    "properties": {"zoneLetter": zoneLetter, "zoneNumber": zoneNumber}
  };
  var converted = Converter.UTMtoLL(geo);

  reply(converted);

}

module.exports.getGeocode = getGeocode;

module.exports.convertLatLngToUTM = convertLatLngToUTM;

module.exports.convertUTMToLatLng = convertUTMToLatLng;
