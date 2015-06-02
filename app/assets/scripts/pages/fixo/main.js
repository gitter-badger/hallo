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
    vozTotal: false,
    callCelOi: false,
    internet: false
  }
  var plans, labels;
  var plansInternet;
  var tagPriceTotal;
  var $vozTotal = $('#vozTotal'),
      $title = $('#cart-list li'),
      $addCallCelOi = $('.add-call-cel-oi'),
      $remCallCelOi = $('.rem-call-cel-oi'),
      $addInternet = $('.add-internet'),
      $remInternet = $('.rem-internet');
      $priceTotal = $('#priceTotal');

  _public.init = function(){
    _private.loadPlans();
    _private.loadPlansInternet();
    _private.bindOpenDetail();
    _private.bindAddCallCelOi();
    _private.bindRemCallCelOi();
    _private.bindAddInternet();
    _private.bindRemInternet();
    _private.bindRemoveVozTotal();
    oiMediator.subscribe( 'voz-total add', _public.addVozTotal );
    oiMediator.subscribe( 'voz-total remove', _public.removeVozTotal );
    oiMediator.subscribe( 'plan fixo select', _private.selectPlan );
    tagPriceTotal = riot.mount('#priceTotal')[0];
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
        _private.insertTable()
    });
  }

  _private.loadPlansInternet = function (){
    $.getJSON('/api/price/internet/rj.json', function(json, textStatus) {
      plansInternet = json.data;
      _private.showPricesInternet();
    });
  }

  _private.showPricesInternet = function (){
    _.forEach(plansInternet, function (planInternet){
      $('#internet-' + planInternet.slug).find('.price')
        .text('R$' + (planInternet.price.loyal.toFixed(2) + '').replace('.', ',') )
        .parent('button')
        .data('slug', planInternet.slug);
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

  _private.bindAddCallCelOi = function (){
    $addCallCelOi.on('click', function (evt){
      evt.preventDefault();
      cart.callCelOi = true;
      $(this).addClass('added');
      _private.updateTitle();
    });
  }

  _private.bindRemCallCelOi = function (){
    $remCallCelOi.on('click', function (evt){
      evt.preventDefault();
      cart.callCelOi = false;
      $addCallCelOi.removeClass('added');
      _private.updateTitle();
    });
  }

  _private.bindAddInternet = function (){
    $addInternet.on('click', function (evt){
      evt.preventDefault();
      cart.internet = $(this).data('slug');
      $addInternet.removeClass('added');
      $(this).addClass('added');
      _private.updateTitle();
    });
  }

  _private.bindRemInternet = function (){
    $remInternet.on('click', function (evt){
      evt.preventDefault();
      cart.internet = false;
      $addInternet.removeClass('added');
      _private.updateTitle();
    });
  }

  _private.updateTitle = function (){
    var text = '';
    var planSelected = _.find(plans, function(itemPlan){
      return itemPlan.slug === cart.plan
    })

    text = planSelected.name;

    var countAddons = 0;
    cart.vozTotal ? countAddons++ : null;
    cart.callCelOi ? countAddons++ : null;
    cart.internet ? countAddons++ : null;

    if( countAddons > 1){
      text += ' + ' + countAddons + ' opcionais';
    } else {
      if( cart.vozTotal ){
        text += ' + ' + labels.addons.vozTotal;
      }
      if( cart.callCelOi ){
        text += ' + ' + labels.addons.callCelOi;
      }
      if( cart.internet ){
        text += ' + ' + labels.addons.internet;
      }
    }
    $title.text(text);
    _private.updatePrice();
  }

  _private.updatePrice = function (){
    var price  = 0;
    var planSelected = _.find(plans, function(itemPlan){
      return itemPlan.slug === cart.plan
    });
    price += planSelected.price.loyal
    price += cart.vozTotal ? planSelected.addons[cart.vozTotal] : 0;
    price += cart.callCelOi ? planSelected.addons.celular_oi: 0;

    if(cart.internet){
      var planInternetSelected = _.find(plansInternet, function(itemPlan){
        return itemPlan.slug === cart.internet
      });
      price += planInternetSelected.price.loyal
    }

    tagPriceTotal.updatePrice(price);
    $priceTotal.addClass('visible');
  }

  return _public;
});
