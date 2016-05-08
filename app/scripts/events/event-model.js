import guid from '../utils/guid';

function EventModel () {
  this.events = {
    1: {
      location: '111 1st, San Francisco, CA, United States',
      title: 'Event Title 1',
      startTime: '12:00pm',
      startDate: 'Wed Aug 6, 2017',
      endTime: '2:00pm',
      endDate: 'Wed Aug 6, 2017',
      type: 'Birthday',
      host: 'Me',
      description: 'For blah blah\'s birthday',
      members: ['you', 'sister', 'brother', 'friend']
    },
    2: {
      location: '111 1st, San Francisco, CA, United States',
      title: 'Event Title 1',
      startTime: '12:00pm',
      startDate: 'Wed Aug 6, 2017',
      endTime: '2:00pm',
      endDate: 'Wed Aug 6, 2017',
      type: 'Birthday',
      host: 'Me',
      description: 'For blah blah\'s birthday',
      members: ['you', 'sister', 'brother', 'friend']
    },
    3: {
      location: '111 1st, San Francisco, CA, United States',
      title: 'Event Title 1',
      startTime: '12:00pm',
      startDate: 'Wed Aug 6, 2017',
      endTime: '2:00pm',
      endDate: 'Wed Aug 6, 2017',
      type: 'Birthday',
      host: 'Me',
      description: 'For blah blah\'s birthday',
      members: ['you', 'sister', 'brother', 'friend']
    },
    4: {
      location: '111 1st, San Francisco, CA, United States',
      title: 'Event Title 1',
      startTime: '12:00pm',
      startDate: 'Wed Aug 6, 2017',
      endTime: '2:00pm',
      endDate: 'Wed Aug 6, 2017',
      type: 'Birthday',
      host: 'Me',
      description: 'For blah blah\'s birthday',
      members: ['you', 'sister', 'brother', 'friend']
    },
    5: {
      location: '111 1st, San Francisco, CA, United States',
      title: 'Event Title 1',
      startTime: '12:00pm',
      startDate: 'Wed Aug 6, 2017',
      endTime: '2:00pm',
      endDate: 'Wed Aug 6, 2017',
      type: 'Birthday',
      host: 'Me',
      description: 'For blah blah\'s birthday',
      members: ['you', 'sister', 'brother', 'friend']
    }
  };
  this.propertyMap = {
    location: 'location',
    title: 'title',
    startTime: 'startTime',
    startDate: 'startDate',
    endTime: 'endTime',
    endDate: 'endDate',
    type: 'type',
    host: 'host',
    description: 'description',
    members: 'members'
  };
}

EventModel.prototype.getEvents = function () {
  return this.events;
};

EventModel.prototype.addEvent = function (eventData) {
  var event = this._transformEventData(eventData);
  var uid = guid();

  this.events[uid] = event;
};

EventModel.prototype._transformEventData = function (eventData) {
  var event = {};

  for (var i = 0; i < eventData.length; i++) {
    var inputData = eventData[i];
    var property = this.propertyMap[inputData.name];
    if (property) {
      event[property] = inputData.value;
    }
  }

  return event;
};

export default EventModel;
