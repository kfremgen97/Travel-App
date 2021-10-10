// TripView
class TripView {
  // Constructor
  constructor() {
    this.trip = document.querySelector('.trip');
    this.weather = document.querySelector('.weather');
  }

  // Generate trip
  _generateTrip(trip) {
    // Generate and return trip html string
    return `
    <div class="trip">
    <img class="photo photo--trip" src="${trip.imageURL ?? ''}" alt="${trip.name}">
    <h3 class="heading heading--3 heading--white">Trip</h3>
    <div class="trip__item">
      <svg class="trip__label">
        <use href="./assets/sprite/regular.svg#info"></use>
      </svg>
      <span class="trip__value">${trip.name}, ${trip.countryName}</span>
      <svg class="trip__label">
        <use href="./assets/sprite/regular.svg#location"></use>
      </svg>
      <span class="trip__value">${trip.coordinates.lat} lar,${trip.coordinates.lng} lng</span>
      <svg class="trip__label">
        <use href="./assets/sprite/regular.svg#calendar"></use>
      </svg>
      <span class="trip__value">${trip.date.toDateString()}</span>
    </div>
  </div>
  `;
  }

  // Generate weather
  _generateWeather(trip) {
    // Generate and return weather string
    let weatherString = '<h3 class="heading heading--3 heading--white mb--medium">Weather</h3>';
    weatherString += '<ul class="weather__list">';
    // For each weather element
    trip.weather.forEach((weather) => {
      weatherString += `
      <li class="weather__item">
        <svg class="weather__label">
          <use href="./assets/sprite/regular.svg#temperature-high"></use>
        </svg>
        <span class="weather__value">${weather.temp}&#8451</span>
        <svg class="weather__label">
          <use href="./assets/sprite/regular.svg#info"></use>
        </svg>
        <span class="weather__value">${weather.description}</span>
        <svg class="weather__label">
          <use href="./assets/sprite/regular.svg#calendar"></use>
        </svg>
        <span class="weather__value">${weather.date.toDateString()}</span>
      </li>
      `;
    });
    weatherString += '</ul>';

    return weatherString;
  }

  // Render the trip
  renderTrip(trip) {
    // Generate trip string
    const tripString = this._generateTrip(trip);
    // Clear the ui
    this.trip.innerHTML = '';
    // Update the ui
    this.trip.insertAdjacentHTML('afterbegin', tripString);
  }

  // Render the weather
  renderWeather(trip) {
    // Generate weather string
    const weatherString = this._generateWeather(trip);
    // Clear the ui
    this.weather.innerHTML = '';
    // Update the ui
    this.weather.insertAdjacentHTML('afterbegin', weatherString);
  }
}

// Export a single instance
// Remember this will only load once no matter how matter times you import,
// there will only be one instance with a live conenction to all imports
export default new TripView();
