import DisplayEvents from './events/display-events';

function Controller () {
  this.displayEvents = new DisplayEvents();
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

  var stubEvents = {
    event1: {
      location: 'Hawaii',
      title: 'Event 1',
      startTime: '2:00 pm',
      startDate: 'January 8, 2017',
      endTime: '8:00 pm',
      endDate: 'January 8, 2017',
      type: 'Birthday',
      host: 'Lex',
      description: 'Birthday party for blah blah!',
      members: ['a', 'b', 'c', 'd']
    },
    event2: {
      location: 'San Francsco',
      title: 'Event 2',
      startTime: '2:00 pm',
      startDate: 'January 8, 2017',
      endTime: '8:00 pm',
      endDate: 'January 8, 2017',
      type: 'Birthday',
      host: 'Lex',
      description: 'Birthday party for blah blah!',
      members: ['a', 'b', 'c', 'd']
    }
  };

  var displayEventHTML = this.displayEvents.generateHTML(stubEvents);
  var displayEventContainer = document.querySelectorAll('.event-display__container')[0];

  displayEventContainer.innerHTML = displayEventHTML;
  this.render('event-display');
};

export default Controller;
