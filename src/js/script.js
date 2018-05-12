(function(){
  var $body = $('body');
  var windowW = $(window).width();
  var windowH = $(window).outerHeight();


  function checkUserAgent() {
    // UserAgentChecker
    // @link https://github.com/mtskf/UserAgentChecker

    window._uac = {}; // define _uac as a global object
    var ua = window.navigator.userAgent.toLowerCase();
    var ver = window.navigator.appVersion.toLowerCase();

    // check browser version
    _uac.browser = (function(){
      if (ua.indexOf('edge') !== -1)           return 'Microsoft Edge';    // Edge
      else if (ua.indexOf("iemobile") !== -1)  return 'IE Mobile';         // ieMobile
      else if (ua.indexOf('trident/7') !== -1) return 'Internet Explorer'; // ie11
      else if (ua.indexOf("msie") !== -1 && ua.indexOf('opera') === -1)     return 'Internet Explorer'; // ie6~10
      else if (ua.indexOf('chrome')  !== -1 && ua.indexOf('edge') === -1)   return 'Chrome';            // Chrome
      else if (ua.indexOf('safari')  !== -1 && ua.indexOf('chrome') === -1) return 'Safari';            // Safari
      else if (ua.indexOf('opera')   !== -1)   return 'Opera';             // Opera
      else if (ua.indexOf('firefox') !== -1)   return 'Firefox';           // FIrefox
      else return 'Browser';
    })();

    var browserName = (_uac.browser !== '') ? _uac.browser : 'Browser';
    $('#browserName').text(browserName);
  }

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

    $('#js-reload').on('click', function() {
      location.reload();
    });
  }


  // fire when DOM is ready
  $(function() {
    checkUserAgent();
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
