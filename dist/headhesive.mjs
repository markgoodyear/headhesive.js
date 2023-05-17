const u = function(t, e) {
  for (let s in e)
    Object.prototype.hasOwnProperty.call(e, s) && (t[s] = typeof e[s] == "object" ? u(t[s], e[s]) : e[s]);
  return t;
}, h = function(t, e) {
  const s = Date.now || function() {
    return (/* @__PURE__ */ new Date()).getTime();
  };
  let i, o, l, n = null, c = 0;
  const d = function() {
    c = s(), n = null, l = t.apply(i, o), i = o = null;
  };
  return function() {
    const r = Date.now(), f = e - (r - c);
    return i = this, o = arguments, f <= 0 ? (clearTimeout(n), n = null, c = r, l = t.apply(i, o), i = o = null) : n || (n = setTimeout(d, f)), l;
  };
}, a = function() {
  return window.scrollY !== void 0 ? window.scrollY : (document.documentElement || document.body.parentNode || document.body).scrollTop;
}, p = function(t, e) {
  let s = 0;
  const i = t.offsetHeight;
  for (; t; )
    s += t.offsetTop, t = t.offsetParent;
  return e === "bottom" && (s = s + i), s;
};
(function(t, e) {
  typeof define == "function" && define.amd ? define([], function() {
    return e();
  }) : typeof exports == "object" ? module.exports = e() : t.Headhesive = e();
})(globalThis, function() {
  var t = function(e, s) {
    "querySelector" in document && "addEventListener" in window && (this.visible = !1, this.options = {
      offset: 300,
      offsetSide: "top",
      classes: {
        clone: "headhesive",
        stick: "headhesive--stick",
        unstick: "headhesive--unstick"
      },
      throttle: 250,
      onInit: function() {
      },
      onStick: function() {
      },
      onUnstick: function() {
      },
      onDestroy: function() {
      }
    }, this.elem = typeof e == "string" ? document.querySelector(e) : e, this.options = u(this.options, s), this.init());
  };
  return t.prototype = {
    constructor: t,
    init: function() {
      if (this.clonedElem = this.elem.cloneNode(!0), this.clonedElem.className += " " + this.options.classes.clone, document.body.insertBefore(this.clonedElem, document.body.firstChild), typeof this.options.offset == "number")
        this.scrollOffset = this.options.offset;
      else if (typeof this.options.offset == "string")
        this.setScrollOffset();
      else
        throw new Error("Invalid offset: " + this.options.offset);
      this.throttleUpdate = h(
        this.update.bind(this),
        this.options.throttle
      ), this.throttleScrollOffset = h(
        this.setScrollOffset.bind(this),
        this.options.throttle
      ), window.addEventListener("scroll", this.throttleUpdate, !1), window.addEventListener("resize", this.throttleScrollOffset, !1), this.options.onInit.call(this);
    },
    setScrollOffset: function() {
      typeof this.options.offset == "string" && (this.scrollOffset = p(
        document.querySelector(this.options.offset),
        this.options.offsetSide
      ));
    },
    destroy: function() {
      document.body.removeChild(this.clonedElem), window.removeEventListener("scroll", this.throttleUpdate), window.removeEventListener("resize", this.throttleScrollOffset), this.options.onDestroy.call(this);
    },
    stick: function() {
      this.visible || (this.clonedElem.className = this.clonedElem.className.replace(
        new RegExp(
          "(^|\\s)*" + this.options.classes.unstick + "(\\s|$)*",
          "g"
        ),
        ""
      ), this.clonedElem.className += " " + this.options.classes.stick, this.visible = !0, this.options.onStick.call(this));
    },
    unstick: function() {
      this.visible && (this.clonedElem.className = this.clonedElem.className.replace(
        new RegExp("(^|\\s)*" + this.options.classes.stick + "(\\s|$)*", "g"),
        ""
      ), this.clonedElem.className += " " + this.options.classes.unstick, this.visible = !1, this.options.onUnstick.call(this));
    },
    update: function() {
      a() > this.scrollOffset ? this.stick() : this.unstick();
    }
  }, t;
});
