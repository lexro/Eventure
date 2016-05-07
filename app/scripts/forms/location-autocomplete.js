function LocationAutoCompelete (inputElement) {
  if (google && google.maps && google.maps.places) {
    this.autocomplete = new google.maps.places.Autocomplete(inputElement);
    this.geolocate();
  }
}

/**
 * Bias the autocomplete object to the user's geographical location,
 * as supplied by the browser's 'navigator.geolocation' object.
 */
LocationAutoCompelete.prototype.geolocate = function () {
  if (navigator.geolocation) {
    var geoOptions = {
      maximumAge: 5 * 60 * 1000,
      timeout: 10 * 1000
    };

    var geoError = function(error) {
      console.log('Error occurred:', error);
      // error.code can be:
      //   0: unknown error
      //   1: permission denied
      //   2: position unavailable (error response from location provider)
      //   3: timed out
    };

    navigator.geolocation.getCurrentPosition(function(position) {
      var geolocation = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      var circle = new google.maps.Circle({
        center: geolocation,
        radius: position.coords.accuracy
      });

      this.autocomplete.setBounds(circle.getBounds());
    }.bind(this), geoError, geoOptions);
  }
};

export default LocationAutoCompelete;
