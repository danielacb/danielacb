//Efeito no Mapa 
$(document).ready(function() {
var movementStrength = 80;
var height = movementStrength / $(window).height();
var width = movementStrength / $(window).width();
$("header").mousemove(function(e){
          var pageX = e.pageX - ($(window).width() / 2);
          var pageY = e.pageY - ($(window).height() / 2);
          var newvalueX = width * pageX * -1 - 25;
          var newvalueY = height * pageY * -1 - 50;
          $('header').css("background-position", newvalueX+"px     "+newvalueY+"px");
});
});

//Smooth Scroll
$(function() {
  $('a[href*="#"]:not([href="#"])').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        $('html, body').animate({
          scrollTop: target.offset().top
        }, 800);
        return false;
      }
    }
  });
});


//preloader
jQuery(window).load(function() {
        // will first fade out the loading animation
    jQuery("#status").fadeOut();
        // will fade out the whole DIV that covers the website.
    jQuery("#preloader").delay(1000).fadeOut(1000);
})


// menu 
var $menu = $('.menu');
var $content = $('#content');

$content.waypoint(function (direction) {
    if (direction == 'down') {
        $menu.addClass('menuon');
    } else {
        $menu.removeClass('menuon');
    }
}, { offset: '30%' });