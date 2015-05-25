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
  var tags = {}

  _public.init = function(){
    console.log('fixo, _public.init');
    _private.loadPlans()
    _private.bindOpenDetail();
    _private.bindRemoveVozTotal();
    tags.ModalPlanoFixo = riot.mount('modal-planfixo', {})[0];
    oiMediator.subscribe( 'voz-total add', _public.addVozTotal );
    oiMediator.subscribe( 'voz-total remove', _public.removeVozTotal );
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

  _public.addVozTotal = function (){
    $('#vozTotal').find('.add').addClass('added')
  }

  _private.bindRemoveVozTotal = function (){
    $('#vozTotal').find('.rem').on('click', function (evt){
      evt.preventDefault();
      tags.ModalPlanoFixo.remove();
    })
  }

  _public.removeVozTotal = function (){
    $('#vozTotal').find('.add').removeClass('added')
  }

  return _public;
});
