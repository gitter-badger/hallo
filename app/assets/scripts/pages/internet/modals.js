// modals.js
define([
  'domlib',
  'vendor/lodash',
  'vendor/riot',
  'tags/modal-internet-disponibilidade'
  ], function( $, _, riot, modalInternetDisponibilidade ){

  var _private = {};
  var _public = {};
  var _tags = {};

  _public.init = function(){
    console.log('modals, _public.init');
    _tags.modalInternetDisponibilidade = riot.mount('modal-internet-disponibilidade', {});
  };

  return _public;
});

