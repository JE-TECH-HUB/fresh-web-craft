
// Initialize AOS (Animate on Scroll)
AOS.init({
    duration: 1000,
    once: true
});

// Mobile Menu Toggle
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Smooth Scroll for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        target.scrollIntoView({
            behavior: 'smooth'
        });
        // Close mobile menu after clicking a link
        if (navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
        }
    });
});

// Contact Form Handling
const contactForm = document.getElementById('contact-form');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData);
    
    // Here you would typically send the data to a server
    console.log('Form submitted:', data);
    
    // Show success message
    alert('Thank you for your message! We will get back to you soon.');
    contactForm.reset();
});

// Animate Hero Text
const animateText = () => {
    const text = document.querySelector('.animate-text');
    text.style.opacity = '0';
    let opacity = 0;
    
    const fadeIn = () => {
        if (opacity < 1) {
            opacity += 0.01;
            text.style.opacity = opacity;
            requestAnimationFrame(fadeIn);
        }
    };
    
    fadeIn();
};

// Run animation when page loads
window.addEventListener('load', animateText);
