// modals.js
define([
  'domlib',
  'vendor/lodash',
  'vendor/riot',
  'tags/modal-internet-disponibilidade',
  ], function(
    $,
    _,
    riot,
    modalInternetDisponibilidade
  ){

  var _private = {};
  var _public = {};

  var tagModalInternetDisponibilidade = riot.mount('channel-modal')[0];

  _public.init = function(){
    console.log('modals, _public.init');
  };

  return _public;
});

