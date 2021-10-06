// Imports
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const fetch = require('node-fetch');

// Configure enviornment variables
dotenv.config();

// Initialize express app
const app = express();
// Add cors middle ware
// Allow cross origin sharing
app.use(cors());
// Add body-parser middle ware
// Set up middle ware that only parses urlencoded bodies and
// only looks at requests where the Content-Type header matches the type option
app.use(bodyParser.urlencoded({ extended: false }));
// Set up middle ware that only parses json and looks at request with Content-Type to be json
app.use(bodyParser.json());

// Basic get route
app.get('/', (req, res) => {
  res.send({
    application: 'Travel App',
    description: 'A travel app that obtains a desired trip location and date from the user. Then displays the weather and an image of the location using information obtained from external APIs.',
  });
});

// Goggle maps api key
app.get('/api/key', (req, res) => {
  // Get the request params keyName
  const { keyName } = req.query;
  if (keyName === 'map') res.send({ description: 'Google map api key', key: process.env.GOOGLE_MAP_API_KEY });
});

// Geonames route
app.get('/api/location', (req, res) => {
  const url = `http://api.geonames.org/searchJSON?q=${encodeURIComponent(req.query.location)}&maxRows=10&username=${process.env.GEONAMES_USERNAME}`;
  fetch(url)
    .then((response) => {
      if (!response.ok) throw new Error('Unable to get location information');
      return response.json();
    })
    .then((data) => {
      console.log(data);
      if (data?.status?.message) throw new Error(data.status.message);
      res.send(data);
    })
    .catch((error) => {
      console.error(error);
      res.send({
        error: error.message,
      });
    });
});

// Weatherbit current route
app.get('/api/weather/current', (req, res) => {
  const url = `https://api.weatherbit.io/v2.0/current?key=${process.env.WEATHERBIT_API_KEY}&lat=${req.query.lat}&lon=${req.query.lon}`;
  fetch(url)
    .then((response) => {
      console.log(response.status);
      if (!response.ok) throw new Error('Unable to get location weather');
      return response.json();
    })
    .then((data) => {
      console.log(data);
      if (data.error) throw new Error(data.error);
      res.send(data);
    })
    .catch((error) => {
      console.error(error);
      res.send({
        error: error.message,
      });
    });
});

// Weatherbit future route
app.get('/api/weather/future', (req, res) => {
  const url = `https://api.weatherbit.io/v2.0/forecast/daily?key=${process.env.WEATHERBIT_API_KEY}&lat=${req.query.lat}&lon=${req.query.lon}`;
  fetch(url)
    .then((response) => {
      if (!response.ok) throw new Error('Unable to get location weather');
      return response.json();
    })
    .then((data) => {
      console.log(data);
      if (data.error) throw new Error(data.error);
      res.send(data);
    })
    .catch((error) => {
      console.error(error);
      res.send({
        error: error.message,
      });
    });
});

// Pixabay route
app.get('/api/photo', (req, res) => {
  const url = `https://pixabay.com/api?key=${process.env.PIXABAY_API_KEY}&q=${encodeURIComponent(req.query.location)}`;
  fetch(url)
    .then((response) => {
      if (!response.ok) throw new Error('Unable to get location photo');
      return response.json();
    })
    .then((data) => {
      console.log(data);
      res.send(data);
    })
    .catch((error) => {
      console.error(error);
      res.send({
        error: error.message,
      });
    });
});

// Binds and listens for connections on the specified host and port
app.listen(8080, () => {
  console.log('Starting express server');
  console.log('Listening on port: 8080');
});
