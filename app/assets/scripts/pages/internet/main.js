// main.js
define([
  'enhance/product-scroll',
  'pages/internet/tables'
  ], function(scroll, tables){

  var _private = {};
  var _public = {};

  _public.init = function(){
    console.log('internet, _public.init');
    tables.init();
  };

  return _public;
});
