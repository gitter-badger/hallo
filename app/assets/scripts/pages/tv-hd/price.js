define([
  'domlib',
  'vendor/lodash',
  'vendor/riot',
  'tags/oi-price',
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
      _private.bindOpenClientType();
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

  _private.bindOpenClientType = function(){
    $openClientType.on('click', function(evt){
      evt.preventDefault();
      evt.stopPropagation()
      _private.openClientType();
    });
    _private.changeClientType();
  }

  _private.openClientType = function(){
    $dropdowClientType.addClass('open');
      _private.bindCloseClientType();
      _private.bindNavKeyboardClientType();
  }

  _private.closeClientType = function(){
    setTimeout(function(){
      $dropdowClientType.removeClass('open');
    }, 400)
  }

  _private.bindCloseClientType = function (){
    $('body').on('click.bodyClientType', function (evt) {
      evt.preventDefault();
      console.log('aaa');
      $('body').off('click.bodyClientType')
      _private.closeClientType();
    })
  }

  _private.bindNavKeyboardClientType = function(){
    document.onkeydown = function(evt) {
      evt = evt || window.event;
      // Esc
      if (evt.keyCode == 27) {
        $('body').off('click.bodyClientType')
        _private.closeClientType();
      }
    };
  };

  _private.changeClientType = function(){
    $clientType.on('click', function(evt){
      evt.preventDefault();
      $clientType.removeClass('active');
      $(this).addClass('active')
      // $dropdowClientType.removeClass('open');
      var quant = $(this).hasClass('has-phone') ? 0 : 1;
      _private.cartUpdateValue('phone', quant)
    });
  }


  return _public;

});
