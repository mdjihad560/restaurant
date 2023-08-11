(function($) {
"use strict";

/*------------------------------------------------------------------
[Table of contents]

RESTAURANT MEANMENU INIT JS
RESTAURANT ACCORDION CUSTOM JS
RESTAURANT BANNER SLIDER JS
RESTAURANT FOOD SLIDER JS
RESTAURANT SYNC SLIDER JS
RESTAURANT MAGNIFIC POPUP JS
RESTAURANT WOW ANIMATION JS
RESTAURANT STICKY MENU JS
RESTAURANT GOOGLE MAP JS


-------------------------------------------------------------------*/

/*--------------------------------------------------------------
CUSTOM PRE DEFINE FUNCTION
------------------------------------------------------------*/
/* is_exist() */
jQuery.fn.is_exist = function(){
  return this.length;
}


$(function(){

/*--------------------------------------------------------------
RESTAURANT MEANMENU INIT JS
--------------------------------------------------------------*/
$(window).on('scroll', function(){
  if ($(window).scrollTop() > 50) {
      $('#sticky-menu').addClass('sticky-menu');
  } else {
      $('#sticky-menu').removeClass('sticky-menu');
  }

});

/*--------------------------------------------------------------
 RESTAURANT ACCORDION CUSTOM JS
--------------------------------------------------------------*/
$('#restaurant--accordion').on('show.bs.collapse', function(e) {
  var closest = e.target.closest('.card');
  $(closest).addClass('card__active').siblings().removeClass('card__active');
})

/*--------------------------------------------------------------
RESTAURANT BANNER SLIDER JS
--------------------------------------------------------------*/
var banner_slider = $('.restaurant--banner-slider');
  if (banner_slider.is_exist()) {
      banner_slider.owlCarousel({
      loop:true,
      margin: 10,
      nav:false,
      dots:true,
      center: true,
      animateOut: 'fadeOut',
      animateIn: 'fadeIn',
      autoplay: false,
      autoplayTimeout:5000,
      autoHeight:true,
      items:1,
  });

}

/*--------------------------------------------------------------
RESTAURANT FOOD SLIDER JS
--------------------------------------------------------------*/
var food_slider = $('.restaurant--food-slider');
  if (food_slider.is_exist()) {
      food_slider.owlCarousel({
      loop:true,
      margin: 30,
      nav:false,
      dots:false,
      autoHeight:false,
      items:1,
      responsive:{
          0:{
              items:2
          },
          600:{
              items:2.5
          },
          768:{
              items:2.5
          },
          1000:{
              items:2.6
          }
      }

  });
  $('#restaurant--testimonial-customNav .custom-nav-next').click(function() {
      food_slider.trigger('next.owl.carousel');
  })
  $('#restaurant--testimonial-customNav .custom-nav-prev').click(function() {
      food_slider.trigger('prev.owl.carousel');
  })

}

/*--------------------------------------------------------------
RESTAURANT SYNC SLIDER JS
------------------------------------------------------------*/

var testimonila_sync = $('#slider1, #slider2');
  if (testimonila_sync.is_exist()) {
    var sync1 = $("#slider1");
    var sync2 = $("#slider2");
    var slidesPerPage = 5; //globaly define number of elements per page
    var syncedSecondary = true;
    sync1.owlCarousel({
      items : 1,
      slideSpeed : 2000,
      autoplayTimeout: 3000,
      nav: true,
      autoplay: false,
      dots: false,
      loop: true,
      navText: [],
      responsiveRefreshRate : 200,
      autoplayHoverPause: true
    }).on('changed.owl.carousel', syncPosition);

    sync2
      .on('initialized.owl.carousel', function () {
        sync2.find(".owl-item").eq(0).addClass("current");
      })
      .owlCarousel({
      items : slidesPerPage,
      dots: false,
      margin: 0,
      nav: false,
      slideSpeed : 2000,
      autoplayTimeout: 3000,
      smartSpeed: 200,
      slideSpeed : 500,
      slideBy: slidesPerPage, //alternatively you can slide by 1, this way the active slide will stick to the first item in the second carousel
      responsiveRefreshRate : 100,
      
      responsive:{
          0:{
              items:3,
          },
          600:{
              items:4,
          },
          768:{
              items:4,
          },
          1000:{
              items: slidesPerPage
          }
      }
    }).on('changed.owl.carousel', syncPosition2);

    function syncPosition(el) {
      var count = el.item.count-1;
      var current = Math.round(el.item.index - (el.item.count/2) - .5);
     
      if(current < 0) {
        current = count;
      }
      if(current > count) {
        current = 0;
      }
      //end block
      sync2
        .find(".owl-item")
        .removeClass("current")
        .eq(current)
        .addClass("current");
      var onscreen = sync2.find('.owl-item.active').length - 1;
      var start = sync2.find('.owl-item.active').first().index();
      var end = sync2.find('.owl-item.active').last().index();
     
      if (current > end) {
        sync2.data('owl.carousel').to(current, 100, true);
      }
      if (current < start) {
        sync2.data('owl.carousel').to(current - onscreen, 100, true);
      }
    }

    function syncPosition2(el) {
      if(syncedSecondary) {
        var number = el.item.index;
        sync1.data('owl.carousel').to(number, 100, true);
      }
    }

    sync2.on("click", ".owl-item", function(e){
      e.preventDefault();
      var number = $(this).index();
      sync1.data('owl.carousel').to(number, 300, true);
  });

}

/*--------------------------------------------------------------
RESTAURANT MAGNIFIC POPUP JS
------------------------------------------------------------*/
var gallery_popup = $('.restaurant--gallery-popup');
if(gallery_popup.is_exist()){
  $(gallery_popup).magnificPopup({
     // delegate: 'a',
      type: 'image',
      closeOnContentClick: false,
      closeBtnInside: false,
      mainClass: 'mfp-with-zoom mfp-img-mobile',
      image: {
        verticalFit: true,
        titleSrc: function(item) {
          return item.el.attr('title') + ' &middot; <a class="image-source-link" href="'+item.el.attr('data-source')+'" target="_blank">image source</a>';
        }
      },
      gallery: {
        enabled: true
      },
      zoom: {
        enabled: true,
        duration: 300, // don't foget to change the duration also in CSS
        opener: function(element) {
          return element.find('img');
        }
      }

  });
}


});/*End document ready*/


$(window).on("resize", function(){

}); // end window resize


$(window).on("load" ,function(){

/*--------------------------------------------------------------
RESTAURANT WOW ANIMATION JS
------------------------------------------------------------*/
var wow = new WOW({
  mobile: true,       // default
  tablet:true,
  callback: function(box) {
    if (box.classList.contains('restaurant_animate')) {
      box.classList.add("restaurant_img_loaded");
    }
  }
});
if ( $(window).width() >= 768  ) {
 wow.init();
}

/*--------------------------------------------------------------
RESTAURANT STICKY MENU JS
------------------------------------------------------------*/
$(window).scroll(function(){
  if ($(window).scrollTop() > 50) {
     $('.restaurant--header-section').addClass('sticky-menu'); 
  } else {
      $('.restaurant--header-section').removeClass('sticky-menu');
  }
}); // End Scroll Function

}); // End window LODE

/*--------------------------------------------------------------
RESTAURANT GOOGLE MAP JS
--------------------------------------------------------------*/
var google_map = $('#map');
if(google_map.is_exist()){
  google.maps.event.addDomListener(window, 'load', init);
  function init() {
    var mapOptions = {
        zoom: 11,
        scrollwheel: false,
        navigationControl: false,
        mapTypeControl: false,
        scaleControl: false,
        draggable: true,
        disableDefaultUI: true,
        center: new google.maps.LatLng(40.6700, -73.9400), 
         styles: [{"featureType":"landscape.man_made","elementType":"geometry","stylers":[{"color":"#f7f1df"}]},{"featureType":"landscape.natural","elementType":"geometry","stylers":[{"color":"#d0e3b4"}]},{"featureType":"landscape.natural.terrain","elementType":"geometry","stylers":[{"visibility":"off"}]},{"featureType":"poi","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"poi.business","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"poi.medical","elementType":"geometry","stylers":[{"color":"#fbd3da"}]},{"featureType":"poi.park","elementType":"geometry","stylers":[{"color":"#bde6ab"}]},{"featureType":"road","elementType":"geometry.stroke","stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#ffe15f"}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#efd151"}]},{"featureType":"road.arterial","elementType":"geometry.fill","stylers":[{"color":"#ffffff"}]},{"featureType":"road.local","elementType":"geometry.fill","stylers":[{"color":"black"}]},{"featureType":"transit.station.airport","elementType":"geometry.fill","stylers":[{"color":"#cfb2db"}]},{"featureType":"water","elementType":"geometry","stylers":[{"color":"#a2daf2"}]}]
                };
      var mapElement = document.getElementById('map');

      var map = new google.maps.Map(mapElement, mapOptions);

      var marker = new google.maps.Marker({
        position: new google.maps.LatLng(40.6700, -73.9400),
        map: map,
        icon: 'assets/images/map.png',
        title: 'restaurant'
      });
      var contentString = '<div id="content">' +
          '<div id="tpw">' +
          '<h3>restaurant' +
          '</div>';

      var infowindow = new google.maps.InfoWindow({
          content: contentString,
          maxWidth: 280
      });

      marker.setAnimation(google.maps.Animation.BOUNCE);
      setTimeout(function(){ marker.setAnimation(null); }, 750);  //time it takes for one bounce   

      google.maps.event.addListener(marker, 'click', function () {
          infowindow.open(map, marker);
      });

    }

}

})(jQuery);






