const path = require('path');
const express = require('express');
const hbs = require('hbs');

const services = require('./services/index');

const app = express();
const port = process.env.PORT || 3000;

// Define path for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather',
    name: 'Shantanu Dutta',
  });
});

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help',
    name: 'Shantanu Dutta',
    helpText: 'This is some helpful text.',
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About',
    name: 'Shantanu Dutta',
  });
});

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.status(400).send({
      error: 'You must provide an address.',
    });
  }
  services.locationService(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({
          error,
        });
      }

      services.weatherService({ latitude, longitude }, (error, weatherInfo) => {
        if (error) {
          return res.send({
            error,
          });
        }
        res.send({
          location,
          forecast: weatherInfo,
          address: req.query.address,
        });
      });
    }
  );
});

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: '404',
    name: 'Shantanu Dutta',
    errorMessage: 'Help article not found',
  });
});

app.get('*', (req, res) => {
  res.render('404', {
    title: '404',
    name: 'Shantanu Dutta',
    errorMessage: 'Page not found',
  });
});

app.listen(port, () => {
  console.info('App listening on port', port);
});
