class Location {
  latitude;
  longitude;
  location;

  constructor(latitude = 0, longitude = 0, location = '') {
    this.latitude = latitude;
    this.longitude = longitude;
    this.location = location;
  }
}

module.exports = Location;
