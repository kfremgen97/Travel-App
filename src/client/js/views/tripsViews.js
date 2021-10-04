// TripsView
class TripsView {
  // Constructor
  constructor() {
    this.trips = document.querySelector('.trips');
  }

  addTrip() {
    // Trip string
    const tripString = `
    <li class="trips__item">
            <div class="trips__detail">
              <svg class="trips__label">
                <use href="./assets/sprite/regular.svg#info"></use>
              </svg>
              <span class="trips__value">New York, USA</span>
            </div>
            <div class="trips__detail">
              <svg class="trips__label">
                <use href="./assets/sprite/regular.svg#location"></use>
              </svg>
              <span class="trips__value">15.00 lon, -3.75 lat</span>
            </div>
            <div class="trips__detail">
              <svg class="trips__label">
                <use href="./assets/sprite/regular.svg#calendar"></use>
              </svg>
              <span class="trips__value">5/19/28</span>
            </div>
          </li>
    `;

    // Add trip
    this.trips.insertAdjacentHTML('afterbegin', tripString);
  }
}

// Export a single instance
// Remember this will only load once no matter how matter times you import,
// there will only be one instance with a live conenction to all imports
export default new TripsView();
