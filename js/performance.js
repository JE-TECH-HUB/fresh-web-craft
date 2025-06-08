
// Performance optimization utilities
(function() {
    'use strict';
    
    // Lazy loading for images
    function lazyLoadImages() {
        const images = document.querySelectorAll('img[data-src]');
        const imageObserver = new IntersectionObserver(function(entries, observer) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(function(img) {
            imageObserver.observe(img);
        });
    }
    
    // Defer non-critical JavaScript
    function deferJS() {
        const scripts = [
            'js/wow.min.js',
            'js/jquery.magnific-popup.min.js',
            'js/owl-carousel.js',
            'js/jquery.counterup.min.js'
        ];
        
        scripts.forEach(function(src) {
            const script = document.createElement('script');
            script.src = src;
            script.async = true;
            document.head.appendChild(script);
        });
    }
    
    // Optimize font loading
    function optimizeFonts() {
        if ('fonts' in document) {
            document.fonts.ready.then(function() {
                document.body.classList.add('fonts-loaded');
            });
        }
    }
    
    // Preload next page resources
    function preloadNextPage() {
        const links = document.querySelectorAll('a[href]');
        const prefetchedUrls = new Set();
        
        links.forEach(function(link) {
            link.addEventListener('mouseenter', function() {
                const href = this.getAttribute('href');
                if (href && !prefetchedUrls.has(href) && href.includes('.html')) {
                    const prefetchLink = document.createElement('link');
                    prefetchLink.rel = 'prefetch';
                    prefetchLink.href = href;
                    document.head.appendChild(prefetchLink);
                    prefetchedUrls.add(href);
                }
            });
        });
    }
    
    // Initialize optimizations
    document.addEventListener('DOMContentLoaded', function() {
        optimizeFonts();
        preloadNextPage();
        
        // Defer heavy operations
        setTimeout(function() {
            lazyLoadImages();
            deferJS();
        }, 100);
    });
    
    // Service Worker registration for caching
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', function() {
            navigator.serviceWorker.register('/sw.js').catch(function(error) {
                console.log('ServiceWorker registration failed: ', error);
            });
        });
    }
})();
