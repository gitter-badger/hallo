define([
  'domlib',
  'vendor/lodash',
  'vendor/underscore.string',
  'vendor/riot',
  'tags/channel-modal',
  'tags/channel-search',
  'tags/channel-print',
  'tags/contracts-rules',
  'tags/movie-rent',
  'pages/tv-hd/cart',
  'pages/tv-hd/scroll'
  ],function ($, _, _s, riot, channelModal, channelSearch, channerlPrint, rules, movieRent, cart, scroll) {

  cart.init();
  scroll.init();


  _.mixin(_s.exports());

  var _public = {},
      _private = {};
      tagMovieModal = riot.mount('movie-rent')[0],
      tagSearchChannel = riot.mount('channel-search')[0],
      tagContractModal = riot.mount('contract-rules')[0],
      tagChannelModal = riot.mount('channel-modal')[0],
      tagChannelPrint = riot.mount('channel-print')[0]

  _public.init = function(){
    _private.bindOpenContract();
    _private.bindOpenFooterItem();
    _private.openModalRent();
    _private.showAllAudio();
    _private.bindOpenPrint();
    _private.slideShow();
  };

  _private.showAllAudio = function(){
    $('.oi-channels-lists_list-audio_container button').on('click', function(evt) {
      evt.preventDefault();
      $(this).parents('.oi-channels-lists_list-audio').addClass('open');
      $(this).hide();
    });
  }

  _private.openModalRent = function(){
    $('.oi-channels_footer-item_content-area_movies a').on('click', function(event) {
      event.preventDefault();
      var url = $(this)[0].href.split('/').slice(-1)[0]
      tagMovieModal.open(url)
      oiMediator.publish( 'open modal', 'rent' );
    });
  }

  _private.bindOpenPrint = function(){
    $('a.oi-channels_print').on('click', function(event) {
      event.preventDefault();
      tagChannelPrint.open()
    });
  }
  
  _private.slideShow = function(){
   var count = 0;
   setInterval(function(){ 
       if (count === $('.oi-hero').length) {count = 0;}
       $('.oi-hero').eq(count).appendTo('oi-hero');
       setTimeout(function(){ 
           //$heroSlides.eq(count).css({'transition': 'all 2s ease-in-out','left': '-100%'});
           //$heroSlides.eq(count).remove();
           count++;
       }, 2000);
   }, 5000);

  };

  _private.bindOpenFooterItem = function(){
    $('.oi-channels_footer-item_title-area').on('click', function(event) {
      event.preventDefault();
      var $this = $(this);
      $this.next('.oi-channels_footer-item_content-area').toggleClass('open');
    });
  }

  _private.bindOpenContract = function(){
    $('#openContract').on('click', function(event) {
      event.preventDefault();
      tagContractModal.open()
    });
  }

  return _public;

});
