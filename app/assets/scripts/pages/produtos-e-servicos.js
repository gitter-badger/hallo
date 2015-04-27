define([
  'core/dom',
  'vendor/reqwest',
  'vendor/lodash',
  'vendor/riot',
  'vendor/velocity',
  'channel-addons',
  'tags/card',
  'tags/price',
  ],function (dom, reqwest, lodash, riot, velocity, addOns) {


  var _public = {},
      _private = {},
      $body = $('body')[0],
      $container = $('.container')[0],
      channelsPrices;


  _public.init = function(){
    // _private.bindOpenModal();
    // _private.bindCloseButton();
    // _private.bindNavKeyboard();
    // addOns.init()
    _private.loadPrice();
  };

  _private.loadPrice = function(){
    reqwest('/api/price/rj.json', function (resp) {
      channelsPrices = resp.data;

      _.find(channelsPrices, function(channelPrices){
        return channelPrices.default;
      });

       riot.mount('oi-card', { greeting: 'Hola', punctuation: "?"})
       riot.mount('oi-price')



    });

  }

  // _private.bindOpenModal = function(){
  //   $('.channels-pack a').on('click', function(e){
  //     e.preventDefault();
  //     _private.openModal();
  //   });
  // };

  // _private.bindCloseButton = function(){
  //   $('.modal-close').on('click', function(e){
  //     _private.closeModal();
  //   });
  // };

  // _private.bindNavKeyboard = function(){
  //   document.onkeydown = function(evt) {
  //     evt = evt || window.event;
  //     // Esc
  //     if (evt.keyCode == 27) {
  //       _private.closeModal();
  //     }
  //     // Up / left = back
  //     if (evt.keyCode == 37 || evt.keyCode == 38 ) {
  //       console.log('back');
  //     }
  //     // Down / right = next
  //     if (evt.keyCode == 39 || evt.keyCode == 40 ) {
  //       console.log('next');
  //     }
  //   };
  // };

  // _private.openModal = function(){
  //   $('.modal')[0].style.display = 'block';
  //   $container.attributes['aria-hidden'].value = true;
  //   // $body.addClass('modal-opened');

  // };

  // _private.closeModal = function(){
  //   $('.modal')[0].style.display = 'none';
  //   $container.attributes['aria-hidden'].value = false;
  // };

  return _public;

});
