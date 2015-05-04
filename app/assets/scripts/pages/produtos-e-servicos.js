define([
  'domlib',
  'vendor/lodash',
  'vendor/riot',
  'velocity',
  // 'velocity-ui',
  'ScrollMagic',
  'tags/channel-modal',
  ],function ($, lodash, riot, Velocity, ScrollMagic, channelModal) {



  var _public = {},
      _private = {};
      $openClientType    = $('.oi-channels_header_client-type-trigger'),
      $dropdowClientType = $('.oi-channels_header_client-type_dropdow'),
      $clientType        = $dropdowClientType.find('a'),
      $channelsContainer = $('.oi-channels-lists_list-tv_container'),
      $channelLink       = $channelsContainer.find('a')

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
    // _private.bindNavKeyboard();
    // addOns.init()
    // _private.loadPrice();
  };

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
  // _private.loadPrice = function(){
  //   return
  //   reqwest('/api/price/rj.json', function (resp) {
  //     channelsPrices = resp.data;

  //     _.find(channelsPrices, function(channelPrices){
  //       return channelPrices.default;
  //     });

  //      riot.mount('oi-card', { greeting: 'Hola', punctuation: "?"})
  //      riot.mount('oi-price')
  //   });
  // }

  _private.bindOpenModalChannel = function(){
    $channelLink.on('click', function(e){
      e.preventDefault();
      // riot.observable(this)

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
      console.log('close');
      _private.closeModal();
    });
  };

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

  _private.openModal = function(){
    console.log('open');
    // $body.addClass('modal-opened');
  };

  _private.closeModal = function(){
    $('.channel-modal').hide()
  };

  return _public;

});
