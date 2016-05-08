function DisplayEvents () {
  this.images = [
    'candle.png',
    'car.png',
    'jukebox.png',
    'seat.png'
  ];
  this.baseUrl = '../../images/';
  this.imageIndex = 0;
}

/**
 * Generates the html for displaying a list of events
 *
 * @param  {Object} - events event data
 * @return {String} - html string
 */
DisplayEvents.prototype.generateHTML = function (events) {
  var html = '';

  for (var eventId in events) {
    let event = events[eventId];
    let style = this._getBackgroundImageStyle();
    let eventHtml = '<div class="displayed-event" style="' + style + '">' +
        '<div class="displayed-event__actions">' +
        '<span class="displayed-event__delete">' + 'X'+ '</span>' +
        '</div>' +
        '<span class="displayed-event__item">' + event.title + ' hosted by ' + event.host + '</span>' +
        '<span class="displayed-event__item">' + event.startDate + ' ' + event.startTime + '</span>' +
        '<span class="displayed-event__item displayed-event__location">' + event.location + '</span>' +
      '</div>';

    html += eventHtml;
  }

  return html;
};

// TODO figure out a better way to programmtically attached the background images
DisplayEvents.prototype._getBackgroundImageStyle = function () {
  var index = this._getImageIndex();
  var imageUrl = this.baseUrl + this.images[index];
  var style = `background: linear-gradient(rgba(0, 0, 0, .4),rgba(0, 0, 0, .4)),url(${imageUrl}) no-repeat center center; background-size: cover;`;

  return style;
};

// go through all images and back
DisplayEvents.prototype._getImageIndex = function () {
  if (this.imageIndex === this.images.length) {
    this.imageIndex = 0;
  }

  return this.imageIndex++;
};


export default DisplayEvents;
