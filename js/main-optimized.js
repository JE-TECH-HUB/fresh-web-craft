
/*
 * Optimized Main JS file for JE TechHub website
 * Focused on performance and efficient loading
 */

(function($) {
    "use strict";
    
    // Cache DOM elements
    const $window = $(window);
    const $document = $(document);
    const $body = $('body');
    
    // Performance optimized initialization
    const JETechHub = {
        // Initialize core functionality
        init: function() {
            this.handlePreloader();
            this.setupEventListeners();
            this.initializePlugins();
            this.optimizeScrolling();
        },
        
        // Optimized preloader
        handlePreloader: function() {
            $window.on('load', function() {
                $('.preloader').fadeOut(300, function() {
                    $(this).remove();
                });
            });
        },
        
        // Efficient event delegation
        setupEventListeners: function() {
            // Mobile menu toggle
            $body.on('click', '.slicknav_btn', function() {
                $body.toggleClass('menu-open');
            });
            
            // Smooth scroll for anchor links
            $body.on('click', 'a[href^="#"]', function(e) {
                const target = $($(this).attr('href'));
                if (target.length) {
                    e.preventDefault();
                    $('html, body').animate({
                        scrollTop: target.offset().top - 80
                    }, 800);
                }
            });
            
            // Form submission
            $body.on('submit', '.appointment .form', function(e) {
                e.preventDefault();
                alert('Thank you for your inquiry! We will contact you soon.');
            });
        },
        
        // Initialize plugins only when needed
        initializePlugins: function() {
            // Owl Carousel - lazy load
            setTimeout(() => {
                if (typeof $.fn.owlCarousel !== 'undefined') {
                    $('.hero-slider').owlCarousel({
                        items: 1,
                        loop: true,
                        autoplay: true,
                        autoplayTimeout: 5000,
                        nav: true,
                        dots: false,
                        smartSpeed: 800,
                        navText: ['<i class="fa fa-angle-left"></i>', '<i class="fa fa-angle-right"></i>']
                    });
                    
                    $('.portfolio-slider').owlCarousel({
                        items: 4,
                        loop: true,
                        autoplay: true,
                        autoplayTimeout: 4000,
                        nav: false,
                        dots: false,
                        margin: 15,
                        responsive: {
                            0: { items: 1 },
                            600: { items: 2 },
                            1000: { items: 4 }
                        }
                    });
                }
            }, 100);
            
            // Nice Select
            if (typeof $.fn.niceSelect !== 'undefined') {
                $('select').niceSelect();
            }
            
            // Counter animation
            if (typeof $.fn.counterUp !== 'undefined') {
                $('.counter').counterUp({
                    delay: 10,
                    time: 1000
                });
            }
        },
        
        // Optimized scroll handling
        optimizeScrolling: function() {
            let scrollTimeout;
            let isScrolling = false;
            
            $window.on('scroll', function() {
                if (!isScrolling) {
                    isScrolling = true;
                    requestAnimationFrame(function() {
                        const scrollTop = $window.scrollTop();
                        
                        // Sticky header
                        if (scrollTop > 100) {
                            $('.header').addClass('sticky');
                        } else {
                            $('.header').removeClass('sticky');
                        }
                        
                        isScrolling = false;
                    });
                }
            });
        }
    };
    
    // Initialize when DOM is ready
    $document.ready(function() {
        JETechHub.init();
    });
    
})(jQuery);

// Additional performance optimizations
document.addEventListener('DOMContentLoaded', function() {
    // Lazy load images that don't have loading attribute
    const lazyImages = document.querySelectorAll('img:not([loading])');
    lazyImages.forEach(img => {
        img.setAttribute('loading', 'lazy');
    });
    
    // Optimize third-party scripts
    const thirdPartyScripts = [
        'http://cdnjs.cloudflare.com/ajax/libs/waypoints/2.0.3/waypoints.min.js'
    ];
    
    // Load third-party scripts after main content
    setTimeout(() => {
        thirdPartyScripts.forEach(src => {
            const script = document.createElement('script');
            script.src = src;
            script.async = true;
            document.body.appendChild(script);
        });
    }, 2000);
});
