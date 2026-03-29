// Boardurance Landing Page Script

document.addEventListener('DOMContentLoaded', function() {
    // Initialize analytics
    initAnalytics();
    
    // Initialize form handling
    initWaitlistForm();
    
    // Initialize modal
    initModal();
    
    // Initialize counter animation
    initCounterAnimation();
    
    // Smooth scrolling for anchor links
    initSmoothScrolling();
});

// Analytics Initialization
function initAnalytics() {
    // Track form interactions
    const form = document.getElementById('waitlist-form');
    if (form) {
        form.addEventListener('submit', function() {
            if (typeof gtag !== 'undefined') {
                gtag('event', 'sign_up_waitlist', {
                    event_category: 'conversion',
                    event_label: 'landing_page'
                });
            }
        });
    }
    
    // Track CTA button clicks
    const ctaButtons = document.querySelectorAll('.cta-button-primary, .cta-button-nav');
    ctaButtons.forEach(button => {
        button.addEventListener('click', function() {
            if (typeof gtag !== 'undefined') {
                gtag('event', 'cta_click', {
                    event_category: 'engagement',
                    event_label: this.textContent.trim()
                });
            }
        });
    });
}

// Waitlist Form Handling
function initWaitlistForm() {
    const form = document.getElementById('waitlist-form');
    if (!form) return;
    
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(form);
        const data = {
            email: formData.get('email'),
            persona: formData.get('persona'),
            region: formData.get('region'),
            updates: formData.get('updates') === 'on',
            timestamp: new Date().toISOString(),
            source: 'landing_page'
        };
        
        // Validate email
        if (!isValidEmail(data.email)) {
            showFormError('Please enter a valid email address');
            return;
        }
        
        // Show loading state
        const submitBtn = form.querySelector('.form-submit');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Submitting...';
        submitBtn.disabled = true;
        
        try {
            // In production, this would be a real API call
            // For now, we'll simulate success
            await simulateFormSubmission(data);
            
            // Show success modal
            showSuccessModal();
            
            // Reset form
            form.reset();
            
            // Update counter
            incrementWaitlistCounter();
            
            // Track successful submission
            if (typeof gtag !== 'undefined') {
                gtag('event', 'waitlist_submission_success', {
                    event_category: 'conversion',
                    event_label: data.persona || 'unknown'
                });
            }
            
        } catch (error) {
            showFormError('Something went wrong. Please try again.');
            
            // Track error
            if (typeof gtag !== 'undefined') {
                gtag('event', 'waitlist_submission_error', {
                    event_category: 'error',
                    event_label: error.message
                });
            }
            
        } finally {
            // Reset button state
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }
    });
    
    // Form validation
    const emailInput = document.getElementById('email');
    if (emailInput) {
        emailInput.addEventListener('blur', function() {
            if (this.value && !isValidEmail(this.value)) {
                this.style.borderColor = 'var(--error-color)';
            } else {
                this.style.borderColor = '';
            }
        });
    }
}

// Email validation helper
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Simulate form submission (replace with real API call)
function simulateFormSubmission(data) {
    return new Promise((resolve, reject) => {
        // Simulate network delay
        setTimeout(() => {
            // For demo purposes, we'll sometimes simulate failure
            const shouldFail = Math.random() < 0.1; // 10% chance of failure
            
            if (shouldFail) {
                reject(new Error('Network error'));
            } else {
                // Log submission data (in production, send to your backend)
                console.log('Waitlist submission:', data);
                
                // Store in localStorage for demo purposes
                const submissions = JSON.parse(localStorage.getItem('boardurance_waitlist') || '[]');
                submissions.push(data);
                localStorage.setItem('boardurance_waitlist', JSON.stringify(submissions));
                
                resolve();
            }
        }, 1000);
    });
}

// Form error display
function showFormError(message) {
    // Remove any existing error
    const existingError = document.querySelector('.form-error');
    if (existingError) {
        existingError.remove();
    }
    
    // Create error element
    const errorElement = document.createElement('div');
    errorElement.className = 'form-error';
    errorElement.style.cssText = `
        background: var(--error-color);
        color: white;
        padding: 0.75rem;
        border-radius: var(--border-radius);
        margin-bottom: var(--spacing-md);
        font-size: 0.875rem;
    `;
    errorElement.textContent = message;
    
    // Insert after form title or at top of form
    const form = document.getElementById('waitlist-form');
    const firstChild = form.firstElementChild;
    form.insertBefore(errorElement, firstChild);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (errorElement.parentNode) {
            errorElement.remove();
        }
    }, 5000);
}

// Modal functionality
function initModal() {
    const modal = document.getElementById('success-modal');
    const closeButtons = document.querySelectorAll('.modal-close, .modal-close-btn');
    const joinButton = document.getElementById('join-waitlist-btn');
    
    if (!modal) return;
    
    // Show modal function
    window.showSuccessModal = function() {
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        
        // Track modal view
        if (typeof gtag !== 'undefined') {
            gtag('event', 'modal_view', {
                event_category: 'engagement',
                event_label: 'success_modal'
            });
        }
    };
    
    // Close modal function
    function closeModal() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
    
    // Close modal on button clicks
    closeButtons.forEach(button => {
        button.addEventListener('click', closeModal);
    });
    
    // Close modal on outside click
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    // Close modal on Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.style.display === 'flex') {
            closeModal();
        }
    });
    
    // Join button opens modal directly
    if (joinButton) {
        joinButton.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: document.getElementById('waitlist').offsetTop - 100,
                behavior: 'smooth'
            });
        });
    }
}

// Counter animation
function initCounterAnimation() {
    const counterElement = document.getElementById('waitlist-count');
    if (!counterElement) return;
    
    // Get current count from localStorage or start with random number
    const submissions = JSON.parse(localStorage.getItem('boardurance_waitlist') || '[]');
    const baseCount = submissions.length;
    const randomOffset = Math.floor(Math.random() * 50) + 20; // 20-70 random users
    const targetCount = baseCount + randomOffset;
    
    // Animate counter
    animateCounter(counterElement, 0, targetCount, 2000);
}

function animateCounter(element, start, end, duration) {
    let startTimestamp = null;
    
    function step(timestamp) {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        
        // Easing function
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const current = Math.floor(start + (end - start) * easeOutQuart);
        
        element.textContent = current.toLocaleString();
        
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    }
    
    window.requestAnimationFrame(step);
}

function incrementWaitlistCounter() {
    const counterElement = document.getElementById('waitlist-count');
    if (!counterElement) return;
    
    const current = parseInt(counterElement.textContent.replace(/,/g, '')) || 0;
    const newValue = current + 1;
    
    // Quick animation for increment
    counterElement.style.transform = 'scale(1.1)';
    counterElement.style.color = 'var(--accent-color)';
    
    setTimeout(() => {
        counterElement.textContent = newValue.toLocaleString();
        counterElement.style.transform = 'scale(1)';
        counterElement.style.color = '';
    }, 300);
}

// Smooth scrolling
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (!targetElement) return;
            
            window.scrollTo({
                top: targetElement.offsetTop - 80, // Account for fixed header
                behavior: 'smooth'
            });
            
            // Update URL without jumping
            history.pushState(null, null, targetId);
        });
    });
}

// Mobile menu toggle (if needed in future)
function initMobileMenu() {
    const menuToggle = document.createElement('button');
    menuToggle.className = 'mobile-menu-toggle';
    menuToggle.innerHTML = '☰';
    menuToggle.style.cssText = `
        display: none;
        background: none;
        border: none;
        font-size: 1.5rem;
        cursor: pointer;
        color: var(--text-dark);
    `;
    
    const navbar = document.querySelector('.navbar .container');
    if (navbar) {
        navbar.appendChild(menuToggle);
        
        menuToggle.addEventListener('click', function() {
            const navLinks = document.querySelector('.nav-links');
            navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
        });
        
        // Show on mobile
        if (window.innerWidth <= 768) {
            menuToggle.style.display = 'block';
            const navLinks = document.querySelector('.nav-links');
            navLinks.style.display = 'none';
            navLinks.style.flexDirection = 'column';
            navLinks.style.position = 'absolute';
            navLinks.style.top = '100%';
            navLinks.style.left = '0';
            navLinks.style.right = '0';
            navLinks.style.background = 'white';
            navLinks.style.padding = '1rem';
            navLinks.style.borderBottom = '1px solid var(--border-color)';
        }
        
        // Update on resize
        window.addEventListener('resize', function() {
            if (window.innerWidth <= 768) {
                menuToggle.style.display = 'block';
            } else {
                menuToggle.style.display = 'none';
                const navLinks = document.querySelector('.nav-links');
                navLinks.style.display = 'flex';
                navLinks.style.position = 'static';
                navLinks.style.background = 'transparent';
                navLinks.style.padding = '0';
                navLinks.style.borderBottom = 'none';
            }
        });
    }
}

// Initialize mobile menu
initMobileMenu();

// Performance monitoring
if ('performance' in window) {
    // Measure page load time
    window.addEventListener('load', function() {
        const timing = performance.timing;
        const loadTime = timing.loadEventEnd - timing.navigationStart;
        
        console.log(`Page loaded in ${loadTime}ms`);
        
        // Track if page load is too slow
        if (loadTime > 3000 && typeof gtag !== 'undefined') {
            gtag('event', 'slow_page_load', {
                event_category: 'performance',
                event_label: `load_time_${loadTime}ms`,
                value: loadTime
            });
        }
    });
}

// Intersection Observer for scroll tracking
if ('IntersectionObserver' in window) {
    const sections = document.querySelectorAll('section');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Track section view
                if (typeof gtag !== 'undefined') {
                    gtag('event', 'section_view', {
                        event_category: 'engagement',
                        event_label: entry.target.id || 'unknown_section'
                    });
                }
            }
        });
    }, {
        threshold: 0.5 // Trigger when 50% of section is visible
    });
    
    sections.forEach(section => {
        observer.observe(section);
    });
}