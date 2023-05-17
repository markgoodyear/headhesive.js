/**
 * Merge objects
 * @param  {Object} to
 * @param  {Object} from
 * @return {Object}
 */
export const mergeObj = function (to, from) {
  for (let p in from) {
    if (Object.prototype.hasOwnProperty.call(from, p)) {
      to[p] = typeof from[p] === "object" ? mergeObj(to[p], from[p]) : from[p];
    }
  }

  return to;
};

/**
 * Throttle, borrowed from Underscore.js
 */
export const throttle = function (func, wait) {
  const now =
    Date.now ||
    function () {
      return new Date().getTime();
    };
  let context, args, result;
  let timeout = null;
  let previous = 0;
  const later = function () {
    previous = now();
    timeout = null;
    result = func.apply(context, args);
    context = args = null;
  };

  return function () {
    const now = Date.now();
    const remaining = wait - (now - previous);
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
 * Get current Y position
 * @return {Number}
 */
export const getScrollY = function () {
  return window.scrollY !== undefined
    ? window.scrollY
    : (document.documentElement || document.body.parentNode || document.body)
        .scrollTop;
};

/**
 * Get elements Y position
 * @param  {Object | Number} elem - The element
 * @param  {String}          side - Elem side (top or bottom)
 * @return {Number}
 */
export const getElemY = function (elem, side) {
  let pos = 0;
  const elemHeight = elem.offsetHeight;

  while (elem) {
    pos += elem.offsetTop;
    elem = elem.offsetParent;
  }

  if (side === "bottom") {
    pos = pos + elemHeight;
  }

  return pos;
};
