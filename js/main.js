(() => {
    const carousel = document.getElementById("carousel-track");
    const buttons = document.querySelectorAll(".carousel-indicators button");
    const totalSlides = buttons.length;
    let currentIndex = 0;
    let interval;

    function updateCarousel(index) {
        if (index < 0) index = totalSlides - 1;
        if (index >= totalSlides) index = 0;
        currentIndex = index;
        
        // Actualizar la posición del carrusel con una transición más suave
        carousel.style.transform = `translateX(-${index * (carousel.children[0].offsetWidth + 16)}px)`;
        
        // Actualizar los indicadores
        buttons.forEach((btn, i) => {
            if (i === index) {
                btn.classList.add("bg-blue-900");
                btn.classList.remove("bg-slate-300");
            } else {
                btn.classList.remove("bg-blue-900");
                btn.classList.add("bg-slate-300");
            }
        });
    }

    function startAutoSlide() {
        interval = setInterval(() => {
            updateCarousel(currentIndex + 1);
        }, 6000); // Aumentado a 6 segundos para una mejor experiencia
    }

    function stopAutoSlide() {
        clearInterval(interval);
    }

    // Agregar event listeners para los botones
    buttons.forEach((btn) => {
        btn.addEventListener("click", () => {
            stopAutoSlide();
            updateCarousel(parseInt(btn.dataset.index));
            startAutoSlide();
        });
    });

    // Inicializar el carrusel
    updateCarousel(0);
    startAutoSlide();
})();

const apartments = [
    {
        id: 1,
        title: "Sobre Avenida Collins 19370, Ocean Reserve Condo",
        description: "Sunny Isles, 100 metros cuadrados de apartamento. 1 dormitorio con 2 camas queen y en el living sofá cama queen. Totalmente equipado. Balcón. Piscina climatizada, cancha de tenis. Mini market y bar. Parking incluido.",
        images: [
            "/assets/images/apartments/apt1/1.jpg",
            "/assets/images/apartments/apt1/2.jpg",
            "/assets/images/apartments/apt1/3.jpg",
            "/assets/images/apartments/apt1/4.jpg",
            "/assets/images/apartments/apt1/5.jpg",
            "/assets/images/apartments/apt1/6.jpg",
            "/assets/images/apartments/apt1/7.jpg",
            "/assets/images/apartments/apt1/8.jpg"
        ]
    }
    // Puedes agregar más apartamentos aquí
];

// Obtener elementos del modal
const modal = document.getElementById("apartmentModal");
const modalTitle = document.getElementById("modalTitle");
const modalDescription = document.getElementById("modalDescription");
const modalGallery = document.getElementById("modalGallery");
const closeBtn = document.querySelector(".close-modal");

// Agregar event listeners a los botones de consulta
document.querySelectorAll('button').forEach((button, index) => {
    if (button.textContent === "Consultar disponibilidad") {
        button.addEventListener('click', () => openModal(index));
    }
});

// Función para abrir el modal
function openModal(apartmentIndex) {
    const apartment = apartments[apartmentIndex];
    if (!apartment) return;

    modalTitle.textContent = apartment.title;
    modalDescription.textContent = apartment.description;
    
    // Limpiar y llenar la galería
    modalGallery.innerHTML = '';
    apartment.images.forEach(imgSrc => {
        const div = document.createElement('div');
        div.className = 'gallery-item';
        const img = document.createElement('img');
        img.src = imgSrc;
        img.alt = "Imagen del apartamento";
        img.loading = "lazy";
        div.appendChild(img);
        modalGallery.appendChild(div);
    });

    modal.style.display = "block";
    document.body.style.overflow = "hidden";
}

// Cerrar el modal
closeBtn.onclick = function() {
    modal.style.display = "none";
    document.body.style.overflow = "auto";
}

// Cerrar el modal al hacer clic fuera de él
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
        document.body.style.overflow = "auto";
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('apartmentModal');
    const closeBtn = document.querySelector('.close-modal');
    const buttons = document.querySelectorAll('button');

    buttons.forEach(button => {
        if (button.textContent === 'Consultar disponibilidad') {
            button.addEventListener('click', function() {
                const article = this.closest('article');
                const title = article.querySelector('h2').textContent;
                const description = article.querySelector('p').textContent;
                
                document.getElementById('modalTitle').textContent = title;
                document.getElementById('modalDescription').textContent = 'Consulta la disponibilidad para: ' + description;
                
                modal.classList.add('show');
            });
        }
    });

    closeBtn.addEventListener('click', function() {
        modal.classList.remove('show');
    });

    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.classList.remove('show');
        }
    });
});