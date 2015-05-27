// main.js
define([
  'enhance/product-scroll',
  'pages/internet/tables',
  'pages/internet/modals'
  ], function(scroll, tables, modals){

  var _private = {};
  var _public = {};

  _public.init = function(){
    console.log('internet, _public.init');
    tables.init();
    modals.init();

    scroll.init();
  };

  return _public;
});
