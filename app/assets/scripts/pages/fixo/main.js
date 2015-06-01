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
  var cart = {
    plan: null,
    vozTotal: false
  }
  var plans, labels;
  var $vozTotal = $('#vozTotal');

  _public.init = function(){
    _private.loadPlans()
    _private.bindOpenDetail();
    _private.bindRemoveVozTotal();
    oiMediator.subscribe( 'voz-total add', _public.addVozTotal );
    oiMediator.subscribe( 'voz-total remove', _public.removeVozTotal );
    oiMediator.subscribe( 'plan fixo select', _private.selectPlan );
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
        labels = json.meta;
        // _private.showPrices()
        _private.insertTable()
    });
  }

  _private.insertTable = function (data){
    var plansTable = _.filter(plans, function(plan, key){
      return plan.on_table;
    });
    tags.table = riot.mount('table-compare', {plans: plansTable, labels: labels.features_labels } );
    var planModal = _.filter(plans, function(plan, key){
      return plan.slug === 'fixo-ilimitado-com-ddd';
    })[0]
    tags.ModalPlanoFixo = riot.mount('modal-planfixo', {plan: planModal})[0];
  }

  _public.addVozTotal = function (vozTotalChip){
    $vozTotal.find('.add').addClass('added')
    cart.vozTotal = vozTotalChip;
    _private.updateTitle();
  }

  _private.bindRemoveVozTotal = function (){
    $vozTotal.find('.rem').on('click', function (evt){
      evt.preventDefault();
      tags.ModalPlanoFixo.remove();
    })
  }

  _public.removeVozTotal = function (){
    $vozTotal.find('.add').removeClass('added')
    cart.vozTotal = false;
    _private.updateTitle();
  }

  _private.selectPlan = function (planSlug){
    delete cart.plan;
    cart.plan = planSlug
    _private.updateTitle();
  }

  var $title = $('.content_header_list h2')

  _private.updateTitle = function (){
    var text = '';
    var planSelected = _.find(plans, function(itemPlan){
      return itemPlan.slug === cart.plan
    })
    text = planSelected.name;

    console.log(cart);
    if( cart.vozTotal ){
      text += ' + ' + labels.addons.vozTotal;
    }


    $title.text(text)
  }

  return _public;
});
