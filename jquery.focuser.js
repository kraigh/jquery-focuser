(function ($) {$(document).ready(function() {


  // SET THE DEFAULT SCROLL OFFSET HERE
  var offsetDefault = -10;


  $(document).on('click', '.focus', function(){
    var id = $(this).attr('data-focus-id');
    // Check for the scroll class and set the variable accordingly.
    if ($(this).hasClass('scroll')) {
      var scroll = true;
    } else {
      var scroll = false;
    }
    // Check for an offset option. If none, set a default.
    if ($(this).attr('data-scroll-offset')) {
      var offset = parseInt($(this).attr('data-scroll-offset'));
    } else {
      // If you would like, you can change this value to adjust the default offset.
      var offset = offsetDefault;
    }
    focusOn(id, scroll, offset);
  });
});})(jQuery);

function focusOn(id, scroll, offset) {
  offset = offset || -10;
  // Let's unbind the scroll function now, to account for nav clicks while a panel is in focus.
  $(window).unbind();
  // Initialize scrolled variable.
  var scrolled = 0;
  if (scroll == true) {
    // Start scrollin'
    $.smoothScroll({
      scrollElement: null,
      scrollTarget: '#'+id,
      offset: offset,
      afterScroll: function() {
        $(window).bind("scroll", function() {
          scrolled++;
          if (scrolled > 3) {
            closeBg(id);
            $(window).unbind();
            scrolled = 0;
          }
        });
      }
    });
  } else {
    $(window).bind("scroll", function() {
      scrolled++;
      if (scrolled > 0) {
        closeBg(id);
        $(window).unbind();
        scrolled = 0;
      }
    });
  }
  // Set all panel divs to default style, in case one is currently in focus
  $('[focused="true"]').css({
    'z-index': '0',
    'position': 'static',
    '-webkit-box-shadow': 'none',
    '-moz-box-shadow': 'none',
    'box-shadow': 'none'
  }).removeAttr('focused');
  // Bring the desired panel div into focus
  $('#' + id).css({
    'z-index': '999',
    'position': 'relative',
    '-webkit-box-shadow': '0px 0px 30px rgba(0, 0, 0, 0.32)',
    '-moz-box-shadow': '0px 0px 30px rgba(0, 0, 0, 0.32)',
    'box-shadow': '0px 0px 30px rgba(0, 0, 0, 0.32)'
  }).attr('focused', 'true');
  // RELEASE THE UNDERLAY
  if (!$('#focus-underlay').length) {
    $('body').append('<div id="focus-underlay" onclick="closeBg(\''+id+'\');" style="  display: none; width: 100%; height: 100%; background: #000; position: fixed; top: 0; left: 0; z-index: 998;"></div>');
    $('#focus-underlay').height( $('html').outerHeight() ).fadeTo(100, 0.5);
  } else {
    $('#focus-underlay').attr('onclick', 'closeBg(\''+id+'\');');
  }
}

function closeBg(id) {
  $ = jQuery;
  // Kill the underlay
  $('#focus-underlay').fadeOut(100, function() {
    $('#focus-underlay').remove();
  });
  // Reset our target panel
  $('#' + id).css({
    'z-index': '0',
    'position': 'static',
    '-webkit-box-shadow': 'none',
    '-moz-box-shadow': 'none',
    'box-shadow': 'none'
  });
}
