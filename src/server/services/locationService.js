// Imports
const fetch = require('node-fetch');

const getLocationInfo = function (location, username) {
  const url = `http://api.geonames.org/searchJSON?q=${encodeURIComponent(location)}&maxRows=10&username=${username}`;
  return fetch(url)
    .then((response) => {
      if (!response.ok) throw new Error('Unable to get location information');
      return response.json();
    })
    .then((data) => {
      console.log(data);
      if (data?.status?.message) throw new Error(data.status.message);
      return data;
    })
    .catch((error) => {
      console.error(error);
      // Throw the error
      throw error;
    });
};

// Export
module.exports.getLocationInfo = getLocationInfo;
