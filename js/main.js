
/*
 * Optimized Main JS file for JE TechHub website
 */

(function($) {
    "use strict";
    
    // Performance optimization: Use throttled scroll handler
    const throttledScroll = window.performanceUtils ? 
        window.performanceUtils.throttle : 
        function(func, limit) {
            let inThrottle;
            return function() {
                const args = arguments;
                const context = this;
                if (!inThrottle) {
                    func.apply(context, args);
                    inThrottle = true;
                    setTimeout(() => inThrottle = false, limit);
                }
            }
        };
    
    /*==================================
    // Optimized Button Click Enhancement
    ==================================*/ 
    $(document).ready(function() {
        // Delegate event handling for better performance
        $(document).on('click', '.btn, .card-button, .action-btn', function(e) {
            const href = $(this).attr('href');
            
            if (href && href !== '#') {
                window.location.href = href;
            }
        });
    });
    
    /*=======================================
    [Optimized Activation Code]
    ==========================================*/ 
    $(document).on('ready', function() {
    
        /*====================================
            Optimized Sticky Header JS
        =======================================*/ 
        const stickyHandler = throttledScroll(function() {
            const scrollTop = $(this).scrollTop();
            const headerInner = $('#header .header-inner');
            const header = $('.header');
            
            if (scrollTop > 200 && headerInner.length) {
                headerInner.addClass("sticky");
            } else if (headerInner.length) {
                headerInner.removeClass("sticky");
            }
            
            if (scrollTop > 100 && header.length) {
                header.addClass("sticky");
            } else if (header.length) {
                header.removeClass("sticky");
            }
        }, 16); // ~60fps
        
        $(window).on('scroll', stickyHandler);
        
        $('.pro-features .get-pro').on("click", function(){
            $('.pro-features').toggleClass('active');
        });
        
        /*====================================
            Search JS
        =======================================*/ 
        $('.search a').on("click", function(){
            $('.search-top').toggleClass('active');
        });
        
        /*====================================
            Optimized Mobile Menu
        =======================================*/ 	
        if (typeof $.fn.slicknav !== 'undefined') {
            $('.menu').slicknav({
                prependTo:".mobile-nav",
                duration: 300,
                closeOnClick:true,
            });
        }
        
        /*===============================
            Optimized Hero Slider JS
        ==================================*/ 
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

            /*===============================
                Testimonial Slider JS
            ==================================*/ 
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
                    1170: { items:3 },
                }
            });
            
            /*===============================
                Portfolio Slider JS
            ==================================*/ 
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
                    1170: { items:4 },
                }
            });
            
            /*===============================
                Clients Slider JS
            ==================================*/ 
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
                    1170: { items:5 },
                }
            });
            
            /*====================================
                Single Portfolio Slider JS
            =======================================*/ 
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
        
        /*=====================================
            Optimized Counter Up JS
        =======================================*/
        if (typeof $.fn.counterUp !== 'undefined') {
            $('.counter').counterUp({
                delay:20,
                time:2000
            });
        }
        
        /*===================
            Accordion JS
        ======================*/ 
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
        
        /*====================================
            Nice Select JS
        =======================================*/ 	
        if (typeof $.fn.niceSelect !== 'undefined') {
            $('select').niceSelect();
        }
        
        /*=====================================
            Date Picker JS
        =======================================*/ 
        if (typeof $.fn.datepicker !== 'undefined') {
            $("#datepicker").datepicker();
        }
        
        /*===============================
            Checkbox JS
        ==================================*/  
        $('input[type="checkbox"]').change(function(){
            if($(this).is(':checked')){
                $(this).parent("label").addClass("checked");
            } else {
                $(this).parent("label").removeClass("checked");
            }
        });
        
        /*===============================
            Right Bar JS
        ==================================*/ 
        $('.right-bar .bar').on("click", function(){
            $('.sidebar-menu').addClass('active');
        });
        $('.sidebar-menu .cross').on("click", function(){
            $('.sidebar-menu').removeClass('active');
        });
        
        /*=====================
            Video Popup JS
        ========================*/ 
        if (typeof $.fn.magnificPopup !== 'undefined') {
            $('.video-popup').magnificPopup({
                type: 'video',	
            });
        }
        
        /*================
            Optimized Wow JS
        ===================*/		
        if (typeof WOW !== 'undefined') {
            var window_width = $(window).width();   
            if(window_width > 767){
                new WOW().init();
            }
        }

        /*===================
            Scroll Up JS
        ======================*/
        if (typeof $.scrollUp !== 'undefined') {
            $.scrollUp({
                scrollText: '<span><i class="fa fa-angle-up"></i></span>',
                easingType: 'easeInOutExpo',
                scrollSpeed: 900,
                animation: 'fade'
            }); 
        }

        /*=======================
            Optimized Animate Scroll JS
        ==========================*/
        $('.scroll').on("click", function (e) {
            e.preventDefault();
            
            const targetHref = $(this).attr('href');
            
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
                const headerHeight = $('.header').outerHeight() || 0;
                
                $('html, body').stop().animate({
                    scrollTop: $target.offset().top - headerHeight - 20
                }, 1000, 'easeInOutExpo');
                
                $('.nav.menu li a').removeClass('active');
                $(this).addClass('active');
            }
        });

        // Optimized scroll highlighting
        const scrollHighlight = throttledScroll(function() {
            const scrollPos = $(window).scrollTop();
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
        
        $(window).on('scroll', scrollHighlight);
        
        /*=======================
            Stellar JS
        ==========================*/
        if (typeof $.stellar !== 'undefined') {
            $.stellar({
              horizontalOffset: 0,
              verticalOffset: 0
            });
        }

        /*====================
            Google Maps JS
        =======================*/
        if (typeof GMaps !== 'undefined') {
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
                    content: '<p>welcome to Medipro</p>'
                }
            });
        }
    });
    
    /*====================
        Optimized Preloader JS
    =======================*/
    $(window).on('load', function() {
        $('.preloader').addClass('preloader-deactivate');
        
        setTimeout(function() {
            $('.loader-wrapper').addClass('hidden');
        }, 1000);
        
        initActiveMenuLink();
    });
    
    // Function to initialize active menu link based on current URL
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

// Vanilla JS optimizations for better performance
document.addEventListener('DOMContentLoaded', function() {
    // Optimized smooth scrolling
    const scrollLinks = document.querySelectorAll('a.scroll');
    
    scrollLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            
            if (!targetId.startsWith('#') && (targetId.includes('http') || !targetId.includes('#'))) {
                window.location.href = targetId;
                return;
            }
            
            const hashPart = targetId.includes('#') ? targetId.split('#')[1] : targetId.replace('#', '');
            const targetElement = document.getElementById(hashPart);
            
            if (targetElement) {
                const headerHeight = document.querySelector('.header')?.offsetHeight || 0;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerHeight - 20;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
                
                scrollLinks.forEach(link => link.classList.remove('active'));
                this.classList.add('active');
            } else if (!targetId.includes('#')) {
                window.location.href = targetId;
            }
        });
    });
    
    // iOS Safari fix
    if (/iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream) {
        const fadeSections = document.querySelectorAll('.fadeSection');
        fadeSections.forEach(section => {
            section.style.opacity = '1';
            section.style.transform = 'none';
            section.style.visibility = 'visible';
        });
    }
});
