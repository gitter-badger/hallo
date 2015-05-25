// main.js
define([
  'domlib',
  'vendor/lodash',
  'vendor/riot',
  'tags/oi-price',
  'tags/modal-plan-fixo',
  ], function($, _, riot, tagPrice, tagPlanFixo){

  var _private = {};
  var _public = {};

  _public.init = function(){
    console.log('fixo, _public.init');
    _private.loadPlans()
    _private.bindOpenDetail();

    riot.mount('modal-planfixo', {});
  };

  _private.bindOpenDetail = function(){
    $('.details_item_title-area').on('click', function(event) {
      event.preventDefault();
      var $this = $(this);
      $this.next('.details_item_content-area').toggleClass('open');
    });
  }

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
