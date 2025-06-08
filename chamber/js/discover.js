// JavaScript for the Discover page

document.addEventListener('DOMContentLoaded', function() {
    // Load attractions from JSON
    loadAttractions();
    
    // Handle last visit message
    displayLastVisitMessage();
});

// Function to load attractions from JSON file
async function loadAttractions() {
    try {
        const response = await fetch('data/attractions.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        displayAttractions(data.attractions);
    } catch (error) {
        console.error('Error loading attractions:', error);
        document.querySelector('.attractions-container').innerHTML = 
            '<p class="error-message">Sorry, we couldn\'t load the attractions. Please try again later.</p>';
    }
}

// Function to display attractions on the page
function displayAttractions(attractions) {
    const container = document.querySelector('.attractions-container');
    
    attractions.forEach((attraction, index) => {
        const card = document.createElement('article');
        card.className = 'attraction-card';
        
        card.innerHTML = `
            <figure>
                <img src="images/discover/placeholder.webp" data-src="${attraction.image}" alt="${attraction.name}" loading="lazy" class="lazy-load-placeholder">
            </figure>
            <div class="card-content">
                <h2>${attraction.name}</h2>
                <address>${attraction.address}</address>
                <p>${attraction.description}</p>
                <a href="#" class="learn-more-btn">Learn More</a>
            </div>
        `;
        
        container.appendChild(card);
    });
    
    // Iniciar lazy loading después de crear las tarjetas
    initLazyLoading();
}

// Function to display last visit message
function displayLastVisitMessage() {
    const visitMessageElement = document.getElementById('visit-message');
    
    // Get current date in milliseconds
    const currentDate = Date.now();
    
    // Get last visit date from localStorage
    const lastVisit = localStorage.getItem('lastVisit');
    
    // Prepare message based on visit history
    let message = '';
    
    if (!lastVisit) {
        // First visit
        message = "Welcome! Let us know if you have any questions.";
    } else {
        // Calculate days between visits
        const daysBetween = Math.floor((currentDate - parseInt(lastVisit)) / (1000 * 60 * 60 * 24));
        
        if (daysBetween < 1) {
            // Less than a day
            message = "Back so soon! Awesome!";
        } else {
            // More than a day
            message = `You last visited ${daysBetween} ${daysBetween === 1 ? 'day' : 'days'} ago.`;
        }
    }
    
    // Display message
    visitMessageElement.textContent = message;
    
    // Store current visit date
    localStorage.setItem('lastVisit', currentDate);
}

// Function to initialize lazy loading for images
function initLazyLoading() {
    // Check if the browser supports IntersectionObserver
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    const src = img.getAttribute('data-src');
                    if (src) {
                        // Crear una nueva imagen para precargar
                        const newImg = new Image();
                        newImg.onload = function() {
                            // Una vez cargada la imagen, actualizar la src
                            img.src = src;
                            img.removeAttribute('data-src');
                            img.classList.remove('lazy-load-placeholder');
                        };
                        newImg.src = src;
                    }
                    imageObserver.unobserve(img);
                }
            });
        }, {
            rootMargin: '50px 0px', // Cargar imágenes cuando estén a 50px de entrar en la pantalla
            threshold: 0.1 // Cargar cuando al menos el 10% de la imagen sea visible
        });
        
        // Observe all images with data-src attribute
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    } else {
        // Fallback for browsers that don't support IntersectionObserver
        const lazyLoadImages = function() {
            const lazyImages = document.querySelectorAll('img[data-src]');
            if (lazyImages.length === 0) {
                document.removeEventListener('scroll', lazyLoadImages);
                window.removeEventListener('resize', lazyLoadImages);
                window.removeEventListener('orientationchange', lazyLoadImages);
                return;
            }
            
            lazyImages.forEach(img => {
                if ((img.getBoundingClientRect().top <= window.innerHeight && 
                     img.getBoundingClientRect().bottom >= 0) && 
                    getComputedStyle(img).display !== 'none') {
                    const src = img.getAttribute('data-src');
                    if (src) {
                        img.src = src;
                        img.removeAttribute('data-src');
                        img.classList.remove('lazy-load-placeholder');
                    }
                }
            });
        };
        
        document.addEventListener('scroll', lazyLoadImages);
        window.addEventListener('resize', lazyLoadImages);
        window.addEventListener('orientationchange', lazyLoadImages);
        lazyLoadImages();
    }
}
