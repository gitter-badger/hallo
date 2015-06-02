// modals.js
define([
  'domlib',
  'mask',
  'vendor/lodash',
  'vendor/riot',
  'tags/modal-internet-disponibilidade',
  'tags/modal-internet-pnbl',
  'tags/modal-internet-rural'
  ], function( $, mask, _, riot){

  var _private = {};
  var _public = {};
  var _tags = {};

  _public.init = function(){
    console.log('modals, _public.init');

    // _private.mountModalInternetDisponibilidade();
    _private.mountModalInternetPNBL();
    _private.mountModalInternetRural();

    _private.bindButtons();

    oiMediator.subscribe('modal-internet-disponibilidade mount', _private.mountModalInternetDisponibilidade);
  };

  _private.mountModalInternetDisponibilidade = function(visible){
    _tags.modalInternetDisponibilidade = riot.mount('modal-internet-disponibilidade', { visible: visible });
  };
  _private.mountModalInternetPNBL = function(visible){
    _tags.modalInternetDisponibilidade = riot.mount('modal-internet-pnbl', { visible: visible });
  };
  _private.mountModalInternetRural= function(visible){
    _tags.modalInternetRural = riot.mount('modal-internet-rural', { visible: visible });
  };

  _private.bindButtons = function(){
    $('body').on('click', '#consulte-a-disponibilidade', function(evt){
      evt.preventDefault();
      oiMediator.publish('modal-internet-disponibilidade mount', { visible: true })
    });
  };

  return _public;
});

