define(function (require) {
  var _public = {},
      _private = {};

  // var W = window,
  //     D = document,
  //     BODY = D.getElementsByTagName('body')[0];

  _public.$ = function ready(fn) {
    if (document.readyState != 'loading'){
      fn();
    } else if (document.addEventListener) {
      document.addEventListener('DOMContentLoaded', fn);
    } else {
      document.attachEvent('onreadystatechange', function() {
        if (document.readyState != 'loading')
          fn();
      });
    }
  };

  _public.$ = function(selector){
    return document.querySelectorAll(selector);
  };

  _public.getText = function(el){
    return el.textContent || el.innerText;
  };

  _public.setText = function(el, text){
    if (el.textContent !== undefined){
      el.textContent = text;
    } else {
      el.innerText = text;
    }
  };

  _public.each = function (selector, fn) {
    var elements = _public.$(selector);
    for (var i = 0; i < elements.length; i++){
      fn(elements[i], i);
    }
  };

  _public.on = function(el, eventName, handler) {
    if (el.addEventListener) {
      el.addEventListener(eventName, handler);
    } else {
      el.attachEvent('on' + eventName, function(){
        handler.call(el);
      });
    }
  };

  _public.off = function(el, eventName, handler) {
    if (el.removeEventListener){
      el.removeEventListener(eventName, handler);
    } else {
      el.detachEvent('on' + eventName, handler);
    }
  };

  _public.addClass = function(el, className){
    if (el.classList){
      el.classList.add(className);
    } else{
      el.className += ' ' + className;
    }
  };

  _public.removeClass = function(el, className){
    if (el.classList){
      el.classList.remove(className);
    } else {
      el.className = el.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
    }
  };

  _public.toggleClass = function(el, className){
    if (el.classList) {
      el.classList.toggle(className);
    } else {
        var classes = el.className.split(' ');
        var existingIndex = -1;
        for (var i = classes.length; i--;) {
          if (classes[i] === className)
            existingIndex = i;
        }
        if (existingIndex >= 0)
          classes.splice(existingIndex, 1);
        else
          classes.push(className);

      el.className = classes.join(' ');
    }
  };

  return _public;
});
