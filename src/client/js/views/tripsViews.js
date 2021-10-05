// TripsView
class TripsView {
  // Constructor
  constructor() {
    this.trips = document.querySelector('.trips');
  }

  // Add a trip
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
            <svg class="trips__arrow">
            <use href="./assets/sprite/regular.svg#chevron-right"></use>
          </svg>
          </li>
    `;

    // Add trip
    this.trips.insertAdjacentHTML('afterbegin', tripString);
  }

  // Add trips publisher
  addTripsPublisher(handler) {
    this.trips.addEventListener('click', (event) => {
      // Prevent default
      event.preventDefault();

      // Get the the trips item
      // Find the cloestest parent with The class name of trips__item starting from the event target
      const tripsItem = event.target.closest('.trips__item');

      // If tripsItem is null, no trips item was clicked
      if (!tripsItem) return;

      // Else console log the tripsItem
      console.log(tripsItem);

      // Call the handler
      handler();
    });
  }
}

// Export a single instance
// Remember this will only load once no matter how matter times you import,
// there will only be one instance with a live conenction to all imports
export default new TripsView();
