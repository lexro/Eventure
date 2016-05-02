import DisplayEvents from './events/display-events';
import EventForm from './events/event-form';
import EventModel from './events/event-model';
import AccountForm from './accounts/account-form';
import AccountCreation from './accounts/account-creation';

function Controller () {
  this.eventModel = new EventModel();
  this.eventForm = new EventForm();
  this.displayEvents = new DisplayEvents();
  this.accountForm = new AccountForm();

  var $eventForm = this.eventForm.getEventForm();
  $eventForm.on('addEvent', this._addEvent.bind(this));
}

/**
 * Hides any visible page and shows the page given
 * a view type
 *
 * @param  {String} viewType view to show
 */
Controller.prototype.render = function (viewType) {
  var viewClass;
  $('.page').removeClass('visible');

  viewClass = '.' + viewType;
  $(viewClass).addClass('visible');
};

Controller.prototype.renderDisplayEvents = function () {
  var stubEvents = this.eventModel.getEvents();
  var displayEventHTML = this.displayEvents.generateHTML(stubEvents);
  var displayEventContainer = document.querySelectorAll('.event-display__container')[0];

  displayEventContainer.innerHTML = displayEventHTML;
  this.render('event-display');
};

Controller.prototype._addEvent = function(event, eventData) {
  this.eventModel.addEvent(eventData.data);
  event.stopPropagation();
};

export default Controller;
