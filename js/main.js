/* ============================================
   Studio Zero Landing Page - JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', function () {
    // Initialize all features
    initNavbar();
    initSmoothScroll();
    initScrollAnimations();
    initParallaxEffects();
    initComparisonSliders();
    initVideoMockup();
});

/* ============================================
   Navbar Scroll Effect
   ============================================ */
function initNavbar() {
    const navbar = document.getElementById('navbar');
    let lastScrollY = window.scrollY;
    let ticking = false;

    function updateNavbar() {
        const scrollY = window.scrollY;

        // Add/remove scrolled class
        if (scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        ticking = false;
    }

    window.addEventListener('scroll', function () {
        lastScrollY = window.scrollY;

        if (!ticking) {
            window.requestAnimationFrame(function () {
                updateNavbar();
            });
            ticking = true;
        }
    });
}

/* ============================================
   Smooth Scroll for Navigation
   ============================================ */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');

            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const navbarHeight = document.getElementById('navbar').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - navbarHeight - 20;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/* ============================================
   Scroll-triggered Animations
   ============================================ */
function initScrollAnimations() {
    // Elements to animate
    const animateElements = [
        '.feature-card',
        '.step',
        '.section-header',
        '.cta-content'
    ];

    // Create intersection observer
    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -100px 0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');

                // Add stagger effect for cards
                if (entry.target.classList.contains('feature-card')) {
                    const cards = document.querySelectorAll('.feature-card');
                    cards.forEach((card, index) => {
                        card.style.transitionDelay = `${index * 0.1}s`;
                    });
                }
            }
        });
    }, observerOptions);

    // Add fade-in class and observe elements
    animateElements.forEach(selector => {
        document.querySelectorAll(selector).forEach(element => {
            element.classList.add('fade-in');
            observer.observe(element);
        });
    });
}

/* ============================================
   Parallax Effects
   ============================================ */
function initParallaxEffects() {
    const orbs = document.querySelectorAll('.gradient-orb');
    let ticking = false;

    function updateParallax() {
        const scrollY = window.scrollY;

        orbs.forEach((orb, index) => {
            const speed = 0.05 + (index * 0.02);
            const yOffset = scrollY * speed;
            orb.style.transform = `translateY(${yOffset}px)`;
        });

        ticking = false;
    }

    window.addEventListener('scroll', function () {
        if (!ticking) {
            window.requestAnimationFrame(function () {
                updateParallax();
            });
            ticking = true;
        }
    });
}

/* ============================================
   Feature Card Hover Effects
   ============================================ */
document.querySelectorAll('.feature-card').forEach(card => {
    card.addEventListener('mouseenter', function () {
        this.style.zIndex = '10';
    });

    card.addEventListener('mouseleave', function () {
        this.style.zIndex = '1';
    });
});

/* ============================================
   Button Click Effects
   ============================================ */
document.querySelectorAll('.btn-primary, .btn-secondary').forEach(button => {
    button.addEventListener('click', function (e) {
        // Create ripple effect
        const ripple = document.createElement('span');
        ripple.style.cssText = `
            position: absolute;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            pointer-events: none;
            transform: scale(0);
            animation: ripple 0.6s ease-out;
        `;

        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
        ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';

        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);

        setTimeout(() => ripple.remove(), 600);
    });
});

// Ripple animation keyframes (added dynamically)
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

/* ============================================
   Phone Mockup Mouse Effect
   ============================================ */
const phoneMockup = document.querySelector('.phone-mockup');
if (phoneMockup) {
    const phoneFrame = phoneMockup.querySelector('.phone-frame');

    phoneMockup.addEventListener('mousemove', function (e) {
        const rect = phoneMockup.getBoundingClientRect();
        const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
        const y = (e.clientY - rect.top - rect.height / 2) / rect.height;

        const rotateX = y * -10;
        const rotateY = x * 10;

        phoneFrame.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    phoneMockup.addEventListener('mouseleave', function () {
        phoneFrame.style.transform = 'rotateX(0) rotateY(0)';
        phoneFrame.style.transition = 'transform 0.5s ease';

        setTimeout(() => {
            phoneFrame.style.transition = '';
        }, 500);
    });
}

/* ============================================
   Stats Counter Animation
   ============================================ */
function animateCounter(element, target, suffix = '') {
    let current = 0;
    const increment = target / 50;
    const duration = 2000;
    const stepTime = duration / 50;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current) + suffix;
    }, stepTime);
}

// Trigger counter animation when stats are visible
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statValues = entry.target.querySelectorAll('.stat-value');
            statValues.forEach(stat => {
                const text = stat.textContent;
                if (text.includes('K+')) {
                    animateCounter(stat, 10, 'K+');
                }
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const heroStats = document.querySelector('.hero-stats');
if (heroStats) {
    statsObserver.observe(heroStats);
}

/* ============================================
   Scroll Progress Indicator
   ============================================ */
function createScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        height: 3px;
        background: linear-gradient(90deg, #6C5CE7, #00D9FF);
        z-index: 9999;
        width: 0%;
        transition: width 0.1s linear;
    `;
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        progressBar.style.width = scrollPercent + '%';
    });
}

// Initialize scroll progress
createScrollProgress();

/* ============================================
   Lazy Loading for Images (if needed)
   ============================================ */
if ('loading' in HTMLImageElement.prototype) {
    // Native lazy loading supported
    document.querySelectorAll('img[data-src]').forEach(img => {
        img.src = img.dataset.src;
    });
} else {
    // Fallback for older browsers
    const lazyImageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const lazyImage = entry.target;
                lazyImage.src = lazyImage.dataset.src;
                lazyImageObserver.unobserve(lazyImage);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        lazyImageObserver.observe(img);
    });
}

/* ============================================
   Before/After Comparison Sliders
   ============================================ */
function initComparisonSliders() {
    document.querySelectorAll('.comparison-card').forEach(card => {
        const container = card.querySelector('.comparison-container');
        const beforeImage = card.querySelector('.before-image');
        const sliderInput = card.querySelector('.slider-input');
        const sliderLine = card.querySelector('.slider-line');
        const sliderHandle = card.querySelector('.slider-handle');

        if (!sliderInput || !beforeImage) return;

        function updateSlider(value) {
            const percent = value;
            beforeImage.style.clipPath = `inset(0 ${100 - percent}% 0 0)`;
            sliderLine.style.left = `${percent}%`;
            sliderHandle.style.left = `${percent}%`;
        }

        // Initial state
        updateSlider(50);

        // Slider input change
        sliderInput.addEventListener('input', function () {
            updateSlider(this.value);
        });

        // Touch/mouse drag support
        let isDragging = false;

        container.addEventListener('mousedown', () => isDragging = true);
        container.addEventListener('touchstart', () => isDragging = true);

        window.addEventListener('mouseup', () => isDragging = false);
        window.addEventListener('touchend', () => isDragging = false);

        container.addEventListener('mousemove', function (e) {
            if (!isDragging) return;
            const rect = container.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const percent = Math.min(100, Math.max(0, (x / rect.width) * 100));
            sliderInput.value = percent;
            updateSlider(percent);
        });

        container.addEventListener('touchmove', function (e) {
            if (!isDragging) return;
            const rect = container.getBoundingClientRect();
            const touch = e.touches[0];
            const x = touch.clientX - rect.left;
            const percent = Math.min(100, Math.max(0, (x / rect.width) * 100));
            sliderInput.value = percent;
            updateSlider(percent);
        });
    });
}

/* ============================================
   Video Mockup Mouse Effect
   ============================================ */
function initVideoMockup() {
    const videoMockup = document.querySelector('.video-mockup');
    if (!videoMockup) return;

    const videoFrame = videoMockup.querySelector('.video-frame');
    if (!videoFrame) return;

    videoMockup.addEventListener('mousemove', function (e) {
        const rect = videoMockup.getBoundingClientRect();
        const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
        const y = (e.clientY - rect.top - rect.height / 2) / rect.height;

        const rotateX = y * -8;
        const rotateY = x * 8;

        videoFrame.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    videoMockup.addEventListener('mouseleave', function () {
        videoFrame.style.transform = 'rotateX(0) rotateY(0)';
        videoFrame.style.transition = 'transform 0.5s ease';

        setTimeout(() => {
            videoFrame.style.transition = '';
        }, 500);
    });
}

console.log('🚀 Studio Zero Landing Page Loaded');
