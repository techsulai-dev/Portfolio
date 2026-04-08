// ===================================
// MOBILE NAVIGATION
// ===================================
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

hamburger?.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu?.classList.toggle('active');
});

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger?.classList.remove('active');
        navMenu?.classList.remove('active');
    });
});

// ===================================
// SMOOTH SCROLLING
// ===================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ===================================
// ACTIVE NAVIGATION LINK ON SCROLL
// ===================================
const sections = document.querySelectorAll('section');

const updateActiveNavLink = () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
};

window.addEventListener('scroll', updateActiveNavLink);

// ===================================
// HEADER SCROLL EFFECT
// ===================================
const header = document.querySelector('.header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        header?.classList.add('scrolled');
    } else {
        header?.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// ===================================
// FORM SUBMISSION
// ===================================
const contactForm = document.querySelector('.contact-form');

contactForm?.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(this);
    const name = this.querySelector('input[type="text"]').value;
    const email = this.querySelector('input[type="email"]').value;
    const message = this.querySelector('textarea').value;

    // Simple validation
    if (!name || !email || !message) {
        showNotification('Please fill in all fields', 'error');
        return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showNotification('Please enter a valid email address', 'error');
        return;
    }

    // Simulate form submission
    showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
    this.reset();
});

// ===================================
// NOTIFICATION SYSTEM
// ===================================
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'}"></i>
        <span>${message}</span>
    `;

    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        padding: 1rem 1.5rem;
        border-radius: 12px;
        color: white;
        font-weight: 500;
        z-index: 10000;
        transform: translateX(120%);
        transition: transform 0.3s ease;
        max-width: 350px;
        display: flex;
        align-items: center;
        gap: 0.75rem;
        box-shadow: 0 10px 25px rgba(0,0,0,0.2);
    `;

    // Set background color based on type
    switch(type) {
        case 'success':
            notification.style.background = 'linear-gradient(135deg, #10b981 0%, #059669 100%)';
            break;
        case 'error':
            notification.style.background = 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)';
            break;
        default:
            notification.style.background = 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)';
    }

    // Add to page
    document.body.appendChild(notification);

    // Animate in
    requestAnimationFrame(() => {
        notification.style.transform = 'translateX(0)';
    });

    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(120%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// ===================================
// INTERSECTION OBSERVER FOR ANIMATIONS
// ===================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll(
        '.about-content, .skills-grid, .experience-timeline, .projects-grid, .contact-content, .stat-card, .skill-category, .timeline-item, .project-card'
    );
    
    animateElements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(element);
    });
});

// Add animation class
const style = document.createElement('style');
style.textContent = `
    .animate-in {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
    
    .notification i {
        font-size: 1.2rem;
    }
`;
document.head.appendChild(style);

// ===================================
// TYPEWRITER EFFECT FOR HERO
// ===================================
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing effect when page loads
window.addEventListener('load', () => {
    const heroName = document.querySelector('.hero-name');
    if (heroName) {
        const originalText = heroName.textContent;
        heroName.textContent = '';
        setTimeout(() => typeWriter(heroName, originalText, 150), 500);
    }
});

// ===================================
// PARALLAX EFFECT FOR HERO
// ===================================
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroShapes = document.querySelectorAll('.shape');
    
    heroShapes.forEach((shape, index) => {
        const speed = (index + 1) * 0.1;
        shape.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// ===================================
// SKILL ITEMS HOVER EFFECT
// ===================================
document.querySelectorAll('.skill-item').forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-3px) scale(1.05)';
    });
    
    item.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// ===================================
// PROJECT CARD HOVER EFFECT
// ===================================
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-8px)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// ===================================
// DOWNLOAD CV BUTTON
// ===================================
document.querySelector('.btn-download')?.addEventListener('click', () => {
    showNotification('CV download feature coming soon!', 'info');
});

// ===================================
// CONTACT BUTTON SCROLL
// ===================================
document.querySelectorAll('.btn').forEach(btn => {
    if (btn.textContent.includes('Contact')) {
        btn.addEventListener('click', () => {
            document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
        });
    }
});

// ===================================
// SOCIAL LINKS HOVER EFFECT
// ===================================
document.querySelectorAll('.social-link').forEach(link => {
    link.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px) rotate(360deg)';
    });
    
    link.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) rotate(0deg)';
    });
});

// ===================================
// CURSOR FOLLOWER (OPTIONAL ENHANCEMENT)
// ===================================
const cursorFollower = document.createElement('div');
cursorFollower.className = 'cursor-follower';
cursorFollower.style.cssText = `
    position: fixed;
    width: 20px;
    height: 20px;
    border: 2px solid rgba(99, 102, 241, 0.5);
    border-radius: 50%;
    pointer-events: none;
    z-index: 9999;
    transition: all 0.1s ease;
    transform: translate(-50%, -50%);
    display: none;
`;
document.body.appendChild(cursorFollower);

document.addEventListener('mousemove', (e) => {
    cursorFollower.style.display = 'block';
    cursorFollower.style.left = e.clientX + 'px';
    cursorFollower.style.top = e.clientY + 'px';
});

// Hide cursor follower on touch devices
document.addEventListener('touchstart', () => {
    cursorFollower.style.display = 'none';
});

// ===================================
// PRELOADER (OPTIONAL)
// ===================================
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

const preloaderStyle = document.createElement('style');
preloaderStyle.textContent = `
    body {
        opacity: 0;
        transition: opacity 0.5s ease;
    }
    
    body.loaded {
        opacity: 1;
    }
    
    @media (prefers-reduced-motion: reduce) {
        * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
        }
    }
`;
document.head.appendChild(preloaderStyle);