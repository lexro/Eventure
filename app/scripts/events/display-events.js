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

export default DisplayEvents;
