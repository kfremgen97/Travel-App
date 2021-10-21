// Imports
import mapboxgl from 'mapbox-gl'; // or "const mapboxgl = require('mapbox-gl');"

// Map view
class MapView {
  // Construct
  constructor() {
    // Map view element
    this.mapView = document.querySelector('#map');
    // Map object
    this.mapObject = {};
    // Array of marker objects
    this.markers = [];
  }

  // Load the map
  loadMap(apiKey,userLocation, trips) {
    mapboxgl.accessToken = apiKey;
    this.mapObject = new mapboxgl.Map({
      container: 'map', // container ID
      style: 'mapbox://styles/mapbox/streets-v11', // style URL
      center: [userLocation.longitude, userLocation.latitude], // starting position [lng, lat]
      zoom: 8, // starting zoom
    });

    // Add geolocate control to the map.
    this.mapObject.addControl(
      new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true,
        },
      }),
    );

    // Render the markers
    this.renderMarkers(trips);
  }

  // Set the mapView baed on selected trip
  setSelectedTripCoordinates(selectedTrip) {
    // Get the coordinates of the trip
    const coordinates = [Number(selectedTrip.coordinates.lng),
        Number(selectedTrip.coordinates.lat),
      ];

    console.log(coordinates);
    // Set the map coordinate center
    this.mapObject.flyTo({
      center: coordinates,
      essential: true,
    });
  }

  // Set the map view based on the user coordinates
  setUserCoordinates(coordinates) {
    console.log(coordinates);
    // Set the map coordinate center
    this.mapObject.flyTo({
      center: coordinates,
      essential: true,
    });
  }

  // Render the markers
  renderMarkers(trips) {
    // Clear the markers
    this.clearMarkers();

    // Loop through the trips
    trips.forEach((trip) => {
      // Create a default Marker and add it to the map
      const marker = new mapboxgl.Marker({ color: '#7048e8' })
        .setLngLat([trip.coordinates.lng, trip.coordinates.lat])
        .addTo(this.mapObject);
      // Add the marker to the markers
      this.markers.push(marker);
    });
  }

  // Clear the markers
  clearMarkers() {
    // Loop through the markers
    this.markers.forEach((marker) => {
      // Remove the marker by setting the map to null
      marker.remove();

    // Set the markers to empty array
    this.markers = [];
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
