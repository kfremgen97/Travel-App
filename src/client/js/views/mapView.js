// Imports
import { Loader } from '@googlemaps/js-api-loader';

// Map view
class MapView {
  // Construct
  constructor() {
    // Map view element
    this.mapView = document.querySelector('#map');
    // Map loader object
    this.loader = {};
    // Map object
    this.mapObject = {};
    // Array of marker objects
    this.markers = [];
  }

  // Load the map
  loadMap(apiKey, locationHandler) {
    // Set the loader
    this.loader = new Loader({
      apiKey,
      version: 'weekly',
    });

    // Create a location button
    const locationButton = document.createElement('button');
    locationButton.textContent = 'Current Location';
    locationButton.classList.add('button');
    locationButton.classList.add('button--map');
    locationButton.addEventListener('click', locationHandler);

    // Load the map
    return this.loader.load().then(() => {
      // eslint-disable-next-line no-undef
      this.mapObject = new google.maps.Map(this.mapView, {
        mapTypeControl: false,
        center: { lat:	40.730610, lng: -73.935242 },
        zoom: 8,
      });

      // Add current location button
      // eslint-disable-next-line no-undef
      this.mapObject.controls[google.maps.ControlPosition.TOP_CENTER].push(locationButton);
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
  renderMarkers(trips,tripsHandler) {
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

  _generateError(error) {
    return `
      <div class="error">
        <h5 class="heading heading--5 heading--error"> Error</>
        <h5 class="heading heading--5 heading--error"> ${error.message} </h5>
      </div>
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
}

// Export a single instance
// Remember this will only load once no matter how matter times you import,
// there will only be one instance with a live conenction to all imports
export default new MapView();
