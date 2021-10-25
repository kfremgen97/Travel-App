// Imports
import { Loader } from '@googlemaps/js-api-loader';

// Map view
class MapView {
  // Construct
  constructor() {
    // Map view element
    this.mapView = document.querySelector('#map');
    // Map button
    this.mapButton = {};
    // Map loader object
    this.loader = {};
    // Map object
    this.mapObject = {};
    // Array of marker objects
    this.markers = [];
    // User marker
    this.userMarker = {};
  }

  // Load the map
  loadMap(apiKey, locationHandler) {
    // Set the loader
    this.loader = new Loader({
      apiKey,
      version: 'weekly',
    });

    // Create a location button
    this.mapButton = document.createElement('button');
    this.mapButton.textContent = 'Current Location';
    this.mapButton.classList.add('button');
    this.mapButton.classList.add('button--map');
    this.mapButton.addEventListener('click', locationHandler);

    // Load the map
    return this.loader.load().then(() => {
      // eslint-disable-next-line no-undef
      this.mapObject = new google.maps.Map(this.mapView, {
        mapTypeControl: false,
        center: { lat: 40.730610, lng: -73.935242 },
        zoom: 8,
      });

      // Add current location button
      // eslint-disable-next-line no-undef
      this.mapObject.controls[google.maps.ControlPosition.TOP_CENTER].push(this.mapButton);
    }).catch((error) => {
      // Throw the error
      throw error;
    });
  }

  // Set the map view based on the  coordinates
  setMapView(coordinates) {
    // Set the map coordinate center
    this.mapObject.panTo(coordinates);
    // Set the map view
    this.mapObject.setZoom(8);
  }

  // Render the markers
  renderMarkers(trips, tripsHandler) {
    // Clear the markers
    this.clearMarkers();

    // Loop through the trips
    trips.forEach((trip) => {
      // Get the coordinates of the trip
      const coordinates = {
        lat: Number(trip.coordinates.lat),
        lng: Number(trip.coordinates.lng),
      };

      // Add the marker to the map view
      // eslint-disable-next-line no-undef
      const marker = new google.maps.Marker({
        position: coordinates,
        map: this.mapObject,
        title: trip.name,
        // eslint-disable-next-line no-undef
        animation: google.maps.Animation.DROP,
      });

      // Add a custom property
      marker.tripId = trip.id;

      // Add an event listener
      marker.addListener('click', () => {
        // Get the trip id
        const { tripId } = marker;
        // Call the handler
        tripsHandler(tripId);
      });

      // Add the marker to the array
      this.markers.push(marker);
    });
  }

  // Clear the markers
  clearMarkers() {
    // Loop through the markers
    this.markers.forEach((marker) => {
      // Remove the marker by setting the map to null
      marker.setMap(null);
    });
  }

  // Render user location
  renderUserLocation(lat, lng){

    // Clear the user marker
    this.clearUserLocation();
    // Add the marker to the map view
    // eslint-disable-next-line no-undef
    const marker = new google.maps.Marker({
      position: { lat, lng },
      map: this.mapObject,
      title: 'User Location',
      icon: {
        // eslint-disable-next-line no-undef
        path: google.maps.SymbolPath.CIRCLE,
        scale: 5,
        fillOpacity: 1,
        fillColor: '#f8f9fa',
        strokeColor: '#7048e8',
      },
      // eslint-disable-next-line no-undef
      animation: google.maps.Animation.DROP,
    });

    this.userMarker = marker;
  }

  // Clear user location
  clearUserLocation() {
    if (Object.keys(this.userMarker).length > 0) {
      this.userMarker.setMap(null);
      this.userMarker = {};
    }
  }

  _generateError(error) {
    return `
      <div class="error">
        <h5 class="heading heading--5 heading--error"> Error</>
        <h5 class="heading heading--5 heading--error"> ${error.message} </h5>
      </div>
      `;
  }

  // Generate spinner
  _generateSpinner() {
    // Generate and return spinenr html string
    return `
    <svg>
      <use href="./assets/sprite/regular.svg#spinner"></use>
    </svg>
    `;
  }

  // Render an error
  renderError(error) {
    // Generate error string
    const errorString = this._generateError(error);
    // Clear the trips ui
    this.mapView.innerHTML = '';
    // Render the error
    this.mapView.insertAdjacentHTML('afterbegin', errorString);
  }

  renderSpinner() {
    // Disable the button
    this.mapButton.disabled = true;
    // Clear the submit button
    this.mapButton.innerHTML = '';
    // Add the loading modifier to the button class list
    this.mapButton.classList.add('button--loading');
    // Generate the spinner string
    const spinnerString = this._generateSpinner();
    // Update the submit button
    this.mapButton.insertAdjacentHTML('afterbegin', spinnerString);
  }

  // Render submit in button
  renderSubmit() {
    // Enable the button
    this.mapButton.disabled = false;
    // Clear the submit button
    this.mapButton.innerHTML = '';
    // Remove the loading modifier to the button class list
    this.mapButton.classList.remove('button--loading');
    // Add the submit message
    this.mapButton.textContent = 'User Location';
  }
}

// Export a single instance
// Remember this will only load once no matter how matter times you import,
// there will only be one instance with a live conenction to all imports
export default new MapView();
