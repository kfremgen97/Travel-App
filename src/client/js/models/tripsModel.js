// TripsModel Class
class TripsModel {
  // Constructor
  constructor() {
    this.selectedTrip = {};
    this.trips = [];
  }
}

// Export a single instance
// Remember this will only load once no matter how matter times you import,
// there will only be one instance with a live conenction to all imports
export default TripsModel();
