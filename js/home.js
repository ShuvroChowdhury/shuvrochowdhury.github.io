// Home Page JavaScript - Specific functionality for home page

/**
 * Fade-in animation for sections
 */
document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('section');

    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });
});

/**
 * Gallery image modal
 */
document.addEventListener('DOMContentLoaded', () => {
    const galleryItems = document.querySelectorAll('.gallery-item');

    if (galleryItems.length > 0) {
        // Create modal
        const modal = document.createElement('div');
        modal.className = 'gallery-modal';
        modal.innerHTML = `
            <div class="modal-overlay"></div>
            <div class="modal-content">
                <button class="modal-close" aria-label="Close modal">&times;</button>
                <img src="" alt="">
                <div class="modal-nav">
                    <button class="modal-prev" aria-label="Previous image">&larr;</button>
                    <button class="modal-next" aria-label="Next image">&rarr;</button>
                </div>
            </div>
        `;
        document.body.appendChild(modal);

        // Add CSS for modal
        const style = document.createElement('style');
        style.textContent = `
            .gallery-modal {
                display: none;
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                z-index: 9999;
            }
            
            .gallery-modal.active {
                display: block;
            }
            
            .modal-overlay {
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: rgba(0, 0, 0, 0.9);
            }
            
            .modal-content {
                position: relative;
                height: 100%;
                display: flex;
                align-items: center;
                justify-content: center;
                padding: 2rem;
            }
            
            .modal-content img {
                max-width: 90%;
                max-height: 90vh;
                object-fit: contain;
            }
            
            .modal-close {
                position: absolute;
                top: 1rem;
                right: 1rem;
                background: none;
                border: none;
                color: white;
                font-size: 3rem;
                cursor: pointer;
                line-height: 1;
                padding: 0;
                width: 3rem;
                height: 3rem;
            }
            
            .modal-nav button {
                position: absolute;
                top: 50%;
                transform: translateY(-50%);
                background: rgba(255, 255, 255, 0.1);
                border: none;
                color: white;
                font-size: 2rem;
                cursor: pointer;
                padding: 1rem;
                transition: background 0.3s;
            }
            
            .modal-nav button:hover {
                background: rgba(255, 255, 255, 0.2);
            }
            
            .modal-prev {
                left: 1rem;
            }
            
            .modal-next {
                right: 1rem;
            }
        `;
        document.head.appendChild(style);

        let currentIndex = 0;
        const modalImg = modal.querySelector('img');
        const closeBtn = modal.querySelector('.modal-close');
        const prevBtn = modal.querySelector('.modal-prev');
        const nextBtn = modal.querySelector('.modal-next');
        const overlay = modal.querySelector('.modal-overlay');

        function openModal(index) {
            currentIndex = index;
            const img = galleryItems[index].querySelector('img');
            modalImg.src = img.src;
            modalImg.alt = img.alt;
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }

        function closeModal() {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }

        function showNext() {
            currentIndex = (currentIndex + 1) % galleryItems.length;
            const img = galleryItems[currentIndex].querySelector('img');
            modalImg.src = img.src;
            modalImg.alt = img.alt;
        }

        function showPrev() {
            currentIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
            const img = galleryItems[currentIndex].querySelector('img');
            modalImg.src = img.src;
            modalImg.alt = img.alt;
        }

        // Event listeners
        galleryItems.forEach((item, index) => {
            item.style.cursor = 'pointer';
            item.addEventListener('click', () => openModal(index));
        });

        closeBtn.addEventListener('click', closeModal);
        overlay.addEventListener('click', closeModal);
        prevBtn.addEventListener('click', showPrev);
        nextBtn.addEventListener('click', showNext);

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (!modal.classList.contains('active')) return;

            if (e.key === 'Escape') closeModal();
            if (e.key === 'ArrowRight') showNext();
            if (e.key === 'ArrowLeft') showPrev();
        });
    }
});

/**
 * News items animation
 */
document.addEventListener('DOMContentLoaded', () => {
    const newsItems = document.querySelectorAll('.news-item');

    newsItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = `opacity 0.5s ease ${index * 0.1}s, transform 0.5s ease ${index * 0.1}s`;
    });

    const observerOptions = {
        threshold: 0.2
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    newsItems.forEach(item => {
        observer.observe(item);
    });
});

/**
 * Social links analytics tracking (placeholder)
 */
document.addEventListener('DOMContentLoaded', () => {
    const socialLinks = document.querySelectorAll('.social-links a');

    socialLinks.forEach(link => {
        link.addEventListener('click', function() {
            const platform = this.getAttribute('aria-label');
            console.log(`Social link clicked: ${platform}`);
            // Add analytics tracking here if needed
            // e.g., gtag('event', 'social_click', { 'platform': platform });
        });
    });
});

/**
 * Typing effect for hero title (optional)
 */
function initTypingEffect() {
    const element = document.querySelector('.hero-content h1');
    if (!element) return;

    const text = element.textContent;
    element.textContent = '';
    element.style.opacity = '1';

    let i = 0;
    const speed = 50;

    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }

    // Uncomment to enable typing effect
    // type();
}

// document.addEventListener('DOMContentLoaded', initTypingEffect);