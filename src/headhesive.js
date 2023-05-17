import { mergeObj, throttle, getScrollY, getElemY } from "./helpers.js";

(function (root, factory) {
  if (typeof define === "function" && define.amd) {
    define([], function () {
      return factory();
    });
  } else if (typeof exports === "object") {
    module.exports = factory();
  } else {
    root.Headhesive = factory();
  }
})(this, function () {
  "use strict";

  var Headhesive = function (elem, options) {
    if (!("querySelector" in document && "addEventListener" in window)) {
      return;
    }

    this.visible = false;

    this.options = {
      offset: 300,
      offsetSide: "top",
      classes: {
        clone: "headhesive",
        stick: "headhesive--stick",
        unstick: "headhesive--unstick",
      },
      throttle: 250,
      onInit: function () {},
      onStick: function () {},
      onUnstick: function () {},
      onDestroy: function () {},
    };

    this.elem = typeof elem === "string" ? document.querySelector(elem) : elem;
    this.options = mergeObj(this.options, options);
    this.init();
  };

  Headhesive.prototype = {
    constructor: Headhesive,

    init: function () {
      this.clonedElem = this.elem.cloneNode(true);
      this.clonedElem.className += " " + this.options.classes.clone;
      document.body.insertBefore(this.clonedElem, document.body.firstChild);

      if (typeof this.options.offset === "number") {
        this.scrollOffset = this.options.offset;
      } else if (typeof this.options.offset === "string") {
        this.setScrollOffset();
      } else {
        throw new Error("Invalid offset: " + this.options.offset);
      }

      this.throttleUpdate = throttle(
        this.update.bind(this),
        this.options.throttle
      );
      this.throttleScrollOffset = throttle(
        this.setScrollOffset.bind(this),
        this.options.throttle
      );

      window.addEventListener("scroll", this.throttleUpdate, false);
      window.addEventListener("resize", this.throttleScrollOffset, false);
      this.options.onInit.call(this);
    },

    setScrollOffset: function () {
      if (typeof this.options.offset === "string") {
        this.scrollOffset = getElemY(
          document.querySelector(this.options.offset),
          this.options.offsetSide
        );
      }
    },

    destroy: function () {
      document.body.removeChild(this.clonedElem);
      window.removeEventListener("scroll", this.throttleUpdate);
      window.removeEventListener("resize", this.throttleScrollOffset);
      this.options.onDestroy.call(this);
    },

    stick: function () {
      if (!this.visible) {
        this.clonedElem.className = this.clonedElem.className.replace(
          new RegExp(
            "(^|\\s)*" + this.options.classes.unstick + "(\\s|$)*",
            "g"
          ),
          ""
        );
        this.clonedElem.className += " " + this.options.classes.stick;
        this.visible = true;
        this.options.onStick.call(this);
      }
    },

    unstick: function () {
      if (this.visible) {
        this.clonedElem.className = this.clonedElem.className.replace(
          new RegExp("(^|\\s)*" + this.options.classes.stick + "(\\s|$)*", "g"),
          ""
        );
        this.clonedElem.className += " " + this.options.classes.unstick;
        this.visible = false;
        this.options.onUnstick.call(this);
      }
    },
    update: function () {
      if (getScrollY() > this.scrollOffset) {
        this.stick();
      } else {
        this.unstick();
      }
    },
  };

  return Headhesive;
});
