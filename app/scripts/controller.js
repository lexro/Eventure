import DisplayEvents from './events/display-events';
import EventForm from './events/event-form';
import EventModel from './events/event-model';
import AccountForm from './accounts/account-form';

function Controller () {
  this.eventModel = new EventModel();
  this.eventForm = new EventForm();
  this.displayEvents = new DisplayEvents();
  this.accountForm = new AccountForm();

  var eventForm = this.eventForm.getEventForm();
  eventForm.addEventListener('addEvent', this._addEvent.bind(this));
}

/**
 * Hides any visible page and shows the page given
 * a view type
 *
 * @param  {String} viewType view to show
 */
Controller.prototype.render = function (viewType) {
  var viewClass;
  var pages = document.querySelectorAll('.page');

  for (var i = 0; i < pages.length; i++) {
    pages[i].classList.remove('visible');
  }

  viewClass = '.' + viewType;
  document.querySelector(viewClass).classList.add('visible');
};

Controller.prototype.renderDisplayEvents = function () {
  var stubEvents = this.eventModel.getEvents();
  var displayEventHTML = this.displayEvents.generateHTML(stubEvents);
  var displayEventContainer = document.querySelectorAll('.event-display__container')[0];

  displayEventContainer.innerHTML = displayEventHTML;
  this.render('event-display');
};

Controller.prototype._addEvent = function(event) {
  this.eventModel.addEvent(event.detail.data);
  event.stopPropagation();
};

export default Controller;
