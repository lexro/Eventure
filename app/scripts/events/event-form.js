import FormValidation from '../forms/form-validation';
import LocationAutoCompelete from '../forms/location-autocomplete';
import moment from 'moment';
/**
 * EventForm class that handle event creation
 */
function EventForm () {
  this.selector = '.event-form';
  var eventForm = this.getEventForm();
  var submitButton = eventForm.querySelector('.event-form__submit-button');
  this.formValidation = new FormValidation(eventForm, submitButton);

  eventForm.addEventListener('submit', function (event) {
    var eventData = this._serializeArray();
    var addEvent = document.createEvent('CustomEvent');

    addEvent.initCustomEvent('addEvent', true, true, {
      data: eventData
    });
    eventForm.dispatchEvent(addEvent);

    event.preventDefault();
  }.bind(this));

  var locationFieldElement = eventForm.querySelector('#event-form__event-location');
  this.locationAutoComplete = new LocationAutoCompelete(locationFieldElement);

  var startDateSelector = '#event-form__start-date';
  var startDateElement = document.querySelector(startDateSelector);
  this.setupDate(startDateElement);

  var endDateSelector = '#event-form__end-date';
  var endDateElement = document.querySelector(endDateSelector);
  this.setupDate(endDateElement);

  var timeStartSelector = '#event-form__start-time';
  var timeStartElement = document.querySelector(timeStartSelector);
  this.setupTime(timeStartElement);

  var timeEndSelector = '#event-form__end-time';
  var timeEndElement = document.querySelector(timeEndSelector);
  this.setupTime(timeEndElement);

  this.setupAutoDate(startDateElement, endDateElement);
}

EventForm.prototype.setupAutoDate = function (startDateElement, endDateElement) {
  var _this = this;

  startDateElement.addEventListener('change', function () {
    var startDate = startDateElement.parentNode.querySelector('.start-date__picker').date;
    var endDate = endDateElement.parentNode.querySelector('.start-date__picker').date;

    if (moment(startDate).isAfter(endDate)) {
      endDate = moment(startDate).add(1, 'days');
      endDateElement.value = _this._formatDate(endDate);
    }

  });

  endDateElement.addEventListener('change', function () {
    var startDate = startDateElement.date;
    var endDate = endDateElement.date;

    if (moment(endDate).isBefore(startDate)) {
      startDate = moment(startDate).subtract(1, 'days');
      startDateElement.value = _this._formatDate(startDate);
    }

  });
};

EventForm.prototype.setupDate = function (dateInputElement) {
  var _this = this;
  var parentElement = dateInputElement.parentElement;
  var dialogElement = parentElement.querySelector('.start-date__dialog');

  dateInputElement.addEventListener('focus', function () {
    dialogElement.open();
  });

  var datePickerElement = dialogElement.querySelector('.start-date__picker');
  var okButton = dialogElement.querySelector('.date-picker__ok-button');

  // click event is not triggered on mobile for the date picker
  okButton.addEventListener('touchend', function (event) {
    dateInputElement.value = _this._formatDate(datePickerElement.date);
    var changeEvent = document.createEvent('HTMLEvents');

    changeEvent.initEvent('change', true, true);
    dateInputElement.dispatchEvent(changeEvent);
    event.preventDefault();
  });

  okButton.addEventListener('click', function () {
    dateInputElement.value = _this._formatDate(datePickerElement.date);
  });

  // set the initial value to today's date
  dateInputElement.value = _this._formatDate(datePickerElement.date);
  _this.formValidation.addErrorMessage(dateInputElement);
};

EventForm.prototype.setupTime = function (timeInputElement) {
  var parentElement = timeInputElement.parentElement;
  var dialogElement = parentElement.querySelector('.time-dialog');

  timeInputElement.addEventListener('focus', function () {
    dialogElement.open();
  });

  var timePickerElement = dialogElement.querySelector('.time-picker');
  var okButton = dialogElement.querySelector('.time-ok-button');

  // click event is not triggered on mobile for the date picker
  okButton.addEventListener('touchend', function (event) {
    timeInputElement.value = timePickerElement.time;
    event.preventDefault();
  });

  okButton.addEventListener('click', function () {
    timeInputElement.value = timePickerElement.time;
  });

  // set the initial value
  timeInputElement.value = this._formatTime(Date.now());
  this.formValidation.addErrorMessage(timeInputElement);
};

EventForm.prototype._formatDate = function (date) {
  return moment(date).format('ddd LL');
};

EventForm.prototype._formatTime = function (time) {
  return moment(time).format('hh:mm A');
};

/**
 * Gets the form HTMLElement for event creation
 *
 * @return {HTMLElement} the event form element
 */
EventForm.prototype.getEventForm = function () {
  return document.querySelector(this.selector);
};


/**
 * Helper function to transform the form data into a
 * understandable object
 *
 * @return {Object} The transformed event data
 */
EventForm.prototype._serializeArray = function () {
  var eventForm = this.getEventForm();
  var eventData = [];

  for (var i = 0; i < eventForm.length; i++) {
    let element = eventForm.elements[0];

    if (element && element.nodeName.toLowerCase() === 'input') {
      eventData.push({
        name: element.name || '',
        value: element.value || ''
      });
    }
  }

  return eventData;
};

export default EventForm;
