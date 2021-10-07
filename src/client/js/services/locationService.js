// Imports
import * as resourceConstants from './resourceConstants';

// Get the location based on string search
const getLocationInfo = function (location) {
  // Encode the location for url
  const encodedLocation = encodeURIComponent(location);
  // Generate url
  const url = `${resourceConstants.BASE_URL}/${resourceConstants.MID_URL}/${resourceConstants.LOCATION_URL}?location=${encodedLocation}`;

  // return fetch request
  return fetch(url)
    .then((response) => {
      // Check if response is ok
      if (!response.ok) throw new Error('Unable to get location');
      // Return the javascript object of the response
      return response.json();
    })
    .then((data) => {
      console.log(data);
      // Check if data has error
      if (data.error) throw new Error(data.error);
      // Check if the data has geonames
      if (!(data.geonames?.length > 0)) throw new Error('Unable to get location');
      // Return the first geoname object
      return data.geonames[0];
    })
    .catch((error) => {
      console.error(error);
      // Throw the error
      throw error;
    });
};

// Default export
export default getLocationInfo;
