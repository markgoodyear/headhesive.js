(function(window, document, undefined) {

    'use strict';

    //= helpers.js

    // Pirvate vars
    var _throttleUpdate;

    /**
     * Constructor
     */
    var Headhesive = function (elem, options) {

        // Return if feature test fails
        if (! ('querySelector' in document && 'addEventListener' in window) ) {
            return;
        }

        // Initial state
        this.visible = false;

        // Options
        this.options = {
            offset: 300,
            classes: {
                base:    'headhesive',
                stick:   'headhesive--stick',
                unstick: 'headhesive--unstick'
            },
            throttle: 250,
            onInit: function() {},
            onStick: function() {},
            onUnstick: function() {},
            onDestroy: function() {},
        };

        // Get elem
        this.elem = document.querySelector(elem);

        // Merge user options with default options
        this.options = _mergeObj(this.options, options);
    };


    /**
     * Headhesive prototype methods
     */
    Headhesive.prototype = {

        constructor: Headhesive,

        /**
         * Initialise Headhesive
         */
        init: function() {

            // Clone element
            this.clonedElem = this.elem.cloneNode(true);
            this.clonedElem.className += ' ' + this.options.classes.clone;
            document.body.insertBefore(this.clonedElem, document.body.firstChild);

            // Determin offset value (number || string)
            if (typeof this.options.offset === 'number') {
                this.scrollOffset = this.options.offset;

            } else if (typeof this.options.offset === 'string') {
                this.scrollOffset = _getElemY(document.querySelector(this.options.offset));

            } else {
                throw new Error('Invalid offset: ' + this.options.offset);
            }

            // Throttled scroll
            _throttleUpdate = _throttle(this.update.bind(this), this.options.throttle);

            window.addEventListener('scroll', _throttleUpdate, false);
            this.options.onInit.call(this);
        },

        /**
         * Clean up DOM and remove events
         */
        destroy: function() {
            document.body.removeChild(this.clonedElem);
            window.removeEventListener('scroll', _throttleUpdate);
            this.options.onDestroy.call(this);
        },

        /**
         * Logic for sticking element
         */
        stick: function() {
            if (!this.visible) {
                this.clonedElem.className = this.clonedElem.className.replace(new RegExp('(^|\\s)*' + this.options.classes.unstick + '(\\s|$)*', 'g'), '');
                this.clonedElem.className += ' ' + this.options.classes.stick;
                this.visible = true;
                this.options.onStick.call(this);
            }
        },

        /**
         * Logic for unsticking element
         */
        unstick: function() {
            if (this.visible) {
                this.clonedElem.className = this.clonedElem.className.replace(new RegExp('(^|\\s)*' + this.options.classes.stick + '(\\s|$)*', 'g'), '');
                this.clonedElem.className += ' ' + this.options.classes.unstick;
                this.visible = false;
                this.options.onUnstick.call(this);
            }
        },

        /**
         * Update status of elem
         */
        update: function() {
            if (_getScrollY() > this.scrollOffset) {
                this.stick();
            } else {
                this.unstick();
            }
        },

    };

    window.Headhesive = Headhesive;

}(window, document));
