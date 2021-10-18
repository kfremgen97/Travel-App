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
  loadMap(apiKey, trips, locationHandler) {
    // Set the loader
    this.loader = new Loader({
      apiKey,
      version: 'weekly',
    });

    // Create a locaton button
    const locationButton = document.createElement('button');
    locationButton.textContent = 'Current Location';
    locationButton.classList.add('button');
    locationButton.classList.add('button--map');
    locationButton.addEventListener('click', locationHandler);

    // Load the map
    this.loader.load().then(() => {
      // eslint-disable-next-line no-undef
      this.mapObject = new google.maps.Map(this.mapView, {
        center: { lat: 40.730610, lng: -73.935242 },
        zoom: 8,
      });

      // Add current location button
      // eslint-disable-next-line no-undef
      this.mapObject.controls[google.maps.ControlPosition.TOP_CENTER].push(locationButton);

      // Set the markers on the map
      this.renderMarkers(trips);

      // Get the user location
      locationHandler();
    }).catch((error) => {
      console.error(error);
      // Display the error
      this.renderError(error);
    });
  }

  // Set the mapView baed on selected trip
  setSelectedTripCoordinates(selectedTrip) {
    // Get the coordinates of the trip
    const coordinates = {
      lat: Number(selectedTrip.coordinates.lat),
      lng: Number(selectedTrip.coordinates.lng),
    };
    // Set the map coordinate center
    this.mapObject.panTo(coordinates);
    // Set the map view
    this.mapObject.setZoom(8);
  }

  // Set the map view based on the user coordinates
  setUserCoordinates(coordinates) {
    // Set the map coordinate center
    this.mapObject.panTo(coordinates);
    // Set the map view
    this.mapObject.setZoom(8);
  }

  // Render the markers
  renderMarkers(trips) {
    // Clear the markers
    this.clearMarkers();

    // Loop through the trips
    trips.forEach((trip) => {
      // Get the coordinates of the trip
      const coordinates = {
        lat: Number(trip.coordinates.lat),
        lng: Number(trip.coordinates.lng),
      };

      // Create the icon
      const icon = {
        path: 'M172.268 501.67C26.97 291.031 0 269.413 0 192 0 85.961 85.961 0 192 0s192 85.961 192 192c0 77.413-26.97 99.031-172.268 309.67-9.535 13.774-29.93 13.773-39.464 0zM192 272c44.183 0 80-35.817 80-80s-35.817-80-80-80-80 35.817-80 80 35.817 80 80 80z', //SVG path of awesomefont marker
        fillColor: '#7048e8', //color of the marker
        fillOpacity: 1,
        strokeWeight: 0,
        scale: 0.1, //size of the marker, careful! this scale also affects anchor and labelOrigin
        anchor: new google.maps.Point(185, 500), //position of the icon, careful! this is affected by scale
      };

      // Add the marker to the map view
      // eslint-disable-next-line no-undef
      const marker = new google.maps.Marker({
        position: coordinates,
        icon,
        map: this.mapObject,
        title: trip.name,
        // eslint-disable-next-line no-undef
        animation: google.maps.Animation.DROP,
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
