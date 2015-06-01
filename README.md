# Headhesive.js
> An on-demand sticky header.

## What is it?
Headhesive.js creates an on-demand sticky header. Specify when you want your header to become fixed and the rest is magic. [View demo](http://markgoodyear.com/labs/headhesive/).

## Install
Install with npm:

```
npm install headhesive
```

Install with Bower:

```
bower install headhesive (or bower install headhesive.js)
```

## How to use?
Headhesive.js is a standalone JavaScript plugin with no dependencies. Include the [`headhesive.min.js`](dist/headhesive.min.js) *(from the [`dist/`](dist/) folder)* in the footer of your page and initialise it:

```javascript
// Create a new instance of Headhesive
var header = new Headhesive('.header');
```

### Styling Headhesive.js
Headhesive.js doesn't inject any CSS styles so you can use your own to completely control how your sticky element behaves. An [example is provided in the demo](demo/css/headhesive.css).

## Options
Customise how Headhesive.js works by passing in custom options.

```javascript
// Options
var options = {
  offset: 500
}

// Create a new instance of Headhesive.js and pass in some options
var header = new Headhesive('.header', options);
```

### Defaults

```javascript
{
  // Scroll offset. Accepts Number or "String" (for class/ID)
  offset: 300, // OR — offset: '.classToActivateAt',

  // If using a DOM element, we can choose which side to use as offset (top|bottom)
  offsetSide: 'top',

  // Custom classes
  classes: {

    // Cloned elem class
    clone: 'headhesive',

    // Stick class
    stick: 'headhesive--stick',

    // Unstick class
    unstick: 'headhesive--unstick'
  },

  // Throttle scroll event to fire every 250ms to improve performace
  throttle: 250,

  // Callbacks
  onInit:    function () {},
  onStick:   function () {},
  onUnstick: function () {},
  onDestroy: function () {},
}
```

## Destroy method
To destroy an instance of Headhesive.js, you can call the destroy method:

```javascript
header.destroy();
```

## Browser support
IE9+ and modern browsers.

## License
Headesive.js is licensed under the [MIT License](LICENSE).

## Demo
There is a demo available in the [demo folder](demo/) and online at [http://markgoodyear.com/labs/headhesive/](http://markgoodyear.com/labs/headhesive/).
