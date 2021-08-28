const request = require('postman-request');

const weatherService = ({ latitude, longitude } = {}, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=a2f1a8463690ae84290a6f41950151f4&query=${latitude},${longitude}`;

  request({ url: url, json: true }, (error, { body } = {}) => {
    if (error) {
      callback('Error: Unable to connect to weather service.');
      return;
    }

    if (body.error) {
      callback(
        'Error: Unable to get weather information for location. Please try again.'
      );
      return;
    }
    const { temperature, feelslike, weather_descriptions } = body.current;
    const weatherDescription = weather_descriptions[0];
    const data = `${weatherDescription}. It is currently ${temperature} degrees out. It feels like ${feelslike} degrees out.`;
    callback(undefined, data);
  });
};

module.exports = weatherService;
