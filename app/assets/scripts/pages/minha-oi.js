define([
  'domlib',
  'vendor/reqwest',
  'vendor/lodash',
  'vendor/riot',
  'velocity'
  // 'velocity-ui',
  // 'vendor/ScrollMagic'
  ],function ($, reqwest, lodash, riot, Velocity, velocityui) {

  var _public = {},
      _private = {},
      $body = $('body'),
      $hiddenContent = $('.hidden-content'),
      $container = $('.container')[0],
      $main = $('.main-content'),
      $side = $('.side-content'),
      $addOns = $('.addons');


  _public.init = function(){
  };

  // init controller
    // var controller = new ScrollMagic.Controller({
    //   globalSceneOptions: {triggerHook: "onCenter"}
    // });
    // // init scene
    // var scene = new ScrollMagic.Scene({
    //   duration: 300,
    //   offset: 0
    // })
    // .setPin(".pre-title")
    // .addTo(controller)

    // $.fn.velocity = velocity;

  $('.addons a').on('click', function(evt){
    evt.preventDefault();

    var $bt = $(this);

    $('body')[0].classList.add('teste');



    var mySequence = [
      { e: $('.banner-image')[0], p: { opacity     :     0   }, o: { duration: 1000 } },
      { e: $('.bt-back')[0]     , p: { height      :    70   }, o: { duration: 1000 } },
      { e: $main             , p: { paddingRight:   '50%' }, o: { duration: 1000 } },
      { e: $side             , p: { marginLeft  : '-600px'}, o: { duration: 1000 } },
      { e: $side             , p: { paddingLeft :     0   }, o: { duration: 1000 } }
    ];
    // Velocity.RunSequence(mySequence);

    Velocity($('.banner-image'), {opacity: 0 }, 'easeInOutCubic');

    Velocity($addOns, "scroll", 'easeInOutCubic', function(){
      // Velocity($('.bt-back'), {height: 70 }, 'easeOutQuart');
      Velocity({
        e: $('.bt-back'),
        p: { height: 70 },
        o: {
          duration: 300,
          delay: 300,
          easing: 'easeOutQuart'
        }
      });

      $body.addClass('locked');
    });
    Velocity($main, {marginLeft: '-50%'}, 'easeInSine');

    Velocity($hiddenContent, {
      left: '30vw',
      width: '70vw',
    }, 'easeInSine');

    // Velocity($side, {paddingLeft: '0'}, 'easeInSine');
    Velocity($('.addons li'), {marginLeft: '-120px', }, 'easeInSine');

    Velocity($('.addons a'), {
      paddingLeft: '130px',
      backgroundPositionX: '130px'
    }, 'easeInSine');
    // Velocity($bt, {backgroundColor: '#222222'}, 'easeInSine');

    Velocity($('.addons .bt-back'), {marginLeft: '-200px'}, 'easeInSine');

    // Velocity($('.addons li'), {
    //   height: '80px',
    //   lineHeight: '80px'
    // }, 'easeInSine');

    Velocity($('.addons .price-widget'), {
      opacity: 0
    }, 'easeInSine');




  });


  return _public;

});
