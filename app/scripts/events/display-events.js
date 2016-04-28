function DisplayEvents () {

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
    let eventHtml = '<div class="displayed-event">' +
        '<span>' + event.title + ' hosted by ' + event.host + '</span>' +
        '<span>' + event.startDate + '</span>' +
        '<span class="displayed-event__location">' + event.location + '</span>' +
      '</div>';

    html += eventHtml;
  }

  return html;
};

export default DisplayEvents;
