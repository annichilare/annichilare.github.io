// Script.js

function previewImage(src) {
    document.getElementById('fullScreenImage').src = src;
    document.getElementById('fullScreenContainer').style.display = 'flex';
}

function closeFullScreen() {
    document.getElementById('fullScreenContainer').style.display = 'none';
}

// Agregar efecto hover a las imágenes de la galería
const galleryImages = document.querySelectorAll('.galeria-grid .item img');

galleryImages.forEach(image => {
    image.addEventListener('mouseenter', () => {
        image.style.transform = "scale(1.1)";
    });
    image.addEventListener('mouseleave', () => {
        image.style.transform = "scale(1)";
    });
});