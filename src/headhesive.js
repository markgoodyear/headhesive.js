(function (window, document, undefined) {

  'use strict';

  //= helpers.js

  /**
   * Constructor
   */
  var Headhesive = function (elem, options) {

    // Return if feature test fails
    if (! ('querySelector' in document && 'addEventListener' in window) ) {
      return;
    }

    // Initial state
    this.pastOffset = false;

    // Options
    this.options = {
      offset:    300,
      clone:     false,
      classes: {
        clone:   'headhesive',
        stick:   'headhesive--stick',
        unstick: 'headhesive--unstick'
      },
      throttle:  250,
      onInit:    function () {},
      onStick:   function () {},
      onUnstick: function () {},
      onDestroy: function () {},
    };

    // Get elem, check if string, if not assume object passed in
    this.elem = (typeof elem === 'string') ? document.querySelector(elem) : elem;

    // Merge user options with default options
    this.options = _mergeObj(this.options, options);

    // Self init
    this.init();
  };

  /**
   * Headhesive prototype methods
   */
  Headhesive.prototype = {

    constructor: Headhesive,

    /**
     * Initialise Headhesive
     */
    init: function () {

      // Clone element if defined
      if (this.options.clone) {
        this.targetElem = this.elem.cloneNode(true);
        this.targetElem.className += ' ' + this.options.classes.clone;
        document.body.insertBefore(this.targetElem, document.body.firstChild);
      } else {
        this.targetElem = this.elem;
        this.setTopSpacing = true;
        this.setTopSpacingHeight = this.targetElem.offsetHeight + 'px';
      }

      // Determin offset value
      this.scrollOffset = typeof this.options.offset === 'string'
        ? _getElemY(document.querySelector(this.options.offset))
        : this.scrollOffset = this.options.offset;

      // Throttled scroll
      this._throttleUpdate = _throttle(this.update.bind(this), this.options.throttle);

      window.addEventListener('scroll', this._throttleUpdate, false);
      this.options.onInit.call(this);
    },

    /**
     * Clean up DOM and remove events
     */
    destroy: function () {
      if (this.clone) {
        document.body.removeChild(this.targetElem);
      }

      window.removeEventListener('scroll', this._throttleUpdate);
      this.options.onDestroy.call(this);
    },

    /**
     * Logic for sticking element
     */
    stick: function () {
      if (!this.pastOffset) {
        if (this.setTopSpacing) {
          document.documentElement.style.marginTop = this.setTopSpacingHeight;
        }

        this.targetElem.className = this.targetElem.className.replace(new RegExp('(^|\\s)*' + this.options.classes.unstick + '(\\s|$)*', 'g'), ' ');
        this.targetElem.className = this.targetElem.className.replace(new RegExp('(^|\\s)*' + 'animating-out' + '(\\s|$)*', 'g'), ' ');
        this.targetElem.className += ' ' + this.options.classes.stick;
        this.pastOffset = true;
        this.options.onStick.call(this);
      }
    },

    /**
     * Logic for unsticking element
     */
    unstick: function () {
      if (this.pastOffset) {
        if (this.setTopSpacing) {
          document.documentElement.style.marginTop = 0;
        }

        this.targetElem.className = this.targetElem.className.replace(new RegExp('(^|\\s)*' + this.options.classes.stick + '(\\s|$)*', 'g'), ' ');
        this.targetElem.className += ' ' + this.options.classes.unstick;
        this.pastOffset = false;
        this.options.onUnstick.call(this);
      }
    },

    /**
     * Update status of elem
     */
    update: function () {
      if (_getScrollY() > this.scrollOffset) {
        this.stick();
      } else {
        this.unstick();
      }
    },

  };

  window.Headhesive = Headhesive;

})(window, document);
