var handlers = require('../handlers');
var routes;

routes = [
  {
    method: 'GET',
    path: '/geocode/{address}',
    handler: handlers.getGeocode
  }
];

module.exports = routes;