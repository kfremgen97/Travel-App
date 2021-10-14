// Imports
import { v4 as uuidv4 } from 'uuid';
import tripsModel from '../models/tripsModel';
import sidebarView from '../views/sidebarView';
import formView from '../views/formView';
import resultsView from '../views/resultsView';
import mapView from '../views/mapView';
import getMapKey from '../services/mapService';
import getLocationInfo from '../services/locationService';
import { getCurrentWeather, getFutureWeather } from '../services/weatherService';
import getPhotoInfo from '../services/photoService';
import dateChecker from '../utilities/dateChecker';
import tripView from '../views/tripView';

// Create a new trip
const createNewTrip = async function (locationString, startDateString, endDateString) {
  // Declare and initialize a new trip
  const newTrip = {
    id: uuidv4(),
    startDate: new Date(startDateString.replace('-', '/')).getTime(),
    endDate: new Date(endDateString.replace('-', '/')).getTime(),
  };

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
  const daysAway = dateChecker(newTrip.startDate);
  if (daysAway < 0) {
    throw new Error('Invalid date');
  } else if (daysAway <= 7) {
    // Get the current weather
    const { data: weatherInfo } = await getCurrentWeather(newTrip.coordinates.lat,
      newTrip.coordinates.lng);
    // Add the properties
    newTrip.weather = [];
    newTrip.weather[0] = {
      temp: weatherInfo[0].temp,
      description: weatherInfo[0].weather.description,
      date: new Date(weatherInfo[0].datetime.replaceAll('-', '/')).getTime(),
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
        date: new Date(weather.datetime.replaceAll('-', '/')).getTime(),
      });
    });
  }

  // Get the photo info
  const { hits: photoInfo } = await getPhotoInfo(newTrip.name);
  // Add the properties
  newTrip.imageURL = photoInfo[0]?.largeImageURL ?? null;
  console.log(newTrip);
  // Return the trip
  return newTrip;
};

// Check the form inputs
const checkFormInputs = function (locationString, startDateString, endDateString) {
  // Check if locationString is null
  if (!locationString) throw new Error('Invalid location');

  // Check if dateString is null
  if (!startDateString || !endDateString) throw new Error('Invalid date');

  // Gte the miliiseconds
  const startDateSeconds = new Date(startDateString.replace('-', '/')).getTime();
  const endDateSeconds = new Date(endDateString.replaceAll('-', '/')).getTime();
  // Check if date string is not in the past
  if (dateChecker(startDateSeconds) < 0 || dateChecker(endDateSeconds) < 0) throw new Error('Dates can not be in the past');
  // Check to make sure start date is before end date
  if (dateChecker(endDateSeconds, startDateSeconds) < 0) throw new Error('End date must be after start date');
};

// Update the form ui
const updateFormUI = function (enabled = true) {
  if (enabled) {
    // Clear the form inputs
    formView.clearInputs();
    // Render form submit button
    formView.renderSubmit();
  } else {
    // Render the spinenr button
    formView.renderSpinner();
  }
};

// Update the trips and map ui
const updateTripsMapUI = function (trips, selectedTrip) {
  // If the trips length is greater than 0
  if (trips.length > 0) {
    // Update the sidebar
    resultsView.renderTrips(trips);
    // Updaet the map
    mapView.setCoordinates(selectedTrip);
    mapView.renderMarkers(trips);
  } else {
    resultsView.renderMessage();
    mapView.ClearMarkers();
  }
};

// Update trip and weather ui
const updateTripWeatherUI = function(selectedTrip) {
  // Update the trip and weather view based on selected trip
  tripView.renderTrip(selectedTrip);
  tripView.renderWeather(selectedTrip);
};

const formHandler = async function (formData) {
  // Get the location from the form data
  const locationString = formData.get('location');
  // Get the date from the form data
  const startDateString = formData.get('startDate');
  const endDateString = formData.get('endDate');

  try {
    // Update form ui to not be enabled
    updateFormUI(false);

    // Check the form inputs
    checkFormInputs(locationString, startDateString, endDateString);

    // Create the new trip
    const trip = await createNewTrip(locationString, startDateString, endDateString);
    // Add the trip to the trips model
    tripsModel.addTrip(trip);
    // Set it as the selected trip
    tripsModel.setSelectedTrip(trip);

    // Update form ui to be enabled
    updateFormUI();
    // Update the trips and map ui
    updateTripsMapUI(tripsModel.getAllTrips(), tripsModel.getSelectedTrip());
  } catch (error) {
    // Update form ui to be enabled
    updateFormUI();
    // Show the error
    resultsView.renderError(error);
    // Update the view again after 5 seconds
    setTimeout(() => {
      // Update the trips and map ui
      updateTripsMapUI(tripsModel.getAllTrips(), tripsModel.getSelectedTrip());
    }, 2000);
  }
};

const tripsHandler = function (tripId) {
  // Print the trips id
  console.log(tripId);
  // Get the trip based on id
  const selectedTrip = tripsModel.getTrip(tripId);

  // If selected tirp is undefiend set to an empty object return
  if (!selectedTrip) {
    tripsModel.setSelectedTrip();
    return;
  }

  // Set the selected trip in the model
  tripsModel.setSelectedTrip(selectedTrip);

  // Show detail view
  sidebarView.showDetailView();
  // Update the detail view based on selected trip
  updateTripWeatherUI(tripsModel.getSelectedTrip());
  // Render the map view
  mapView.setCoordinates(tripsModel.getSelectedTrip());
};

const backHandler = function () {
  // Show master view
  sidebarView.showMasterView();
  // Clear the selected trip
  tripsModel.setSelectedTrip();
  console.log(tripsModel._selectedTrip);
};

const deleteHandler = function () {
  // Delete the selcted trip
  tripsModel.deleteTrip(tripsModel.getSelectedTrip());
  // Set the selected trip back to an empty object
  tripsModel.setSelectedTrip();
  // Show the master view
  sidebarView.showMasterView();
  // Rerender the trips
  const trips = tripsModel.getAllTrips();
  if (trips.length > 0) {
    resultsView.renderTrips(trips);
    mapView.renderMarkers(trips);
  } else {
    resultsView.renderMessage();
    // Clear the markers
    mapView.clearMarkers();
  }
};

const _loadMap = async function () {
  try {
    // Get the map key
    const keyData = await getMapKey();
    // Get all the trips
    const trips = tripsModel.getAllTrips();
    // Load the map
    mapView.loadMap(keyData.key, trips);
  } catch (error) {
    console.error(error);
  }
};

const _loadTrips = function () {
  // Get all the trips from local storage
  tripsModel.readAllTrips();
  // Render the works out
  const trips = tripsModel.getAllTrips();
  if (trips.length > 0) resultsView.renderTrips(trips);
  else resultsView.renderMessage();
};

const loadApplication = async function () {
  try {
    // Load the trips from storage
    _loadTrips();
    // Load the map
    await _loadMap();
  } catch (error) {
    console.error(error);
  }
};

// Event listeners
sidebarView.addBackPublisher(backHandler);
sidebarView.addDeleteButtonPublisher(deleteHandler);
formView.addFormPublisher(formHandler);
resultsView.addTripsPublisher(tripsHandler);

// Load the application
loadApplication();
