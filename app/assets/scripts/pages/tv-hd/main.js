define([
  'domlib',
  'vendor/lodash',
  'vendor/underscore.string',
  'vendor/riot',
  'tags/channel-modal',
  'tags/channel-search',
  'tags/contracts-rules',
  'tags/movie-rent',
  'pages/tv-hd/cart',
  'pages/tv-hd/scroll'
  ],function ($, _, _s, riot, channelModal, channelSearch, rules, movieRent, cart, scroll) {

  cart.init();
  // scroll.init();


  _.mixin(_s.exports());

  var _public = {},
      _private = {};
      $body              = $('body')

      var riotMovieRent = riot.mount('movie-rent')[0]
      var cSerachcmodal = riot.mount('channel-search')[0]
      var cContractModal = riot.mount('contract-rules')[0]
      riot.mount('channel-modal')

  _public.init = function(){
    _private.bindOpenContract();
    _private.bindOpenFooterItem();
    _private.openModalRent();
    _private.showAllAudio();
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
      riotMovieRent.open(url)
      oiMediator.publish( 'open modal', 'rent' );
    });
  }

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
      cContractModal.open()
    });
  }

  return _public;

});
