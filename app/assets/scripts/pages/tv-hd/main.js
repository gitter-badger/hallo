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
      defaultPlan = 'mix',
      cart = {},
      $spots = $('.oi-channels-addons_item_spots a'),
      $openClientType    = $('.oi-channels_header_client-type-trigger'),
      $dropdowClientType = $('.oi-channels_header_client-type_dropdow'),
      $clientType        = $dropdowClientType.find('a'),
      $cartList = $('#cart-list'),
      cartWidth = $cartList.width();


  _public.init = function (){
    _private.loadPrice('rj');
    // riot.route('customers/267393/edit')
    // riot.route.stop()
    // riot.route.start()
    _private.bindBtAddon();
    _private.bindBtPlan();
  }


  _private.bindBtPlan = function(){
    $('.oi-channels_tabs a, .oi-card').on('click', function (evt){
      evt.preventDefault();
      var $bt = $(this),
          slug = $bt.data('slug');
      $('.oi-channels_tabs a.active, .oi-card.active').removeClass('active');
      $bt.addClass('active');
      defaultPlan = slug;
      _private.startPlan();
    });
  }

  _private.startPlan = function (local){
    _private.fillClientType();
    _private.cartStart();
  }

  _private.loadPrice = function (local){
    $.getJSON('/api/price/' + local + '.json', function(json, textStatus) {
      price = json.data;
      _private.fillCards();
      _private.fillClientType(); //
      _private.cartStart(); //
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
    if( !tagsPrice.hasPhone && !tagsPrice.noPhone ){
      tagsPrice.hasPhone = riot.mount('#price-has-phone', { price: startPlan.price, small: true })[0];
      tagsPrice.noPhone = riot.mount('#price-has-no-phone', { price: startPlan.price+20, small: true })[0];
    } else {
      tagsPrice.hasPhone.updatePrice(startPlan.price)
      tagsPrice.noPhone.updatePrice(startPlan.price+20)
    }
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
      if(prodAdd.type === 'basic'){
        cart[product] = {  quant: quant, name: prodAdd.name, type: prodAdd.type }
        // ugh 2
        delete cart.start
        delete cart.mix
        delete cart.total
      }
      cart[product] = {  quant: quant, name: prodAdd.name, type: prodAdd.type }
    }
    // console.table(cart);
    _private.cartUpdatePrice();
    _private.cartUpdateList();
  }

  _private.cartUpdatePrice = function (){
    var total = _.sum(cart, function(item, product) {
      var prodAdded = _.find(price, function(productItem) {
        return productItem.slug === product;
      })
      return item.quant * prodAdded.plans[defaultPlan].price
    })

    if(!tagsPrice.total){
      tagsPrice.total = riot.mount('#price-total', { price: total , small: true })[0];
    } else {
      tagsPrice.total.updatePrice(total);
    }
  }


  _private.cartUpdateList = function (){
    var listHtml = '';
    var sumWidth = 0;

    for (var item in cart) {
      if (cart.hasOwnProperty(item)) {
        if(item === 'spot'){
          listHtml += '<li>' + cart[item].quant + ' ' + ( cart[item].quant === 1 ? cart[item].name : 'Pontos' ) + '</li>';
        } else {
          listHtml += '<li>' + cart[item].name + '</li>';
        }
      }
    }
    $cartList.html(listHtml);
    listHtml = '';
    // Ugh! ude promises!!!
    setTimeout( function () {
      var $itensTitle = $cartList.find('li');
      $itensTitle.each(function (i,el){
        var $el = $(el)
        sumWidth += $el.width()
        if( i + 1 === $itensTitle.size()){
          if(cartWidth > sumWidth){
            $itensTitle.addClass('visible');
          } else {
            var plan = _.find(cart, function(productItem) {
              return productItem.type === 'basic';
            });
            listHtml += '<li>' + plan.name + '</li>';
            var channelsQuant = _.countBy(cart, function(productItem) {
              return productItem.type !== 'basic';
            })['true'];
            listHtml += '<li>' + channelsQuant + ' Opcionais</li>';
            $cartList.html(listHtml).find('li').addClass('visible');
          }
        }
      });
    }, 100);
  }

  _private.startSpot = function (){
    var spotProduct = _.find(price, function(product) {
      return product.slug === 'spot';
    });
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

    $(document).delegate('.add-addon','click', function (evt){
    // $('.add-addon').live('click', function (evt){
      evt.preventDefault();
      var $bt = $(this),
          slug = $bt.data('slug'),
          quant = $bt.hasClass('add') ? 1 : 0;

      if( $bt.hasClass('add') ){
        $('[data-slug="' + slug + '"]').addClass('added').children('span').text('Adicionado');
        $('#addon-tooltip-'+slug).removeClass('visible')
      } else{
        $bt.prev('.add').removeClass('added').children('span').text('Adicionar');
      }
      _private.toggleAddonTooltip(slug, quant)
      _private.cartUpdateValue(slug, quant)
    });
  }

  _private.toggleAddonTooltip = function(slug, show){
    var addProduct = _.find(price, function(product) {
          return product.slug === slug;
        }),
        modifiers = addProduct.plans[defaultPlan].modifier || addProduct.modifier;

    _(modifiers).forEach(function(rule, addon) {
      if( !cart[addon] ){
        $('#addon-tooltip-'+addon).text(rule.message).toggleClass('visible', show)
      }
    }).value();
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

  return _public;

});








define('scrollp',[
  'domlib',
  'vendor/lodash',
  'velocity'
  ],function ($, lodash, Velocity ) {

  var _public = {},
      _private = {}

  var $body = $('body'),
      $win = $(window),
      $main = $('main'),
      $cardsContainer = $('.cards_container'),
      $cardsContainerBg = $('.cards_container--bg'),
      $cards = $('.cards'),
      $cardHeader = $('.oi-card_header'),
      $cardSubtitle = $('.oi-card_subtitle'),
      $cardTitle = $('.oi-card_title'),
      $cardMain = $('.oi-card_main'),
      $cardFooter = $('.oi-card_footer'),
      $cardFooterAction = $('.oi-card_action'),
      $channels = $('.oi-channels'),
      $channelInfo = $('#channel-info'),
      $channelTabs = $('.oi-channels_tabs'),
      $channelsContainer = $('.oi-channels_container'),
      $channelsheader = $('.oi-channels_header'),
      $hero = $('oi-hero'),
      cardsOffset = {},
      cardsContainerOffset = {},
      cardHeaderOffset = {},
      cardMainOffset = {},
      cardFooterOffset = {},
      cardFooterActionOffset = {},
      channelsOffset = {},
      channelInfoOffset = {},
      channelsheaderOffset = {},
      docWidth;


  _public.init = function(){

    if(!('__proto__' in {})){
      return
    }

    _private.loadSizes();
    _private.bindCard();
    _private.bindResize();

  }
  _private.bindResize = function(){
    $(window).on('resize', function (){
      $(window).off('scroll.anim');
      window.scrollTo(0, 0);
      _private.loadSizes();
      $(window).trigger('scroll.anim')
    });
  }

  _private.loadSizes = function(){
      docWidth = $(document).width(),
      cardsOffset = $cards.offset(),
      cardsContainerOffset = $cardsContainer.offset(),
      cardHeaderOffset = $cardHeader.offset(),
      cardMainOffset = $cardMain.offset(),
      cardFooterOffset = $cardFooter.offset(),
      cardFooterActionOffset = $cardFooterAction.offset(),
      channelsOffset = $channels.offset(),
      channelInfoOffset = $channelInfo.offset(),
      channelsheaderOffset = $channelsheader.offset();
      _private.bindScroll();
  }

  _private.bindCard = function(){
    $cards.find('a').on('click.card', function (evt){
      evt.preventDefault();
      $channels.velocity("scroll", {
        duration: 3000,
        delay: 200
      });
    })
  }

  _private.resetAnim = function(){
    $cards.css({ marginTop: 0, marginBottom: 0 })
      $cardsContainer.css({
        maxWidth: '73.125rem',
        marginBottom: '12.1875rem'
      })
      $cardMain.css({ marginTop: 0 })
      $cardFooter.css({ opacity: 1  })
      $cardHeader.css({
        paddingTop: '1.875rem',
        paddingBottom: '1.875rem',
        maxWidth: '11.25rem'
      })
      $cardTitle.css({
        fontSize: '1.3125rem'
      })
      $cardSubtitle.css({
        opacity: 1,
        height: '1.375rem'
      })
      $channels.css({
        opacity: 1
      })
      $channelInfo.css({
        marginTop: 0
      });
  }

  _private.bindScroll = function(){
    $channels.addClass('nopad')
    $channelTabs.hide();
    $channels.css({opacity: 0});

    $(window).on('scroll.anim', _.throttle( function(){
      var scrollTop = $win.scrollTop();

      if(scrollTop >= cardsOffset.top + cardsOffset.height - channelsheaderOffset.height &&  scrollTop < cardsOffset.top + cardsOffset.height - channelsheaderOffset.height +100 ){
        var stageAnim2 = (scrollTop - (cardsOffset.top + cardsOffset.height - channelsheaderOffset.height))/100
        // Show border channels area
        $cardsContainerBg.css({
          paddingTop: .625 * (stageAnim2) + 'rem',
          paddingLeft: .625 * (stageAnim2) + 'rem',
          paddingRight: .625 * (stageAnim2) + 'rem'
        })
        $channels.css({paddingLeft: .625 * (stageAnim2) + 'rem', paddingRight: .625 * (stageAnim2) + 'rem' })
      }

      if(scrollTop <= cardsOffset.top + cardsOffset.height - channelsheaderOffset.height ){
        $cardsContainerBg.css({
          paddingTop: 0,
          paddingLeft: 0,
          paddingRight: 0
        })
        $channels.css({paddingLeft:0, paddingRight:0 })

      }

      if(scrollTop >= cardsOffset.top &&  scrollTop < 8000 ){

        $hero.removeClass('show-shaddow')
        $cards.addClass('is-tabs');

        // set mix as active if user dont made a selection
        // if( !$cardsContainer.find('.active')[0]){
        //   $cardsContainer.find('[data-slug="mix"]').trigger('click')
        // }

        var cardPos = (scrollTop - cardsOffset.top),
            sumMainFooter = cardMainOffset.height + cardFooterOffset.height + 1,
            stageAnim = cardPos/sumMainFooter <= 1 ? cardPos/sumMainFooter: 1 ,
            cardsWidth = 73.125,
            docWidthREM = docWidth/16,
            newWidth = docWidthREM * stageAnim >= cardsWidth ? docWidthREM * stageAnim : cardsWidth,
            newHeight = cardPos > sumMainFooter ? sumMainFooter  : cardPos,
            newFsCardTitle = 1 + .375 * (1-stageAnim ) + 'rem';

        // pin card
        $cards.css({ marginTop: scrollTop - cardsOffset.top, marginBottom: 0 })

        // cards full width
        $cardsContainer.css({
          maxWidth: newWidth + 'rem',
          marginBottom: 12.25 * (1-stageAnim) + 'rem'
        })

        // hide card main & footer
        $cardMain.css({ marginTop: -newHeight, opacity: 1 - stageAnim })
        $cardFooter.css({ opacity: 1 - stageAnim - 0.3 })

        // adjust header card height
        $cardHeader.css({
          paddingTop: 1.875 * (1-stageAnim ) + 'rem',
          paddingBottom: 1.875 * (1-stageAnim ) + 'rem',
          maxWidth: stageAnim*100 + '%'
        })

        $cardTitle.css({
          fontSize: newFsCardTitle
        })

        $cardSubtitle.css({
          opacity: (1-stageAnim - .3),
          height: 1.375 * (1-stageAnim) + 'rem'
        })

        $channels.css({
          opacity: stageAnim,
        })

        if(stageAnim >= 1){
          $channelInfo.css({
            marginTop: -(scrollTop - ( cardsOffset.top + cardsOffset.height - channelsheaderOffset.height -18 ))
          });
        }
      } else {
        $cards.removeClass('is-tabs');
        $hero.addClass('show-shaddow');
        _private.resetAnim();
      }


    }, 10, true));
  }

  return _public

});

define([
  'domlib',
  'vendor/lodash',
  'vendor/underscore.string',
  'vendor/riot',
  'velocity',
  // 'velocity-ui',
  'tags/channel-modal',
  'tags/channel-search',
  'tags/contracts-rules',
  'tags/movie-rent',
  'price',
  'scrollp',
  ],function ($, _, _s, riot, Velocity, channelModal, channelSearch, rules, movieRent, price, scrollp) {

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
