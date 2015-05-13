define([
  'domlib'
  ], function($){

  var _public = {},
      _private = {};

  var cardSize = parseInt(document.querySelector('oi-card').getBoundingClientRect().height);
  var cardsContainer = document.querySelector('.cards_container');
  var openPosition = parseInt($('.cards_container').offset().top);
  var lockPosition = openPosition + parseInt(cardsContainer.getBoundingClientRect().height - document.querySelector('.oi-card_header').getBoundingClientRect().height - 10);

  /**
   * init
   * ***/
  _public.init = function(){

    if(!('__proto__' in {})){
      return;
    }

    _private.scrollSpeed();
    _private.scroller();
  };

  /**
   * baseFromPoint
   * ***/
  _private.baseFromPoint = function(p, initialPoint, finalPoint, base){
    if (!base) { base = 100; }

    var point = 0;
    if (p > initialPoint && p < finalPoint) {
      point = ((p - initialPoint) / (finalPoint - initialPoint)) * base;
    } else if (p <= initialPoint) {
      point = 0;
    } else if (p >= finalPoint) {
      point = base;
    }

    return point.toFixed(2);
  };

  /**
   * scroller
   * ***/
  _private.scroller = function(){

    var selected = null;
    var titles = document.querySelectorAll('.product-card .product-card-title');
    var images = document.querySelectorAll('.product-image');
    var cards = document.querySelectorAll('.product-card');
    // var toc = document.querySelector('.oi-channels');
    var oiChannels = document.querySelector('.oi-channels');
    var product = document.querySelector('#product-contents .product');
    var body = document.querySelector('body');
    var bodyColor = document.querySelector('.backColor');

    var dynamicTable = function(y, initialPoint, finalPoint){
      var p = _private.baseFromPoint(y, initialPoint, finalPoint, 10);
      oiChannels.style.top = (25 - p*2.5)+'vh';
    };

    var dynamicTableOpacity = function(){

    };

    var dynamicCards = function(){

    };

    var dynamicTitle = function(){

    };

    var dynamicBackgrounds = function(){

    };

    var open = function(){

      if (window.scrollY >= openPosition) {
        if (!cardsContainer.classList.contains('open')) {
          cardsContainer.className += " open";
          // checkSelected();
          // selected = document.querySelector('.product-card.selected .selector');
        }
      } else {
        cardsContainer.className = cardsContainer.className.replace(' open', '');
        // body.className = body.className.replace("open-card", "");
        // $('.product-card').removeClass('selected');
      }
    };

    var lock = function(){
      if (window.scrollY >= lockPosition) {
        if (!lock.done) {
          lock.done = true;
          oiChannels.className += 'lock';
          cardsContainer.className += ' lock';
        }
      } else {
        lock.done = false;
        oiChannels.className = oiChannels.className.replace('lock', '');
        cardsContainer.className = cardsContainer.className.replace('lock', '');
      }
    };

    var scrollSpy = function(e){
      window.scrollY = window.pageYOffset;

      if (window.scrollY <= 1){
        $('.product-card').removeClass('selected');
      }

      dynamicTable(window.scrollY, -window.innerHeight*3, openPosition );
      dynamicTableOpacity(window.scrollY, openPosition, openPosition + cardSize*0.21 );

      dynamicCards(window.scrollY, openPosition, openPosition + cardSize*0.89);
      dynamicTitle(window.scrollY, openPosition + cardSize*0.55, openPosition + cardSize * 0.89);

      dynamicBackgrounds(window.scrollY, openPosition + cardSize*0.55, openPosition + cardSize * 0.89);

      open(window.scrollY);
      lock(window.scrollY);

      lastScroll = window.scrollY;
    };

    window.addEventListener('scroll', scrollSpy);
  };

  _private.scrollSpeed = function(){

    var lastSpeeds = [];
    var html = document.querySelector('html');
    var baseTime = 0.610;
    var lastScroll = 0;
    var lastTime = 0;

    var update = function(){

      var currentTime = Date.now();

      var timeDiff = currentTime - lastTime;
      var scrollDiff = window.scrollY - lastScroll;

      var diff = Math.abs((scrollDiff / timeDiff) * 0.610).toFixed(2);
      var finalTimer = baseTime - diff;
      finalTimer = finalTimer < 0 ? 0 : finalTimer;
      finalTimer = finalTimer > baseTime ? baseTime : finalTimer;

      if (lastSpeeds.length > 9) { lastSpeeds.splice(0,1); }
      lastSpeeds.push(finalTimer);

      var m = 0;
      for (var i = lastSpeeds.length - 1; i >= 0; i--) { m += lastSpeeds[i]; };
      var media = (m/lastSpeeds.length).toFixed(2);

      window.requestAnimationFrame(function(){
        // html.style.transitionDuration = media+'s';
        cardsContainer.style.transitionDuration = media+'s';
        // for (var i = 0; i < 3; i++) {
        //   titles[i].style.transitionDuration = media+'s';
        // }
      });

      lastScroll = window.scrollY;
      lastTime = currentTime;
    };

    window.addEventListener('scroll', update);
    update();
  };

  return _public;
})

/*
define([
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
*/
