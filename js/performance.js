
// Performance optimization and monitoring
(function() {
    'use strict';
    
    // Critical performance optimizations
    const PerformanceOptimizer = {
        // Optimize images with lazy loading
        optimizeImages: function() {
            const images = document.querySelectorAll('img[loading="lazy"]');
            
            if ('IntersectionObserver' in window) {
                const imageObserver = new IntersectionObserver((entries, observer) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            const img = entry.target;
                            img.src = img.dataset.src || img.src;
                            img.classList.remove('lazy');
                            observer.unobserve(img);
                        }
                    });
                });
                
                images.forEach(img => imageObserver.observe(img));
            }
        },
        
        // Preload critical resources
        preloadCriticalResources: function() {
            const criticalResources = [
                { href: 'css/bootstrap.min.css', as: 'style' },
                { href: 'css/style.css', as: 'style' },
                { href: 'js/jquery.min.js', as: 'script' },
                { href: 'img/slider/slider-bg1.jpg', as: 'image' },
                { href: 'img/logo.png', as: 'image' }
            ];
            
            criticalResources.forEach(resource => {
                const link = document.createElement('link');
                link.rel = 'preload';
                link.href = resource.href;
                link.as = resource.as;
                if (resource.as === 'style') {
                    link.onload = function() {
                        this.onload = null;
                        this.rel = 'stylesheet';
                    };
                }
                document.head.appendChild(link);
            });
        },
        
        // Defer non-critical CSS
        deferNonCriticalCSS: function() {
            const nonCriticalCSS = [
                'css/animate.min.css',
                'css/magnific-popup.css',
                'css/owl-carousel.css'
            ];
            
            nonCriticalCSS.forEach(href => {
                const link = document.createElement('link');
                link.rel = 'stylesheet';
                link.href = href;
                link.media = 'print';
                link.onload = function() {
                    this.media = 'all';
                };
                document.head.appendChild(link);
            });
        },
        
        // Optimize font loading
        optimizeFonts: function() {
            // Add font-display: swap to web fonts
            const fontLinks = document.querySelectorAll('link[href*="fonts.googleapis.com"]');
            fontLinks.forEach(link => {
                if (!link.href.includes('display=swap')) {
                    link.href += link.href.includes('?') ? '&display=swap' : '?display=swap';
                }
            });
        },
        
        // Remove unused CSS at runtime
        removeUnusedStyles: function() {
            // This is a simple implementation - in production, use PurgeCSS
            setTimeout(() => {
                const unusedSelectors = [
                    '.unused-class',
                    '.hidden-element:not(.preloader)'
                ];
                
                unusedSelectors.forEach(selector => {
                    try {
                        const elements = document.querySelectorAll(selector);
                        elements.forEach(el => {
                            if (getComputedStyle(el).display === 'none') {
                                el.remove();
                            }
                        });
                    } catch (e) {
                        // Selector might not exist
                    }
                });
            }, 3000);
        },
        
        // Monitor Core Web Vitals
        monitorPerformance: function() {
            if ('PerformanceObserver' in window) {
                // Largest Contentful Paint
                const lcpObserver = new PerformanceObserver((list) => {
                    const entries = list.getEntries();
                    const lastEntry = entries[entries.length - 1];
                    console.log('LCP:', lastEntry.startTime);
                });
                lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
                
                // First Input Delay
                const fidObserver = new PerformanceObserver((list) => {
                    list.getEntries().forEach((entry) => {
                        console.log('FID:', entry.processingStart - entry.startTime);
                    });
                });
                fidObserver.observe({ entryTypes: ['first-input'] });
                
                // Cumulative Layout Shift
                const clsObserver = new PerformanceObserver((list) => {
                    let clsValue = 0;
                    list.getEntries().forEach((entry) => {
                        if (!entry.hadRecentInput) {
                            clsValue += entry.value;
                        }
                    });
                    console.log('CLS:', clsValue);
                });
                clsObserver.observe({ entryTypes: ['layout-shift'] });
            }
        },
        
        // Initialize all optimizations
        init: function() {
            // Run immediately
            this.preloadCriticalResources();
            this.optimizeFonts();
            
            // Run when DOM is ready
            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', () => {
                    this.optimizeImages();
                    this.deferNonCriticalCSS();
                    this.monitorPerformance();
                });
            } else {
                this.optimizeImages();
                this.deferNonCriticalCSS();
                this.monitorPerformance();
            }
            
            // Run after page load
            window.addEventListener('load', () => {
                this.removeUnusedStyles();
            });
        }
    };
    
    // Auto-initialize
    PerformanceOptimizer.init();
    
    // Make available globally for debugging
    window.PerformanceOptimizer = PerformanceOptimizer;
})();
