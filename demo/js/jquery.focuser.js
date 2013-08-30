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
      if (scrolled > 3) {
        closeBg(id);
        $(window).unbind();
        scrolled = 0;
      }
    });
  }
  // Set all panel divs to default style, in case one is currently in focus
  $('div.panel').css({
    'z-index': '0',
    'position': 'static',
    '-webkit-box-shadow': 'none',
    '-moz-box-shadow': 'none',
    'box-shadow': 'none'
  });
  // Bring the desired panel div into focus
  $('div.panel#' + id).css({
    'z-index': '999',
    'position': 'relative',
    '-webkit-box-shadow': '0px 0px 30px rgba(0, 0, 0, 0.32)',
    '-moz-box-shadow': '0px 0px 30px rgba(0, 0, 0, 0.32)',
    'box-shadow': '0px 0px 30px rgba(0, 0, 0, 0.32)'
  });
  // RELEASE THE UNDERLAY
  if (!$('#modal-underlay').length) {
    $('body').append('<div id="modal-underlay" onclick="closeBg(\''+id+'\');" style="  display: none; width: 100%; height: 100%; background: #000; position: fixed; top: 0; left: 0; z-index: 998;"></div>');
    $('#modal-underlay').height( $('html').outerHeight() ).fadeTo(100, 0.5);
  }
}

function closeBg(id) {
  $ = jQuery;
  // Kill the underlay
  $('#modal-underlay').fadeOut(100, function() {
    $('#modal-underlay').remove();
  });
  // Reset our target panel
  $('div.panel#' + id).css({
    'z-index': '0',
    'position': 'static',
    '-webkit-box-shadow': 'none',
    '-moz-box-shadow': 'none',
    'box-shadow': 'none'
  });
}
