# Headhesive.js
> An on-demand sticky header.

## What is it?
Headhesive.js creates an on-demand sticky header. Specify when you want your header to become fixed and the rest is magic.

## How to use?
Headhesive.js is a standalone JavaScript plugin with no dependancies. Include the headhesive.min.js in the footer of your page and initialise it:

```javascript
// Create a new instance of Headhesive
var headhesive = new Headhesive('.header');

// Initialise instance
headhesive.init();
```

### Styling Headhesive.js
Headhesive.js doesn't inject any CSS styles so you can use your own to completely control how your sticky element behaves. An [example is provided in the demo](demo/css/headhesive.css).

## Options
Customise how Headhesive works by passing in custom options.

```javascript
// Options
var options = {
    offset: 500
}

// Create a new instance of Headhesive and pass in options
var headhesive = new Headhesive('.header', options);

// Initialise instance
headhesive.init();
```

### Defaults

```javascript
{
    // Scroll offset. Accepts Number or "String" (for class/ID)
    offset: 300, // OR — offset: '.classToActivateAt',

    // Custom classes
    classes: {

        // Main class
        main: 'headhesive',

        // Class to add when element is shown
        show: 'headhesive--stick',

        // Class to add when element is hidden
        hide: 'headhesive--unstick'
    },

    // Throttle scroll event to fire every 250ms to improve performace
    throttle: 250,

    // Callbacks
    onInit: function() {},
    onShow: function() {},
    onHide: function() {},
    onDestroy: function() {},
}
```

## Destroy method
To destroy an instance of Headhesive.js, you can call the destroy method:

```javascript
headhesive.destroy();
```

## Browser support
IE9+ and modern browsers.

## License
Headesive.js is licensed under the MIT License.

## Contributing
Please see CONTRIBUTE.md for info on contributing.
