// requirejs.config({
//   baseUrl: '/assets/scripts',
//   paths: {
//     velocity: 'vendor/velocity'
//   }
// });


require.config({
  baseUrl: '/assets/scripts',
  paths: {
    "domlib": ('__proto__' in {}) ? "vendor/zepto" : "vendor/jquery",
    "velocity": 'vendor/velocity',
    "velocity-ui": 'vendor/velocityui',
    "ScrollMagic": 'vendor/scrollmagic',
    "ScrollMagic.debug": 'vendor/scrollmagic.debug'
  },
  shim: {
    "velocity": {
      deps: ['domlib']
    },
    "velocity-ui":  {
      deps: ['velocity']
    },
    domlib: {
      exports: "$"
    }
  }
});


require([], function() {

  // Crossroads?

  var path = window.location.pathname.split('/').slice(1);

  require( ['pages/' + path[0]], function(page){
    page.init();
  });

});
