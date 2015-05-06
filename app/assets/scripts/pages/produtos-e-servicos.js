define([
  'domlib',
  'vendor/lodash',
  'vendor/underscore.string',
  'vendor/riot',
  'velocity',
  // 'velocity-ui',
  'ScrollMagic',
  'tags/channel-modal',
  'tags/channel-search',
  'tags/contracts-rules',
  'tags/movie-rent'
  ],function ($, _, _s, riot, Velocity, ScrollMagic, channelModal, channelSearch, movieRent) {

  _.mixin(_s.exports());

  var _public = {},
      _private = {};
      $body              = $('body'),
      $openClientType    = $('.oi-channels_header_client-type-trigger'),
      $dropdowClientType = $('.oi-channels_header_client-type_dropdow'),
      $clientType        = $dropdowClientType.find('a'),
      $channelsContainer = $('.oi-channels-lists_list-tv_container'),
      $channelLink       = $channelsContainer.find('a'),
      $addOnsLink        = $('.oi-channels-addons_item_link'),
      $btOpenSearch        = $('.oi-channels_search-call a')

  var config = {
    api: {
      channel: '/api/channel/'
    }
  }


  _public.init = function(){
    _private.openClientType();
    _private.changeClientType();
    _private.bindOpenModalChannel();
    _private.bindCloseButton();
    _private.bindNavKeyboard();
    // addOns.init()
    // _private.loadPrice();
    _private.bindOpenAddOn();
    // _private.bindOpenSearch();
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


  var riotMovieRent = riot.mount('movie-rent')[0]

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

  _private.openClientType = function(){
    $openClientType.on('click', function(evt){
      evt.preventDefault();
      $dropdowClientType.toggleClass('open');
    });
  }

  _private.changeClientType = function(){
    $clientType.on('click', function(evt){
      evt.preventDefault();
      $clientType.removeClass('active');
      $(this).addClass('active')
      // setTimeout( function () {
        $dropdowClientType.removeClass('open');
       // }, 500);
      // @mock
      var $bt = $(this)
      var price = $bt.find('.oi-price_value_integer').text()
      $('.oi-channels_header_price .oi-price_value_integer').text(price)
    });
  }

  var cSerachcmodal = riot.mount('channel-search')[0]
  var cContractModal = riot.mount('contract-rules')[0]




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

  var cmodal = riot.mount('channel-modal')[0]


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

  $(document).on('searchchannel', function(){
    console.log('abriu');
  })

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

  _private.openModal = function(){
    // $body.addClass('scroll-lock');
  };

  _private.closeModal = function(){
    $('.channel-modal').hide()
    $body.removeClass('scroll-lock');
  };

  return _public;

});
