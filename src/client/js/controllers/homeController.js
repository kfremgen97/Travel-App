// Imports
import { v4 as uuidv4 } from 'uuid';
import tripsModel from '../models/tripsModel';
import sidebarView from '../views/sidebarView';
import formView from '../views/formView';
import resultsView from '../views/resultsView';
import mapView from '../views/mapView';
import getLocationInfo from '../services/locationService';
import { getCurrentWeather, getFutureWeather } from '../services/weatherService';
import getPhotoInfo from '../services/photoService';
import dateChecker from '../utilities/dateChecker';
import tripView from '../views/tripView';

// Load the map
mapView.loadMap();

const formHandler = async function (formData) {
  // Get the location from the form data
  const locationString = formData.get('location');
  // Get the date from the form data
  const dateString = formData.get('date');
  // Declare and initialize an emptry trip
  const newTrip = {
    id: uuidv4(),
  };

  try {
    // Render the form spinner
    formView.renderSpinner();

    // Check if locationString is null
    if (!locationString) throw new Error('Invalid location');
    // Check if dateString is null
    if (!dateString) throw new Error('Invalid date');
    // Add the date property
    newTrip.date = new Date(dateString.replace('-', '/'));

    // Get the location
    const locationInfo = await getLocationInfo(locationString);
    // Add the properties
    newTrip.name = locationInfo.name;
    newTrip.countryName = locationInfo.countryName;
    newTrip.countryCode = locationInfo.countryCode;
    newTrip.coordinates = {
      lat: locationInfo.lat,
      lng: locationInfo.lng,
    };

    // Based on the date call either the current weather api or future weather api
    const daysAway = dateChecker(newTrip.date);
    if (daysAway < 7) {
      // Get the current weather
      const { data: weatherInfo } = await getCurrentWeather(newTrip.coordinates.lat,
        newTrip.coordinates.lng);
      // Add the properties
      newTrip.weather = [];
      newTrip.weather[0] = {
        temp: weatherInfo[0].temp,
        description: weatherInfo[0].weather.description,
        date: new Date(weatherInfo[0].datetime.replaceAll('-', '/')),
      };
    } else {
      // Get the future weather
      const { data: weatherInfo } = await getFutureWeather(newTrip.coordinates.lat,
        newTrip.coordinates.lng);
      // Add the properties
      newTrip.weather = [];
      // Loop through the weatherInfo
      weatherInfo.forEach((weather) => {
        newTrip.weather.push({
          temp: weather.temp,
          description: weather.weather.description,
          date: new Date(weather.datetime.replaceAll('-', '/')),
        });
      });
    }

    // Get the photo info
    const { hits: photoInfo } = await getPhotoInfo(newTrip.name);
    // Add the properties
    newTrip.imageURL = photoInfo[0]?.largeImageURL ?? null;
    console.log(newTrip);

    // Add the trip to the trips model
    tripsModel.addTrip(newTrip);

    // Clear the form inputs
    formView.clearInputs();
    // Render form submit button
    formView.renderSubmit();
    // Update the trips ui
    const trips = tripsModel.getAllTrips();
    if (trips.length > 0) resultsView.renderTrips(trips);
    else resultsView.renderMessage();
  } catch (error) {
    // Clear the form inputs
    formView.clearInputs();
    // Render the form submit
    formView.renderSubmit();
    // Show the error
    resultsView.renderError(error);
    // Update the view again after 5 seconds
    setTimeout(() => {
      const trips = tripsModel.getAllTrips();
      if (trips.length > 0) resultsView.renderTrips(trips);
      else resultsView.renderMessage();
    }, 2000);
  }
};

const tripsHandler = function (tripId) {
  // Print the trips id
  console.log(tripId);
  // Get the trip based on id
  const selectedTrip = tripsModel.getTrip(tripId);
  // Set the selected trip in the model
  if (selectedTrip) tripsModel.setSelectedTrip(selectedTrip);
  else tripsModel.setSelectedTrip({});
  // Show detail view
  sidebarView.showDetailView();
  // Update the detail view based on selected trip
  tripView.renderTrip(tripsModel.getSelectedTrip());
  tripView.renderWeather(tripsModel.getSelectedTrip());
};

const backHandler = function () {
  // Show master view
  sidebarView.showMasterView();
  // Clear the selected trip
  tripsModel.setSelectedTrip();
  console.log(tripsModel._selectedTrip);
};

sidebarView.addBackPublisher(backHandler);
formView.addFormPublisher(formHandler);
resultsView.addTripsPublisher(tripsHandler);
