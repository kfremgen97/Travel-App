// Imports
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const locationService = require('./services/locationService');
const weatherService = require('./services/weatherService');
const photoService = require('./services/photoService');
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

// // Basic get route
// app.get('/', (req, res) => {
//   res.send({
//     application: 'Travel App',
//     description: 'A travel app that obtains a desired trip location and date from the user. Then displays the weather and an image of the location using information obtained from external APIs.',
//   });
// });

// Serve files
app.use(express.static('dist'));

// Test
app.get('/api/test', (req, res) => {
  res.status(200).send('Test complete');
});

// Root page
app.get('/', (req, res) => {
  res.sendFile('index.html');
});

// Goggle maps api key
app.get('/api/key', (req, res) => {
  // Get the request params keyName
  const { keyName } = req.query;
  if (keyName === 'map') res.send({ description: 'Google map api key', key: process.env.GOOGLE_MAP_API_KEY });
  else res.send({ error: 'Unable to get api key' });
});

// Geonames route
app.get('/api/location', async (req, res) => {
  try {
    // Get the location info
    const locationInfo = await locationService.getLocationInfo(
      req.query.location, process.env.GEONAMES_USERNAME,
    );
    res.send(locationInfo);
  } catch (error) {
    res.send({
      error: error.message,
    });
  }
});

// Weatherbit current route
app.get('/api/weather/current', async (req, res) => {
  try {
    // Get the weather info
    const weatherInfo = await weatherService.getCurrentWeather(
      process.env.WEATHERBIT_API_KEY, req.query.lat, req.query.lng,
    );
    res.send(weatherInfo);
  } catch (error) {
    res.send({
      error: error.message,
    });
  }
});

// Weatherbit future route
app.get('/api/weather/future', async (req, res) => {
  try {
    // Get the weather info
    const weatherInfo = await weatherService.getFutureWeather(
      process.env.WEATHERBIT_API_KEY,req.query.lat,req.query.lng,
    );
    res.send(weatherInfo);
  } catch (error) {
    res.send({
      error: error.message,
    });
  }
});

// Pixabay route
app.get('/api/photo', async (req, res) => {
  try {
    const photoInfo = await photoService.getPhoto(process.env.PIXABAY_API_KEY, req.query.location);
    res.send(photoInfo);
  } catch (error) {
    res.send({
      error: error.message,
    });
  }
});

// Binds and listens for connections on the specified host and port
app.listen(8080, () => {
  console.log('Starting express server');
  console.log('Listening on port: 8080');
});

// Export app
module.exports = app;
