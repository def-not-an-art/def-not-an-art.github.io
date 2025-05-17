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
}); 