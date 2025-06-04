
/*
 * Performance optimization utilities - loads early for better UX
 */

(function() {
    'use strict';
    
    // Preload critical resources
    const criticalImages = [
        'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?q=80&w=2000',
        'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1000',
        'images/JE Techhub logo.png'
    ];
    
    // Create preload links for critical images
    criticalImages.forEach(function(src) {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = src;
        link.fetchPriority = 'high';
        document.head.appendChild(link);
    });
    
    // Preload critical fonts
    const fontLink = document.createElement('link');
    fontLink.rel = 'preload';
    fontLink.as = 'font';
    fontLink.type = 'font/woff2';
    fontLink.href = 'https://fonts.gstatic.com/s/poppins/v20/pxiEyp8kv8JHgFVrJJfecg.woff2';
    fontLink.crossOrigin = 'anonymous';
    document.head.appendChild(fontLink);
    
    // Lazy load non-critical CSS
    function loadCSS(href, media) {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = href;
        link.media = media || 'print';
        link.onload = function() {
            this.media = 'all';
        };
        // Fallback for older browsers
        link.onerror = function() {
            this.media = 'all';
        };
        document.head.appendChild(link);
        return link;
    }
    
    // Load non-critical stylesheets after page load
    window.addEventListener('load', function() {
        // Add small delay to ensure critical path is complete
        setTimeout(function() {
            loadCSS('css/animate.min.css');
            loadCSS('css/magnific-popup.css');
            loadCSS('css/nice-select.css');
            loadCSS('css/slicknav.min.css');
            loadCSS('css/owl-carousel.css');
            loadCSS('css/datepicker.css');
        }, 100);
    });
    
    // Optimize images loading with intersection observer
    function optimizeImages() {
        // Lazy loading for images
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver(function(entries, observer) {
                entries.forEach(function(entry) {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        if (img.dataset.src) {
                            img.src = img.dataset.src;
                            img.removeAttribute('data-src');
                        }
                        observer.unobserve(img);
                    }
                });
            }, {
                rootMargin: '50px 0px'
            });
            
            document.querySelectorAll('img[data-src]').forEach(function(img) {
                imageObserver.observe(img);
            });
        }
        
        // Add loading=lazy to all images
        const images = document.querySelectorAll('img');
        images.forEach(function(img) {
            if (!img.hasAttribute('loading') && !img.closest('.hero-slider')) {
                img.setAttribute('loading', 'lazy');
            }
        });
    }
    
    // Debounce function for performance
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = function() {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
    
    // Optimize scroll events
    const optimizedScroll = debounce(function() {
        // Custom scroll optimizations can be added here
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Update header on scroll
        const header = document.querySelector('.header');
        if (header) {
            if (scrollTop > 100) {
                header.classList.add('sticky');
            } else {
                header.classList.remove('sticky');
            }
        }
    }, 16); // ~60fps
    
    // Add optimized scroll listener
    window.addEventListener('scroll', optimizedScroll, { passive: true });
    
    // Preloader optimization
    function hidePreloader() {
        const preloader = document.querySelector('.preloader');
        if (preloader) {
            preloader.classList.add('preloader-deactivate');
            setTimeout(function() {
                const loaderWrapper = document.querySelector('.loader-wrapper');
                if (loaderWrapper) {
                    loaderWrapper.classList.add('hidden');
                }
            }, 500);
        }
    }
    
    // Run optimizations when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            optimizeImages();
            hidePreloader();
        });
    } else {
        optimizeImages();
        hidePreloader();
    }
    
    // Service Worker registration for caching (if available)
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', function() {
            // Service worker can be added here for caching strategies
        });
    }
    
    // Resource hints for better loading
    function addResourceHints() {
        // DNS prefetch for external domains
        const dnsPrefetch = [
            'https://fonts.googleapis.com',
            'https://fonts.gstatic.com',
            'https://images.unsplash.com',
            'https://cdnjs.cloudflare.com'
        ];
        
        dnsPrefetch.forEach(function(domain) {
            const link = document.createElement('link');
            link.rel = 'dns-prefetch';
            link.href = domain;
            document.head.appendChild(link);
        });
    }
    
    addResourceHints();
    
})();
