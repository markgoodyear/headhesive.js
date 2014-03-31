/**
 * _mergeObj
 * @description Mrge objects
 */
var _mergeObj = function(to, from) {
    for (var p in from) {
        if (from.hasOwnProperty(p)) {
            to[p] = (typeof from[p] === 'object') ? _mergeObj(to[p], from[p]) : from[p];
        }
    }
    return to;
};


/**
 * _throttle
 * @description Borrowed from Underscore.js
 */
var _throttle = function(func, wait) {
    var _now =  Date.now || function() { return new Date().getTime(); };
    var context, args, result;
    var timeout = null;
    var previous = 0;
    var later = function() {
      previous = _now();
      timeout = null;
      result = func.apply(context, args);
      context = args = null;
    };
    return function() {
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
 * _getScrollY
 * @description Get current Y posistion
 */
var _getScrollY = function() {
    return (window.pageYOffset !== undefined) ?
            window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
};


/**
 * _getElemY
 * @description Get Y posistion of an element
 */
function _getElemY(elem) {
    var top = 0;
    while(elem) {
        top += elem.offsetTop;
        elem = elem.offsetParent;
    }
    return top;
}
