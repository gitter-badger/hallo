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
    scroll.init();

    _private.bindCards();

    oiMediator.subscribe('scroll scrollToLockPosition', scroll.scrollToLockPosition);
  };

  _private.bindCards = function(){
    $('body').on('click', 'oi-card', function(e){

      var cardSlug = $(e.currentTarget).attr('data-slug');
      var tableSlug = $(e.currentTarget).attr('data-table');
      var endpoint = $(e.currentTarget).attr('data-endpoint');

      if (cardSlug && tableSlug) {
        $('oi-card').removeClass();
        $(e.currentTarget).addClass('selected');

        oiMediator.publish('table changeCardTo', { cardSlug: cardSlug, tableSlug: tableSlug, endpoint: endpoint });
        oiMediator.publish('scroll scrollToLockPosition');
      } else {
        console.log('card without cardSlug or tableSlug');
      }
    });
  };

  return _public;
});
