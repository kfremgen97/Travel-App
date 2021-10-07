// Imports
import * as resourceConstants from './resourceConstants';

// Get the current weather
export const getCurrentWeather = function (lat, lng) {
  // Generate url
  const url = `${resourceConstants.BASE_URL}/${resourceConstants.MID_URL}/${resourceConstants.WEATHER_URL}/current?lat=${lat}&lng=${lng}`;

  // Return fetch request
  return fetch(url)
    .then((response) => {
      // Check if response okay
      if (!response.ok) throw new Error('Unable to get location weather');
      // Else return tje javascript object of the json
      return response.json();
    })
    .then((data) => {
      console.log(data);
      // Check if data has error
      if (data.error) throw new Error(data.error);
      // Return the data
      return data;
    }).catch((error) => {
      console.error(error);
      // Throw the error
      throw error;
    });
};

// Get the future weather
export const getFutureWeather = function (lat, lng) {
  // Generate url
  const url = `${resourceConstants.BASE_URL}/${resourceConstants.MID_URL}/${resourceConstants.WEATHER_URL}/future?lat=${lat}&lng=${lng}`;

  // Return fetch request
  return fetch(url)
    .then((response) => {
      // Check if response okay
      if (!response.ok) throw new Error('Unable to get location weather');
      // Else return tje javascript object of the json
      return response.json();
    })
    .then((data) => {
      console.log(data);
      // Check if data has error
      if (data.error) throw new Error(data.error);
      // Return the data
      return data;
    }).catch((error) => {
      console.error(error);
      // Throw the error
      throw error;
    });
};
