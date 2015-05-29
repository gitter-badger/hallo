// tables.js
define([
  'domlib',
  'vendor/riot',
  'tags/oi-price',
  'tags/table-internet-banda-larga',
  'tags/table-internet-banda-larga-mais-fixo',
  'tags/table-internet-movel'
  ], function($, riot, tagPrice, tagTableInternetBandaLarga, tagTableInternetBandaLargaMaisFixo, tableInternetMovel){

  var _private = {};
  var _public = {};
  var tags = {};

  _public.init = function(){
    console.log('tables, _public.init');

    oiMediator.subscribe('internet banda-larga plan-selected',  _public.selectPlanBandaLarga);
    oiMediator.subscribe('internet banda-larga-mais-fixo plan-selected',  _public.selectPlanBandaLargaMaisFixo);

    oiMediator.subscribe('table-internet-banda-larga event mount',  _private.tableMountComplete);
    oiMediator.subscribe('table-internet-banda-larga-mais-fixo event mount',  _private.tableMountComplete);

    oiMediator.subscribe('scroll changeCardTo', _private.changeTable);

    oiMediator.subscribe('table-internet-banda-larga mount', _private.loadAndMountTableBandaLarga);

    _private.bindBandaLargaToggle();
    _private.loadAndMountDefaultTable();
  };

  _private.loadAndMountDefaultTable = function (){
    _private.loadAndMountTableBandaLarga();
  };

  _private.loadAndMountTableBandaLarga = function (){
    $.getJSON('/api/price/internet/rj.json', function(json) {
        tags.tableInternetBandaLarga = riot.mount('table-internet', 'table-internet-banda-larga', {plans: json.data, labels: json.meta.features_labels } );
    });
  };

  _private.loadAndMountTableBandaLargaMaisFixo = function (){
    $.getJSON('/api/price/banda-larga-mais-fixo/rj.json', function(json) {
        tags.tableInternetBandaLargaMaisFixo = riot.mount('table-internet', 'table-internet-banda-larga-mais-fixo', {plans: json.data, labels: json.meta.features_labels } );
    });
  };

  _private.loadAndMountTableMovel = function (){
    $.getJSON('/api/price/banda-larga-mais-fixo/rj.json', function(json) {
      tags.tableInternetBandaLargaMaisFixo = riot.mount('table-internet', 'table-internet-movel', {plans: json.data, labels: json.meta.features_labels } );
    });
  };

  _private.bindBandaLargaToggle = function(){

    $('body').on('click', '#toggle-banda-larga-mais-fixo', function(e){
      riot.mount('content-header-alert', 'content-header-alert-message-banda-larga-mais-fixo', {});
      _private.loadAndMountTableBandaLargaMaisFixo();
    });

    $('body').on('click', '#content-header-alert-outro-numero', function(e){
      riot.mount('content-header-alert', 'content-header-alert', {});
      _private.loadAndMountTableBandaLarga();
    });
  };

  _private.changeTable = function(slug){
    if (slug == 'internet-movel-3g-4g') {
      _private.loadAndMountTableMovel();
    } else if (slug == 'banda-larga-da-oi') {
      _private.loadAndMountTableBandaLarga();
    }
  };




  _private.tableMountComplete = function(flux){
    $('#toggle-banda-larga-mais-fixo').attr('data-table', flux.table);
  };

  _public.selectPlanBandaLarga = function(slug){
  };

  _public.selectPlanBandaLargaMaisFixo = function(slug){
  };




  return _public;
});

