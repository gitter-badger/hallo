define([
  'domlib'
  ], function($){

  var _public = {},
      _private = {};

  // html
  // var html = document.querySelector('html');

  // sizes
  var cardSize = parseInt(document.querySelector('oi-card').getBoundingClientRect().height);

  // cards
  var cards = document.querySelector('.cards');
  var cardsContainer = document.querySelector('.cards_container');
  var cardsContainerBox = document.querySelector('.cards_container_box');
  var oiCard = document.querySelectorAll('oi-card');
  var oiCardHeader = document.querySelectorAll('.oi-card_header');

  // channels
  var oiChannels = document.querySelector('.oi-channels');

  // positions
  var openPosition = parseInt($('.cards_container').offset().top);
  var lockPosition = openPosition + parseInt(cardsContainer.getBoundingClientRect().height - document.querySelector('.oi-card_header').getBoundingClientRect().height - 10);

  /**
   * init
   *
   * self explanatory definition
   *
   * @method init
   *
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
   *
   * Calculates and returns a point value between initial and final points based on a base number
   *
   * @method baseFromPoint
   * @param p {number} point to discover
   * @param initialPoint {number} initial value, also as minimum value
   * @param finalPoint {number} final value for point, also as maximum value
   * @param base {number} base distance between points, best don't be negative, if bas has not been set, assumes value 100
   * @return {number} calculated number
   *
   * ***/
  _private.baseFromPoint = function(p, initialPoint, finalPoint, base){
    // TODO: default values need to be added
    if (!base) { base = 100; }

    var point = 0; // TODO: Math.max improvements ?
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
   * checkSelected
   *
   * checks if a cards has selected, if not, select the last card form the list, returns the selected object
   *
   * @method checkSelected
   * @return {Object}
   *
   * ***/
  _private.checkSelected = function(){
    var hasSelected = 0;
    [].forEach.call(oiCard, function(card){
      if (card.classList.contains('selected')){
        hasSelected++;
      }
    });

    if (hasSelected > 0){
      return;
    } else {
      oiCard[2].className += 'selected';
    }

    return oiCard[2];
  };

  /**
   * scroller
   *
   * listen the page scrollY and dispatch some funcitons
   *
   * @method scroller
   * @return null
   *
   * ***/
  _private.scroller = function(){

    // change table position
    // TODO: performance check
    var dynamicTable = function(y, initialPoint, finalPoint){
      var p = _private.baseFromPoint(y, initialPoint, finalPoint, 10);
      oiChannels.style.top = (25 - p*2.5)+'vh';
    };

    // change table opacity
    // TODO: performance check
    var dynamicTableOpacity = function(y, initialPoint, finalPoint){
      var p = _private.baseFromPoint(y, initialPoint, finalPoint, 10);
      oiChannels.style.opacity = (p/10);
    };

    // change cards height
    // TODO: performance check
    var dynamicCards = function(y, initialPoint, finalPoint){
      var p = _private.baseFromPoint(y, initialPoint, finalPoint, 100);
      for (var i = 0; i < 3; i++) {
        oiCard[i].style.height = (100 - p)+'%';
      }
    };

    // add thin class on titles
    // TODO: performance check
    var dynamicTitle = function(y, initialPoint, finalPoint){
      var thinTitle = (y >= initialPoint);
      for (var i = 0; i < 3; i++) {
        if (thinTitle) {
          if (!oiCardHeader[i].classList.contains('thin')){
            oiCardHeader[i].className += ' thin';
          }
        } else {
          if (oiCardHeader[i].classList.contains('thin')){
            oiCardHeader[i].className = oiCardHeader[i].className.replace(' thin', '');
          }
        }
      }
    };

    // add parse class on backgrounds
    // TODO: performance check
    // TODO: clear comments
    var dynamicBackgrounds = function(y, initialPoint, finalPoint){

      var initialPointClass = (y >= initialPoint);

      if (initialPointClass) {
        if (!cards.classList.contains('parse')){
          cards.className += ' parse';
        }
      } else {
        if (cards.classList.contains('parse')){
          cards.className = cards.className.replace(' parse', '');
        }
      }

      return;

      // if (initialPointClass) {
      //   if (!subtitle.classList.contains('subtitle-opacity')) {
      //     subtitle.className += ' subtitle-opacity';
      //   }
      // } else {
      //   subtitle.className = subtitle.className.replace(' subtitle-opacity', '');
      // }


      if (oiCardHeader.length > 0) {
        for (var i = 0; i < 3; i++) {
          console.log(oiCardHeader.classList.contains('selected'));

          // var title = oiCardHeader[i].querySelector('.product-card-title');
          // var subtitle = oiCardHeader[i].querySelector('.product-card-title .subtitle');
          // if (oiCardHeader[i].classList.contains('selected')) {
          //   if (initialPointClass) {
          //     if (!title.classList.contains('product-card-title-green')) {
          //       title.className += ' product-card-title-green';
          //     }
          //   } else {
          //     title.className = title.className.replace(' product-card-title-green', '');
          //   }
          // }


        };
      }

      return;
    };

    // add open class to cards
    // TODO: performance check
    var open = function(){
      if (window.scrollY >= openPosition) {
        if (!cards.classList.contains('open')) {
          cards.className += ' open';
          _private.checkSelected();
          // selected = document.querySelector('.product-card.selected .selector');
        }
      } else {
        cards.className = cards.className.replace(' open', '');
        // body.className = body.className.replace("open-card", "");
        // $('.product-card').removeClass('selected');
      }
    };

    // add open class to cards and channels
    // TODO: performance check
    var lock = function(){
      if (window.scrollY >= lockPosition) {
        if (!lock.done) {
          lock.done = true;
          oiChannels.className += ' lock';
          cards.className += ' lock';
        }
      } else {
        lock.done = false;
        oiChannels.className = oiChannels.className.replace(' lock', '');
        cards.className = cards.className.replace(' lock', '');
      }
    };

    // spy the scroll value
    // TODO: performance check
    var scrollSpy = function(e){
      window.scrollY = window.pageYOffset;

      // if (window.scrollY <= 1){
      //   $('.product-card').removeClass('selected');
      // }

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
    scrollSpy();
  };

  /**
   * scrollSpeed
   *
   * change transition-duration on some elements relative to scroll speed
   *
   * @method scrollSpeed
   * @return null
   *
   * ***/
  _private.scrollSpeed = function(){
    var baseTime = 0.610;
    var lastScroll = 0;
    var lastTime = 0;
    var checkStopTimeout = 0;

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

      // calculating media
      var media = 0;
      lastSpeeds.forEach(function(e){
        media += e;
      });
      media = (media/lastSpeeds.length).toFixed(2);

      // checking stop
      clearTimeout(checkStopTimeout);
      checkStopTimeout = window.setTimeout(function(){
        lastSpeeds = [];
      }, 1000);

      // updating elements
      // html.style.transitionDuration = media+'s';
      cards.style.transitionDuration = media+'s';
      [].forEach.call(oiCardHeader, function(e){
        e.style.transitionDuration = media+'s';
      });

      lastScroll = window.scrollY;
      lastTime = currentTime;
    };

    window.addEventListener('scroll', update);
    update();

    return;
  };

  return _public;
});
