// Imports
import formView from '../views/formView';
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
  }, 2000);
};

formView.addFormPublisher(formHandler);
