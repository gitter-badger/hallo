// tables.js
define([
  'domlib',
  'vendor/lodash',
  'vendor/riot',
  'tags/oi-price',
  ], function($, _, riot, priceTag){

  var _private = {};
  var _public = {};

  _public.init = function(){
    console.log('tables, _public.init', _private.fillPrices);
    _private.fillPrices();
  };

  _private.fillPrices = function(){
    $('table oi-price').forEach(function(element){
      _private.updatePrice(element);
    });
  };

  _private.updatePrice = function(element){
    var thePrice = _private.filterPriceString(element);
    riot.mount(element, { price: thePrice, small: true });
  };

  _private.filterPriceString = function(element){
    var price = element.getAttribute('data-price');
    if (price){
      price = price.replace(',', '.');
      return price;
    } else {
      return "0.00";
    }
  };

  return _public;
});

