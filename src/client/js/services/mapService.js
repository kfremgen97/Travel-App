// Imports
import * as resourceConstants from './resourceConstants';

const getMapKey = function () {
  // Generate url
  const url = `${resourceConstants.BASE_URL}/${resourceConstants.MID_URL}/${resourceConstants.KEY_URL}/?keyName=map`;

  // Return the request
  return fetch(url)
    .then((response) => {
      // Make sure the respons eis okay
      if (!response.ok) throw new Error('Unable to load map');
      return response.json();
    })
    .then((data) => {
      console.log(data);
      // Check if data has error
      if (data.error) throw new Error(data.error);
      // Return the data
      return data;
    })
    .catch((error) => {
      // Trhow the error
      console.error(error);
      throw error;
    });
};

// Default export
export default getMapKey;
