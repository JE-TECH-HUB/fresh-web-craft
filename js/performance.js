
/*
 * Performance optimization utilities
 */

// Defer non-critical JavaScript execution
function deferExecution(callback, delay = 0) {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            setTimeout(callback, delay);
        });
    } else {
        setTimeout(callback, delay);
    }
}

// Lazy load images
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
}

// Optimize scroll event handling
function throttle(func, limit) {
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
}

// Critical path optimization
function optimizeCriticalPath() {
    // Remove unused CSS classes during runtime if needed
    // Defer non-critical animations
    const animations = document.querySelectorAll('.animate');
    animations.forEach(el => {
        el.style.animationDelay = '0.1s';
    });
}

// Initialize performance optimizations
deferExecution(() => {
    lazyLoadImages();
    optimizeCriticalPath();
}, 100);

// Export utilities for use in main.js
window.performanceUtils = {
    deferExecution,
    lazyLoadImages,
    throttle,
    optimizeCriticalPath
};
