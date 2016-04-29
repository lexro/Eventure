function EventForm () {
  this.selector = '.event-form';

  $(this.selector).submit(function (event) {
    var $eventForm= $(this);
    var eventData = $eventForm.serializeArray();
    var addEvent = $.Event('addEvent');

    $eventForm.trigger(addEvent, {
      data: eventData
    });
    event.preventDefault();
  });
}

EventForm.prototype.getEventForm = function () {
  return $(this.selector);
};


export default EventForm;
