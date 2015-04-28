define([
  'domlib',
  'vendor/reqwest',
  'vendor/lodash',
  'vendor/riot',
  'velocity',
  // 'velocity-ui',
  'vendor/ScrollMagic'
  ],function ($, reqwest, lodash, riot, Velocity, ScrollMagic) {

  var _public = {},
      _private = {},
      $body = $('body'),
      $hiddenContent = $('.hidden-content'),
      $content = $('.content'),
      $container = $('.container')[0],
      $main = $('.main-content'),
      $side = $('.side-content'),
      $addOns = $('.addons');

  var maxWidth = $('.menu ul').width();
  var margin =  ($body.width() - maxWidth)/2;
  var $detail = $('#detail');

  var speed = 700;

  _public.init = function(){
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

    console.log('teste2', $btLi);

    // HIDE PRICE
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
      $side.height($hiddenContent.height());

      Velocity({
        e: $('header'),
        p: { height: 0 },
        o: { duration: speed }
      }).then(function(els){
        Velocity({
            e: $side,
            p: 'scroll',
            o: { duration: speed }
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
      }).then(function(){
        _private.holdScroll();
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
    var detailPos = $detail.offset();
    var heightScreen = $(window).height();
    var dura = $side.height() - $detail.height();
    var controller = new ScrollMagic.Controller();
    new ScrollMagic.Scene({
      duration: dura,  // the scene should last for a scroll distance of 100px
      offset: detailPos.top + detailPos.height - heightScreen
    })
    .setPin("#detail") // pins the element for the the scene's duration
    .addTo(controller); // assign the scene to the controller
  };

  return _public;

});
