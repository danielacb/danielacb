$(document).ready(function () {
    //preloader
    jQuery(window).load(function () {
        // load images 
        jQuery("#status").fadeOut();
        jQuery("#preloader").delay(1000).fadeOut(1000);
        setTimeout(function () {
            new scrollAnimation();
        }, 1000);        
    }); 
    
    //Scroll Animation Menu
    $(window).scroll(function () {
        var scrollTop = $(window).scrollTop();
        if (scrollTop >= 600) {
            $("#menu").addClass("active");
            $("#language").hide();
        }
    });
    // Parallax Header
    $(document).scroll(function () {
        $(".parallax").each(function () {
            var depth = $(this).attr("data-depth");
            var scrollTop = $(window).scrollTop();
            var top = -(scrollTop / depth) + "px";
            $(this).css("top", top);
        });
    });
    //Anchor Nav
    $(document).on("click", ".anchor", function (event) {
        event.preventDefault();
        $("html, body").animate({
            scrollTop: $($.attr(this, "href")).offset().top - 70
        }, 800);
    });
    // Background Pagina Portfolio
    $(".projeto").mouseenter(function () {
        var bgClass = $(this).attr("data-bg");
        $("#bg-portfolio").addClass(bgClass);
    }).mouseleave(function () {
        $("#bg-portfolio").removeClass();
    });
    //Scroll Animation Menu
    $(window).scroll(function () {
        var scrollTop = $(window).scrollTop();
        if (scrollTop >= 300) {
            $("#menu").addClass("active");
        }
        else {
            $("#menu").removeClass("active");
        }
    });
    //Menu Overlay
    var $menuOverlay = $("#menu-overlay");
    $("button, #menu-overlay ul li a").click(function (event) {
        $menuOverlay.toggleClass("active");
    });
    $(document).keyup(function (e) {
        if (e.keyCode == 27) {
            if ($menuOverlay.hasClass("active")) {
                $menuOverlay.toggleClass("active");
            }
        }
    });
    // Hover menu topo
    $('#topo ul.right li, #menu-overlay nav ul li').hover(function () {
            $('#topo ul.right li, #menu-overlay nav ul li').not(this).toggleClass('hover');
        })
        //Scroll Animations
    function scrollAnimation() {
        $(".animate").each(function () {
            var scrollTop = $(document).scrollTop();
            var offset = $(window).height() * 3 / 4;
            var animationStart = ($(this).offset().top - offset) - 20;
            if (scrollTop >= animationStart) {
                $(this).addClass("animation");
            }
            else {
                $(this).removeClass("animation");
            }
        })
    };
    $(document).scroll(function () {
        scrollAnimation();
    });
    //Slider
    $(document).ready(function () {
        $('#slider-preview').slick({
            infinite: true
            , slidesToShow: 3
            , slidesToScroll: 1
            , variableWidth: true
            , autoplay: true
        });
    });
    //Fancybox
    $("a.slide").fancybox({
        infobar: true
        , slideShow: false
        , fullScreen: false
        , thumbs: false
    }); 
});