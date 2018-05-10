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

  function dragControl() {

    var elements = $('.js-dragHeader');

    var x;
    var y;

    //マウスが要素内で押されたとき、又はタッチされたとき発火
    for(var i = 0; i < elements.length; i++) {
      elements[i].addEventListener('mousedown', mdown, false);
      elements[i].addEventListener('touchstart', mdown, false);
    }

    //マウスが押された際の関数
    function mdown(e) {

      var $dragArea = $(this).parent('.js-draggable');

      $dragArea.addClass('is-dragged');

      //タッチデイベントとマウスのイベントの差異を吸収
      if(e.type === 'mousedown') {
        var event = e;
      } else {
        var event = e.changedTouches[0];
      }

      //要素内の相対座標を取得
      x = event.pageX - $dragArea.offset().left;
      y = event.pageY - $dragArea.offset().top;

      //ムーブイベントにコールバック
      document.body.addEventListener('mousemove', mmove, false);
      document.body.addEventListener('touchmove', mmove, false);
    }

    //マウスカーソルが動いたときに発火
    function mmove(e) {

      var drag = document.getElementsByClassName('is-dragged')[0];

      //同様にマウスとタッチの差異を吸収
      if(e.type === 'mousemove') {
        var event = e;
      } else {
        var event = e.changedTouches[0];
      }

      //フリックしたときに画面を動かさないようにデフォルト動作を抑制
      e.preventDefault();

      //マウスが動いた場所に要素を動かす
      drag.style.top = event.pageY - y + 'px';
      drag.style.left = event.pageX - x + 'px';

      //マウスボタンが離されたとき、またはカーソルが外れたとき発火
      drag.addEventListener('mouseup', mup, false);
      document.body.addEventListener('mouseleave', mup, false);
      drag.addEventListener('touchend', mup, false);
      document.body.addEventListener('touchleave', mup, false);

    }

    //マウスボタンが上がったら発火
    function mup(e) {
      var drag = document.getElementsByClassName('is-dragged')[0];

      //ムーブベントハンドラの消去
      if (typeof drag !== 'undefined') {
        document.body.removeEventListener('mousemove', mmove, false);
        document.body.removeEventListener('touchmove', mmove, false);
        drag.removeEventListener('mouseup', mup, false);
        drag.removeEventListener('touchend', mup, false);

        //クラス名 .is-dragged も消す
        drag.classList.remove('is-dragged');
      }

    }

  }


  // fire when DOM is ready
  $(function() {
    anchorLink();
    // navControl();
    dragControl();
  });

  // fire when page is fully loaded
  $(window).on('load',function(){
  });

});
