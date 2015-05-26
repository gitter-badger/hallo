// main.js
define([
  'domlib',
  'vendor/lodash',
  'vendor/riot',
  'tags/oi-price',
  'tags/modal-plan-fixo',
  'tags/table-compare'
  ], function($, _, riot, tagPrice, tagPlanFixo, tagCompare){

  var _private = {};
  var _public = {};
  var tags = {}
  var plans, labels;

  _public.init = function(){
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
    $.getJSON('/api/price/fixo/rj.json', function(json, textStatus) {
        plans = json.data;
        labels = json.meta.features_labels;
        // _private.showPrices()
        _private.insertTable()
    });
  }

  _private.insertTable = function (data){
    var plansTable = _.filter(plans, function(plan, key){
      return plan.on_table;
    })
    tags.table = riot.mount('table-compare', {plans: plansTable, labels: labels } );
  }

  _private.showPrices = function (){
    var price;
    item = _.find(prices, function(item) {
      return item.slug === 'ilimitado_ddd';
    });
    riot.mount('#price-ilimitado-ddd', { price: item.price.fidelizado, small: true });
    item = _.find(prices, function(item) {
      return item.slug === 'ilimitado';
    })
    riot.mount('#price-ilimitado', { price: item.price.fidelizado, small: true });
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
