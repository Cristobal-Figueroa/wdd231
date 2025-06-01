// join.js - JavaScript for the Join page functionality

document.addEventListener('DOMContentLoaded', function() {
    // Set the current timestamp in the hidden field
    const timestampField = document.getElementById('timestamp');
    if (timestampField) {
        timestampField.value = new Date().toISOString();
    }

    // Modal functionality
    const modals = document.querySelectorAll('.modal');
    const infoButtons = document.querySelectorAll('.info-btn');
    const closeButtons = document.querySelectorAll('.close-modal');

    // Open modal when info button is clicked
    infoButtons.forEach(button => {
        button.addEventListener('click', function() {
            const modalId = this.getAttribute('data-modal');
            const modal = document.getElementById(modalId);
            if (modal) {
                modal.style.display = 'block';
                document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
            }
        });
    });

    // Close modal when close button is clicked
    closeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const modal = this.closest('.modal');
            if (modal) {
                modal.style.display = 'none';
                document.body.style.overflow = ''; // Restore scrolling
            }
        });
    });

    // Close modal when clicking outside of modal content
    window.addEventListener('click', function(event) {
        modals.forEach(modal => {
            if (event.target === modal) {
                modal.style.display = 'none';
                document.body.style.overflow = ''; // Restore scrolling
            }
        });
    });

    // Close modal when pressing Escape key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            modals.forEach(modal => {
                if (modal.style.display === 'block') {
                    modal.style.display = 'none';
                    document.body.style.overflow = ''; // Restore scrolling
                }
            });
        }
    });

    // Form validation enhancement
    const form = document.querySelector('form');
    if (form) {
        form.addEventListener('submit', function(event) {
            // Additional custom validation can be added here if needed
            console.log('Form submitted with timestamp:', timestampField.value);
        });
    }
});
