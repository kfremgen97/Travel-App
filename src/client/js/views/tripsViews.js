// TripsView
class TripsView {
  // Constructor
  constructor() {
    this.trips = document.querySelector('.trips');
  }

  // Add a trip
  updateTrips(trips) {
    // Trip string
    let tripsString = '';

    // Loop over the trips to generate the string
    trips.forEach((trip) => {
      tripsString += `
        <li class="trips__item">
          <div class="trips__detail">
            <svg class="trips__label">
              <use href="./assets/sprite/regular.svg#info"></use>
            </svg>
             <span class="trips__value">${trip.name} , ${trip.countryName}</span>
           </div>
           <div class="trips__detail">
            <svg class="trips__label">
               <use href="./assets/sprite/regular.svg#location"></use>
             </svg>
            <span class="trips__value">${trip.coordinates.lat} lat , ${trip.coordinates.lng} lng</span>
           </div>
           <div class="trips__detail">
             <svg class="trips__label">
              <use href="./assets/sprite/regular.svg#calendar"></use>
             </svg>
            <span class="trips__value">${trip.date.toDateString()}</span>
          </div>
           <svg class="trips__arrow">
           <use href="./assets/sprite/regular.svg#chevron-right"></use>
         </svg>
        </li>
            `;
    });

    // Clear the trips ui
    this.trips.innerHTML = '';
    // Add trip to trips
    this.trips.insertAdjacentHTML('afterbegin', tripsString);
  }

  // Trips click publisher
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
