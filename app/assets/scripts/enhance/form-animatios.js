define([
  'domlib'
  ], function($){

  var _public = {},
      _private = {};

  _public.init = function() {
    _private.setupTextField();
  };

  /**
   *
   * _private.setupTextField
   *
   */
  _private.setupTextField = function(){
    $('body').on('focus', '.field-box input[type="text"]',function(e){
      var fieldBox = $(this).parent();
      if ( !fieldBox.hasClass('error') && !fieldBox.hasClass('success') ){
        fieldBox.removeClass('filling-off')
          .addClass('filling');
      }
    })
      .on('blur', function(e){
        var fieldBox = $(this).parent();
        if ($(this).val() === '') {
          $(this).parent()
            .removeClass('filling success error')
            .addClass('filling-off');
        }
      });

    $('.field-box').on('click', function(){
      $(this).find('input[type="text"]').trigger('focus');
    });
  };

  /**
   *
   * _private.setupSelectBoxes
   *
   */
  _private.setupSelectBoxes = function(){

    var updateInformation = function(value, fieldBox){
      fieldBox.find('select option')
        .removeAttr('selected');

      var selected = fieldBox.find('select option[value="'+value+'"]')
        .attr('selected', 'selected');

      // var elementToClone = fieldBox.find('.select-box ul li button[data-option-value="'+value+'"]');
      // $('body').append(oi.visual.cloneElementInPosition(elementToClone));

      fieldBox.addClass('success')
        .find('.selected-value')
        .html(selected.html())
        .show();

      closeSelectBox(fieldBox);
    };

    var openSelectBox = function(fieldBox){
      var currentHeight = fieldBox.outerHeight();
      var targetHeight = fieldBox.find('.select-box').outerHeight();

      fieldBox.find('.select-box i')
        .transition({'rotate':'180deg'}, 144, 'ease-in');

      fieldBox.find('.select-box')
        .css({'height':currentHeight, 'visibility':'visible'});

      fieldBox.find('.select-box')
        .transition({'height':targetHeight}, 144, 'ease-in');

    };

    var closeSelectBox = function(fieldBox){
      var currentHeight = fieldBox.find('.select-box').outerHeight();
      var targetHeight = fieldBox.outerHeight();

      fieldBox.find('.select-box')
        .css({'height':currentHeight});

      fieldBox.find('.select-box i')
        .transition({'rotate':'360deg'}, 144, 'ease-in');

      fieldBox.find('.select-box')
        .transition({'height':targetHeight, scale:0.999}, 144, function(){
          $(this).transition({opacity: 0}, 89, function(){
            $(this).remove();
            $(fieldBox).on('click', buildSelectBox);
          });
        }, 'ease-in');
    };

    var closeAllSelectBox = function(e){
      $('.field-box.select').each(function(i, e){
        closeSelectBox($(e));
      });
    };

    var buildSelectBox = function(e){
      $(this).unbind('click');
      closeAllSelectBox(null);

      var fieldBox = $(this);
      var options = $(this).find('select option');
      var listFromOptions = $('<ul>');
      for (var i = 0; i < options.length; i++) {
        var option = $(options[i]);
        var linkListItem = $('<button>').attr('data-option-value', option.val()).html(option.html());
        linkListItem.on('click', function(e){
          var value = $(this).data('option-value');
          updateInformation(value, fieldBox);
        });
        var listItem = $('<li>').append(linkListItem);
        listFromOptions.append(listItem);
      };

      //- **
      //- ** @jade code example showing the HTML snippet format
      //- **
      //- div.select-box
      //-   ul
      //-     li: a(href=empty) 08 as 12:00
      var arrow = $('<i>');
      var selectBox = $('<div>').addClass('select-box')
        .css({'visibility':'hidden'});

      selectBox.append(arrow)
        .append(listFromOptions);

      if (($(this).offset().top - window.scrollY) > (document.documentElement.clientHeight/2)) {
        selectBox.css({'top':'auto', 'bottom':'-3%'});
      } else {
        selectBox.css({'bottom':'auto', 'top':'-3%'});
      }
      $(this).append(selectBox);

      openSelectBox($(this));

      return e.stopPropagation();
    };

    $('html').on('click', closeAllSelectBox);
    $('.field-box.select').on('click', buildSelectBox);
  };

  /**
   *
   * _private.setupCheckboxes
   *
   */
  _private.setupCheckboxes = function(){
  };

  /**
   *
   * _private.setupRadios
   *
   */
  _private.setupRadios = function(){
  };


  return _public;
});
