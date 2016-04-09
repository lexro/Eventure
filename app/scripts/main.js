console.log('------------ Event Planner -------------');

(function () {
  function EventPlannerApp () {
    this.controller = new app.Controller();
  }

  var eventPlannerApp = new EventPlannerApp();

  var routes = {
    'home': function () {
      eventPlannerApp.controller.render('home');
    },
    'create': function () {
      eventPlannerApp.controller.render('event-creation');
    },
    'signup': function () {
      eventPlannerApp.controller.render('account-creation');
    }
  };

  $(document).on('click', 'a', function (event){
    var $this = $(this);
    var path = $this.attr('data-name');
    var route = routes[path];
    var state;

    if (route) {
      state = {
        path: path
      };
      history.pushState(state, null, '/' + path);
      route();
    }

    event.preventDefault();
    event.stopPropagation();
  });

  $(window).on('popstate', function (e) {
      var state = e.originalEvent.state;
      var route;

      if (state !== null) {
        route = routes[state.path];
        if (route) {
          route();
        }
      }
  });
})();
