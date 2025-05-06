
/**
 * Initialize image slideshows for all slideshow containers on the page
 */
function initSlideshows() {
    document.querySelectorAll('.card-slideshow').forEach(slideshow => {
        const images = slideshow.querySelectorAll('img');
        if (images.length <= 1) return;
        
        let currentIndex = 0;
        images[currentIndex].classList.add('active');
        
        // Create dots for navigation if they don't exist yet
        if (!slideshow.querySelector('.slideshow-controls')) {
            const dotsContainer = document.createElement('div');
            dotsContainer.className = 'slideshow-controls';
            
            for (let i = 0; i < images.length; i++) {
                const dot = document.createElement('span');
                dot.className = 'slideshow-dot' + (i === 0 ? ' active' : '');
                dot.addEventListener('click', () => {
                    images[currentIndex].classList.remove('active');
                    dotsContainer.children[currentIndex].classList.remove('active');
                    currentIndex = i;
                    images[currentIndex].classList.add('active');
                    dotsContainer.children[currentIndex].classList.add('active');
                });
                dotsContainer.appendChild(dot);
            }
            
            slideshow.appendChild(dotsContainer);
            
            // Auto rotate images
            setInterval(() => {
                images[currentIndex].classList.remove('active');
                dotsContainer.children[currentIndex].classList.remove('active');
                currentIndex = (currentIndex + 1) % images.length;
                images[currentIndex].classList.add('active');
                dotsContainer.children[currentIndex].classList.add('active');
            }, 5000);
        }
    });
}

// Initialize all slideshows when DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    initSlideshows();
});

// Expose the function globally for use in other scripts
window.initSlideshows = initSlideshows;
