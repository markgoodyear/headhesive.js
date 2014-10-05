/*!
 * headhesive v1.2.0 - An on-demand sticky header
 * Url: http://markgoodyear.com/labs/headhesive
 * Copyright (c) Mark Goodyear — @markgdyr — http://markgoodyear.com
 * License: MIT
 */
(function(window, document, undefined) {
  "use strict";
  var _mergeObj = function(to, from) {
    for (var p in from) {
      if (from.hasOwnProperty(p)) {
        to[p] = typeof from[p] === "object" ? _mergeObj(to[p], from[p]) : from[p];
      }
    }
    return to;
  };
  var _throttle = function(func, wait) {
    var _now = Date.now || function() {
      return new Date().getTime();
    };
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
  var _getScrollY = function() {
    return window.pageYOffset !== undefined ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
  };
  var _getElemY = function(elem) {
    var top = 0;
    while (elem) {
      top += elem.offsetTop;
      elem = elem.offsetParent;
    }
    return top;
  };
  var _getDataOptions = function(options) {
    return !options || !(typeof JSON === "object" && typeof JSON.parse === "function") ? {} : JSON.parse(options);
  };
  var Headhesive = function(elem, options) {
    if (!("querySelector" in document && "addEventListener" in window)) {
      return;
    }
    this.pastOffset = false;
    this.options = {
      offset: 300,
      clone: true,
      classes: {
        clone: "headhesive",
        stick: "headhesive--stick",
        unstick: "headhesive--unstick"
      },
      throttle: 250,
      onInit: function() {},
      onStick: function() {},
      onUnstick: function() {},
      onDestroy: function() {}
    };
    this.elem = typeof elem === "string" ? document.querySelector(elem) : elem;
    options = _getDataOptions(this.elem.dataset.headhesive);
    this.options = _mergeObj(this.options, options);
    this.init();
  };
  Headhesive.prototype = {
    constructor: Headhesive,
    init: function() {
      if (this.options.clone) {
        this.targetElem = this.elem.cloneNode(true);
        this.targetElem.className += " " + this.options.classes.clone;
        this.targetElem.removeAttribute("data-headhesive");
        document.body.insertBefore(this.targetElem, document.body.firstChild);
      } else {
        this.targetElem = this.elem;
        this.setTopSpacing = true;
        this.setTopSpacingHeight = this.targetElem.offsetHeight + "px";
      }
      this.scrollOffset = typeof this.options.offset === "string" ? _getElemY(document.querySelector(this.options.offset)) : this.scrollOffset = this.options.offset;
      this._throttleUpdate = _throttle(this.update.bind(this), this.options.throttle);
      window.addEventListener("scroll", this._throttleUpdate, false);
      this.options.onInit.call(this);
    },
    destroy: function() {
      if (this.clone) {
        document.body.removeChild(this.targetElem);
      }
      window.removeEventListener("scroll", this._throttleUpdate);
      this.options.onDestroy.call(this);
    },
    stick: function() {
      if (!this.pastOffset) {
        if (this.setTopSpacing) {
          document.documentElement.style.marginTop = this.setTopSpacingHeight;
        }
        this.targetElem.className = this.targetElem.className.replace(new RegExp("(^|\\s)*" + this.options.classes.unstick + "(\\s|$)*", "g"), " ");
        this.targetElem.className = this.targetElem.className.replace(new RegExp("(^|\\s)*" + "animating-out" + "(\\s|$)*", "g"), " ");
        this.targetElem.className += " " + this.options.classes.stick;
        this.pastOffset = true;
        this.options.onStick.call(this);
      }
    },
    unstick: function() {
      if (this.pastOffset) {
        if (this.setTopSpacing) {
          document.documentElement.style.marginTop = 0;
        }
        this.targetElem.className = this.targetElem.className.replace(new RegExp("(^|\\s)*" + this.options.classes.stick + "(\\s|$)*", "g"), " ");
        this.targetElem.className += " " + this.options.classes.unstick;
        this.pastOffset = false;
        this.options.onUnstick.call(this);
      }
    },
    update: function() {
      if (_getScrollY() > this.scrollOffset) {
        this.stick();
      } else {
        this.unstick();
      }
    }
  };
  window.Headhesive = Headhesive;
})(window, document);