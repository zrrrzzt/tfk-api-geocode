var handlers = require('../handlers');
var routes;

routes = [
  {
    method: 'GET',
    path: '/geocode/{address}',
    handler: handlers.getGeocode,
    config: {
      description:'Get lat/lng from address.'
    }
  },
  {
    method: 'GET',
    path: '/geocode/convert/UTMtoLL',
    handler: handlers.convertUTMToLatLng,
    config: {
      description:'Convert UTM coordinates tol lat/lng. Required params: easting, northing, zoneletter and zonenumber'
    }
  },
  {
    method: 'GET',
    path: '/geocode/convert/LLtoUTM',
    handler: handlers.convertLatLngToUTM,
    config: {
      description:'Convert lat/lng to UTM coordinates. Required params: lat and lng',
      notes:[],
      tags:[]
    }
  }
];

module.exports = routes;