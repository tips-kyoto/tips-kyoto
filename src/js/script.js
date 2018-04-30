$( function() {
  var $body = $('body');
  var ua = navigator.userAgent.toLowerCase();

  // anchor link
  function anchorLink() {
    $(document).on('click', 'a[href^="#"]', function(e) {
      e.preventDefault();

      var $el     = $(this);
      var $target = $($el.attr('href'));
      var paddingTop = 70;

      if (!$target[0]) {
        return;
      }

      var offset = $target.offset().top;
      $('html, body').animate({scrollTop: offset - paddingTop});
    });
  }

  function navControl() {
    var $navBtn = $('#js-navBtn');
    var $nav = $('#js-nav');

    $navBtn.on('click', function() {
      if ( $navBtn.hasClass('is-open') ) {
        $nav.fadeOut(300);
      } else {
        $nav.fadeIn(300);
      }
      $navBtn.toggleClass('is-open');
      $body.toggleClass('nav-open');
    });

    $('body').on('click', function() {
      if ( $navBtn.hasClass('is-open') ) {
        $nav.fadeOut(300);
        $navBtn.toggleClass('is-open');
        $body.toggleClass('nav-open');
      }
    });

    $('#js-nav, #js-navBtn').on( 'click', function(e) {
      e.stopPropagation();
    });

  }


  // fire when DOM is ready
  $(function() {
    anchorLink();
    navControl();
  });

  // fire when page is fully loaded
  $(window).on('load',function(){
  });

});
