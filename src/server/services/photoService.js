// Imports
const fetch = require('node-fetch');

// Get the photo
const getPhoto = function (apiKey, location) {
  const url = `https://pixabay.com/api?key=${apiKey}&q=${encodeURIComponent(location)}`;
  // Return the fetch promise
  return fetch(url)
    .then((response) => {
      if (!response.ok) throw new Error('Unable to get location photo');
      return response.json();
    })
    .then((data) => {
      console.log(data);
      // Return the data
      return data;
    })
    .catch((error) => {
      console.error(error);
      // Throw an error
      throw error;
    });
};

// Exports
module.exports.getPhoto = getPhoto;
