console.log('------------ Evently -------------');
import Controller from './controller';

(function () {
  function EventPlannerApp () {
    this.controller = new Controller();
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
      eventPlannerApp.controller.renderDisplayEvents();
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
      //history.pushState(state, null, path);
      route();
    }
  }

  // global click handler for routing
  document.addEventListener('click', function (event) {
    var element = event && event.target;

    if (element && element.nodeName.toLowerCase() === 'a') {
      var path = '/' + element.getAttribute('data-name');
      var target = element.getAttribute('target');

      // allow for external links to another window
      if (target !== '_blank') {
        setView(path);

        event.preventDefault();
        event.stopPropagation();
      }
    }
  });

  // simulate a navigate to previous page
  window.addEventListener('popstate', function (event) {
    var state = event.state;
    var route;

    if (state !== null) {
      route = routes[state.path];
      if (route) {
        route();
      }
    }
  });

  // trigger on loading of the app
  window.addEventListener('load', function (event) {
    var path = decodeURI(location.pathname);

    setView(path);
  });
})();
