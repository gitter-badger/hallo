define(function (require) {
  var dom = require('dom'),
      _public = {},
      _private = {};

  _public.init = function(){
    dom.each('.channels-optionals li', function(channel, i){
      var buttonAdd =  channel.querySelectorAll('.add')[0],
          buttonRemove =  channel.querySelectorAll('.remove')[0];
      if(buttonAdd && buttonRemove){
        _private.add(channel, buttonAdd);
        _private.remove(channel, buttonRemove, buttonAdd);
      }
    });
  };

  // document.querySelectorAll('#text1')[0].textContent = 'Adicionado Playboy, seu punheteiro'

  _private.add = function(channel, buttonAdd){
    dom.on(buttonAdd, 'click', function(){
      dom.addClass(channel, 'added');
      _private.toggleText(buttonAdd);
    });
  };

  _private.remove = function(channel, buttonRemove, buttonAdd){
    dom.on(buttonRemove, 'click', function(){
      dom.removeClass(channel, 'added');
      _private.toggleText(buttonAdd);
      buttonAdd.focus();
    });
  };

  _private.toggleText = function(buttonAdd){
    var toggletext = buttonAdd.dataset.toggletext,
        text = buttonAdd.lastChild.nodeValue
    buttonAdd.lastChild.nodeValue = toggletext;
    buttonAdd.dataset.toggletext = text;
  };

  return _public;

});
