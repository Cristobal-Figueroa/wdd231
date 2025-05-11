
document.addEventListener('DOMContentLoaded', () => {
    const hamburgerBtn = document.getElementById('hamburgerBtn');
    const primaryNav = document.getElementById('primaryNav');


    function toggleMenu() {
        const isOpen = primaryNav.classList.toggle('open');
        hamburgerBtn.textContent = isOpen ? '✕' : '≡';
        hamburgerBtn.setAttribute('aria-expanded', isOpen);
    }


    hamburgerBtn.addEventListener('click', toggleMenu);


    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            primaryNav.classList.remove('open');
            hamburgerBtn.textContent = '≡';
        }
    });
});
