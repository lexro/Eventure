function Controller () {

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

export default Controller;
