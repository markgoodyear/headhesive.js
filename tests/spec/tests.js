(function(window) {
  "use strict";

  function isDeepEqual( test, target ) {
    var equal = true, key;

    for ( key in test ) {
      if ( test.hasOwnProperty( key ) ) {
        if ( JSON.stringify(test[key]) !== JSON.stringify(target[key]) ) {
          equal = false;
          break;
        }
      }
    }

    return equal;
  }

  describe( "Headhesive", function() {

    // setup default options from library to use for testing
    var defaultOptions = {
          offset: 300,
          classes: {
            clone: 'headhesive',
            stick: 'headhesive--stick',
            unstick: 'headhesive--unstick'
          },
          throttle: 250,
          onInit: function() {},
          onStick: function() {},
          onUnstick: function() {},
          onDestroy: function() {},
        },
      headhesive, fixture;

    beforeEach(function() {
      fixture = document.querySelector(".fixture");
    });

    afterEach(function() {
      if ( headhesive && headhesive.elem ) {
        headhesive.init(); //TODO: Shouldn't need to do this
        headhesive.destroy();
      }
    });

    describe( "Constructor", function() {
      it( "should exist", function() {
        expect( window.Headhesive ).toBeDefined();
      });

      describe("elem", function() {
        it("should store 1st parameter as an elem property", function() {
          headhesive = new Headhesive( fixture );

          expect( headhesive.elem ).toBe( fixture );
        });

        it("should find a DOM element if 1st parameter is a string", function() {
          headhesive = new Headhesive( ".fixture" );

          expect( headhesive.elem ).toBe( fixture );
        })
      });

      describe( "default options", function() {
        it( "should have a default set of options", function() {
          headhesive = new Headhesive( fixture );

          expect( isDeepEqual(headhesive.options, defaultOptions) ).toBe( true );
        });

        it( "should merge options with default options", function() {
          // set new options
          headhesive = new Headhesive( fixture, {
            throttle: 1000,
            classes: {
              stick: "new-stick-class"
            }
          });

          // set default options to match new options
          defaultOptions.throttle = 1000;
          defaultOptions.classes.stick = "new-stick-class"

          expect( headhesive.options.throttle ).toEqual( defaultOptions.throttle );
          expect( headhesive.options.classes.stick ).toEqual( defaultOptions.classes.stick );
        });
      });

    });

    describe( "Init", function() {
      it("should be defined", function() {
        headhesive = new Headhesive( fixture );

        expect( headhesive.init ).toBeDefined();
      });

      it( "should make a clone of the passed element", function() {
        headhesive = new Headhesive( fixture );

        expect( fixture.cloneNode() ).toBeTruthy();
      });

      it( "should insert a cloned element into the DOM", function() {
        var countBeforeInit = document.body.childElementCount;

        headhesive = new Headhesive( fixture, {
          onInit: function() {
            return document.body.childElementCount
          }
        });

        expect(countBeforeInit).toBeLessThan(headhesive.options.onInit());
      });

      it("should invoke the onInit callback", function(){
        headhesive = new Headhesive( fixture, {
          onInit: function() {
            return true
          }
        });

        expect(headhesive.options.onInit()).toBeTruthy();
      });

      it("should add a scroll event listener on the window", function(){
        spyOn( window, "addEventListener" );

        headhesive = new Headhesive( fixture );

        expect( window.addEventListener ).toHaveBeenCalled();
      });

      //TODO: scrollOffset code could be extracted into its own method
      describe("scrollOffset", function() {
        it("should set the scrollOffset if option is a number", function() {
          headhesive = new Headhesive( fixture, {
            offset: 999
          });

          expect(headhesive.options.offset).toEqual(jasmine.any(Number));
        });

        it("should set the scrollOffset based off a selector if option is a string", function(){
          headhesive = new Headhesive( fixture, {
            offset: ".offset-test"
          });

          expect(headhesive.options.offset).toEqual(jasmine.any(String));
        });
      });

      describe("throttle", function() {
        it("should create a throttle method based on the option", function() {
          headhesive = new Headhesive( fixture, {
            throttle: 123
          });

          expect( headhesive._throttleUpdate ).toBeDefined();
        });

        it("should set the throttle to a different number than the default", function() {
          headhesive = new Headhesive( fixture, {
            throttle: 123
          });

          expect( isDeepEqual(headhesive.options, defaultOptions) ).toBe( false );
        });
      });
    });

    describe( "Destroy", function() {
      it("should be defined", function() {
        headhesive = new Headhesive( fixture );

        expect( headhesive.destroy ).toBeDefined();
      });

      it("should invoke the onDestroy callback", function() {
        headhesive = new Headhesive( fixture, {
          onDestroy: function() {
            return true
          }
        });

        expect(headhesive.options.onDestroy()).toBeTruthy();
      });

      it("should remove elem from the DOM", function() {
        var countBeforeInit = document.body.childElementCount;

        headhesive = new Headhesive( fixture, {
          onDestroy: function() {
            return document.body.childElementCount
          }
        });

        expect(countBeforeInit).toBeLessThan(headhesive.options.onDestroy());
      });

      it("should remove scroll eventListener from the window", function(){
        spyOn( window, "removeEventListener" );

        headhesive = new Headhesive( fixture );
        headhesive.destroy();

        expect( window.removeEventListener ).toHaveBeenCalled();
      });
    });

    describe( "Stick", function() {
      it("should be defined", function() {
        headhesive = new Headhesive( fixture );

        expect( headhesive.stick ).toBeDefined();
      });

      it("should set the stick class from default options", function() {
        headhesive = new Headhesive( fixture );

        expect( defaultOptions.classes.stick ).toEqual( jasmine.any(String) );
      });

      it("should set the stick class from options override", function() {
        headhesive = new Headhesive( fixture, {
          classes: {
            stick: "sample-stick-class"
          }
        });

        expect( isDeepEqual(headhesive.options, defaultOptions) ).toBe( false );
      });

      it("should invoke the onStick callback", function() {
        headhesive = new Headhesive( fixture, {
          onStick: function() {
            return true
          }
        });

        expect(headhesive.options.onStick()).toBeTruthy();
      });
    });

    describe( "Unstick", function() {
      it("should be defined", function() {
        headhesive = new Headhesive( fixture );

        expect( headhesive.unstick ).toBeDefined();
      });

      it("should set the unstick class from default options", function() {
        headhesive = new Headhesive( fixture );

        expect( defaultOptions.classes.unstick ).toEqual( jasmine.any(String) );
      });

      it("should set the unstick class from options override", function() {
        headhesive = new Headhesive( fixture, {
          classes: {
            unstick: "sample-unstick-class"
          }
        });

        expect( isDeepEqual(headhesive.options, defaultOptions) ).toBe( false );
      });

      it("should invoke the onUnstick callback", function() {
        headhesive = new Headhesive( fixture, {
          onUnstick: function() {
            return true
          }
        });

        expect(headhesive.options.onUnstick()).toBeTruthy();
      });
    });

    describe( "Update", function() {
      it("should be defined", function() {
        headhesive = new Headhesive( fixture );

        expect( headhesive.update ).toBeDefined();
      });

      it( "should create an update method", function() {
        headhesive = new Headhesive( fixture );

        expect( headhesive.update ).toBeDefined();
      });
    });
  });

}(window));
