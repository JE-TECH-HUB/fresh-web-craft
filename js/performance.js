
/*
 * Advanced Performance optimization utilities - loads early for better UX
 */

(function() {
    'use strict';
    
    // Performance metrics tracking
    const perfMetrics = {
        startTime: performance.now(),
        resourceLoadTimes: {},
        criticalResourcesLoaded: 0
    };
    
    // Preload critical resources with priority
    const criticalImages = [
        {
            src: 'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?q=80&w=2000',
            fetchPriority: 'high'
        },
        {
            src: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1000',
            fetchPriority: 'high'
        },
        {
            src: 'images/JE Techhub logo.png',
            fetchPriority: 'high'
        }
    ];
    
    // Preload critical images with modern techniques
    criticalImages.forEach(function(img) {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = img.src;
        link.fetchPriority = img.fetchPriority;
        link.crossOrigin = 'anonymous';
        
        link.onload = function() {
            perfMetrics.criticalResourcesLoaded++;
            perfMetrics.resourceLoadTimes[img.src] = performance.now() - perfMetrics.startTime;
        };
        
        document.head.appendChild(link);
    });
    
    // Preload critical fonts with optimal loading
    const fontPreloads = [
        {
            href: 'https://fonts.gstatic.com/s/poppins/v20/pxiEyp8kv8JHgFVrJJfecg.woff2',
            type: 'font/woff2'
        },
        {
            href: 'https://fonts.gstatic.com/s/poppins/v20/pxiByp8kv8JHgFVrLGT9Z1xlFQ.woff2',
            type: 'font/woff2'
        }
    ];
    
    fontPreloads.forEach(function(font) {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'font';
        link.type = font.type;
        link.href = font.href;
        link.crossOrigin = 'anonymous';
        document.head.appendChild(link);
    });
    
    // Optimized CSS loading with fallback
    function loadCSS(href, media, id) {
        const existingLink = document.getElementById(id);
        if (existingLink) return existingLink;
        
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = href;
        link.media = media || 'print';
        link.id = id || '';
        
        let loaded = false;
        link.onload = function() {
            if (!loaded) {
                loaded = true;
                this.media = 'all';
            }
        };
        
        // Fallback for older browsers
        link.onerror = function() {
            if (!loaded) {
                loaded = true;
                this.media = 'all';
            }
        };
        
        document.head.appendChild(link);
        
        // Immediate fallback for very slow connections
        setTimeout(function() {
            if (!loaded) {
                link.media = 'all';
            }
        }, 3000);
        
        return link;
    }
    
    // Advanced image optimization with intersection observer
    function optimizeImages() {
        // Modern lazy loading with intersection observer
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver(function(entries, observer) {
                entries.forEach(function(entry) {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        
                        if (img.dataset.src) {
                            // Create a new image to preload
                            const newImg = new Image();
                            newImg.onload = function() {
                                img.src = img.dataset.src;
                                img.removeAttribute('data-src');
                                img.classList.add('loaded');
                            };
                            newImg.src = img.dataset.src;
                        }
                        
                        observer.unobserve(img);
                    }
                });
            }, {
                rootMargin: '100px 0px',
                threshold: 0.1
            });
            
            // Observe all images with data-src
            document.querySelectorAll('img[data-src]').forEach(function(img) {
                imageObserver.observe(img);
            });
        } else {
            // Fallback for browsers without intersection observer
            document.querySelectorAll('img[data-src]').forEach(function(img) {
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
            });
        }
        
        // Add loading optimization to all images
        const images = document.querySelectorAll('img');
        images.forEach(function(img) {
            if (!img.hasAttribute('loading') && !img.closest('.hero-slider')) {
                img.setAttribute('loading', 'lazy');
                img.setAttribute('decoding', 'async');
            }
        });
    }
    
    // Optimized debounce with RAF
    function debounce(func, wait) {
        let timeout;
        let rafId;
        
        return function executedFunction(...args) {
            const later = function() {
                clearTimeout(timeout);
                cancelAnimationFrame(rafId);
                rafId = requestAnimationFrame(() => func(...args));
            };
            
            clearTimeout(timeout);
            cancelAnimationFrame(rafId);
            timeout = setTimeout(later, wait);
        };
    }
    
    // Highly optimized scroll handler
    const optimizedScroll = debounce(function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Update header with transform for better performance
        const header = document.querySelector('.header');
        if (header) {
            if (scrollTop > 100) {
                header.classList.add('sticky');
            } else {
                header.classList.remove('sticky');
            }
        }
    }, 16);
    
    // Enhanced preloader with progress tracking
    function hidePreloader() {
        const preloader = document.querySelector('.preloader');
        if (preloader) {
            // Wait for critical resources
            const checkResources = function() {
                if (perfMetrics.criticalResourcesLoaded >= criticalImages.length || 
                    performance.now() - perfMetrics.startTime > 5000) {
                    
                    preloader.style.opacity = '0';
                    preloader.style.transition = 'opacity 0.3s ease';
                    
                    setTimeout(function() {
                        preloader.style.display = 'none';
                        document.body.classList.add('loaded');
                    }, 300);
                } else {
                    setTimeout(checkResources, 100);
                }
            };
            
            checkResources();
        }
    }
    
    // Resource prioritization
    function prioritizeResources() {
        // DNS prefetch for external domains
        const dnsPrefetch = [
            'https://fonts.googleapis.com',
            'https://fonts.gstatic.com',
            'https://images.unsplash.com'
        ];
        
        dnsPrefetch.forEach(function(domain) {
            const link = document.createElement('link');
            link.rel = 'dns-prefetch';
            link.href = domain;
            document.head.appendChild(link);
        });
        
        // Preconnect to critical domains
        const preconnect = [
            'https://fonts.gstatic.com',
            'https://images.unsplash.com'
        ];
        
        preconnect.forEach(function(domain) {
            const link = document.createElement('link');
            link.rel = 'preconnect';
            link.href = domain;
            link.crossOrigin = 'anonymous';
            document.head.appendChild(link);
        });
    }
    
    // Initialize performance optimizations
    function initPerformance() {
        prioritizeResources();
        optimizeImages();
        hidePreloader();
        
        // Add scroll listener with passive option
        window.addEventListener('scroll', optimizedScroll, { 
            passive: true,
            capture: false
        });
        
        // Load non-critical CSS after initial paint
        requestIdleCallback(function() {
            loadCSS('css/animate.min.css', 'all', 'animate-css');
            loadCSS('css/magnific-popup.css', 'all', 'popup-css');
            loadCSS('css/nice-select.css', 'all', 'select-css');
            loadCSS('css/slicknav.min.css', 'all', 'nav-css');
            loadCSS('css/owl-carousel.css', 'all', 'carousel-css');
        }, { timeout: 2000 });
    }
    
    // Use requestIdleCallback for non-critical initialization
    if ('requestIdleCallback' in window) {
        requestIdleCallback(initPerformance, { timeout: 1000 });
    } else {
        setTimeout(initPerformance, 100);
    }
    
    // Run optimizations based on document state
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initPerformance);
    } else {
        initPerformance();
    }
    
    // Performance monitoring
    window.addEventListener('load', function() {
        const loadTime = performance.now() - perfMetrics.startTime;
        console.log('Page load time:', Math.round(loadTime), 'ms');
        
        // Report performance if needed
        if (window.gtag) {
            window.gtag('event', 'page_load_time', {
                custom_parameter: Math.round(loadTime)
            });
        }
    });
    
})();
