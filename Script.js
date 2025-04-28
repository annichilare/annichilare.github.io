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


// Optimizar el destacado aleatorio
function destacarAleatoria() {
    const mosaicos = document.querySelectorAll('.mosaico');
    
    mosaicos.forEach(mosaico => {
        const imagenes = mosaico.querySelectorAll('img');
        if(imagenes.length < 1) return;
        
        imagenes.forEach(img => img.classList.remove('destacada'));
        const indice = Math.floor(Math.random() * imagenes.length);
        imagenes[indice].classList.add('destacada');
        
        // Forzar reflow solo si es necesario
        if(window.innerWidth > 768) {
            mosaico.style.display = 'none';
            void mosaico.offsetWidth;
            mosaico.style.display = 'grid';
        }
    });
}

// Debounce para el resize
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(destacarAleatoria, 250);
});

// Ejecutar al cargar y al recargar
window.addEventListener('load', destacarAleatoria);
window.addEventListener('resize', destacarAleatoria);

//ACTIVAR
document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('#menu ul li a');

    const observerOptions = {
        threshold: 0.2, // Reducir threshold para mayor sensibilidad
        rootMargin: '0px 0px -25% 0px' // Ignorar 25% inferior de la pantalla
    };
    
    const observer = new IntersectionObserver((entries) => {
        let mostVisibleEntry = null;
        
        entries.forEach(entry => {
            if (!mostVisibleEntry || entry.intersectionRatio > mostVisibleEntry.intersectionRatio) {
                mostVisibleEntry = entry;
            }
        });
    
        if (mostVisibleEntry && mostVisibleEntry.isIntersecting) {
            navLinks.forEach(link => link.classList.remove('active'));
            const correspondingLink = document.querySelector(
                `#menu ul li a[href="#${mostVisibleEntry.target.id}"]`
            );
            if (correspondingLink) {
                correspondingLink.classList.add('active');
            }
        }
    }, observerOptions);

    // Observar todas las secciones
    sections.forEach(section => {
        observer.observe(section);
    });
});