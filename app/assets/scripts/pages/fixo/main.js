// main.js
define([
  'domlib',
  'vendor/lodash',
  'vendor/riot',
  'tags/oi-price',
  ], function($, _, riot, tagPrice){

  var _private = {};
  var _public = {};

  _public.init = function(){
    console.log('fixo, _public.init');
    _private.loadPlans()
  };

  _private.loadPlans = function (){
    _private.showPrices()
  }
  _private.showPrices = function (){
    riot.mount('#price-fixo-regular', { price: 59.90, small: true });
    riot.mount('#price-fixo-ddd',     { price: 49.90, small: true });
  }

  // oiMediator.publish( 'start plan', defaultPlan );
  // oiMediator.subscribe( 'addon add', _public.addAddon );

  return _public;
});
