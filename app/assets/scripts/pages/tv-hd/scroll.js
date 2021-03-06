define([
  'domlib',
  'vendor/velocity'
  ], function($, velocity){

  var _public = {},
      _private = {};

  try{
  var scrollDirection = 0;

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
  var clickableCards = document.querySelectorAll('oi-card');

  // content
  var content = document.querySelector('.content');
  var contentHeader = document.querySelector('.content_header');
  var contentTableContainer = document.querySelector('.content_table_container');
  var contentTable = document.querySelector('.content_table');

  // table
  var tableLists = document.querySelector('.oi-channels_lists-container');

  // sizes
  var cardSize = cardsContainerBox.getBoundingClientRect().height;
  var contentHeaderWidth = contentHeader.getBoundingClientRect().width;
  var contentListsListTvTitleWidth = Math.round((contentHeaderWidth/100)*12.820512821);
  var contentAddonsTitleWidth = Math.round((contentHeaderWidth/100)*23.076923077);

  // positions
  var openPosition = cards.offsetTop;
  var lockPosition = content.offsetTop;
  var foldPosition = contentTable.offsetTop;

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
    _private.clicks();
    _private.updateOnResize();
    _private.checkHash();
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

    var lastScroll = 0;

    // change table position
    // TODO: performance check
    var dynamicTable = function(y, initialPoint, finalPoint){
      var p = _private.baseFromPoint(y, initialPoint, finalPoint, 10);
      // content.style.top = (25 - p*2.5)+'vh';
      // content.style.transform = 'translateY('+ (25 - p*2.5)+ 'vh)';

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
          content.className += ' parse';
        }
      } else {
        if (cards.classList.contains('parse')){
          cards.className = cards.className.replace(' parse', '');
          content.className = content.className.replace(' parse', '');
        }
      }

      return;
    };

    // change the size of border realtive to the table depth
    // TODO: performance check
    // TODO: clear componentes
    // TODO: increase logic
    var dynamicBorderSize = function(){
      var newSize = content.getBoundingClientRect().bottom;
      if (newSize < window.innerHeight){
        cardsContainer.style.height = newSize+'px';
      } else {
        cardsContainer.style.height = '100vh';
      }
    };

    // hack position of buttons of folded
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
        }
      } else {
        lock.done = false;
        content.className = content.className.replace(' lock', '');
        cards.className = cards.className.replace(' lock', '');
      }

      return;
    };

    // add fold class to table
    // TODO: performance check
    var fold = function(){

      var removeFold = function(){
        if (content.classList.contains('fold')) {
          cards.className = cards.className.replace(' fold', '');
          content.className = content.className.replace(' fold', '');
          if (!content.classList.contains('unfold')) {
            cards.className += ' unfold';
            content.className += ' unfold';
          }
        }
      };

      var addFold = function(){
        if (!content.classList.contains('fold')) {
          cards.className += ' fold';
          content.className += ' fold';
          if (content.classList.contains('unfold')) {
            cards.className = cards.className.replace(' unfold', '');
            content.className = content.className.replace(' unfold', '');
          }
        }
      };

      var removeUnfold = function(){
        if (content.classList.contains('unfold')) {
          cards.className = cards.className.replace(' unfold', '');
          content.className = content.className.replace(' unfold', '');
        }
      };

      if (window.scrollY >= foldPosition) {
        if (!scrollDirection) {
          addFold();
        } else {
          removeFold();
        }
      } else {
        removeFold();
        removeUnfold();
      }
      return;
    };

    // add hide class to table
    // TODO: performance check
    var hide = function(){
      var newSize = tableLists.getBoundingClientRect().bottom;
      if (newSize < window.innerHeight){
        if (!content.classList.contains('hide')) {
          content.className += ' hide';
        }
      } else {
        content.className = content.className.replace(' hide', '');
      }
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

        // dynamicCards(window.scrollY, openPosition, openPosition + cardSize*0.89);
        dynamicCards(window.scrollY, openPosition, openPosition + cardSize);
        // dynamicTitle(window.scrollY, openPosition + cardSize*0.55, openPosition + cardSize * 0.89);
        dynamicTitle(window.scrollY, openPosition + cardSize*0.55, openPosition + cardSize);

        dynamicBorderSize();
      } else {

        dynamiciPhoneSizeHack();
      }

      dynamicBackgrounds(window.scrollY, openPosition + cardSize*0.55, openPosition + cardSize * 0.89);

      open();
      lock();

      fold();

      if (window.innerWidth >= 768) {
        hide();
      }

      scrollDirection = (lastScroll > window.scrollY) ? 1 : 0;
      lastScroll = window.scrollY;
    };

    window.addEventListener('scroll', scrollSpy);
    scrollSpy();
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
      foldPosition = contentTable.offsetTop;

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
   * keys
   *
   * load keyboard letters to use on page points
   *
   * @method keys
   * @return null
   *
   * ***/
  _private.keys = function(){

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
      if (e.keyCode == 37) {
        e.preventDefault();
        selectBack();
      } else if (e.keyCode == 39) {
        e.preventDefault();
        selectFowrad();
      }
    };

    document.addEventListener('keydown', keypress);
  };

  /**
   * clicks
   *
   * load clicks events of page
   *
   * @method clicks
   * @return null
   *
   * ***/
  _private.clicks = function(){

    var clickOnCard = function(e){
      [].forEach.call(clickableCards, function(element, i){
        if (element == e.currentTarget) {
          _public.changeCardTo(i);
        }
      });
    };

    [].forEach.call(clickableCards, function(e){
      e.addEventListener('click', clickOnCard);
      e.addEventListener('touch', clickOnCard);
    });
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
  _public.changeCardTo = function(index){

    [].forEach.call(clickableCards, function(e){
      e.className = e.className.replace('selected', '');
    });

    clickableCards[index].className += 'selected';
    window.location.hash = '#'+clickableCards[index].querySelector('a[data-slug]').getAttribute('data-slug');

    _private.changeTableTo(index);
    _private.scrollToLockPosition();

    return false;
  };


  /**
   * scrollToLockPosition
   *
   * send the scroll to the "lock" position, mobile safe
   *
   * @method scrollToLockPosition
   * @return null;
   *
   * ***/
  _private.scrollToLockPosition = function(){

    var pos = lockPosition;
    var duration = 987;
    if (window.innerWidth <= 414) {
      pos = openPosition;
      duration = 610;
    }

    $('html, body').velocity('scroll', {
      offset: pos,
      duration: duration,
      mobileHA: false
    });

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
  _private.changeTableTo = function(index){
    return false;
  };



  /**
   * checkHash
   *
   * check the hash and send table to selected card option
   *
   * @method checkHash
   * @return {boolean} false, if hash not found
   *
   * ***/
  _private.checkHash = function(){

    if (window.innerWidth < 768) {
      return;
    }

    var hash = window.location.hash.replace('#', '');
    var cardLink = document.querySelector('a[data-slug="'+hash+'"]');
    if (!cardLink) {
      return false;
    }
    var card = cardLink.parentNode;

    [].forEach.call(clickableCards, function(e, i){
      if (e == card) {
        _public.changeCardTo(i);
      }
    });
  };

  }catch(e){
    console.log(e);
  }

  return _public;
});
