(function ($) {
  'use strict';

  /*
  |--------------------------------------------------------------------------
  | Template Name: Poze
  | Author: AwesomeThemez
  | Version: 1.0.0
  |--------------------------------------------------------------------------
  |--------------------------------------------------------------------------
  | TABLE OF CONTENTS:
  |--------------------------------------------------------------------------
  |
  | 1. Preloader
  | 2. Mobile Menu
  | 3. Sticky Header
  | 4. One Page Navigation
  | 5. Slick Slider
  | 6. Accordian
  | 7. Modal
  | 8. Scroll Up
  | 9. Sticky Footer 
  | 10. Review
  |
  */

  /*--------------------------------------------------------------
    Scripts initialization
  --------------------------------------------------------------*/
  $.exists = function (selector) {
    return $(selector).length > 0;
  };
  $(window).on('load', function () {
    preloader();
  });
  $(function () {
    $(window).trigger('resize');
    mainNav();
    stickyHeader();
    accordianSetup();
    scrollUp();
    onePageNavigation();
    slickInit();
    fixedHeader();
    stickyFooter();
    modal();
    review();
    tabs();
    dynamicBackground();
    if ($.exists('.wow')) {
      new WOW({
        mobile: false,
      }).init();
    }
  });

  $(window).on('load', function () {
    $(window).trigger('scroll');
    $(window).trigger('resize');
  });

  $(window).on('scroll', function () {
    showScrollUp();
    hideMenu();
    fixedHeader();
  });

  /*--------------------------------------------------------------
    1. Preloader
  --------------------------------------------------------------*/
  function preloader() {
    $('.cs_perloader').fadeOut();
    $('cs_perloader_in').delay(150).fadeOut('slow');
  }

  /*--------------------------------------------------------------
    2. Mobile Menu
  --------------------------------------------------------------*/
  function mainNav() {
    $('.cs_nav').append('<span class="cs_menu_toggle"><span></span></span>');
    $('.menu-item-has-children').append(
      '<span class="cs_munu_dropdown_toggle"><span></span></span>',
    );
    $('.cs_menu_toggle').on('click', function () {
      $(this)
        .toggleClass('cs_toggle_active')
        .siblings('.cs_nav_list').toggleClass('cs_active')
        .siblings('.cs_close_nav').toggleClass('active') 
    });
    $('.cs_menu_toggle')
      .parents('body')
      .find('.cs_side_header')
      .addClass('cs_has_main_nav');
    $('.cs_menu_toggle')
      .parents('body')
      .find('.cs_toolbox')
      .addClass('cs_has_main_nav');
    $('.cs_munu_dropdown_toggle').on('click', function () {
      $(this).toggleClass('active').siblings('ul').slideToggle();
      $(this).parent().toggleClass('active');
    });
    $('.cs_close_nav').on('click', function () {
      $(this)
        .toggleClass('active')
        .siblings('ul').toggleClass("cs_active")
        .siblings('.cs_menu_toggle').toggleClass("cs_toggle_active")
    });
  }

  /*--------------------------------------------------------------
    3. Sticky Header
  --------------------------------------------------------------*/
  function stickyHeader() {
    var $window = $(window);
    var lastScrollTop = 0;
    var $header = $('.cs_sticky_header');
    var headerHeight = $header.outerHeight() + 20;

    $window.scroll(function () {
      var windowTop = $window.scrollTop();
      if (windowTop >= headerHeight) {
        $header.addClass('cs_gescout_sticky');
      } else {
        $header.removeClass('cs_gescout_sticky');
        $header.removeClass('cs_gescout_show');
      }

      if ($header.hasClass('cs_gescout_sticky')) {
        if (windowTop < lastScrollTop) {
          $header.addClass('cs_gescout_show');
        } else {
          $header.removeClass('cs_gescout_show');
        }
      }
      lastScrollTop = windowTop;
    });
  }

  function fixedHeader() {
    var scroll = $(window).scrollTop();
    if (scroll >= 100) {
      $('.cs_fixed_header').addClass('cs_fixed_active');
    } else {
      $('.cs_fixed_header').removeClass('cs_fixed_active');
    }
  }

  /*--------------------------------------------------------------
    4. One Page Navigation
  --------------------------------------------------------------*/
  function onePageNavigation() {
    var topLimit = 300,
      ultimateOffset = 200;

    $('.cs_onepage_nav').each(function () {
      var $this = $(this),
        $parent = $this.parent(),
        current = null,
        $findLinks = $this.find('a');

      function getHeader(top) {
        var last = $findLinks.first();
        if (top < topLimit) {
          return last;
        }
        for (var i = 0; i < $findLinks.length; i++) {
          var $link = $findLinks.eq(i),
            href = $link.attr('href');

          if (href.charAt(0) === '#' && href.length > 1) {
            var $anchor = $(href).first();
            if ($anchor.length > 0) {
              var offset = $anchor.offset();
              if (top < offset.top - ultimateOffset) {
                return last;
              }
              last = $link;
            }
          }
        }
        return last;
      }

      $(window).on('scroll', function () {
        var top = window.scrollY,
          height = $this.outerHeight(),
          max_bottom = $parent.offset().top + $parent.outerHeight(),
          bottom = top + height + ultimateOffset;

        var $current = getHeader(top);

        if (current !== $current) {
          $this.find('.active').removeClass('active');
          $current.addClass('active');
          current = $current;
        }
      });
    });
  }

  /*----------------------------------------------------------
    5. Slick Slider
  -----------------------------------------------------------*/
  function slickInit() {
    $('.cs_slider').slick({
      centerMode: true,
      focusOnSelect: true,
      centerPadding: '290px',
      arrows: false,
      dots: true,
      slidesToShow: 3,
      responsive: [
        {
          breakpoint: 1600,
          settings: {
            centerPadding: '200px',
          },
        },
        {
          breakpoint: 1400,
          settings: {
            centerPadding: '160px',
            slidesToShow: 2,
          },
        },
        {
          breakpoint: 1200,
          settings: {
            centerMode: false,
            focusOnSelect: false,
            centerPadding: '0px',
            slidesToShow: 2,
          },
        },
        {
          breakpoint: 768,
          settings: {
            centerMode: false,
            focusOnSelect: false,
            centerPadding: '0px',
            slidesToShow: 1,
          },
        },
      ],
    });
    $('.cs_slider1').slick({
      dots: false,
      arrows: false,
      infinite: true,
      autoplay: true,
      slidesToShow: 2,
    });
  }

  /*--------------------------------------------------------------
   6. Accordian
 --------------------------------------------------------------*/
  function accordianSetup() {
    var $this = $(this);
    $('.cs_accordian').children('.cs_accordian_body').hide();
    $('.cs_accordian.active').children('.cs_accordian_body').show();
    $('.cs_accordian_title').on('click', function () {
      $(this)
        .parent('.cs_accordian')
        .siblings()
        .children('.cs_accordian_body')
        .slideUp(250);
      $(this).siblings().slideDown(250);
      /* Accordian Active Class */
      $(this).parents('.cs_accordian').addClass('active');
      $(this).parent('.cs_accordian').siblings().removeClass('active');
    });
  }

  /*--------------------------------------------------------------
   7. Modal
 --------------------------------------------------------------*/
  function modal() {
    $('.cs_modal_btn').on('click', function () {
      var modalData = $(this).attr('data-modal');
      $(`[data-modal='${modalData}']`).addClass('active');
      $(this).parents('.cs_modal').removeClass('active');
    });
    $('.cs_close_modal, .cs_close_overlay').on('click', function () {
      var modalData = $(this).parents('.cs_modal').attr('data-modal');
      $(`[data-modal='${modalData}']`).removeClass('active');
    });
  }

  /*--------------------------------------------------------------
    8. Scroll Up
  --------------------------------------------------------------*/
  function scrollUp() {
    $('#cs_backtotop').on('click', function (e) {
      e.preventDefault();
      $('html,body').animate(
        {
          scrollTop: 0,
        },
        0,
      );
    });
  }
  //For Scroll Up
  function showScrollUp() {
    let scroll = $(window).scrollTop();
    if (scroll >= 450) {
      $('#cs_backtotop').addClass('active');
    } else {
      $('#cs_backtotop').removeClass('active');
    }
  }

  /*--------------------------------------------------------------
    9. Sticky Footer 
  --------------------------------------------------------------*/
  function stickyFooter() {
    // Sticky Footer
    var footerHeight = $('.cs_sticky_footer').height();
    var footerHeightPx = footerHeight + 'px';
    $('.cs_content').css('margin-bottom', footerHeightPx);
  }

  /*--------------------------------------------------------------
    10. Review
  --------------------------------------------------------------*/
  function review() {
    $('.cs_rating').each(function () {
      var review = $(this).data('rating');
      var reviewVal = review * 20 + '%';
      $(this).find('.cs_rating_percentage').css('width', reviewVal);
    });
  }

  /*--------------------------------------------------------------
    11. Hide Mobile Menu
  --------------------------------------------------------------*/
  function hideMenu() {
    let scroll = $(window).scrollTop();
    if (scroll >= 150) {
      $('.cs_nav_list').removeClass("cs_active");
      $('.cs_menu_toggle').removeClass("cs_toggle_active");
      $('.cs_close_nav').removeClass("active");
    }  
  }

  /*--------------------------------------------------------------
    12. Tabs
  --------------------------------------------------------------*/
  function tabs() {
    $('.cs_tabs .cs_tab_links a').on('click', function (e) {
      var currentAttrValue = $(this).attr('href');
      $('.cs_tabs ' + currentAttrValue)
        .fadeIn(400)
        .siblings()
        .hide();
      $(this).parents('li').addClass('active').siblings().removeClass('active');
      e.preventDefault();
    });
  }
   /*--------------------------------------------------------------
    13. Dynamic Background
  --------------------------------------------------------------*/
  function dynamicBackground() {
    $('[data-src]').each(function () {
      var src = $(this).attr('data-src');
      $(this).css({
        'background-image': 'url(' + src + ')',
      });
    });
  }
/*--------------------------------------------------------------
    14. Dynamic contact form
  --------------------------------------------------------------*/
  if ($.exists('#cs_form')) {
    const form = document.getElementById('cs_form');
    const result = document.getElementById('cs_result');

    form.addEventListener('submit', function (e) {
      const formData = new FormData(form);
      e.preventDefault();
      var object = {};
      formData.forEach((value, key) => {
        object[key] = value;
      });
      var json = JSON.stringify(object);
      result.innerHTML = 'Please wait...';

      fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: json,
      })
        .then(async response => {
          let json = await response.json();
          if (response.status == 200) {
            result.innerHTML = json.message;
          } else {
            console.log(response);
            result.innerHTML = json.message;
          }
        })
        .catch(error => {
          console.log(error);
          result.innerHTML = 'Something went wrong!';
        })
        .then(function () {
          form.reset();
          setTimeout(() => {
            result.style.display = 'none';
          }, 5000);
        });
    });
  }

})(jQuery); // End of use strict
