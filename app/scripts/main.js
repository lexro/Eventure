console.log('------------ Event Planner -------------');

(function () {
  function EventPlannerApp () {
    this.controller = new app.Controller();
  }

  var eventPlannerApp = new EventPlannerApp();

  var routes = {
    '/': function () {
      eventPlannerApp.controller.render('home');
    },
    '/create': function () {
      eventPlannerApp.controller.render('event-creation');
    },
    '/signup': function () {
      eventPlannerApp.controller.render('account-creation');
    },
    '/display': function () {
      eventPlannerApp.controller.render('event-display');
    }
  };

  /**
   * Triggers view if route exists and pushes to history stack
   *
   * @param {String} path the pathname of the route
   */
  function setView(path) {
    var route = routes[path];
    var state;

    if (route) {
      state = {
        path: path
      };
      history.pushState(state, null, path);
      route();
    }
  }

  $(document).on('click', 'a', function (event){
    var $this = $(this);
    var path = '/' + $this.attr('data-name');
    var target = $this.attr('target');

    // allow for external links to another window
    if (target !== '_blank') {
      setView(path);

      event.preventDefault();
      event.stopPropagation();
    }
  });

  $(window).on('popstate', function (event) {
      var state = event.originalEvent.state;
      var route;

      if (state !== null) {
        route = routes[state.path];
        if (route) {
          route();
        }
      }
  });

  $(window).on('load', function () {
    var path = decodeURI(location.pathname);

    setView(path);
  });
})();
