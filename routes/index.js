var handlers = require('../handlers');
var routes;

routes = [
  {
    method: 'GET',
    path: '/geocode/{address}',
    handler: handlers.getGeocode
  },
  {
    method: 'GET',
    path: '/geocode/convert/UTMtoLL',
    handler: handlers.convertUTMToLatLng
  },
  {
    method: 'GET',
    path: '/geocode/convert/LLtoUTM',
    handler: handlers.convertLatLngToUTM
  }
];

module.exports = routes;