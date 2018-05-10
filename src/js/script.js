(function(){
  var $body = $('body');
  var ua = navigator.userAgent.toLowerCase();
  var windowW = $(window).width();
  var windowH = $(window).outerHeight();

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

  function draggable() {

    $('.js-draggable').draggable({
      handle: '.js-dragHandle',
      scroll: false
    });

  }

  function calcHeight() {
    windowH = $(window).outerHeight();

    $('.js-100vh').css('height', windowH);
  }

  function onClick() {
    $('.js-close').on('click', function(e) {
      var self = e.currentTarget;
      var $parent = $(self).parents('.js-draggable');
      $parent.addClass('is-hidden');
    });
  }


  // fire when DOM is ready
  $(function() {
    anchorLink();
    // navControl();
    draggable();
    calcHeight();
    onClick();
  });

  // fire when page is fully loaded
  $(window).on('load',function(){
  });

  // fire when window resize completed
  var timer = false;
  $(window).on('resize', function() {
    if (timer !== false) {
      clearTimeout(timer);
    }
    timer = setTimeout( function() {
      calcHeight();
    } , 100);
  });


})()
