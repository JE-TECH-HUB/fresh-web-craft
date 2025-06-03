
/*
 * Main JS file for JE TechHub website - Optimized for Performance
 */

(function($) {
    "use strict";
    
    // Cache frequently used DOM elements
    const $window = $(window);
    const $document = $(document);
    const $body = $('body');
    
    /*==================================
    // Performance Optimized Button Click Enhancement
    ==================================*/ 
    // Delegate event handling for better performance
    $document.ready(function() {
        // Use event delegation for all clickable elements
        $body.on('click', '.btn, .card-button, .action-btn', function(e) {
            const href = $(this).attr('href');
            
            // If the button has an href attribute and it's not just '#'
            if (href && href !== '#' && href !== 'javascript:void(0)') {
                e.preventDefault();
                window.location.href = href;
            }
        });
    });
    
    /*=======================================
    [Start Activation Code - Performance Optimized]
    ==========================================*/ 
    $document.on('ready', function() {
        
        // Throttled scroll handler for better performance
        let scrollTimeout;
        $window.on('scroll', function() {
            if (scrollTimeout) {
                clearTimeout(scrollTimeout);
            }
            scrollTimeout = setTimeout(function() {
                const scrollTop = $window.scrollTop();
                
                // Sticky Header
                if (scrollTop > 200) {
                    $('#header .header-inner').addClass("sticky");
                } else {
                    $('#header .header-inner').removeClass("sticky");
                }
                
                if (scrollTop > 100) {
                    $('.header').addClass("sticky");
                } else {
                    $('.header').removeClass("sticky");
                }
            }, 16); // ~60fps
        });
        
        // Pro features toggle
        $('.pro-features .get-pro').on("click", function(){
            $('.pro-features').toggleClass('active');
        });
        
        // Search toggle
        $('.search a').on("click", function(){
            $('.search-top').toggleClass('active');
        });
        
        // Mobile Menu - Only initialize if slicknav is available
        if (typeof $.fn.slicknav !== 'undefined') {
            $('.menu').slicknav({
                prependTo:".mobile-nav",
                duration: 300,
                closeOnClick:true,
            });
        }
        
        // Hero Slider - Only initialize if owlCarousel is available
        if (typeof $.fn.owlCarousel !== 'undefined') {
            $(".hero-slider").owlCarousel({
                loop:true,
                autoplay:true,
                smartSpeed: 900,
                autoplayTimeout:9500,
                singleItem: true,
                autoplayHoverPause:true,
                items:1,
                nav:true,
                navText: ['<i class="fa fa-angle-left" aria-hidden="true"></i>', '<i class="fa fa-angle-right" aria-hidden="true"></i>'],
                dots:false,
            });

            // Testimonial Slider
            $('.testimonial-slider').owlCarousel({
                items:3,
                autoplay:true,
                autoplayTimeout:4500,
                smartSpeed:300,
                autoplayHoverPause:true,
                loop:true,
                merge:true,
                nav:false,
                dots:true,
                responsive:{
                    1: { items:1 },
                    300: { items:1 },
                    480: { items:1 },
                    768: { items:2 },
                    1170: { items:3 }
                }
            });
            
            // Portfolio Slider
            $('.portfolio-slider').owlCarousel({
                autoplay:true,
                autoplayTimeout:4000,
                margin:15,
                smartSpeed:300,
                autoplayHoverPause:true,
                loop:true,
                nav:true,
                dots:false,
                responsive:{
                    300: { items:1 },
                    480: { items:2 },
                    768: { items:2 },
                    1170: { items:4 }
                }
            });
            
            // Clients Slider
            $('.clients-slider').owlCarousel({
                items:5,
                autoplay:true,
                autoplayTimeout:3500,
                margin:15,
                smartSpeed: 400,
                autoplayHoverPause:true,
                loop:true,
                nav:false,
                dots:false,
                responsive:{
                    300: { items:1 },
                    480: { items:2 },
                    768: { items:3 },
                    1170: { items:5 }
                }
            });
            
            // Single Portfolio Slider
            $('.pf-details-slider').owlCarousel({
                items:1,
                autoplay:false,
                autoplayTimeout:5000,
                smartSpeed: 400,
                autoplayHoverPause:true,
                loop:true,
                merge:true,
                nav:true,
                dots:false,
                navText: ['<i class="icofont-rounded-left"></i>', '<i class="icofont-rounded-right"></i>'],
            });
        }
        
        // Counter Up - Only if available
        if (typeof $.fn.counterUp !== 'undefined') {
            $('.counter').counterUp({
                delay:20,
                time:2000
            });
        }
        
        // Accordion
        $('.accordion > li:eq(0) a').addClass('active').next().slideDown();
        $('.accordion a').on('click', function(j) {
            var dropDown = $(this).closest('li').find('p');
            $(this).closest('.accordion').find('p').not(dropDown).slideUp(300);
            if ($(this).hasClass('active')) {
                $(this).removeClass('active');
            } else {
                $(this).closest('.accordion').find('a.active').removeClass('active');
                $(this).addClass('active');
            }
            dropDown.stop(false, true).slideToggle(300);
            j.preventDefault();
        });
        
        // Nice Select - Only if available
        if (typeof $.fn.niceSelect !== 'undefined') {
            $('select').niceSelect();
        }
        
        // Date Picker - Only if available
        if (typeof $.fn.datepicker !== 'undefined') {
            $("#datepicker").datepicker();
        }
        
        // Checkbox handling
        $('input[type="checkbox"]').change(function(){
            if($(this).is(':checked')){
                $(this).parent("label").addClass("checked");
            } else {
                $(this).parent("label").removeClass("checked");
            }
        });
        
        // Right Bar
        $('.right-bar .bar').on("click", function(){
            $('.sidebar-menu').addClass('active');
        });
        $('.sidebar-menu .cross').on("click", function(){
            $('.sidebar-menu').removeClass('active');
        });
        
        // Video Popup - Only if magnificPopup is available
        if (typeof $.fn.magnificPopup !== 'undefined') {
            $('.video-popup').magnificPopup({
                type: 'video',	
            });
        }
        
        // Wow JS - Only if WOW is available
        if (typeof WOW !== 'undefined') {
            var window_width = $window.width();   
            if(window_width > 767){
                new WOW().init();
            }
        }

        // Scroll Up - Only if scrollUp is available
        if (typeof $.scrollUp !== 'undefined') {
            $.scrollUp({
                scrollText: '<span><i class="fa fa-angle-up"></i></span>',
                easingType: 'easeInOutExpo',
                scrollSpeed: 900,
                animation: 'fade'
            }); 
        }

        // Smooth scroll handling with performance optimization
        let scrollAnimating = false;
        $('.scroll').on("click", function (e) {
            if (scrollAnimating) return;
            
            e.preventDefault();
            
            const targetHref = $(this).attr('href');
            
            // Handle external links
            if (!targetHref.includes('#') || targetHref === '#') {
                window.location.href = targetHref;
                return;
            }
            
            let targetId;
            if (targetHref.includes('#') && targetHref.split('#')[0] !== '') {
                const pageName = targetHref.split('#')[0];
                const currentPage = window.location.pathname.split('/').pop();
                
                if (!currentPage.includes(pageName)) {
                    window.location.href = targetHref;
                    return;
                }
                
                targetId = targetHref.split('#')[1];
            } else {
                targetId = targetHref.replace('#', '');
            }
            
            const $target = $('#' + targetId);
            
            if ($target.length) {
                scrollAnimating = true;
                const headerHeight = $('.header').outerHeight() || 0;
                
                $('html, body').stop().animate({
                    scrollTop: $target.offset().top - headerHeight - 20
                }, 1000, 'easeInOutExpo', function() {
                    scrollAnimating = false;
                });
                
                $('.nav.menu li a').removeClass('active');
                $(this).addClass('active');
            }
        });

        // Optimized active link highlighting
        let highlightTimeout;
        $window.on('scroll', function() {
            if (highlightTimeout) {
                clearTimeout(highlightTimeout);
            }
            highlightTimeout = setTimeout(function() {
                const scrollPos = $window.scrollTop();
                const headerHeight = $('.header').outerHeight() || 0;
                
                $('section[id], div[id="services"], div[id="about"]').each(function() {
                    const sectionTop = $(this).offset().top - headerHeight - 100;
                    const sectionBottom = sectionTop + $(this).outerHeight();
                    const sectionId = $(this).attr('id');
                    
                    if (scrollPos >= sectionTop && scrollPos < sectionBottom) {
                        $('.nav.menu li a').removeClass('active');
                        
                        $('.nav.menu li a').each(function() {
                            const href = $(this).attr('href');
                            if (href && (href === '#' + sectionId || href.endsWith('#' + sectionId))) {
                                $(this).addClass('active');
                            }
                        });
                    }
                });
            }, 100); // Reduced frequency for better performance
        });
        
        // Stellar JS - Only if available
        if (typeof $.stellar !== 'undefined') {
            $.stellar({
              horizontalOffset: 0,
              verticalOffset: 0
            });
        }

        // Google Maps - Only if GMaps is available
        if (typeof GMaps !== 'undefined') {
            try {
                var map = new GMaps({
                    el: '#map',
                    lat: 23.011245,
                    lng: 90.884780,
                    scrollwheel: false,
                });
                map.addMarker({
                    lat: 23.011245,
                    lng: 90.884780,
                    title: 'Marker with InfoWindow',
                    infoWindow: {
                        content: '<p>welcome to JE TechHub</p>'
                    }
                });
            } catch(e) {
                console.log('Google Maps not available');
            }
        }
    });
    
    // Optimized preloader
    $window.on('load', function() {
        $('.preloader').addClass('preloader-deactivate');
        
        setTimeout(function() {
            $('.loader-wrapper').addClass('hidden');
        }, 500); // Reduced delay
        
        initActiveMenuLink();
    });
    
    // Function to initialize active menu link
    function initActiveMenuLink() {
        const currentUrl = window.location.pathname;
        const currentHash = window.location.hash;
        
        $('.nav.menu li a').each(function() {
            const linkHref = $(this).attr('href');
            
            if (currentUrl.endsWith(linkHref) || 
                (currentHash && linkHref && linkHref.endsWith(currentHash))) {
                $('.nav.menu li').removeClass('active');
                $(this).parent('li').addClass('active');
                $(this).addClass('active');
            }
        });
    }
    
})(jQuery);

// Vanilla JS optimizations for iOS Safari
document.addEventListener("DOMContentLoaded", function() {
    // Optimized iOS detection and fixes
    function isIOS() {
        return /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    }
    
    if (isIOS()) {
        const fadeSections = document.querySelectorAll('.fadeSection');
        fadeSections.forEach(section => {
            section.style.opacity = '1';
            section.style.transform = 'none';
            section.style.visibility = 'visible';
        });
    }
    
    // Preload critical resources
    const criticalImages = [
        'img/slider/slider-bg1.jpg',
        'img/slider/slider-bg2.jpg'
    ];
    
    criticalImages.forEach(src => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = src;
        document.head.appendChild(link);
    });
});
