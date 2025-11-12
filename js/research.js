// Research Page JavaScript

/**
 * Animate research interests on scroll
 */
document.addEventListener('DOMContentLoaded', () => {
    const interestItems = document.querySelectorAll('.interest-item');

    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, index * 100);
            }
        });
    }, observerOptions);

    interestItems.forEach(item => {
        observer.observe(item);
    });
});

/**
 * Animate research items on scroll
 */
document.addEventListener('DOMContentLoaded', () => {
    const researchItems = document.querySelectorAll('.research-item');

    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    researchItems.forEach(item => {
        observer.observe(item);
    });
});

/**
 * Citation modal functionality
 */
document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('citationModal');
    const citationText = document.getElementById('citationText');
    const copyBtn = document.getElementById('copyBtn');
    const copyFeedback = document.getElementById('copyFeedback');
    const closeBtn = document.querySelector('.modal-close');
    const overlay = document.querySelector('.modal-overlay');

    const citeButtons = document.querySelectorAll('.cite-btn');

    function openModal(citation) {
        citationText.textContent = citation;
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        copyFeedback.classList.remove('show');
    }

    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }

    citeButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const citation = btn.getAttribute('data-citation');
            openModal(citation);
        });
    });

    closeBtn.addEventListener('click', closeModal);
    overlay.addEventListener('click', closeModal);

    copyBtn.addEventListener('click', async() => {
        const text = citationText.textContent;

        try {
            await navigator.clipboard.writeText(text);
            copyFeedback.classList.add('show');

            setTimeout(() => {
                copyFeedback.classList.remove('show');
            }, 2000);
        } catch (err) {
            // Fallback for older browsers
            const textArea = document.createElement('textarea');
            textArea.value = text;
            textArea.style.position = 'fixed';
            textArea.style.left = '-999999px';
            document.body.appendChild(textArea);
            textArea.select();

            try {
                document.execCommand('copy');
                copyFeedback.classList.add('show');

                setTimeout(() => {
                    copyFeedback.classList.remove('show');
                }, 2000);
            } catch (err) {
                console.error('Failed to copy citation:', err);
            }

            document.body.removeChild(textArea);
        }
    });

    // Keyboard support
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
});

/**
 * Smooth image hover effects
 */
document.addEventListener('DOMContentLoaded', () => {
    const researchImages = document.querySelectorAll('.research-image img');

    researchImages.forEach(img => {
        img.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.4s ease';
        });
    });
});

/**
 * Research link analytics (placeholder)
 */
document.addEventListener('DOMContentLoaded', () => {
    const researchLinks = document.querySelectorAll('.research-link');

    researchLinks.forEach(link => {
        link.addEventListener('click', function() {
            const linkType = this.querySelector('span').textContent;
            const researchTitle = this.closest('.research-content').querySelector('h3').textContent;

            console.log(`Research link clicked: ${linkType} - ${researchTitle}`);
            // Add analytics tracking here if needed
        });
    });
});