// main.js
define([
  'domlib',
  'vendor/riot',
  'tags/content-header'
  ], function($, riot){

  var _private = {};
  var _public = {};
  var _tags = {};

  _public.init = function(){
    console.log('content-header, _public.init');
    _tags.contentHeader = riot.mount('content-header');
  };

  return _public;
});
