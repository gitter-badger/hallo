// modals.js
define([
  'domlib',
  'vendor/lodash',
  'vendor/riot',
  '../../enhance/form-animatios',
  'tags/modal-plan-internet-disponibilidade'
  ], function(
    $, _, riot, formAnime
  ){

  var _private = {};
  var _public = {};

  var tagModalDisponibilidade = riot.mount('modal-plan-internet-disponibilidade')[0];

  _public.init = function(){
    console.log('modals, _public.init');
    formAnime.init();
  };

  return _public;
});

