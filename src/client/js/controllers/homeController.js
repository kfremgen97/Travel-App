// Imports
import sidebarView from '../views/sidebarView';
import formView from '../views/formView';
import tripsViews from '../views/tripsViews';
import mapView from '../views/mapView';

// Load the map
mapView.loadMap();

const formHandler = function (formData) {
  console.log([...formData]);
  console.log(formData.get('location'));
  console.log(formData.get('date'));
  // Render spinner
  formView.renderSpinner();
  setTimeout(() => {
    // Clear the inputs
    formView.clearInputs();
    // Enable form submission
    formView.renderSubmit();
    // Add trip
    tripsViews.addTrip();
  }, 2000);
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
