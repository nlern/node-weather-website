const request = require('postman-request');
const models = require('../models/index');

const locationService = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?access_token=pk.eyJ1Ijoibmxlcm4iLCJhIjoiY2tzbzZobWYxM285bTJ0cm84ZDVibXY1MCJ9.SW6pmKqoFnpipJ8Z2JYJwQ&limit=1`;

  request({ url: url, json: true }, (error, { body } = {}) => {
    if (error) {
      callback('Error: Unable to connect to location service.');
      return;
    }
    const { features } = body;
    const location =
      Array.isArray(features) && features.length > 0 ? features[0] : null;

    if (location === null) {
      callback('Unable to find location. Try another search.');
      return;
    }

    const [longitude, latitude] = location.center;
    data = new models.Location(latitude, longitude, location.place_name);
    callback(undefined, data);
    return;
  });
};

module.exports = locationService;
