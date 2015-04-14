define(['core/dom', 'vendor/riot', 'vendor/velocity'],function (dom, riot, velocity) {

  var _public = {},
      _private = {},
      $body = $('body')[0],
      $container = $('.container')[0]
      'core/dom', 'vendor/riot'

  _public.init = function(){
    _private.bindOpenModal();
    _private.bindCloseModal();
  };

  _private.bindOpenModal = function(){
    $('.channels-pack a').on('click', function(e){
      e.preventDefault();
      _private.openModal();
    });
  };

  _private.bindCloseModal = function(){
    $('.modal-close').on('click', function(e){
      _private.closeModal();
    });
  };

  $.fn.addClass = function( className ) {
    this.forEach( function( item ) {
        var classList = item.classList;
        classList.add.apply( classList, className.split( /\s/ ) );
    });
    return this;
};

  _private.openModal = function(){
    $('.modal')[0].style.display = 'block';
    $container.attributes['aria-hidden'].value = true;
    $body.addClass('modal-opened')

  };

  _private.closeModal = function(){
    $('.modal')[0].style.display = 'none';
    $container.attributes['aria-hidden'].value = false;
  };

  return _public;

});
