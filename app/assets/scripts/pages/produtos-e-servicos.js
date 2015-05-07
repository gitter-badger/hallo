define('price',[
  'domlib',
  'vendor/lodash',
  'vendor/riot',
  'tags/price',
], function($, _, riot, pricetag){
  var _public = {},
      _private = {},
      price,
      meta,
      tagsPrice = {},
      defaultPlan = 'start',
      cart = {},
      $spots = $('.oi-channels-addons_item_spots a'),
      $openClientType    = $('.oi-channels_header_client-type-trigger'),
      $dropdowClientType = $('.oi-channels_header_client-type_dropdow'),
      $clientType        = $dropdowClientType.find('a');

  _public.init = function (){
    _private.loadPrice('rj');
    // riot.route('customers/267393/edit')
    // riot.route.stop()
    // riot.route.start()

    _private.bindBtAddon();
    // _private.bindbtAddonModal()
  }

  _private.loadPrice = function (local){
    $.getJSON('/api/price/' + local + '.json', function(json, textStatus) {
      price = json.data;
      _private.fillCards();
      _private.fillClientType();
      _private.cartStart();
      _private.startSpot();
      _private.changeSpot();
      _private.openClientType();
    });
  }

  _private.fillCards = function (){
    _.filter(price, function(product) {
      return product.type === 'basic';
    })
    .forEach(function(basic, key) {
      riot.mount('#card-price-'+ basic.slug, { price: basic.price });
    });
  }

  _private.fillClientType = function (){
    var startPlan = _.find(price, function(product) {
      return product.slug === defaultPlan;
    })
    riot.mount('#price-has-phone', { price: startPlan.price, small: true });
    riot.mount('#price-has-no-phone', { price: startPlan.price+20, small: true });
  }

  _private.cartStart = function(){
    _private.cartUpdateValue(defaultPlan, 1)

  }

  _private.cartUpdateValue = function (product, quant){
    if(quant == 0){
      delete cart[product]
    } else {
      var prodAdd = _.find(price, function(productItem) {
        return productItem.slug === product;
      });
      cart[product] = {  quant: quant, name: prodAdd.name, type: prodAdd.type }
    }
    console.clear()
    console.table(cart);
    _private.cartUpdateView();
  }

  _private.cartUpdateView = function (){
    var total = _.sum(cart, function(item, product) {
      var prodAdded = _.find(price, function(productItem) {
        return productItem.slug === product;
      })
      return item.quant * prodAdded.plans[defaultPlan].price
    });

    if(!tagsPrice.total){
      tagsPrice.total = riot.mount('#price-total', { price: total , small: true })[0];
    } else {
      tagsPrice.total.updatePrice(total);
    }
  }

  _private.startSpot = function (){
    var spotProduct = _.find(price, function(product) {
      return product.slug === 'spot';
    })
    $spots.eq( spotProduct.plans[defaultPlan].quant).addClass('added');
  }

  _private.changeSpot = function (){
    $spots.on('click', function (evt) {
      evt.preventDefault();
      var $opt = $(this)
      $spots.filter('.added').removeClass('added');
      $opt.addClass('added');
      var quant = $opt.index()
      _private.cartUpdateValue('spot', quant);
    });
  }

  _private.bindBtAddon = function(){
    $('.add-addon').live('click', function (evt){
      evt.preventDefault();
      var $bt = $(this);
      var slug = $bt.data('slug');
      var quant = $bt.hasClass('add') ? 1 : 0;
      // var modifiers = price[slug].plans[defaultPlan].modifier || price[slug].modifier;
      // _(modifiers).forEach(function(rule, addon) {
      //   console.log(rule, addon);
      //   var $tooltip = $('#addon-tooltip-'+addon);
      //   console.log($tooltip);
      //   $tooltip
      //     .text(rule.message)
      //     .addClass('visible')
      // }).value();

      if( $bt.hasClass('add') ){
        $('[data-slug="' + slug + '"]').addClass('added').children('span').text('Adicionado');
      } else{
        $bt.prev('.add').removeClass('added').children('span').text('Adicionar');
      }

      _private.cartUpdateValue(slug, quant)

    });

  }

  _private.openClientType = function(){
    $openClientType.on('click', function(evt){
      evt.preventDefault();
      $dropdowClientType.toggleClass('open');
    });
    _private.changeClientType();
  }

  _private.changeClientType = function(){
    $clientType.on('click', function(evt){
      evt.preventDefault();
      $clientType.removeClass('active');
      $(this).addClass('active')
      $dropdowClientType.removeClass('open');
      var quant = $(this).hasClass('has-phone') ? 0 : 1;
      _private.cartUpdateValue('phone', quant)
    });
  }





  // _private.shoppingCartStart = function (){
    // cart.basic = { quant: 1 }
    // tagsPrice.total = riot.mount('#price-total', { price: price.basic.plans[defaultPlan].price , small: true })[0];
    // riot.mount('#price-has-phone', { price: price.basic.plans.start.price, small: true });
    // riot.mount('#price-has-no-phone', { price: price.basic.plans.start.price+20, small: true });
  // }







  // _private.updateCart = function (){

  // }



  return _public;

});








define('scrollp',[
  'domlib',
  'vendor/lodash',
  'velocity',
  // 'velocity-ui',
  'ScrollMagic',
  'ScrollMagic.debug'
  ],function ($, lodash, Velocity, ScrollMagic) {
  var _public = {},
      _private = {}

  _public.init = function(){

    return

    var controller = new ScrollMagic.Controller();

    var scene = new ScrollMagic.Scene({
      triggerHook: 'onLeave',
      duration: 515,
      offset: 670
    })
    .setPin("main")
    .addTo(controller)
    .addIndicators();
    scene.on("enter", function (event) {
      console.log('enter');
    });

  }

  _private.holdScroll = function(){ return
    var heightScreen = $(window).height();
        menuPos = $('.menu').offset(),
        pos = menuPos.top + menuPos.height + $detail.height() - heightScreen,
        controller = new ScrollMagic.Controller();

    var scene = new ScrollMagic.Scene({
      duration: 1350,
      offset: pos
    })
    .setPin("#detail")
    .addTo(controller)
    .addIndicators();
    scene.on("enter", function (event) {
      $hiddenContent.addClass('fix')
    });
  };

  return _public

});












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
  'tags/movie-rent',
  'price',
  'scrollp',
  ],function ($, _, _s, riot, Velocity, ScrollMagic, channelModal, channelSearch, rules, movieRent, price, scrollp) {

  price.init();
  scrollp.init();

  _.mixin(_s.exports());

  var _public = {},
      _private = {};
      $body              = $('body'),
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
