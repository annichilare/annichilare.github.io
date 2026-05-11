// ===========================
// VISOR DE IMAGEN FULLSCREEN
// ===========================
function previewImage(src) {
    const container = document.getElementById('fullScreenContainer');
    const image = document.getElementById('fullScreenImage');
    image.src = src;
    container.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

function closeFullScreen() {
    const container = document.getElementById('fullScreenContainer');
    container.style.display = 'none';
    document.body.style.overflow = '';
}

// Cerrar con tecla Escape
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeFullScreen();
        closeObraViewer();
    }
});

// ===========================
// VISOR DE OBRA CON INFORMACIÓN
// ===========================
function openObraViewer(imgElement) {
    const viewer = document.getElementById('obraViewer');
    const obraImagen = document.getElementById('obraImagen');
    const obraTitulo = document.getElementById('obraTitulo');
    const obraYear = document.getElementById('obraYear');
    const obraTechnique = document.getElementById('obraTechnique');
    const obraDescripcion = document.getElementById('obraDescripcion');

    // Obtener datos de la imagen
    const src = imgElement.src;
    const title = imgElement.dataset.title || 'Sin título';
    const info = imgElement.dataset.info || '';
    const year = imgElement.dataset.year || '—';
    const technique = imgElement.dataset.technique || '—';

    obraImagen.src = src;
    obraTitulo.textContent = title;
    obraYear.textContent = year;
    obraTechnique.textContent = technique;
    obraDescripcion.textContent = info;

    viewer.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeObraViewer() {
    const viewer = document.getElementById('obraViewer');
    viewer.classList.remove('active');
    document.body.style.overflow = '';
}

// Inicializar clics en la galería
function initGaleriaClicks() {
    const galeriaItems = document.querySelectorAll('.galeria-item img');
    galeriaItems.forEach(img => {
        img.addEventListener('click', (e) => {
            e.stopPropagation();
            openObraViewer(img);
        });
    });
}

// Cerrar viewer al hacer clic en overlay
document.addEventListener('DOMContentLoaded', () => {
    const overlay = document.querySelector('.obra-viewer-overlay');
    if (overlay) {
        overlay.addEventListener('click', closeObraViewer);
    }
    initGaleriaClicks();
});

// ===========================
// SCROLL SPY PARA MENÚ ACTIVO
// ===========================
function initScrollSpy() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('#menu ul li a');
    if (sections.length === 0 || navLinks.length === 0) return;

    function updateActiveLink() {
        let currentSectionId = '';
        const scrollPos = window.scrollY + 100; // offset para considerar la altura del menú

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', () => {
        // throttle simple
        if (!window.requestIdleCallback) {
            updateActiveLink();
        } else {
            if (window.scrollTimeout) cancelIdleCallback(window.scrollTimeout);
            window.scrollTimeout = requestIdleCallback(updateActiveLink);
        }
    });
    updateActiveLink(); // ejecutar al cargar
}
// ===========================
// EFECTO GLITCH ALEATORIO INTENSIFICADO
// ===========================
function randomGlitchIntensify() {
    const glitchElement = document.querySelector('.glitch');
    if (!glitchElement) return;
    
    glitchElement.style.animation = 'none';
    glitchElement.offsetHeight;
    glitchElement.style.textShadow = '2px 0 rgba(10,26,10,0.7), -2px 0 rgba(26,10,10,0.7)';
    
    setTimeout(() => {
        glitchElement.style.textShadow = 'none';
    }, 150);
}

function scheduleRandomGlitch() {
    const delay = 5000 + Math.random() * 10000;
    setTimeout(() => {
        randomGlitchIntensify();
        scheduleRandomGlitch();
    }, delay);
}

// ===========================
// INICIALIZACIÓN
// ===========================
document.addEventListener('DOMContentLoaded', () => {
    initGaleriaClicks();
    initScrollSpy();
    
    if (window.innerWidth > 768) {
        scheduleRandomGlitch();
    }
});

// Re-scan por si hay carga dinámica
window.addEventListener('load', () => {
    initGaleriaClicks();
});
