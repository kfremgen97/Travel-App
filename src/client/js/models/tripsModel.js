// TripsModel Class
class TripsModel {
  // Constructor
  constructor() {
    this._selectedTrip = {};
    this._trips = [];
  }

  // Update the selected trip
  setSelectedTrip(trip = {}) {
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

  // Delete a trip
  deleteTrip(trip) {
    // Get the trip index based on id
    const index = this._trips.findIndex((t) => t.id === trip.id);
    // If the index is > -1 remove it
    if (index > -1) this._trips.splice(index, 1);
  }

  getTrip(id) {
    // Get and return the trip based on id
    return this._trips.find((trip) => trip.id === id);
  }

  // Get the trips
  getAllTrips() {
    return this._trips;
  }
}

// Export a single instance
// Remember this will only load once no matter how matter times you import,
// there will only be one instance with a live conenction to all imports
export default new TripsModel();
