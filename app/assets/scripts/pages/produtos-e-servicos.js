define([
  'core/dom',
  'vendor/riot',
  'vendor/velocity',
  'channel-addons'
  ],function (dom, riot, velocity, addOns) {

  var _public = {},
      _private = {},
      $body = $('body')[0],
      $container = $('.container')[0];
      'core/dom', 'vendor/riot';

  _public.init = function(){
    _private.bindOpenModal();
    _private.bindCloseButton();
    _private.bindNavKeyboard();
    addOns.init()
  };

  _private.bindOpenModal = function(){
    $('.channels-pack a').on('click', function(e){
      e.preventDefault();
      _private.openModal();
    });
  };

  _private.bindCloseButton = function(){
    $('.modal-close').on('click', function(e){
      _private.closeModal();
    });
  };

  _private.bindNavKeyboard = function(){
    document.onkeydown = function(evt) {
      evt = evt || window.event;
      // Esc
      if (evt.keyCode == 27) {
        _private.closeModal();
      }
      // Up / left = back
      if (evt.keyCode == 37 || evt.keyCode == 38 ) {
        console.log('back');
      }
      // Down / right = next
      if (evt.keyCode == 39 || evt.keyCode == 40 ) {
        console.log('next');
      }
    };
  };

  _private.openModal = function(){
    $('.modal')[0].style.display = 'block';
    $container.attributes['aria-hidden'].value = true;
    // $body.addClass('modal-opened');

  };

  _private.closeModal = function(){
    $('.modal')[0].style.display = 'none';
    $container.attributes['aria-hidden'].value = false;
  };

  return _public;

});
