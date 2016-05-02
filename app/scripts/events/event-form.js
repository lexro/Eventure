function EventForm () {
  this.selector = '.event-form';
  var eventForm = this.getEventForm();

  eventForm.addEventListener('submit', function (event) {
    var eventData = this._serializeArray();
    var addEvent = document.createEvent('CustomEvent');

    addEvent.initCustomEvent('addEvent', true, true, {
      data: eventData
    });
    eventForm.dispatchEvent(addEvent);

    event.preventDefault();
  }.bind(this));
}

EventForm.prototype.getEventForm = function () {
  return document.querySelector(this.selector);
};


/**
 * helper function to transform the form data into a
 * understandable object
 *
 * @return {Object} The transformed event data
 */
EventForm.prototype._serializeArray = function () {
  var eventForm = this.getEventForm();
  var formEntries = new FormData(eventForm).entries();
  var eventData = [];

  for (var value of formEntries) {
    let name = value[0];
    let formValue = value[1];

    eventData.push({
      name: name,
      value: formValue
    });
  }

  return eventData;
};

export default EventForm;
