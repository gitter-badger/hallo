// main.js
define([
  'enhance/product-scroll',
  'enhance/form-animatios',
  'pages/internet/tables',
  'pages/internet/modals',
  'pages/internet/content-header'
  ], function(
    scroll,
    formAnime,
    tables,
    modals,
    contentHeader
  ){

  var _private = {};
  var _public = {};

  var scrollCount = 0;

  _public.init = function(){
    console.log('internet, _public.init');

    tables.init();
    contentHeader.init();
    modals.init();

    formAnime.init();

    oiMediator.subscribe('table-internet-banda-larga event', _private.dispatchScroll);

    oiMediator.subscribe('scroll scrollToLockPosition', scroll.scrollToLockPosition);
  };

  _private.dispatchScroll = function(event){

    if (event === 'mount'){
      scrollCount++;
      if (scrollCount == 1){
        scroll.init();
      }
    }
  };

  return _public;
});
