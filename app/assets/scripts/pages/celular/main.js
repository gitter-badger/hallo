// main.js
define([
  '../../enhance/product-scroll.js'
  ], function(scroll){

  var _private = {};
  var _public = {};

  _public.init = function(){
    console.log('celular, _public.init');
    console.log('scroll', scroll);

    scroll.init();
  };

  return _public;
});
