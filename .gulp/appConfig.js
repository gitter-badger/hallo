var appConfig = (function() {
  'use strict';

  var _public = {};
  var _private = {};

  _public.isProd = false;

  _public.path = {
    data: {

    },
    src: {
      jade: './app/views/**/*.jade',
      partials: './app/views/_partials/**/*.jade'
    },
    dist: {
      root: './dist/'
    }

  }

  return _public;


}());

module.exports = appConfig;
