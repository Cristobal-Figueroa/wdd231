
function updateCopyright() {
    const currentYear = new Date().getFullYear();
    document.getElementById('currentYear').textContent = currentYear;
}


function updateLastModified() {
    document.getElementById('lastModified').textContent = `Last Update: ${document.lastModified}`;
}


document.addEventListener('DOMContentLoaded', () => {
    updateCopyright();
    updateLastModified();
});
