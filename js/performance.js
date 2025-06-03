
/*
 * Performance optimization utilities - loads early for better UX
 */

// Preload critical resources
(function() {
    'use strict';
    
    // Preload critical images
    const criticalImages = [
        'img/slider/slider-bg1.jpg',
        'img/slider/slider-bg2.jpg',
        'images/JE Techhub logo.png'
    ];
    
    // Create preload links for critical images
    criticalImages.forEach(function(src) {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = src;
        document.head.appendChild(link);
    });
    
    // Optimize font loading
    const fontLink = document.createElement('link');
    fontLink.rel = 'preload';
    fontLink.as = 'font';
    fontLink.type = 'font/woff2';
    fontLink.href = 'https://fonts.gstatic.com/s/poppins/v20/pxiEyp8kv8JHgFVrJJfecg.woff2';
    fontLink.crossOrigin = 'anonymous';
    document.head.appendChild(fontLink);
    
    // Lazy load non-critical CSS
    function loadCSS(href) {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = href;
        link.media = 'print';
        link.onload = function() {
            this.media = 'all';
        };
        document.head.appendChild(link);
    }
    
    // Load non-critical stylesheets after page load
    window.addEventListener('load', function() {
        loadCSS('css/animate.min.css');
        loadCSS('css/magnific-popup.css');
    });
    
    // Optimize images loading
    function optimizeImages() {
        const images = document.querySelectorAll('img');
        images.forEach(function(img) {
            if (!img.hasAttribute('loading')) {
                img.setAttribute('loading', 'lazy');
            }
        });
    }
    
    // Run optimizations when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', optimizeImages);
    } else {
        optimizeImages();
    }
    
})();
