// Imports
const fetch = require('node-fetch');

// Get the current weather
const getCurrentWeather = function (apiKey, lat, lng) {
  // Construct the url
  const url = `https://api.weatherbit.io/v2.0/current?key=${apiKey}&lat=${lat}&lon=${lng}`;

  // Return the fetch promise
  return fetch(url)
    .then((response) => {
      console.log(response.status);
      if (!response.ok) throw new Error('Unable to get location weather');
      return response.json();
    })
    .then((data) => {
      console.log(data);
      if (data.error) throw new Error(data.error);
      // Return the data
      return data;
    })
    .catch((error) => {
      console.error(error);
      // Throw the error
      throw error;
    });
};

// Get the future weather
const getFutureWeather = function (apiKey, lat, lng) {
  // Construct url
  const url = `https://api.weatherbit.io/v2.0/forecast/daily?key=${apiKey}&lat=${lat}&lon=${lng}`;

  // Return the fetch promise
  return fetch(url)
    .then((response) => {
      if (!response.ok) throw new Error('Unable to get location weather');
      return response.json();
    })
    .then((data) => {
      console.log(data);
      if (data.error) throw new Error(data.error);
      // Return the data
      return data;
    })
    .catch((error) => {
      console.error(error);
      // Throw the error
      throw error;
    });
};

// Exports
module.exports = {
  getCurrentWeather,
  getFutureWeather,
};
