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
  loadMap(apiKey, trips) {
    // Set the loader
    this.loader = new Loader({
      apiKey,
      version: 'weekly',
    });

    // Load the map
    this.loader.load().then(() => {
      // eslint-disable-next-line no-undef
      this.mapObject = new google.maps.Map(this.mapView, {
        center: { lat: -34.397, lng: 150.644 },
        zoom: 8,
      });
      // Set the markers on the map
      this.renderMarkers(trips);
    });
  }

  // Set the mapView
  setCoordinates(selectedTrip) {
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
      // Add the marker to the map view
      // eslint-disable-next-line no-undef
      const marker = new google.maps.Marker({
        position: coordinates,
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
}

// Export a single instance
// Remember this will only load once no matter how matter times you import,
// there will only be one instance with a live conenction to all imports
export default new MapView();
