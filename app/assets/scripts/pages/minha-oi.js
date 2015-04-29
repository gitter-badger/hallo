

define([
  'domlib',
  'vendor/reqwest',
  'vendor/lodash',
  'vendor/riot',
  'velocity',
  // 'velocity-ui',
  'ScrollMagic',
  'ScrollMagic.debug'
  ],function ($, reqwest, lodash, riot, Velocity, ScrollMagic) {

  var _public = {},
      _private = {},
      $body = $('body'),
      $hiddenContent = $('.hidden-content'),
      $content = $('.content'),
      $container = $('.container')[0],
      $main = $('.main-content'),
      $side = $('.side-content'),
      $addOns = $('.addons'),
      maxWidth = $('.menu ul').width();
      margin =  ($body.width() - maxWidth)/2;
      $detail = $('#detail');

  var speed = 700;

  _public.init = function(){
    _private.holdScroll();
    _private.BindOpenDetail();
  };

  _private.BindOpenDetail = function(){
    $('.addons a').on('click', function(evt){
      var $btLi = $(this).parent('li');
      evt.preventDefault();
      _private.openDetail($btLi);
    });
  };

  _private.openDetail = function($btLi){
    var $price = $btLi.find('.price-widget');

    // Hide price
    Velocity({
      e: $price,
      p: {opacity: 0},
      o: { duration: speed/2, delay: speed/2 }
    });

    // Change item bg color
    Velocity({
      e: $btLi,
      p: { backgroundColor: '#000'},
      o: { duration: speed/2}
    }).then(function(els) {

      $body.addClass('locked');

      Velocity({
        e: $('header'),
        p: { height: 0 },
        o: { duration: speed }
      }).then(function(els){
        Velocity({
            e: $side,
            p: 'scroll',
            o: { duration: speed }
          }).then(function(){
          });
      });

      Velocity({
        e: $side,
        p: { width: maxWidth * .3 + margin },
        o: { duration: speed }
      });

      Velocity({
        e: $main,
        p: { marginLeft: '-50%' },
        o: { duration: speed }
      });

      Velocity({
        e: $hiddenContent,
        p: { width: maxWidth * .7 + margin },
        o: { duration: speed }
      });

      Velocity({
        e: $side.find('h2'),
        p: { width: maxWidth * .3, marginLeft: margin },
        o: { duration: speed }
      });

      Velocity({
        e: $side.find('.banner-image'),
        p: { width: maxWidth * .3, height: maxWidth * .3,  marginLeft: margin },
        o: { duration: speed }
      });

      Velocity({
        e: $side.find('.rent-list ul > li'),
        p: { marginLeft: margin },
        o: { duration: speed }
      });

    });

  };

  _private.holdScroll = function(){
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

  return _public;

});
