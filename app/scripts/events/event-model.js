import guid from '../utils/guid';

function EventModel () {
  this.events = {};
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
