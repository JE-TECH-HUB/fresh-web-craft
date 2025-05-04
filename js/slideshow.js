
/**
 * Course Card Slideshow
 * Automatically rotates images in course cards every 5 seconds
 */

document.addEventListener('DOMContentLoaded', function() {
    // Find all card slideshow containers
    const slideshows = document.querySelectorAll('.card-slideshow');
    
    // Initialize each slideshow
    slideshows.forEach(slideshow => {
        const images = slideshow.querySelectorAll('img');
        const container = slideshow.closest('.card-image');
        let currentIndex = 0;
        
        // Create dots for navigation
        if (images.length > 1) {
            const dotsContainer = document.createElement('div');
            dotsContainer.className = 'slideshow-controls';
            
            for (let i = 0; i < images.length; i++) {
                const dot = document.createElement('div');
                dot.className = i === 0 ? 'slideshow-dot active' : 'slideshow-dot';
                dot.dataset.index = i;
                dot.addEventListener('click', () => {
                    showImage(i);
                });
                dotsContainer.appendChild(dot);
            }
            
            container.appendChild(dotsContainer);
        }
        
        // Set initial state - show first image
        if (images.length > 0) {
            images[0].classList.add('active');
        }
        
        // Function to show a specific image
        function showImage(index) {
            // Hide all images
            images.forEach(img => img.classList.remove('active'));
            
            // Update dots if they exist
            const dots = container.querySelectorAll('.slideshow-dot');
            if (dots.length) {
                dots.forEach(dot => dot.classList.remove('active'));
                dots[index].classList.add('active');
            }
            
            // Show the selected image
            images[index].classList.add('active');
            currentIndex = index;
        }
        
        // Auto-rotate images every 5 seconds
        if (images.length > 1) {
            setInterval(() => {
                currentIndex = (currentIndex + 1) % images.length;
                showImage(currentIndex);
            }, 5000);
        }
    });
});
