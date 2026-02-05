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
        contactForm.addEventListener('submit', (event) => {
            event.preventDefault();
            if (!contactForm.reportValidity()) {
                return;
            }

            openThanksModal();
            contactForm.reset();
        });
    }

    if (modalClose) {
        modalClose.addEventListener('click', closeThanksModal);
    }

    if (modalBackdrop) {
        modalBackdrop.addEventListener('click', closeThanksModal);
    }
}); 