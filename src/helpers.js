/**
 * Merge objects
 * @param  {Object} to
 * @param  {Object} from
 * @return {Object}
 */
var _mergeObj = function (to, from) {
  for (var p in from) {
    if (from.hasOwnProperty(p)) {
      to[p] = (typeof from[p] === 'object') ? _mergeObj(to[p], from[p]) : from[p];
    }
  }

  return to;
};

/**
 * Throttle, borrowed from Underscore.js
 */
var _throttle = function (func, wait) {
  var _now =  Date.now || function () { return new Date().getTime(); };
  var context, args, result;
  var timeout = null;
  var previous = 0;
  var later = function () {
    previous = _now();
    timeout = null;
    result = func.apply(context, args);
    context = args = null;
  };

  return function () {
    var now = _now();
    var remaining = wait - (now - previous);
    context = this;
    args = arguments;

    if (remaining <= 0) {
      clearTimeout(timeout);
      timeout = null;
      previous = now;
      result = func.apply(context, args);
      context = args = null;
    } else if (!timeout) {
      timeout = setTimeout(later, remaining);
    }

    return result;
  };
};

/**
 * Get current Y posistion
 * @return {Number}
 */
var _getScrollY = function () {
  return (window.pageYOffset !== undefined) ?
      window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
};

/**
 * Get elements Y position
 * @param  {Object | Number} elem - The element
 * @param  {String}          side - Elem side (top or bottom)
 * @return {Number}
 */
var _getElemY = function (elem, side) {
  var pos = 0;
  var elemHeight = elem.offsetHeight;

  while (elem) {
    pos += elem.offsetTop;
    elem = elem.offsetParent;
  }

  if (side === 'bottom') {
    pos = pos + elemHeight;
  }

  return pos;
};
