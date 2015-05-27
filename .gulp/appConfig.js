var appConfig = (function() {
  'use strict';

  var _public = {};
  var _private = {};

  _public.isProd = true;

  _public.BrowserList = ['last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'];

  _public.server = {
    host: 'localhost',
    port: '8080'
  }

  _public.path = {
    data: {

    },

    src: {
      data: './data/**/*.yml',
      jade: './app/views/**/*.jade',
      partials: './app/views/_partials/**/*.jade',
      stylus: './app/assets/styles/**/*.styl',
      scripts: './app/assets/scripts/**/*.js',
      tags: './app/assets/scripts/**/*.{tag,jade}',
      components: './app/assets/styles/components/**/*.styl',
      fonts: './app/assets/fonts/**/*.{eot,svg,ttf,woff,woff2}',
      images: './app/assets/images/**/*.{jpg,jpeg,png,gif,svg}',
      icons: './app/assets/images/icons/**/*.svg',
      bower: './bower_components/',
      api: './data/api/**/*.json',
    },

    dist: {
      root: './dist/',
      css: './dist/assets/styles/',
      fonts: './dist/assets/fonts/',
      images: './dist/assets/images/',
      icons: './dist/assets/fonts/icons/',
      scripts: './dist/assets/scripts/',
      tags: './dist/assets/scripts/tags/',
      api: './dist/api/'
    },

  }

  return _public;


}());

module.exports = appConfig;
