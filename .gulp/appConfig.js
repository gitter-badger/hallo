var appConfig = (function() {
  'use strict';

  var _public = {};
  var _private = {};

  _public.isProd = false;

  _public.BrowserList = ['last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'];

  _public.path = {
    data: {

    },
    src: {
      jade: './app/views/**/*.jade',
      partials: './app/views/_partials/**/*.jade',
      stylus: './app/assets/styles/**/*.styl',
    },
    dist: {
      root: './dist/',
      css: './dist/assets/styles/'

    }

  }

  return _public;


}());

module.exports = appConfig;
