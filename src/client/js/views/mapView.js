// Imports
import { Loader } from '@googlemaps/js-api-loader';

// Map view
class MapView {
  // Construct
  constructor() {
    // Map view element
    this.mapView = document.querySelector('#map');
    // Map loader object
    this.loader = new Loader({
      apiKey: '',
      version: 'weekly',
    });
    // map object
    this.mapObject = {};
  }

  // Load the map
  loadMap() {
    this.loader.load().then(() => {
      // eslint-disable-next-line no-undef
      this.map = new google.maps.Map(this.mapView, {
        center: { lat: -34.397, lng: 150.644 },
        zoom: 8,
      });
    });
  }
}

// Export a single instance
// Remember this will only load once no matter how matter times you import,
// there will only be one instance with a live conenction to all imports
export default new MapView();
