var appConfig = (function() {
  'use strict';

  var _public = {};
  var _private = {};

  _public.isProd = false;

  _public.BrowserList = ['last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'];

  _public.server = {
    host: 'localhost',
    port: '8080'
  }

  _public.path = {
    data: {

    },
    src: {
      jade: './app/views/**/*.jade',
      partials: './app/views/_partials/**/*.jade',
      stylus: './app/assets/styles/**/*.styl',
      components: './app/assets/styles/components/**/*.styl',
      fonts: './app/assets/fonts/**/*.{eot,svg,ttf,woff}',
      icons: './app/assets/images/icons/**/*.svg',
      bower: './bower_components/'
    },
    dist: {
      root: './dist/',
      css: './dist/assets/styles/',
      fonts: './dist/assets/fonts/',
      icons: './dist/assets/fonts/icons/',
      scripts: './dist/assets/scripts/'
    },
    docs: {
      jade: './docs/views/**/*.jade',
      partials: './docs/views/_partials/**/*.jade',
      stylus: './docs/assets/styles/**/*.styl',
      root: './dist/docs/'
    }

  }

  return _public;


}());

module.exports = appConfig;
