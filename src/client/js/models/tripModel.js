// TripModel
export default class TripModel {
  // Constructor
  constructor(name, country, countryCode, lat, lng) {
    this.name = name;
    this.country = country;
    this.countryCode = countryCode;
    this.lat = lat;
    this.lng = lng;
    this.weather = [];
    this.photo = '';

  }
}