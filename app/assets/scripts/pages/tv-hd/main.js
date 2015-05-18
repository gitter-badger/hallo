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
  'pages/tv-hd/price',
  'pages/tv-hd/scroll',
  ],function ($, _, _s, riot, channelModal, channelSearch, channerlPrint, rules, movieRent, price, scroll) {

  price.init();
  scroll.init();

  _.mixin(_s.exports());

  var _public = {},
      _private = {};
      $body              = $('body'),
      $channelsContainer = $('.oi-channels-lists_list-tv_container'),
      $channelLink       = $channelsContainer.find('a'),
      $addOnsLink        = $('.oi-channels-addons_item_link'),
      $btOpenSearch        = $('.oi-channels_search-call a'),
      $btOpenPrint       = $('a.oi-channels_print')

      var riotMovieRent = riot.mount('movie-rent')[0]
      var cSerachcmodal = riot.mount('channel-search')[0]
      var cContractModal = riot.mount('contract-rules')[0]
      var cmodal = riot.mount('channel-modal')[0]
      var cPrint = riot.mount('channel-print')[0]

  var config = {
    api: {
      channel: '/api/channel/'
    }
  }

  _public.init = function(){
    _private.bindOpenModalChannel();
    _private.bindCloseButton();
    _private.bindNavKeyboard();
    _private.bindOpenAddOn();
    _private.bindOpenContract();
    _private.bindOpenPrint();
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

  _private.bindOpenPrint = function(){
    $btOpenPrint.on('click', function(event) {
      event.preventDefault();
      cPrint.open()
    });
  }

  _private.bindOpenAddOn = function(){
    $addOnsLink.on('click', function(evt){
      evt.preventDefault();
      $body.addClass('scroll-lock');
      var urlPage = $(this)[0].href
      _private.fillDetail(urlPage);
    });
  }

  _private.bindOpenModalChannel = function(){
    $channelLink.on('click', function(e){
      e.preventDefault();
      $body.addClass('scroll-lock');
      $channelsContainer.find('a.active').removeClass('active')
      $(this).addClass('active')
      var urlPage = $(this)[0].href
      _private.fillDetail(urlPage);
    });
  };

  _private.fillDetail = function(urlPage){
    var urlApi = config.api.channel + urlPage.split('/').slice(-1)[0] + '.json';
    $('.channel-modal').show()
    cmodal.loadChannel(urlApi)
    _private.bindCloseButton()
  };

  _private.bindCloseButton = function(){
    $('.channel-modal_close').on('click', function(e){
      _private.closeModal();
    });
  };

  _private.bindNavKeyboard = function(){
    return false
    document.onkeydown = function(evt) {
      evt = evt || window.event;
      // Esc
      if (evt.keyCode == 27) {
        _private.closeModal();
      }
      // Up / left = back
      if (evt.keyCode == 37 || evt.keyCode == 38 ) {
        _private.previousChannel();
      }
      // Down / right = next
      if (evt.keyCode == 39 || evt.keyCode == 40 ) {
        _private.nextChannel();
      }
    };
  };

  _private.previousChannel = function(){
    $channelsContainer.find('a.active').parent('li').prev().find('a').trigger('click')
  }

  _private.nextChannel = function(){
    $channelsContainer.find('a.active').parent('li').next('li').find('a').trigger('click')
  }

  _private.closeModal = function(){
    $('.channel-modal').hide()
    $body.removeClass('scroll-lock');
  };

  return _public;

});
