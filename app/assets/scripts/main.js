// requirejs.config({
//   baseUrl: '/assets/scripts',
//   paths: {
//     velocity: 'vendor/velocity'
//   }
// });

// make it safe to use console.log always
(function (a) {
    function b() {}
    for (var c = "assert,count,debug,dir,dirxml,error,exception,group,groupCollapsed,groupEnd,info,log,markTimeline,profile,profileEnd,time,timeEnd,trace,warn".split(","), d; !! (d = c.pop());) {
        a[d] = a[d] || b;
    }
})
(function () {
    try {
        console.log();
        return window.console;
    } catch (a) {
        return (window.console = {});
    }
}());


require.config({
  baseUrl: '/assets/scripts',
  paths: {
    // "domlib": ('__proto__' in {}) ? "vendor/zepto" : "vendor/jquery",
    "domlib": "vendor/jquery",
    "mask": 'vendor/jquery.maskedinput',
    "velocity": 'vendor/velocity',
    "velocity-ui": 'vendor/velocityui',
    "ScrollMagic": 'vendor/ScrollMagic',
    "ScrollMagic.debug": 'vendor/scrollmagic.debug'
  },
  shim: {
    "velocity": {
      deps: ['domlib']
    },
    "velocity-ui":  {
      deps: ['velocity']
    },
    "mask": {
      deps: ['domlib']
    },
    domlib: {
      exports: "$"
    }
  }
});

var Mediator = ( function( window, undefined ) {

  function Mediator() {
    this._topics = {};
  }

  Mediator.prototype.subscribe = function mediatorSubscribe( topic, callback ) {
    if( ! this._topics.hasOwnProperty( topic ) ) {
      this._topics[ topic ] = [];
    }

    this._topics[ topic ].push( callback );
    return true;
  };

  Mediator.prototype.unsubscribe = function mediatorUnsubscrive( topic, callback ) {
    if( ! this._topics.hasOwnProperty( topic ) ) {
      return false;
    }

    for( var i = 0, len = this._topics[ topic ].length; i < len; i++ ) {
      if( this._topics[ topic ][ i ] === callback ) {
        this._topics[ topic ].splice( i, 1 );
        return true;
      }
    }

    return false;
  };

  Mediator.prototype.publish = function mediatorPublish() {
    var args = Array.prototype.slice.call( arguments );
    var topic = args.shift();

    if( ! this._topics.hasOwnProperty( topic ) ) {
      return false;
    }

    for( var i = 0, len = this._topics[ topic ].length; i < len; i++ ) {
      this._topics[ topic ][ i ].apply( undefined, args );
    }
    return true;
  };

  return Mediator;

} )( window );

var oiMediator = new Mediator();

require(['vendor/blazy'], function(Blazy) {

  //  var bLazy = new Blazy();

  //  var bLazy2 = new Blazy({
  //     container: '.oi-channels-lists_list-tv_container'
  //   });

  // var bLazy3 = new Blazy({
  //     container: '.oi-channels-addons_container'
  //   });

  // var bLazy4 = new Blazy({
  //     container: '.list-container'
  //   });

  // Crossroads?

  var path = window.location.pathname.split('/').slice(1);

  require( ['/assets/scripts/pages/' + path[0] + '/main.js'], function(page){
    page.init();
  });

});
