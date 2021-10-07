// TripsView
class ResultsView {
  // Constructor
  constructor() {
    this.results = document.querySelector('.results');
  }

  renderMessage() {
    // Message string
    let messageString = '<div class="message">';
    messageString += '<h5 class="heading heading--5 heading--primary">Fill out the form above to add a trip...</h5>';
    messageString += ' </div>';

    // Clear the results ui
    this.results.innerHTML = '';
    // Render the trips
    this.results.insertAdjacentHTML('afterbegin', messageString);
  }

  // Render the trips
  renderTrips(trips) {
    // Trip string
    let tripsString = '<h3 class="heading heading--3 heading--white mb--medium">Trips</h3>';
    tripsString += '<ul class="trips">';

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

    tripsString += '</ul>';

    // Clear the results ui
    this.results.innerHTML = '';
    // Render the trips
    this.results.insertAdjacentHTML('afterbegin', tripsString);
  }

  // Render error
  renderError(error) {
    const errorString = `
    <div class="error">
      <h5 class="heading heading--5 heading--error"> Error</>
      <h5 class="heading heading--5 heading--error"> ${error.message} </h5>
    </div>`;

    // Clear the trips ui
    this.results.innerHTML = '';
    // Render the error
    this.results.insertAdjacentHTML('afterbegin', errorString);
  }

  // Trips click publisher
  addTripsPublisher(handler) {
    this.results.addEventListener('click', (event) => {
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
export default new ResultsView();