// Imports
import { v4 as uuidv4 } from 'uuid';
import tripsModel from '../models/tripsModel';
import locationModel from '../models/locationModel';
import headerView from '../views/headerView';
import mapView from '../views/mapView';
import sidebarView from '../views/sidebarView';
import formView from '../views/formView';
import resultsView from '../views/resultsView';
import tripView from '../views/tripView';
import getMapKey from '../services/mapService';
import getLocationInfo from '../services/locationService';
import { getCurrentWeather, getFutureWeather } from '../services/weatherService';
import getPhotoInfo from '../services/photoService';
import dateChecker from '../utilities/dateChecker';

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
    lat: Number(locationInfo.lat),
    lng: Number(locationInfo.lng),
  };

  // Based on the date call either the current weather api or future weather api
  const daysAway = dateChecker(Date.now(), newTrip.startDate);
  if (daysAway >= 0 && daysAway <= 7) {
    // Get the current weather
    const {data: weatherInfo} = await getCurrentWeather(newTrip.coordinates.lat,
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
    const {data: weatherInfo} = await getFutureWeather(newTrip.coordinates.lat,
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
  const {hits: photoInfo} = await getPhotoInfo(newTrip.name);
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

  // Get the milliseconds
  const startDateSeconds = new Date(startDateString.replace('-', '/')).getTime();
  const endDateSeconds = new Date(endDateString.replaceAll('-', '/')).getTime();
  // Check if date string is not in the past
  if (dateChecker(Date.now(), startDateSeconds) < 0 || dateChecker(Date.now(), endDateSeconds) < 0) throw new Error('Dates can not be in the past');
  // Check to make sure start date is before end date
  if (dateChecker(startDateSeconds, endDateSeconds) < 0) throw new Error('End date must be after start date');
};

// Update the form ui
const updateFormUI = function (enabled = true) {
  if (enabled) {
    // Clear the form inputs
    formView.clearInputs();
    // Render form submit button
    formView.renderSubmit();
  } else {
    // Render the spinner button
    formView.renderSpinner();
  }
};

// Update trip and weather ui
const updateTripWeatherUI = function (selectedTrip) {
  // Update the trip and weather view based on selected trip
  tripView.renderTrip(selectedTrip);
  tripView.renderWeather(selectedTrip);
};

const tripsHandler = function (tripId) {
  // Print the trips id
  console.log(tripId);
  // Get the trip based on id
  const selectedTrip = tripsModel.getTrip(tripId);
  console.log(selectedTrip.coordinates);
  // If selected trip is undefined set to an empty object return
  if (!selectedTrip) {
    tripsModel.setSelectedTrip();
    return;
  }

  // Set the selected trip in the model
  tripsModel.setSelectedTrip(selectedTrip);

  // Show detail view
  sidebarView.showDetailView();
  // Update the detail view based on selected trip
  updateTripWeatherUI(selectedTrip);
  // Check if screen width is less than 900px
  if (window.innerWidth <= 900) {
    // Show the sidebar view
    sidebarView.showSidebar();
    // Show the close button
    headerView.showCloseButton();
  }
  // Render the map view
  mapView.setMapView(selectedTrip.coordinates);
};

// Update the trips and map ui
const updateTripsMapUI = function (trips, selectedTrip) {
  // If trips is empty show message
  if (trips.length <= 0) {
    resultsView.renderMessage();
    mapView.clearMarkers();
    return;
  }

  // If the trips length is greater than 0
  // Update the sidebar
  resultsView.renderTrips(trips);
  // Update the map
  mapView.renderMarkers(trips, tripsHandler);
  // Check if selectedTrip is not an empty object
  if (Object.keys(selectedTrip).length > 0) mapView.setMapView(selectedTrip.coordinates);
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
    // Set the selected trip
    tripsModel.setSelectedTrip(trip);
    // Update form ui to be enabled
    updateFormUI();
    // Update the trips and map ui
    updateTripsMapUI(tripsModel.getAllTrips(), tripsModel.getSelectedTrip());
  } catch (error) {
    // Set the selected trip
    tripsModel.setSelectedTrip();
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

const backHandler = function () {
  // Show the form
  formView.showForm();
  // Show master view
  sidebarView.showMasterView();
  // Clear the selected trip
  tripsModel.setSelectedTrip();
};

const deleteHandler = function () {
  // Delete the selcted trip
  tripsModel.deleteTrip(tripsModel.getSelectedTrip());
  // Set the selected trip back to an empty object
  tripsModel.setSelectedTrip();
  // Show the master view
  sidebarView.showMasterView();
  // Rerender the trips
  updateTripsMapUI(tripsModel.getAllTrips(), tripsModel.getSelectedTrip());
};

const openHandler = function () {
  // Change the buttons
  headerView.showCloseButton();
  // Show the sidebar
  sidebarView.showSidebar();
  // Show the form
  formView.showForm();
};

const closeHandler = function () {
  // Change the buttons
  headerView.showOpenButton();
  // Hide the form
  formView.hideForm();
  // Hide the sidebar
  sidebarView.hideSidebar();
};

const getUserLocation = function () {
  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      // Get the user location
      navigator.geolocation.getCurrentPosition((position) => {
        resolve({lat: position.coords.latitude, lng: position.coords.longitude});
      }, (error) => {
        reject(error);
      });
    } else {
      reject(new Error('Unable to get user location'));
    }
  });
};

const locationHandler = async function () {
  // Render spinner
  mapView.renderSpinner();
  // Get the user location
  try {
    const { lat, lng } = await getUserLocation();
    // Set the user location
    locationModel.setLocation(lat, lng);
    // Set the suer location marker
    mapView.renderUserLocation(lat, lng);
    // Set the map view
    mapView.setMapView(locationModel.getLocation());
  } catch (error) {
    locationModel.setLocation(null, null);
    mapView.clearUserLocation();
    alert(error.message);
  } finally {
    // Render submit
    mapView.renderSubmit();
  }
};

const loadMap = async function () {
  try {
    // Get the map key
    const keyData = await getMapKey();
    // Load the map
    await mapView.loadMap(keyData.key, locationHandler);
    // Get all the trips
    const trips = tripsModel.getAllTrips();
    // Render the markers
    mapView.renderMarkers(trips, tripsHandler);

    // Render the user coordinate son the map
    try {
      mapView.renderSpinner();
      // Set the coordinates
      const coordinates = await getUserLocation();
      locationModel.setLocation(coordinates.lat, coordinates.lng);
      // Set the user location
      mapView.renderUserLocation(coordinates.lat, coordinates.lng);
      // Set the map view
      mapView.setMapView(coordinates);
    } catch (error) {
      locationModel.setLocation(null, null);
    } finally {
      mapView.renderSubmit();
    }
  } catch (error) {
    console.error(error);
    this.mapView.renderError(error);
  }
};

const loadTrips = function () {
  try {
    // Get all the trips from local storage
    tripsModel.readAllTrips();
    // Render the works out
    const trips = tripsModel.getAllTrips();
    if (trips?.length > 0) resultsView.renderTrips(trips);
    else resultsView.renderMessage();
  } catch (error) {
    console.erorr(error);
    // Render the error
    resultsView.renderError(error);
  }
};

const loadApplication = async function () {
  // Load the trips from storage
  loadTrips();
  // Load the map
  await loadMap();
};

// Event listeners
headerView.addOpenPublisher(openHandler);
headerView.addClosePublisher(closeHandler);
sidebarView.addBackPublisher(backHandler);
sidebarView.addDeleteButtonPublisher(deleteHandler);
formView.addFormPublisher(formHandler);
resultsView.addTripsPublisher(tripsHandler);

// Load the application
loadApplication();
