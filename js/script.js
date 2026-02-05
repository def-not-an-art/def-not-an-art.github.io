document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.querySelector('.menu-toggle');
    const menu = document.querySelector('.menu');

    // Toggle menu open/close
    menuToggle.addEventListener('click', () => {
        menu.classList.toggle('active');
        
        // Change button text based on menu state
        if (menu.classList.contains('active')) {
            menuToggle.textContent = 'Close Menu';
        } else {
            menuToggle.textContent = 'Open Menu';
        }
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!menu.contains(e.target) && !menuToggle.contains(e.target) && menu.classList.contains('active')) {
            menu.classList.remove('active');
            menuToggle.textContent = 'Open Menu';
        }
    });

    // Close menu when clicking on a menu item
    const menuItems = document.querySelectorAll('.menu a');
    menuItems.forEach(item => {
        item.addEventListener('click', () => {
            menu.classList.remove('active');
            menuToggle.textContent = 'Open Menu';
        });
    });
    
    // Update copyright year
    const currentYear = new Date().getFullYear();
    const copyrightYear = document.querySelector('.copyright-year');
    if (copyrightYear) {
        copyrightYear.textContent = currentYear;
    }

    // Show thank-you dialog on contact form submit
    const contactForm = document.querySelector('.contact-form form');
    const thanksModal = document.querySelector('#contact-thanks');
    const modalClose = thanksModal ? thanksModal.querySelector('.modal-close') : null;
    const modalBackdrop = thanksModal ? thanksModal.querySelector('.modal-backdrop') : null;
    const modalTitle = thanksModal ? thanksModal.querySelector('#contact-thanks-title') : null;
    const modalMessage = thanksModal ? thanksModal.querySelector('p') : null;
    const submitButton = contactForm ? contactForm.querySelector('.submit-btn') : null;

    const closeThanksModal = () => {
        if (!thanksModal) {
            return;
        }
        thanksModal.classList.remove('is-open');
        thanksModal.setAttribute('aria-hidden', 'true');
    };

    const openThanksModal = () => {
        if (!thanksModal) {
            return;
        }
        thanksModal.classList.add('is-open');
        thanksModal.setAttribute('aria-hidden', 'false');
    };

    if (contactForm) {
        contactForm.addEventListener('submit', async (event) => {
            event.preventDefault();
            if (!contactForm.reportValidity()) {
                return;
            }

            const endpoint = contactForm.dataset.endpoint;
            if (!endpoint || endpoint.includes('REPLACE_WITH_YOUR_SCRIPT_ID')) {
                if (modalTitle) {
                    modalTitle.textContent = 'Setup needed';
                }
                if (modalMessage) {
                    modalMessage.textContent = 'Add your Google Sheets endpoint to enable sending.';
                }
                openThanksModal();
                return;
            }

            const payload = {
                name: contactForm.querySelector('#name')?.value || '',
                email: contactForm.querySelector('#email')?.value || '',
                message: contactForm.querySelector('#message')?.value || '',
            };

            if (submitButton) {
                submitButton.disabled = true;
                submitButton.textContent = 'Sending...';
            }

            try {
                await fetch(endpoint, {
                    method: 'POST',
                    mode: 'no-cors',
                    body: JSON.stringify(payload),
                });

                if (modalTitle) {
                    modalTitle.textContent = 'Thanks';
                }
                if (modalMessage) {
                    modalMessage.textContent = "I'll replay shortly";
                }
                openThanksModal();
                contactForm.reset();
            } catch (error) {
                if (modalTitle) {
                    modalTitle.textContent = 'Sorry';
                }
                if (modalMessage) {
                    modalMessage.textContent = 'Something went wrong. Please try again.';
                }
                openThanksModal();
            } finally {
                if (submitButton) {
                    submitButton.disabled = false;
                    submitButton.textContent = 'Send';
                }
            }
        });
    }

    if (modalClose) {
        modalClose.addEventListener('click', closeThanksModal);
    }

    if (modalBackdrop) {
        modalBackdrop.addEventListener('click', closeThanksModal);
    }
}); 