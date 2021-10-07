// Imports
import * as resourceConstants from './resourceConstants';

const getPhotoInfo = function (location) {
  // Encode the location for url
  const encodedLocation = encodeURIComponent(location);
  // Generate url
  const url = `${resourceConstants.BASE_URL}/${resourceConstants.MID_URL}/${resourceConstants.PHOTO_URL}?location=${encodedLocation}`;

  // Return fetch
  return fetch(url)
    .then((response) => {
      // Check if resposne is ok
      if (!response) throw new Error('Unable to get location photo');
      // Else return javascript object version of json response
      return response.json();
    })
    .then((data) => {
      console.log(data);
      // return the data
      return data;
    })
    .catch((error) => {
      console.error(error);
      // Throw the error
      throw error;
    });
};

// Default export
export default getPhotoInfo;
