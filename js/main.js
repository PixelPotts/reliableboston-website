// Reliable Machine Aerospace Manufacturing - Main JavaScript

document.addEventListener('DOMContentLoaded', function() {
    
    // Initialize GSAP ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);
    
    // Smooth scroll for anchor links
    initSmoothScroll();
    
    // Animate elements on scroll
    initScrollAnimations();
    
    // Initialize navigation interactions
    initNavigation();
    
    // Initialize image hover effects
    initImageEffects();
    
    // Initialize lazy loading for images
    initLazyLoading();
});

// Smooth scroll functionality
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#' || href === '') {
                e.preventDefault();
                return;
            }
            
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                // Account for navbar height
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = target.offsetTop - navbarHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                const navbarCollapse = document.querySelector('.navbar-collapse');
                if (navbarCollapse.classList.contains('show')) {
                    const bsCollapse = new bootstrap.Collapse(navbarCollapse, {
                        toggle: false
                    });
                    bsCollapse.hide();
                }
            }
        });
    });
}

// GSAP scroll animations for Reliable Machine site
function initScrollAnimations() {
    // Helper functions from original site
    function animateFrom(elem, direction) {
        direction = direction || 1;
        var x = 0,
            y = direction * 100;
        if(elem.classList.contains("gs_reveal_fromLeft")) {
            x = -100;
            y = 0;
        } else if (elem.classList.contains("gs_reveal_fromRight")) {
            x = 100;
            y = 0;
        }
        elem.style.transform = "translate(" + x + "px, " + y + "px)";
        elem.style.opacity = "0";
        gsap.fromTo(elem, {x: x, y: y, autoAlpha: 0}, {
            duration: 3.5, 
            x: 0,
            y: 0, 
            autoAlpha: 1, 
            ease: "expo", 
            overwrite: "auto"
        });
    }

    function hide(elem) {
        gsap.set(elem, {autoAlpha: 0});
    }

    // Main reveal animations
    gsap.utils.toArray(".gs_reveal").forEach(function(elem) {
        hide(elem);
        ScrollTrigger.create({
            trigger: elem,
            onEnter: function() { animateFrom(elem) }, 
            onEnterBack: function() { animateFrom(elem, -1) },
            once: true,
        });
    });
        
    gsap.utils.toArray(".gs_reveal.gs_reveal_fromLeft").forEach(function(elem) {
        hide(elem);
        ScrollTrigger.create({
            trigger: elem,
            onEnter: function() { animateFrom(elem) },				
            onEnterBack: function() { animateFrom(elem, -1) },
            onLeave: function() { hide(elem) },
            once: false
        });
    });

    gsap.utils.toArray(".gs_reveal.gs_reveal_fromRight").forEach(function(elem) {
        hide(elem);
        ScrollTrigger.create({
            trigger: elem,
            onEnter: function() { animateFrom(elem) },				
            onEnterBack: function() { animateFrom(elem, -1) },
            onLeave: function() { hide(elem) },
            once: false
        });
    });

    // Fade in sections (legacy support)
    gsap.utils.toArray('.fade-in').forEach(element => {
        gsap.fromTo(element, {
            opacity: 0,
            y: 50
        }, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
                trigger: element,
                start: "top 80%",
                end: "bottom 20%",
                toggleActions: "play none none reverse"
            }
        });
    });

    // Parallax effect for hero image
    if (window.innerWidth > 768) {
        gsap.utils.toArray('header img').forEach(img => {
            gsap.fromTo(img, {
                y: 0
            }, {
                y: -50,
                ease: "none",
                scrollTrigger: {
                    trigger: img,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: true
                }
            });
        });
    }

    // Animate manufacturing boxes
    const manufacturingBoxes = document.querySelectorAll('#manu-box, #assem-box');
    manufacturingBoxes.forEach(box => {
        gsap.fromTo(box, {
            scale: 0.8,
            opacity: 0
        }, {
            scale: 1,
            opacity: 1,
            duration: 1,
            ease: "back.out(1.7)",
            scrollTrigger: {
                trigger: box,
                start: "top 75%",
                end: "bottom 25%",
                toggleActions: "play none none reverse"
            }
        });
    });

    // Stagger animation for certification list
    if (document.querySelector('.list-block ul li')) {
        gsap.fromTo('.list-block ul li', {
            x: -30,
            opacity: 0
        }, {
            x: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.1,
            ease: "power2.out",
            scrollTrigger: {
                trigger: '.list-block',
                start: "top 70%",
                toggleActions: "play none none reverse"
            }
        });
    }

    // Animate news articles
    gsap.utils.toArray('.article').forEach((article, index) => {
        gsap.fromTo(article, {
            y: 30,
            opacity: 0
        }, {
            y: 0,
            opacity: 1,
            duration: 0.6,
            delay: index * 0.2,
            ease: "power2.out",
            scrollTrigger: {
                trigger: '.news-section',
                start: "top 70%",
                toggleActions: "play none none reverse"
            }
        });
    });
}

// Navigation interactions
function initNavigation() {
    const navbar = document.querySelector('.navbar');
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');

    // Add scroll effect to navbar
    let lastScrollY = window.scrollY;
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Hide/show navbar on scroll
        if (window.scrollY > lastScrollY && window.scrollY > 100) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
        lastScrollY = window.scrollY;
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navbar.contains(e.target) && navbarCollapse.classList.contains('show')) {
            const bsCollapse = new bootstrap.Collapse(navbarCollapse, {
                toggle: false
            });
            bsCollapse.hide();
        }
    });

    // Close mobile menu when clicking on a link
    navbarCollapse.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth < 992 && navbarCollapse.classList.contains('show')) {
                const bsCollapse = new bootstrap.Collapse(navbarCollapse, {
                    toggle: false
                });
                bsCollapse.hide();
            }
        });
    });
}

// Image hover effects
function initImageEffects() {
    // Add loading animation for images
    document.querySelectorAll('img').forEach(img => {
        img.addEventListener('load', function() {
            this.classList.add('loaded');
        });

        // If image is already loaded
        if (img.complete) {
            img.classList.add('loaded');
        }
    });

    // Parallax effect for section images
    if (window.innerWidth > 768) {
        gsap.utils.toArray('.img-block img').forEach(img => {
            gsap.fromTo(img, {
                y: 20,
                scale: 1.1
            }, {
                y: -20,
                scale: 1,
                ease: "none",
                scrollTrigger: {
                    trigger: img.closest('.img-block'),
                    start: "top bottom",
                    end: "bottom top",
                    scrub: 1
                }
            });
        });
    }
}

// Lazy loading for images
function initLazyLoading() {
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });

        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
}

// Utility functions
function debounce(func, wait, immediate) {
    let timeout;
    return function executedFunction() {
        const context = this;
        const args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

// Add scroll-based navbar styling
function addNavbarScrollEffect() {
    const style = document.createElement('style');
    style.textContent = `
        .navbar {
            transition: transform 0.3s ease-in-out, background-color 0.3s ease;
        }
        
        .navbar.scrolled {
            background-color: rgba(255, 255, 255, 0.95) !important;
            backdrop-filter: blur(10px);
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        }
        
        img {
            transition: opacity 0.3s ease;
        }
        
        img:not(.loaded) {
            opacity: 0;
        }
        
        img.loaded {
            opacity: 1;
        }
    `;
    document.head.appendChild(style);
}

// Initialize additional styles
addNavbarScrollEffect();

// Contact form handling with Formspree integration
function initContactForm() {
    const contactForm = document.querySelector('.contact-form');
    if (!contactForm) return;

    const formMessages = document.getElementById('form-messages');
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn.textContent;
    const inquiryTypeSelect = document.getElementById('inquiryType');
    const employmentFields = document.getElementById('employment-fields');
    const employeeDOB = document.getElementById('employeeDOB');
    const employeeSSN = document.getElementById('employeeSSN');

    // Handle inquiry type change to show/hide employment fields
    inquiryTypeSelect.addEventListener('change', function() {
        if (this.value === 'employment-history') {
            employmentFields.style.display = 'block';
            // Make employment fields required
            employeeDOB.setAttribute('required', '');
            employeeSSN.setAttribute('required', '');
        } else {
            employmentFields.style.display = 'none';
            // Remove required attribute when hidden
            employeeDOB.removeAttribute('required');
            employeeSSN.removeAttribute('required');
            // Clear values when hidden
            employeeDOB.value = '';
            employeeSSN.value = '';
            // Remove validation classes
            employeeDOB.classList.remove('is-valid', 'is-invalid');
            employeeSSN.classList.remove('is-valid', 'is-invalid');
        }
    });

    // Add input validation for SSN field
    if (employeeSSN) {
        employeeSSN.addEventListener('input', function() {
            // Only allow numbers
            this.value = this.value.replace(/\D/g, '');
            
            // Limit to 4 characters
            if (this.value.length > 4) {
                this.value = this.value.slice(0, 4);
            }
            
            // Real-time validation
            if (this.value.length === 4) {
                this.classList.remove('is-invalid');
                this.classList.add('is-valid');
            } else if (this.value.length > 0) {
                this.classList.remove('is-valid');
                this.classList.add('is-invalid');
            }
        });
    }

    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Show loading state
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2" role="status"></span>Sending...';
        formMessages.innerHTML = '';

        // Basic form validation
        const requiredFields = this.querySelectorAll('input[required], textarea[required], select[required]');
        let isValid = true;
        
        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                isValid = false;
                field.classList.add('is-invalid');
                field.classList.remove('is-valid');
            } else {
                field.classList.remove('is-invalid');
                field.classList.add('is-valid');
            }
        });

        // Email validation
        const emailField = this.querySelector('input[type="email"]');
        if (emailField && emailField.value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(emailField.value)) {
                isValid = false;
                emailField.classList.add('is-invalid');
                emailField.classList.remove('is-valid');
            }
        }

        // Employment fields validation (if visible)
        if (inquiryTypeSelect.value === 'employment-history') {
            // Validate SSN - must be exactly 4 digits
            if (employeeSSN.value.length !== 4 || !/^\d{4}$/.test(employeeSSN.value)) {
                isValid = false;
                employeeSSN.classList.add('is-invalid');
                employeeSSN.classList.remove('is-valid');
            }
            
            // Validate DOB - must be a valid date and person must be at least 16 years old
            if (employeeDOB.value) {
                const dob = new Date(employeeDOB.value);
                const today = new Date();
                const age = today.getFullYear() - dob.getFullYear();
                const monthDiff = today.getMonth() - dob.getMonth();
                
                if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
                    age--;
                }
                
                if (age < 16 || dob > today) {
                    isValid = false;
                    employeeDOB.classList.add('is-invalid');
                    employeeDOB.classList.remove('is-valid');
                }
            }
        }

        // Privacy checkbox validation
        const privacyCheckbox = this.querySelector('#privacy');
        if (!privacyCheckbox.checked) {
            isValid = false;
            privacyCheckbox.classList.add('is-invalid');
        }

        if (!isValid) {
            formMessages.innerHTML = '<div class="alert alert-danger">Please fill in all required fields correctly.</div>';
            submitBtn.disabled = false;
            submitBtn.textContent = originalBtnText;
            return;
        }

        try {
            // Create FormData object
            const formData = new FormData(this);
            
            // Submit to Formspree
            const response = await fetch(this.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                formMessages.innerHTML = '<div class="alert alert-success"><strong>Thank you!</strong> Your message has been sent successfully. We will get back to you soon.</div>';
                this.reset(); // Clear the form
                
                // Remove validation classes
                const allFields = this.querySelectorAll('.form-control, .form-check-input');
                allFields.forEach(field => {
                    field.classList.remove('is-valid', 'is-invalid');
                });
                
                // Scroll to success message
                formMessages.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                
            } else {
                const errorData = await response.json();
                if (errorData.errors) {
                    formMessages.innerHTML = '<div class="alert alert-danger"><strong>Error:</strong> ' + errorData.errors.map(error => error.message).join(', ') + '</div>';
                } else {
                    formMessages.innerHTML = '<div class="alert alert-danger"><strong>Error:</strong> There was a problem sending your message. Please try again.</div>';
                }
            }
        } catch (error) {
            console.error('Form submission error:', error);
            formMessages.innerHTML = '<div class="alert alert-danger"><strong>Error:</strong> Network error. Please check your connection and try again.</div>';
        } finally {
            // Reset button state
            submitBtn.disabled = false;
            submitBtn.textContent = originalBtnText;
        }
    });

    // Real-time validation
    const formFields = contactForm.querySelectorAll('input, textarea, select');
    formFields.forEach(field => {
        field.addEventListener('blur', function() {
            if (this.hasAttribute('required') && !this.value.trim()) {
                this.classList.add('is-invalid');
                this.classList.remove('is-valid');
            } else if (this.value.trim()) {
                this.classList.remove('is-invalid');
                this.classList.add('is-valid');
            }
        });

        field.addEventListener('input', function() {
            if (this.classList.contains('is-invalid') && this.value.trim()) {
                this.classList.remove('is-invalid');
                this.classList.add('is-valid');
            }
        });
    });
}

// Initialize contact form if present
document.addEventListener('DOMContentLoaded', initContactForm);

// Performance optimization - reduce motion for users who prefer it
if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    // Disable animations for users who prefer reduced motion
    const style = document.createElement('style');
    style.textContent = `
        *, *::before, *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
        }
    `;
    document.head.appendChild(style);
}

// Error handling
window.addEventListener('error', function(e) {
    console.error('JavaScript error:', e.error);
});

// Export functions for testing or external use
window.ReliableMachine = {
    initSmoothScroll,
    initScrollAnimations,
    initNavigation,
    initImageEffects,
    debounce
};