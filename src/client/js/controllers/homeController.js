// Imports
import sidebarView from '../views/sidebarView';
import formView from '../views/formView';
import tripsViews from '../views/tripsViews';
import mapView from '../views/mapView';
import getLocationInfo from '../services/locationService';
import { getCurrentWeather, getFutureWeather } from '../services/weatherService';
import getPhotoInfo from '../services/photoService';
import dateChecker from '../utilities/dateChecker';

// Load the map
mapView.loadMap();

const formHandler = async function (formData) {
  // Get the location from the form data
  const locationString = formData.get('location');
  // Get the date from the form data
  const dateString = formData.get('date');
  // Declare and initialize an emptry trip
  const trip = {};

  try {
    // Render the spinner
    formView.renderSpinner();

    // Check if locationString is null
    if (!locationString) throw new Error('Invalid location');
    // Check if dateString is null
    if (!dateString) throw new Error('Invalid date');
    // Add the date property
    trip.date = new Date(dateString.replace('-', '/'));

    // Gte the location
    const locationInfo = await getLocationInfo(locationString);
    // Add the properties
    trip.name = locationInfo.name;
    trip.countryName = locationInfo.countryName;
    trip.countryCode = locationInfo.countryCode;
    trip.coordinates = {
      lat: locationInfo.lat,
      lng: locationInfo.lng,
    };

    // Based on the date call either the current weather api or future weather api
    const daysAway = dateChecker(trip.date);
    if (daysAway < 7) {
      // Get the current weather
      const { data: weatherInfo } = await getCurrentWeather(trip.coordinates.lat,
        trip.coordinates.lng);
      // Add the properties
      trip.weather = [];
      trip.weather[0] = {
        temp: weatherInfo[0].temp,
        description: weatherInfo[0].weather.description,
        date: new Date(weatherInfo[0].datetime.replaceAll('-', '/')),
      };
    } else {
      // Get the future weather
      const { data: weatherInfo } = await getFutureWeather(trip.coordinates.lat,
        trip.coordinates.lng);
      // Add the properties
      trip.weather = [];
      // Loop through the weatherInfo
      weatherInfo.forEach((weather) => {
        trip.weather.push({
          temp: weather.temp,
          description: weather.weather.description,
          date: new Date(weather.datetime.replaceAll('-', '/')),
        });
      });
    }

    // Get the photo info
    const { hits: photoInfo } = await getPhotoInfo(trip.name);
    // Add the properties
    trip.imageURL = photoInfo[0].largeImageURL;
    console.log(trip);
    // Clear the inputs
    formView.clearInputs();
    // Render submit
    formView.renderSubmit();
  } catch (error) {
    console.error(error);
    // Clear the inputs
    formView.clearInputs();
    // Render submit
    formView.renderSubmit();
  }
};

const tripsHandler = function () {
  // Show detail view
  sidebarView.showDetailView();
};

const backHandler = function () {
  // Show master view
  sidebarView.showMasterView();
};

sidebarView.addBackPublisher(backHandler);
formView.addFormPublisher(formHandler);
tripsViews.addTripsPublisher(tripsHandler);
