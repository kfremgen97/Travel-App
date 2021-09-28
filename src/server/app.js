// Imports
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

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

// Binds and listens for connections on the specified host and port
app.listen(8080, () => {
  console.log('Starting express server');
  console.log('Listening on port: 8080');
});
