// modals.js
define([
  'domlib',
  'mask',
  'vendor/lodash',
  'vendor/riot',
  'tags/modal-internet-disponibilidade',
  'tags/modal-internet-pnbl',
  'tags/modal-internet-rural',
  'tags/modal-bl-sem-fixo',
  'tags/modal-bl-sem-fidelizacao',
  'tags/modal-internet-contratos-ofertas',
  'tags/modal-internet-todos-planos'
  ], function( $, mask, _, riot){

  var _private = {};
  var _public = {};
  var _tags = {};

  _public.init = function(){
    console.log('modals, _public.init');

    _private.mountModalInternetDisponibilidade();
    _private.mountModalInternetPNBL();
    _private.mountModalInternetRural();
    _private.mountModalBandaLargaSemFixo();
    _private.mountModalBandaLargaSemFidelizacao();
    _private.mountModalInternetContratosOfertas();
    _private.mountModalInternetTodosPlanos();

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
  _private.mountModalBandaLargaSemFixo= function(visible){
    _tags.modalBandaLargaSemFixo = riot.mount('modal-bl-sem-fixo', { visible: visible });
  };
  _private.mountModalBandaLargaSemFidelizacao= function(visible){
    _tags.modalBandaLargaSemFidelizacao = riot.mount('modal-bl-sem-fidelizacao', { visible: visible });
  };
  _private.mountModalInternetContratosOfertas= function(visible){
    _tags.modalInternetContratosOfertas = riot.mount('modal-internet-contratos-ofertas', { visible: visible });
  };
  _private.mountModalInternetTodosPlanos= function(visible){
    _tags.modalInternetTodosPlanos = riot.mount('modal-internet-todos-planos', { visible: visible });
  };

  return _public;
});

