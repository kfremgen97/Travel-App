// TripsModel Class
class TripsModel {
  // Constructor
  constructor() {
    this._selectedTrip = {};
    this._trips = [];
  }

  // Update the selected trip
  setSelecteedTrip(trip) {
    this._selectedTrip = trip;
  }

  // Get the selected trip
  getSelectedTrip() {
    return this._selectedTrip;
  }

  // Add a trip
  addTrip(trip) {
    // Add the trip to the beginning of the array
    this._trips.splice(0, 0, trip);
  }

  // Get the trips
  getTrips() {
    return this._trips;
  }
}

// Export a single instance
// Remember this will only load once no matter how matter times you import,
// there will only be one instance with a live conenction to all imports
export default new TripsModel();
