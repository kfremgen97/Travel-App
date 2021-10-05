// Imports
import sidebarView from '../views/sidebarView';
import formView from '../views/formView';
import tripsViews from '../views/tripsViews';
import mapView from '../views/mapView';
import getLocationInfo from '../services/locationService';
import TripModel from '../models/tripModel';

// Load the map
mapView.loadMap();

const formHandler = async function (formData) {
  // Get the location from the form data
  const locationString = formData.get('location');
  // Get the date from the form data
  const dateString = formData.get('date');
  // Declare a trip
  let trip;

  try {
    // Render the spinner
    formView.renderSpinner();

    // Check if locationString is null
    if (!locationString) throw new Error('Invalid location');
    // Check if dateString is null
    if (!dateString) throw new Error('Invalid date');

    // Call the location service
    const locationInfo = await getLocationInfo(locationString);
    // Create the trip
    trip = new TripModel(locationInfo.name, locationInfo.countryName, locationInfo.countryCode,
      locationInfo.lat, locationInfo.lng);
    console.log(trip);
    // Render submit
    formView.renderSubmit();
  } catch (error) {
    console.error(error);
  }
};

const tripsHandler = function() {
  // Show detail view
  sidebarView.showDetailView();
};

const backHandler = function() {
  // Show master view
  sidebarView.showMasterView();
};

sidebarView.addBackPublisher(backHandler);
formView.addFormPublisher(formHandler);
tripsViews.addTripsPublisher(tripsHandler);
