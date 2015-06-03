// tables.js
define([
  'domlib',
  'vendor/riot',
  'tags/oi-price',
  'tags/table-internet-banda-larga',
  'tags/table-internet-banda-larga-mais-fixo',
  'tags/table-internet-movel',
  'tags/alert-box',
  ], function($, riot){

  var _private = {};
  var _public = {};
  var _tags = {};

  _public.init = function(){
    console.log('tables, _public.init');

    oiMediator.subscribe('internet banda-larga plan-selected',  _public.selectPlanBandaLarga);
    oiMediator.subscribe('internet banda-larga-mais-fixo plan-selected',  _public.selectPlanBandaLargaMaisFixo);

    oiMediator.subscribe('table changeCardTo', _private.changeTable);

    oiMediator.subscribe('table-internet-banda-larga mount', _private.loadAndMountTableBandaLarga);

    _private.bindToggles();
    _private.loadAndMountDefaultTable();

  };

  _private.dataEndpoint = function(dir){
    return '/api/price/'+dir+'/rj.json';
  };

  _private.loadAndMountDefaultTable = function (){
    _private.loadAndMountTableBandaLarga();
  };

  _private.loadAndMountTableBandaLarga = function (){
    $.getJSON('/api/price/internet/rj.json', function(json) {
      _tags.tableInternetBandaLarga = riot.mount('table-internet', 'table-internet-banda-larga', {plans: json.data, labels: json.meta.features_labels } );
    });
  };

  _private.loadAndMountTableBandaLargaMaisFixo = function (){
    $.getJSON('/api/price/banda-larga-mais-fixo/rj.json', function(json) {
      _tags.tableInternetBandaLargaMaisFixo = riot.mount('table-internet', 'table-internet-banda-larga-mais-fixo', {plans: json.data, labels: json.meta.features_labels } );
    });
  };

  _private.loadAndMountTableMovel = function (){
    $.getJSON('/api/price/internet-movel/rj.json', function(json) {
      _tags.tableInternetBandaLargaMaisFixo = riot.mount('table-internet', 'table-internet-movel', {plans: json.data, labels: json.meta.features_labels } );
    });
  };

  _private.bindToggles = function(){

    $('body').on('click', '#veja-os-planos-fixo-banda-larga', function(){
      oiMediator.publish('scroll scrollToLockPosition');
      _private.loadAndMountTableBandaLargaMaisFixo();
    });

    $('body').on('click', '#volte-a-ver-banda-larga', function(){
      oiMediator.publish('scroll scrollToLockPosition');
      _private.loadAndMountTableBandaLarga();
    });
  };

  _private.mountOnTablePoint = function(dataEndpoint, tableComponentName, dataToPass){
    if (dataEndpoint && tableComponentName){
      $.getJSON(dataEndpoint, function(json){
        var tableData = { plans: json.data, labels: json.meta.features_labels };
        $.extend(tableData, dataToPass);
        riot.mount('table-internet', tableComponentName, tableData);
      });
    }
  };

  _private.changeTable = function(data){
    if (data.endpoint && data.tableSlug && data.cardSlug){
      _private.mountOnTablePoint(_private.dataEndpoint(data.endpoint), data.tableSlug, { slug: data.cardSlug });
    } else {
      console.error('error changing table');
    }
  };





  _public.selectPlanBandaLarga = function(slug){
  };

  _public.selectPlanBandaLargaMaisFixo = function(slug){
  };




  return _public;
});

