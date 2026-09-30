// ===== Loading Spinner =====
window.addEventListener('load', () => {
    const spinner = document.getElementById('loading-spinner');
    if (spinner) {
        setTimeout(() => {
            spinner.classList.add('hidden');
        }, 500);
    }
});

// ===== Initialize AOS =====
document.addEventListener('DOMContentLoaded', () => {
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-in-out',
            once: true,
            offset: 100
        });
    }
});

// ===== Dark Mode Toggle =====
const themeToggle = document.querySelector('.theme-toggle');
const html = document.documentElement;

// Check for saved theme preference or default to light
const savedTheme = localStorage.getItem('theme') || 'light';
html.setAttribute('data-theme', savedTheme);
updateThemeIcon(savedTheme);

if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        const currentTheme = html.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        html.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
    });
}

function updateThemeIcon(theme) {
    if (!themeToggle) return;
    const icon = themeToggle.querySelector('i');
    if (theme === 'dark') {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    } else {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
    }
}

// ===== Daily Specials Banner =====
const dailyBanner = document.querySelector('.daily-specials-banner');
const closeBannerBtn = document.querySelector('.close-banner');
const navbar = document.querySelector('.navbar');

if (closeBannerBtn && dailyBanner) {
    closeBannerBtn.addEventListener('click', () => {
        dailyBanner.style.display = 'none';
        navbar.classList.add('banner-hidden');
        localStorage.setItem('bannerClosed', 'true');
    });

    // Check if banner was previously closed
    if (localStorage.getItem('bannerClosed') === 'true') {
        dailyBanner.style.display = 'none';
        navbar.classList.add('banner-hidden');
    }
}

// ===== Mobile Menu Toggle =====
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');

if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        mobileMenuBtn.classList.toggle('active');
        const isExpanded = navLinks.classList.contains('active');
        mobileMenuBtn.setAttribute('aria-expanded', isExpanded);
    });
}

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        mobileMenuBtn.classList.remove('active');
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
    });
});

// ===== Menu Tab Filtering =====
const menuTabs = document.querySelectorAll('.menu-tab');
const menuItems = document.querySelectorAll('.menu-item');

menuTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        menuTabs.forEach(t => {
            t.classList.remove('active');
            t.setAttribute('aria-selected', 'false');
        });
        tab.classList.add('active');
        tab.setAttribute('aria-selected', 'true');

        const category = tab.dataset.category;

        menuItems.forEach(item => {
            if (category === 'all' || item.dataset.category === category) {
                item.classList.remove('hidden');
                item.style.opacity = '0';
                item.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'translateY(0)';
                }, 50);
            } else {
                item.style.opacity = '0';
                item.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    item.classList.add('hidden');
                }, 300);
            }
        });
    });
});

// ===== Menu Search =====
const menuSearch = document.getElementById('menu-search');
const clearSearchBtn = document.querySelector('.clear-search');

if (menuSearch) {
    menuSearch.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase().trim();
        
        // Show/hide clear button
        if (clearSearchBtn) {
            clearSearchBtn.classList.toggle('visible', searchTerm.length > 0);
        }

        menuItems.forEach(item => {
            const name = item.querySelector('h3').textContent.toLowerCase();
            const description = item.querySelector('p').textContent.toLowerCase();
            
            if (name.includes(searchTerm) || description.includes(searchTerm)) {
                item.classList.remove('hidden');
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            } else {
                item.classList.add('hidden');
            }
        });

        // Reset tabs when searching
        if (searchTerm) {
            menuTabs.forEach(t => {
                t.classList.remove('active');
                t.setAttribute('aria-selected', 'false');
            });
            document.querySelector('[data-category="all"]').classList.add('active');
            document.querySelector('[data-category="all"]').setAttribute('aria-selected', 'true');
        }
    });
}

if (clearSearchBtn) {
    clearSearchBtn.addEventListener('click', () => {
        menuSearch.value = '';
        clearSearchBtn.classList.remove('visible');
        menuSearch.dispatchEvent(new Event('input'));
    });
}

// ===== Smooth Scroll for Navigation Links =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 100;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ===== Back to Top Button =====
const backToTopBtn = document.getElementById('back-to-top');

if (backToTopBtn) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ===== Navbar Background on Scroll =====
window.addEventListener('scroll', () => {
    if (navbar) {
        if (window.scrollY > 50) {
            navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.15)';
        } else {
            navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
        }
    }
});

// ===== Contact Form Validation =====
const contactForm = document.getElementById('contactForm');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const messageInput = document.getElementById('message');

// Validation patterns
const patterns = {
    name: /^[a-zA-Z\s]{2,50}$/,
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
};

// Real-time validation
function validateField(input, pattern, errorMessage) {
    const errorSpan = input.parentElement.querySelector('.error-message');
    const value = input.value.trim();
    
    if (!value) {
        input.classList.add('error');
        input.classList.remove('valid');
        if (errorSpan) errorSpan.textContent = `${errorMessage} is required`;
        return false;
    }
    
    if (pattern && !pattern.test(value)) {
        input.classList.add('error');
        input.classList.remove('valid');
        if (errorSpan) errorSpan.textContent = `Please enter a valid ${errorMessage.toLowerCase()}`;
        return false;
    }
    
    input.classList.remove('error');
    input.classList.add('valid');
    if (errorSpan) errorSpan.textContent = '';
    return true;
}

if (nameInput) {
    nameInput.addEventListener('blur', () => {
        validateField(nameInput, patterns.name, 'Name');
    });
    nameInput.addEventListener('input', () => {
        if (nameInput.classList.contains('error')) {
            validateField(nameInput, patterns.name, 'Name');
        }
    });
}

if (emailInput) {
    emailInput.addEventListener('blur', () => {
        validateField(emailInput, patterns.email, 'Email');
    });
    emailInput.addEventListener('input', () => {
        if (emailInput.classList.contains('error')) {
            validateField(emailInput, patterns.email, 'Email');
        }
    });
}

if (messageInput) {
    messageInput.addEventListener('blur', () => {
        const errorSpan = messageInput.parentElement.querySelector('.error-message');
        if (!messageInput.value.trim()) {
            messageInput.classList.add('error');
            messageInput.classList.remove('valid');
            if (errorSpan) errorSpan.textContent = 'Message is required';
        } else {
            messageInput.classList.remove('error');
            messageInput.classList.add('valid');
            if (errorSpan) errorSpan.textContent = '';
        }
    });
    messageInput.addEventListener('input', () => {
        if (messageInput.classList.contains('error')) {
            const errorSpan = messageInput.parentElement.querySelector('.error-message');
            if (messageInput.value.trim()) {
                messageInput.classList.remove('error');
                messageInput.classList.add('valid');
                if (errorSpan) errorSpan.textContent = '';
            }
        }
    });
}

if (contactForm) {
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Validate all fields
        const isNameValid = validateField(nameInput, patterns.name, 'Name');
        const isEmailValid = validateField(emailInput, patterns.email, 'Email');
        const isMessageValid = messageInput.value.trim().length > 0;
        
        if (!isMessageValid) {
            const errorSpan = messageInput.parentElement.querySelector('.error-message');
            messageInput.classList.add('error');
            if (errorSpan) errorSpan.textContent = 'Message is required';
        }
        
        if (!isNameValid || !isEmailValid || !isMessageValid) {
            return;
        }
        
        const submitBtn = this.querySelector('button[type="submit"]');
        const btnText = submitBtn.querySelector('.btn-text');
        const btnLoading = submitBtn.querySelector('.btn-loading');
        const formStatus = this.querySelector('.form-status');
        
        // Show loading state
        submitBtn.disabled = true;
        if (btnText) btnText.style.display = 'none';
        if (btnLoading) btnLoading.style.display = 'inline-flex';
        
        try {
            // Simulate API call (replace with actual Formspree/Netlify endpoint)
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            // Success
            if (formStatus) {
                formStatus.textContent = 'Thank you for your message! We will get back to you soon.';
                formStatus.className = 'form-status success';
            }
            this.reset();
            
            // Remove valid classes
            this.querySelectorAll('input, textarea').forEach(input => {
                input.classList.remove('valid');
            });
            
        } catch (error) {
            // Error
            if (formStatus) {
                formStatus.textContent = 'Oops! Something went wrong. Please try again later.';
                formStatus.className = 'form-status error';
            }
        } finally {
            // Reset button state
            submitBtn.disabled = false;
            if (btnText) btnText.style.display = 'inline-flex';
            if (btnLoading) btnLoading.style.display = 'none';
            
            // Clear status after 5 seconds
            setTimeout(() => {
                if (formStatus) {
                    formStatus.textContent = '';
                    formStatus.className = 'form-status';
                }
            }, 5000);
        }
    });
}

// ===== Newsletter Form Handling =====
const newsletterForm = document.getElementById('newsletterForm');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        const emailInput = this.querySelector('input[type="email"]');
        
        if (emailInput.value && patterns.email.test(emailInput.value)) {
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            submitBtn.textContent = 'Subscribing...';
            submitBtn.disabled = true;
            
            try {
                // Simulate API call
                await new Promise(resolve => setTimeout(resolve, 1500));
                alert('Thank you for subscribing to our newsletter!');
                emailInput.value = '';
            } catch (error) {
                alert('Oops! Something went wrong. Please try again.');
            } finally {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }
        } else {
            alert('Please enter a valid email address.');
        }
    });
}

// ===== Gallery Lightbox =====
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxClose = document.querySelector('.lightbox-close');
const lightboxPrev = document.querySelector('.lightbox-prev');
const lightboxNext = document.querySelector('.lightbox-next');
const galleryItems = document.querySelectorAll('.gallery-item');

let currentLightboxIndex = 0;
const galleryImages = [];

// Collect all gallery images
galleryItems.forEach((item, index) => {
    const img = item.querySelector('img');
    if (img) {
        galleryImages.push({
            src: img.src,
            alt: img.alt
        });
    }
    
    item.addEventListener('click', () => {
        openLightbox(index);
    });
});

function openLightbox(index) {
    currentLightboxIndex = index;
    updateLightboxImage();
    lightbox.classList.add('active');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    lightbox.classList.remove('active');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
}

function updateLightboxImage() {
    if (galleryImages[currentLightboxIndex]) {
        lightboxImg.src = galleryImages[currentLightboxIndex].src;
        lightboxImg.alt = galleryImages[currentLightboxIndex].alt;
    }
}

function showPrevImage() {
    currentLightboxIndex = (currentLightboxIndex - 1 + galleryImages.length) % galleryImages.length;
    updateLightboxImage();
}

function showNextImage() {
    currentLightboxIndex = (currentLightboxIndex + 1) % galleryImages.length;
    updateLightboxImage();
}

if (lightboxClose) {
    lightboxClose.addEventListener('click', closeLightbox);
}

if (lightboxPrev) {
    lightboxPrev.addEventListener('click', showPrevImage);
}

if (lightboxNext) {
    lightboxNext.addEventListener('click', showNextImage);
}

// Close lightbox on escape key
document.addEventListener('keydown', (e) => {
    if (!lightbox || !lightbox.classList.contains('active')) return;
    
    switch (e.key) {
        case 'Escape':
            closeLightbox();
            break;
        case 'ArrowLeft':
            showPrevImage();
            break;
        case 'ArrowRight':
            showNextImage();
            break;
    }
});

// Close lightbox on background click
if (lightbox) {
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });
}

// ===== Active Navigation Link Highlighting =====
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    document.querySelectorAll('.nav-links a').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// ===== Keyboard Navigation Support =====
document.addEventListener('keydown', (e) => {
    // Tab trap in mobile menu
    if (navLinks && navLinks.classList.contains('active')) {
        const focusableElements = navLinks.querySelectorAll('a');
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];
        
        if (e.key === 'Tab') {
            if (e.shiftKey && document.activeElement === firstElement) {
                e.preventDefault();
                lastElement.focus();
            } else if (!e.shiftKey && document.activeElement === lastElement) {
                e.preventDefault();
                firstElement.focus();
            }
        }
    }
});

// ===== Error Handling for Images =====
document.querySelectorAll('img').forEach(img => {
    img.addEventListener('error', function() {
        this.style.display = 'none';
        console.warn('Failed to load image:', this.src);
    });
});

// ===== Prefers Reduced Motion =====
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.querySelectorAll('*').forEach(el => {
        el.style.animationDuration = '0.01ms';
        el.style.animationIterationCount = '1';
        el.style.transitionDuration = '0.01ms';
    });
}

// ===== Performance: Debounce Scroll Events =====
let scrollTimeout;
window.addEventListener('scroll', () => {
    if (scrollTimeout) {
        cancelAnimationFrame(scrollTimeout);
    }
    scrollTimeout = requestAnimationFrame(() => {
        // Scroll-dependent code here
    });
}, { passive: true });
