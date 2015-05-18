define([
  'domlib'
  ], function($){

  var _public = {},
      _private = {};

  // html
  // var html = document.querySelector('html');
  var header = document.querySelector('body >header');

  // cards
  var cards = document.querySelector('.cards');
  var cardsContainer = document.querySelector('.cards_container');
  var cardsContainerBox = document.querySelector('.cards_container_box');
  var oiCard = document.querySelectorAll('oi-card');
  var oiCardHeader = document.querySelectorAll('.oi-card_header');
  var oiCardHeaderTitle = document.querySelectorAll('.oi-card_header_title');

  // channels
  var content = document.querySelector('.content');
  var contentHeader = document.querySelector('.content_header');
  var contentTableContainer = document.querySelector('.content_table_container');

  var contentListsTitles = document.querySelectorAll('.oi-channels-lists_list-tv_title, .oi-channels-addons_title');
  var contentContainer = document.querySelector('.oi-channels_container');

  // sizes
  var cardSize = cardsContainerBox.getBoundingClientRect().height;
  var contentHeaderWidth = contentHeader.getBoundingClientRect().width;
  var contentListsListTvTitleWidth = Math.round((contentHeaderWidth/100)*12.820512821);
  var contentAddonsTitleWidth = Math.round((contentHeaderWidth/100)*23.076923077);

  // positions
  var openPosition = cards.offsetTop;
  var lockPosition = content.offsetTop;
  var foldPosition = contentContainer.offsetTop;

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
    _private.keys();
    _private.updateOnResize();
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
   * scrollSpeed
   *
   * change transition-duration on some elements relative to scroll speed
   *
   * @method scrollSpeed
   * @return null
   *
   * ***/
  _private.scrollSpeed = function(){

    var lastSpeeds = [];
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
      content.style.top = (25 - p*2.5)+'vh';

      content.style.opacity = _private.baseFromPoint(y, initialPoint, finalPoint, 1);
    };

    // change table opacity
    // TODO: performance check
    // TODO: bound to dynamicTable method
    var dynamicTableOpacity = function(y, initialPoint, finalPoint){
      var p = _private.baseFromPoint(y, initialPoint, finalPoint, 10);
      content.style.opacity = (p/10);
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

      if (y >= initialPoint) {
        if (!cards.classList.contains('parse')){
          cards.className += ' parse';
        }
      } else {
        if (cards.classList.contains('parse')){
          cards.className = cards.className.replace(' parse', '');
        }
      }

      return;
    };

    // change the size of border realtive to the table depth
    // TODO: performance check
    // TODO: clear componentes
    // TODO: increase logic
    var dynamicBorderSize = function(){
      var newSize = contentTableContainer.getBoundingClientRect().bottom;
      if (newSize < window.innerHeight){
        cardsContainer.style.height = newSize+'px';
      } else {
        cardsContainer.style.height = '100vh';
      }
    };

    var dynamiciPhoneSizeHack = function(){
      if (navigator.userAgent.match(/iPhone/i)){
        header.style.height = 'calc(100vh - 68px)';
      }
    };

      // add open class to cards
    // TODO: performance check
    var open = function(){
      if (window.scrollY >= openPosition) {
        if (!cards.classList.contains('open')) {
          cards.className += ' open';
          _private.checkSelected();
        }
      } else {
        cards.className = cards.className.replace(' open', '');
      }
    };

    // add open class to cards and channels
    // TODO: performance check
    var lock = function(){
      if (window.scrollY >= lockPosition) {
        if (!lock.done) {
          lock.done = true;
          content.className += ' lock';
          cards.className += ' lock';
          // frameSpy.loop = true;
          // frameSpy();
        }
      } else {
        lock.done = false;
        content.className = content.className.replace(' lock', '');
        cards.className = cards.className.replace(' lock', '');
       //  frameSpy.loop = false;
       // _private.updateTitles(0, 0);
      }

      return;
    };

    // add fold class to channels
    // TODO: performance check
    var fold = function(){
      if (window.scrollY >= foldPosition) {
        if (!content.classList.contains('fold')) {
          cards.className += ' fold';
          content.className += ' fold';
        }
      } else {
        cards.className = cards.className.replace(' fold', '');
        content.className = content.className.replace(' fold', '');
        // frameSpy.loop = false;
      }
      return;
    };

    // spy the scroll value
    // TODO: performance check
    var scrollSpy = _private.scrollSpy =  function(e){
      window.scrollY = window.pageYOffset;

      lockPosition = content.offsetTop - oiCardHeaderTitle[0].getBoundingClientRect().height - 10;
      foldPosition = lockPosition + contentHeader.offsetHeight;

      if (window.innerWidth >= 768) {
        dynamicTable(window.scrollY, openPosition, openPosition + cardSize*0.21 );
        // dynamicTable(window.scrollY, -window.innerHeight*3, openPosition );
        // dynamicTableOpacity(window.scrollY, openPosition, openPosition + cardSize*0.21 );

        dynamicCards(window.scrollY, openPosition, openPosition + cardSize*0.89);
        dynamicTitle(window.scrollY, openPosition + cardSize*0.55, openPosition + cardSize * 0.89);

        dynamicBorderSize();
      } else {

        dynamiciPhoneSizeHack();
      }

      dynamicBackgrounds(window.scrollY, openPosition + cardSize*0.55, openPosition + cardSize * 0.89);

      open();
      lock();

      fold();

      lastScroll = window.scrollY;
    };

    var frameSpy = function(){

      var update = function(){
        _private.updateTitles(contentHeader.getBoundingClientRect().bottom, contentHeader.getBoundingClientRect().left);
        if (frameSpy.loop == true){
          animationLoopback();
        }
      };

      var animationLoopback = function(){
        window.requestAnimationFrame(update);
      };
      animationLoopback();

      return;
    };

    window.addEventListener('scroll', scrollSpy);
    scrollSpy();
  };

  /**
   * updateTitles
   *
   * update table titles postion when locked
   *
   * @method updateTitles
   * @param top {number} top position of title
   * @param left {number} left position of title
   * @return null
   *
   * ***/
  _private.updateTitles = function(top, left){
    var nextLeft = left;
    [].forEach.call(contentListsTitles, function(e){
      e.style.top = top+'px';

      if (top > 0){
        e.style.left = nextLeft+'px';
      } else {
        e.style.left = '0px';
      }

      if (e.classList.contains('oi-channels-addons_title')){
        e.style.width = contentAddonsTitleWidth+'px';
      } else {
        e.style.width = contentListsListTvTitleWidth+'px';
      }

      nextLeft += contentListsListTvTitleWidth;
    });

    return;
  };

  /**
   * keys
   *
   * load keyboard letters to use on page points
   *
   * @method scrollSpeed
   * @return null
   *
   * ***/
  _private.keys = function(){

    var moveToOpenPosition = function(){
      window.scroll(0, openPosition);
      // $('html, body').animate({
      //   scrollTop: parseInt(cards.offsetTop)
      // }, 610);
    };

    var moveToCardPosition = function(){
      var cardSize = window.cardSize;
      var openPosition = parseInt($('#product-contents').offset().top);
      $('html, body').animate({
        scrollTop: parseInt(openPosition + cardSize*0.55)
      }, 610);
    };

    var moveToLockPosition = function(){
      // window.scroll(0, parseInt(cards.offsetTop + cardsContainerBox.getBoundingClientRect().height - oiCardHeader[0].getBoundingClientRect().height - 10));
      window.scroll(0, lockPosition);
      // $('html, body').animate({
      //   scrollTop: parseInt(cards.offsetTop + cardsContainerBox.getBoundingClientRect().height - oiCardHeader[0].getBoundingClientRect().height - 10)
      // }, 610);
    };

    var moveToTopPosition = function(){
      oi.visual.scrollIt.disableScroll();
      $('html, body').animate({
        scrollTop: 0
      }, 610);
    };

    var checkSelected = function(){
      if(!$('.product-card').hasClass('selected')) {
        var placeholder = $($('.product-card')[1]).attr('data-placeholder');
        $('.product-card[data-placeholder="'+placeholder+'"]').addClass('selected');
      }
    };

    var selectBack = function(){
      if (!$('.product-card').hasClass('selected')) {
        moveToLockPosition();
      } else {
        var placeholder = $('.product-card.selected').attr('data-placeholder');
        $('.product-card').each(function(i, e){
          if ($(e).attr('data-placeholder') == placeholder) {
            if ($('.product-card')[i-1]) {
              $('.product-card').removeClass('selected');
              $($('.product-card')[i-1]).addClass('selected');
              $('.product-card .product-card-title').attr('style', 'height: 4rem');
            }
          }
        });
      }
    };

    var selectFowrad = function(){
      if (!$('.product-card').hasClass('selected')) {
        moveToLockPosition();
      } else {
        var placeholder = $('.product-card.selected').attr('data-placeholder');
        $('.product-card').each(function(i, e){
          if ($(e).attr('data-placeholder') == placeholder) {
            if ($('.product-card')[i+1]) {
              $('.product-card').removeClass('selected');
              $($('.product-card')[i+1]).addClass('selected');
              $('.product-card .product-card-title').attr('style', 'height: 4rem');
            }
          }
        });
      }
    };

    var keypress = function(e){
      if (e.keyCode == 40) {
        e.preventDefault();
        moveToLockPosition();
      } else if (e.keyCode == 38) {
        e.preventDefault();
        moveToTopPosition();
      } else if (e.keyCode == 65) {
        e.preventDefault();
        moveToOpenPosition();
      } else if (e.keyCode == 66) {
        e.preventDefault();
        moveToCardPosition();
      } else if (e.keyCode == 37) {
        e.preventDefault();
        selectBack();
      } else if (e.keyCode == 39) {
        e.preventDefault();
        selectFowrad();
      } else {
        console.log(e.keyCode);
      }
    };

    document.addEventListener('keydown', keypress);
  };

  /**
   * updateOnResize
   *
   * update base numbers on resize
   *
   * @method updateOnResize
   * @return null
   *
   * ***/
  _private.updateOnResize = function(){

    var update = function(e){
      openPosition = cards.offsetTop;
      foldPosition = contentContainer.offsetTop;

      cardSize = cardsContainerBox.getBoundingClientRect().height;

      contentHeaderWidth = contentHeader.getBoundingClientRect().width;
      contentListsListTvTitleWidth = (contentHeaderWidth/100)*12.820512821;
      contentAddonsTitleWidth = (contentHeaderWidth/100)*23.076923077;

      _private.scrollSpy(e);
    };

    window.addEventListener('resize', update);
    update();

    return;
  };

  /**
   * changeTableTo
   *
   * change between tables by indexs
   *
   * @method changeTableTo
   * @return {boolean} true, if we have a valid index, false if not
   *
   * ***/
  _public.changeTableTo = function(index){
    return false;
  };

  return _public;
});
