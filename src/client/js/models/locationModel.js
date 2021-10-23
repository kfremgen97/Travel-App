class LocationModel {
  // Constructor
  constructor() {
    this._location = {};
  }

  // Set the user location
  setLocation(lat, lng) {
    this._location.lat = lat;
    this._location.lng = lng;
  }

  // Get the user location
  getLocation() {
    return this._location;
  }
}

// Exports
export default new LocationModel();
