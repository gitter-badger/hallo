// main.js
define([], function(scroll){

  var _private = {};
  var _public = {};

  _public.init = function(){
    console.log('internet, _public.init');
    console.log('scroll', scroll);
  };

  return _public;
});
