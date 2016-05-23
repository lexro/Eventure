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
    if (eventForm.checkValidity()) {
      var eventData = this._serializeArray();
      var addEvent = document.createEvent('CustomEvent');

      addEvent.initCustomEvent('addEvent', true, true, {
        data: eventData
      });
      eventForm.dispatchEvent(addEvent);
      event.preventDefault();
    }
  }.bind(this));

  var locationFieldElement = eventForm.querySelector('#event-form__event-location');
  this.locationAutoComplete = new LocationAutoCompelete(locationFieldElement);

  var startDateSelector = '#event-form__start-date';
  this.startDateElement = document.querySelector(startDateSelector);
  this._setupDate(this.startDateElement);

  var endDateSelector = '#event-form__end-date';
  this.endDateElement = document.querySelector(endDateSelector);
  this._setupDate(this.endDateElement);

  var timeStartSelector = '#event-form__start-time';
  this.timeStartElement = document.querySelector(timeStartSelector);
  this._setupTime(this.timeStartElement);

  var timeEndSelector = '#event-form__end-time';
  this.timeEndElement = document.querySelector(timeEndSelector);
  this._setupTime(this.timeEndElement);

  this._setupAutoDate(this.startDateElement, this.endDateElement);
  this._setupAutoTime();
}

EventForm.prototype._setupAutoDate = function (startDateElement, endDateElement) {
  var _this = this;

  startDateElement.addEventListener('change', function () {
    var startDate = startDateElement.value;
    var endDate = endDateElement.value;

    if (moment(startDate).isAfter(endDate)) {
      endDate = moment(startDate).add(1, 'days');
      endDateElement.value = _this._formatDate(endDate);
      _this._timeValidation(true);
    } else if(moment(endDate).isAfter(startDate)) {
      _this._timeValidation(true);
    } else {
      _this._timeValidation();
    }
  });

  endDateElement.addEventListener('change', function () {
    var startDate = startDateElement.value;
    var endDate = endDateElement.value;

    if (moment(endDate).isBefore(startDate)) {
      startDate = moment(endDate).subtract(1, 'days');
      startDateElement.value = _this._formatDate(startDate);
      _this._timeValidation(true);
    } else if(moment(endDate).isAfter(startDate)) {
      _this._timeValidation(true);
    } else {
      _this._timeValidation();
    }
  });
};

EventForm.prototype._setupAutoTime = function () {
  var timeStartElement = this.timeStartElement;
  var timeEndElement = this.timeEndElement;

  timeStartElement.addEventListener('change', this._timeValidation.bind(this));
  timeEndElement.addEventListener('change', this._timeValidation.bind(this));
};

EventForm.prototype._timeValidation = function (override) {
  var timeStartElement = this.timeStartElement;
  var timeEndElement = this.timeEndElement;
  var startDate = this.startDateElement.value;
  var endDate = this.endDateElement.value;

  if(override && typeof override === 'boolean') {
    timeStartElement.setCustomValidity('');
    timeEndElement.setCustomValidity('');
  } else if (moment(startDate).isSame(endDate)) {
    var startTimePicker = timeStartElement.parentNode.querySelector('.time-picker');
    var endTimePicker = timeEndElement.parentNode.querySelector('.time-picker');
    var startTime = this._getRawValue(startTimePicker);
    var endTime = this._getRawValue((endTimePicker));

    if (startTime > endTime) {
      timeStartElement.setCustomValidity('Start time must come before end time');
      timeEndElement.setCustomValidity('End time must come after start time');
    } else {
      timeStartElement.setCustomValidity('');
      timeEndElement.setCustomValidity('');
    }
  }

  this.formValidation.addErrorMessage(timeStartElement);
  this.formValidation.addErrorMessage(timeEndElement);
};

/**
 * The polymer time picker does not have a good way to compare times so
 * this is a way to do that
 */
EventForm.prototype._getRawValue = function (timePicker) {
  var hour = timePicker.hour;
  var minute = timePicker.minute;
  var period = timePicker.period;

  if (period.toLowerCase() === 'pm' && hour < 12) {
    hour = 12 + hour;
  } else if (period.toLowerCase() === 'am' && hour == 12) {
    hour = 0;
  }

  return hour * 60 + minute;
};

/**
 * Setup the date field to work with the date ui
 */
EventForm.prototype._setupDate = function (dateInputElement) {
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
    var changeEvent = document.createEvent('HTMLEvents');

    changeEvent.initEvent('change', true, true);
    dateInputElement.dispatchEvent(changeEvent);
  });

  this._initDate(dateInputElement);
};

/**
 * Setup the time field with the time ui
 */
EventForm.prototype._setupTime = function (timeInputElement) {
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
    var changeEvent = document.createEvent('HTMLEvents');

    changeEvent.initEvent('change', true, true);
    timeInputElement.dispatchEvent(changeEvent);
    event.preventDefault();
  });

  okButton.addEventListener('click', function () {
    timeInputElement.value = timePickerElement.time;
    var changeEvent = document.createEvent('HTMLEvents');

    changeEvent.initEvent('change', true, true);
    timeInputElement.dispatchEvent(changeEvent);
  });

  this._initTime(timeInputElement);
};

EventForm.prototype._formatDate = function (date) {
  return moment(date).format('ddd LL');
};

EventForm.prototype._formatTime = function (time) {
  return moment(time).format('hh:mm A');
};

EventForm.prototype._initDate = function (dateInputElement) {
  dateInputElement.value = this._formatDate(Date.now());
  this.formValidation.addErrorMessage(dateInputElement);
};

EventForm.prototype._initTime = function (timeInputElement) {
  var now = this._formatTime(Date.now());
  var timePicker = timeInputElement.parentElement.querySelector('.time-picker');
  timePicker.time = now;
  timeInputElement.value = now;
  this.formValidation.addErrorMessage(timeInputElement);
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
    let element = eventForm.elements[i];

    if (element && element.nodeName.toLowerCase() === 'input') {
      eventData.push({
        name: element.name || '',
        value: element.value || ''
      });
    }
  }

  return eventData;
};

/**
 * Reset form to original state.
 */
EventForm.prototype.reset = function () {
  var eventForm = this.getEventForm();

  // reset validation
  for (var i = 0; i < eventForm.length; i++) {
    let element = eventForm.elements[i];

    if (element && element.nodeName.toLowerCase() === 'input') {
      this.formValidation.reset(element);
    }
  }

  // clear fields
  eventForm.reset();

  // initialize date and time
  this._initTime(this.timeStartElement);
  this._initTime(this.timeEndElement);
  this._initDate(this.startDateElement);
  this._initDate(this.endDateElement);
};

export default EventForm;
