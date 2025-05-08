document.addEventListener('DOMContentLoaded', function() {
    const track = document.getElementById('carousel-track');
    const items = track.getElementsByClassName('carousel-item');
    const indicators = document.querySelectorAll('.carousel-indicators button');
    let currentIndex = 0;
    const totalItems = items.length;

    // Función para actualizar el carrusel
    function updateCarousel(index) {
        // Ocultar todos los items
        for (let i = 0; i < items.length; i++) {
            items[i].classList.remove('active');
            indicators[i].classList.remove('active');
        }
        
        // Mostrar el item actual
        items[index].classList.add('active');
        indicators[index].classList.add('active');
        currentIndex = index;
    }

    // Configurar indicadores
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            clearInterval(interval);
            updateCarousel(index);
            interval = setInterval(nextSlide, 5000);
        });
    });

    // Función para mover al siguiente slide
    function nextSlide() {
        const nextIndex = (currentIndex + 1) % totalItems;
        updateCarousel(nextIndex);
    }

    // Función para mover al slide anterior
    function prevSlide() {
        const prevIndex = (currentIndex - 1 + totalItems) % totalItems;
        updateCarousel(prevIndex);
    }

    // Inicializar el primer slide
    updateCarousel(0);

    // Iniciar el carrusel automático
    let interval = setInterval(nextSlide, 5000);

    // Manejar gestos táctiles
    let touchStartX = 0;
    let touchEndX = 0;

    track.addEventListener('touchstart', function(e) {
        touchStartX = e.touches[0].clientX;
        clearInterval(interval);
    });

    track.addEventListener('touchend', function(e) {
        touchEndX = e.changedTouches[0].clientX;
        handleSwipe();
        interval = setInterval(nextSlide, 5000);
    });

    function handleSwipe() {
        const swipeThreshold = 50;
        const difference = touchStartX - touchEndX;

        if (Math.abs(difference) > swipeThreshold) {
            if (difference > 0) {
                nextSlide();
            } else {
                prevSlide();
            }
        }
    }
});