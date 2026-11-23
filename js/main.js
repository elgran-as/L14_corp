document.addEventListener('DOMContentLoaded', function () {
    const year = new Date().getFullYear();

    document.querySelectorAll('footer p').forEach((footerText) => {
        footerText.textContent = footerText.textContent.replace(/©\s*\d{4}/, `© ${year}`);
    });

    document.querySelectorAll('header img[src*="l14_corp"]').forEach((logo) => {
        if (!logo.parentElement.classList.contains('logo-shine')) {
            const wrapper = document.createElement('span');
            wrapper.className = 'logo-shine';
            logo.parentNode.insertBefore(wrapper, logo);
            wrapper.appendChild(logo);
        }
    });

    const headerRight = document.querySelector('header .max-w-7xl > div:last-child');
    if (headerRight) {
        const clock = document.createElement('div');
        clock.className = 'local-clock';
        clock.setAttribute('role', 'timer');
        clock.title = Intl.DateTimeFormat().resolvedOptions().timeZone || '';
        headerRight.prepend(clock);

        const updateClock = () => {
            const language = document.documentElement.lang || 'en';
            clock.textContent = new Intl.DateTimeFormat(language === 'es' ? 'es-419' : 'en-US', {
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                timeZoneName: 'short'
            }).format(new Date());
        };

        updateClock();
        setInterval(updateClock, 1000);
    }

    // Código del carrusel existente
    const track = document.getElementById('carousel-track');
    if (track) {
        const items = track.getElementsByClassName('carousel-item');
        const indicators = document.querySelectorAll('.carousel-indicators button');
        let currentIndex = 0;
        const totalItems = items.length;

        // Carousel update function
        function updateCarousel(index) {
            // Hide all items
            for (let i = 0; i < items.length; i++) {
                items[i].classList.remove('active');
                indicators[i].classList.remove('active');
            }

            // Show current item
            items[index].classList.add('active');
            indicators[index].classList.add('active');
            currentIndex = index;
        }

        // Configure indicators
        indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => {
                clearInterval(interval);
                updateCarousel(index);
                interval = setInterval(nextSlide, 5000);
            });
        });

        // Function to move to next slide
        function nextSlide() {
            const nextIndex = (currentIndex + 1) % totalItems;
            updateCarousel(nextIndex);
        }

        // Function to move to previous slide
        function prevSlide() {
            const prevIndex = (currentIndex - 1 + totalItems) % totalItems;
            updateCarousel(prevIndex);
        }

        // Initialize first slide
        updateCarousel(0);

        // Start automatic carousel
        let interval = setInterval(nextSlide, 5000);

        // Handle touch gestures
        let touchStartX = 0;
        let touchEndX = 0;

        track.addEventListener('touchstart', function (e) {
            touchStartX = e.touches[0].clientX;
            clearInterval(interval);
        });

        track.addEventListener('touchend', function (e) {
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
    }

    // Language switching functionality
    const languageSelector = document.querySelector('select[aria-label="Change language"], select[aria-label="Cambiar idioma"]');

    if (!languageSelector) return;

    // Translations object - Expanded with all texts from all pages
    const translations = {
        en: {
            // Common elements across all pages
            lang: "en",
            title: {
                home: "L14 Corp - Apartment and Car Rentals in Miami",
                apartments: "Apartments - L14 Corp",
                cars: "Cars - L14 Corp",
                about: "About Us - L14 Corp",
                planning: "Planning - L14 Corp",
                aptDetail: "Apartment Detail - L14 Corp",
                carDetail: "Car Detail - L14 Corp",
                busDetail: "Bus Detail - L14 Corp"
            },
            meta: {
                description: "Find the best apartments and cars for rent in Miami. Prime locations, quality services, and personalized attention.",
                keywords: "miami rentals, miami apartments, miami cars, rental cars miami, vacation rentals",
                ogTitle: "L14 Corp - Rentals in Miami",
                ogDescription: "Apartments and cars for rent in the best areas of Miami. Book now!"
            },
            navigation: {
                home: "Home",
                apartments: "Apartments",
                cars: "Cars",
                planning: "Planning",
                aboutUs: "About Us",
                backToApartments: "← Back to Apartments",
                backToCars: "← Back to Cars"
            },
            welcome: "Welcome to L14 Corp",
            featured: "Featured",
            copyright: `© ${new Date().getFullYear()} L14 Corp. All rights reserved.`,
            followUs: "Follow us on",

            // Apartments page
            apartmentsTitle: "Apartments for Rent",
            apartmentInMiami: "Apartment in Miami",
            startingAt: "starting at",
            viewDetails: "View Details",
            roomBath: {
                "1/1": "1 bedroom / 1 bathroom",
                "2/2": "2 bedrooms / 2 bathrooms",
                "1/2": "1 bedroom / 2 bathrooms"
            },

            // Cars page
            rentalCar: "Rental Car",
            pricesVary: "Prices vary by date and duration",
            cars: "Cars",
            bus: "Bus",
            details: "Details",

            // About page
            aboutUsTitle: "About Us",
            aboutUsText1: "At L14 Corp, we believe that every trip deserves comfort, confidence, and warmth. We are a company founded in Miami with a clear goal: to offer apartment and car rentals that make you feel at home, without complications.",
            aboutUsText2: "Our apartments are managed by trusted people, located in strategic areas so you can enjoy the best of the city. And our cars, ready to take you wherever you want, are designed for practical travelers who seek quality without paying extra.",
            aboutUsText3: "L14 is more than a name: it's a mix of our roots, passions, and purpose. And if you're reading this, you're already part of this story.",

            // Planning page
            reservationDetails: "Reservation Details",
            personalInfo: "Personal Information",
            firstName: "First Name",
            lastName: "Last Name",
            phone: "Phone Number",
            email: "Email",
            selectDates: "Select Dates",
            startDate: "Start date",
            endDate: "End date",
            startDatePlaceholder: "Select a start date",
            endDatePlaceholder: "Select an end date",
            confirmReservation: "Confirm Reservation",

            // Apartment detail page
            location: "Location",
            pricing: "Pricing",
            amenities: {
                wifi: "Free WiFi",
                pool: "Pool",
                gym: "Gym",
                parking: "Parking included"
            },
            bookingDetails: "Booking Details",
            adults: "Adults",
            adult: "Adult",
            adults2: "Adults",
            adults3: "Adults",
            adults4: "Adults",
            children: "Children",
            child: "Child",
            children2: "Children",
            bookNow: "Book Now"
        },
        es: {
            // Common elements across all pages
            lang: "es",
            title: {
                home: "L14 Corp - Alquiler de Departamentos y Autos en Miami",
                apartments: "Departamentos - L14 Corp",
                cars: "Autos - L14 Corp",
                about: "Quienes Somos - L14 Corp",
                planning: "Planificación - L14 Corp",
                aptDetail: "Detalle Departamento - L14 Corp",
                carDetail: "Detalle Auto - L14 Corp",
                busDetail: "Detalle Bus - L14 Corp"
            },
            meta: {
                description: "Encuentra los mejores departamentos y autos en alquiler en Miami. Ubicaciones privilegiadas, servicios de calidad y atención personalizada.",
                keywords: "alquileres miami, departamentos miami, autos miami, alquiler autos miami, alquileres vacacionales",
                ogTitle: "L14 Corp - Alquileres en Miami",
                ogDescription: "Departamentos y autos en alquiler en las mejores zonas de Miami. ¡Reserva ahora!"
            },
            navigation: {
                home: "Inicio",
                apartments: "Departamentos",
                cars: "Autos",
                planning: "Planificación",
                aboutUs: "Quienes Somos",
                backToApartments: "← Volver a Departamentos",
                backToCars: "← Volver a Autos"
            },
            welcome: "Bienvenidos a L14 Corp",
            featured: "Destacados",
            copyright: `© ${new Date().getFullYear()} L14 Corp. Todos los derechos reservados.`,
            followUs: "Síguenos en",

            // Apartments page
            apartmentsTitle: "Departamentos en Alquiler",
            apartmentInMiami: "Departamento en Miami",
            startingAt: "desde",
            viewDetails: "Ver Detalles",
            roomBath: {
                "1/1": "1 cuarto / 1 baño",
                "2/2": "2 cuartos / 2 baños",
                "1/2": "1 cuarto / 2 baños"
            },

            // Cars page
            rentalCar: "Alquiler de Autos",
            pricesVary: "Los precios varían según fecha y duración",
            cars: "Autos",
            bus: "Bus",
            details: "Detalles",

            // About page
            aboutUsTitle: "Quienes Somos",
            aboutUsText1: "En L14 Corp, creemos que cada viaje merece comodidad, confianza y calidez. Somos una empresa fundada en Miami con un objetivo claro: ofrecer departamentos y autos en alquiler que te hagan sentir como en casa, sin complicaciones.",
            aboutUsText2: "Nuestros departamentos están gestionados por personas de confianza, ubicados en zonas estratégicas para que disfrutes lo mejor de la ciudad. Y nuestros autos, listos para llevarte a donde quieras, están pensados para viajeros prácticos que buscan calidad sin pagar de más.",
            aboutUsText3: "L14 es más que un nombre: es una mezcla de nuestras raíces, pasiones y propósito. Y si estás leyendo esto, ya sos parte de esta historia.",

            // Planning page
            reservationDetails: "Detalles de la Reserva",
            personalInfo: "Información Personal",
            firstName: "Nombre",
            lastName: "Apellido",
            phone: "Número de Celular",
            email: "Correo Electrónico",
            selectDates: "Seleccionar Fechas",
            startDate: "Fecha de inicio",
            endDate: "Fecha de fin",
            startDatePlaceholder: "Selecciona la fecha de inicio",
            endDatePlaceholder: "Selecciona la fecha de fin",
            confirmReservation: "Confirmar Reserva",

            // Apartment detail page
            location: "Ubicación",
            pricing: "Precios",
            amenities: {
                wifi: "WiFi gratuito",
                pool: "Piscina",
                gym: "Gimnasio",
                parking: "Estacionamiento incluido"
            },
            bookingDetails: "Detalles de la Reserva",
            adults: "Adultos",
            adult: "Adulto",
            adults2: "Adultos",
            adults3: "Adultos",
            adults4: "Adultos",
            children: "Niños",
            child: "Niño",
            children2: "Niños",
            bookNow: "Reservar Ahora"
        }
    };

    // Function to update page content based on selected language
    function updateLanguage(lang) {
        // Update HTML lang attribute
        document.documentElement.lang = translations[lang].lang;

        // Get current page path
        const path = window.location.pathname;
        const pageName = path.split('/').pop().split('.')[0] || 'index';

        // Update page title based on current page
        if (pageName === 'index') {
            document.title = translations[lang].title.home;
        } else if (pageName === 'apartments') {
            document.title = translations[lang].title.apartments;
        } else if (pageName === 'cars') {
            document.title = translations[lang].title.cars;
        } else if (pageName === 'about') {
            document.title = translations[lang].title.about;
        } else if (pageName === 'planning') {
            document.title = translations[lang].title.planning;
        } else if (pageName === 'apt-detail') {
            document.title = translations[lang].title.aptDetail;
        } else if (pageName === 'car-detail') {
            document.title = translations[lang].title.carDetail;
        } else if (pageName === 'bus-detail') {
            document.title = translations[lang].title.busDetail;
        }

        // Update meta descriptions if they exist
        const metaDescription = document.querySelector('meta[name="description"]');
        if (metaDescription) {
            metaDescription.setAttribute('content', translations[lang].meta.description);
        }

        const metaKeywords = document.querySelector('meta[name="keywords"]');
        if (metaKeywords) {
            metaKeywords.setAttribute('content', translations[lang].meta.keywords);
        }

        const ogTitle = document.querySelector('meta[property="og:title"]');
        if (ogTitle) {
            ogTitle.setAttribute('content', translations[lang].meta.ogTitle);
        }

        const ogDescription = document.querySelector('meta[property="og:description"]');
        if (ogDescription) {
            ogDescription.setAttribute('content', translations[lang].meta.ogDescription);
        }

        // Update main headings based on current page
        const mainH1 = document.querySelector('main h1');
        if (mainH1) {
            if (pageName === 'index') {
                mainH1.textContent = translations[lang].welcome;
            } else if (pageName === 'apartments') {
                mainH1.textContent = translations[lang].apartmentsTitle;
            } else if (pageName === 'cars') {
                mainH1.textContent = translations[lang].rentalCar;
            } else if (pageName === 'about') {
                mainH1.textContent = translations[lang].aboutUsTitle;
            }
        }

        // Update subheadings
        const mainH2 = document.querySelector('main h2');
        if (mainH2 && pageName === 'index') {
            mainH2.textContent = translations[lang].featured;
        }

        // Update cars page specific elements
        if (pageName === 'cars') {
            const pricesVaryText = document.querySelector('main h3');
            if (pricesVaryText) {
                pricesVaryText.textContent = translations[lang].pricesVary;
            }

            const carsBtn = document.getElementById('carsBtn');
            if (carsBtn) {
                carsBtn.textContent = translations[lang].cars;
            }

            const busBtn = document.getElementById('busBtn');
            if (busBtn) {
                busBtn.textContent = translations[lang].bus;
            }

            // Update all "Details" links
            const detailLinks = document.querySelectorAll('a[href^="car-detail.html"], a[href^="bus-detail.html"]');
            detailLinks.forEach(link => {
                link.textContent = translations[lang].details;
            });
        }

        // Update apartment page specific elements
        if (pageName === 'apartments') {
            // Update all apartment titles
            const apartmentTitles = document.querySelectorAll('article h2');
            apartmentTitles.forEach(title => {
                if (title.textContent.includes('Apartment') || title.textContent.includes('Departamento')) {
                    title.textContent = translations[lang].apartmentInMiami;
                }
            });

            // Update all "starting at" texts
            const startingAtTexts = document.querySelectorAll('article p.text-blue-900');
            startingAtTexts.forEach(text => {
                const price = text.textContent.match(/\$\d+/);
                if (price) {
                    text.textContent = `${translations[lang].startingAt} ${price[0]}`;
                }
            });

            // Update room/bathroom texts
            const roomBathTexts = document.querySelectorAll('article p.text-slate-600');
            roomBathTexts.forEach(text => {
                if (text.textContent.includes('cuarto') || text.textContent.includes('bedroom')) {
                    // Determine which type of room/bath combination
                    let key = "1/1";
                    if (text.textContent.includes('2 cuartos') || text.textContent.includes('2 bedrooms')) {
                        key = "2/2";
                    } else if (text.textContent.includes('1 cuarto / 2') || text.textContent.includes('1 bedroom / 2')) {
                        key = "1/2";
                    }
                    text.textContent = translations[lang].roomBath[key];
                }
            });
        }

        // Update about page specific elements
        if (pageName === 'about') {
            const paragraphs = document.querySelectorAll('main p');
            if (paragraphs.length >= 3) {
                paragraphs[0].textContent = translations[lang].aboutUsText1;
                paragraphs[1].textContent = translations[lang].aboutUsText2;
                paragraphs[2].textContent = translations[lang].aboutUsText3;
            }
        }

        // Update planning page specific elements
        if (pageName === 'planning') {
            const reservationDetailsHeading = document.querySelector('h2:nth-of-type(1)');
            if (reservationDetailsHeading) {
                reservationDetailsHeading.textContent = translations[lang].reservationDetails;
            }

            const personalInfoHeading = document.querySelector('h2:nth-of-type(2)');
            if (personalInfoHeading) {
                personalInfoHeading.textContent = translations[lang].personalInfo;
            }

            const firstNameLabel = document.querySelector('label[for="firstName"]');
            if (firstNameLabel) {
                firstNameLabel.textContent = translations[lang].firstName;
            }

            const lastNameLabel = document.querySelector('label[for="lastName"]');
            if (lastNameLabel) {
                lastNameLabel.textContent = translations[lang].lastName;
            }

            const phoneLabel = document.querySelector('label[for="phone"]');
            if (phoneLabel) {
                phoneLabel.textContent = translations[lang].phone;
            }

            const emailLabel = document.querySelector('label[for="email"]');
            if (emailLabel) {
                emailLabel.textContent = translations[lang].email;
            }

            const selectDatesHeading = document.querySelector('h2:nth-of-type(3)');
            if (selectDatesHeading) {
                selectDatesHeading.textContent = translations[lang].selectDates;
            }

            const startDateLabel = document.querySelector('label[for="startDate"]');
            if (startDateLabel) {
                startDateLabel.textContent = translations[lang].startDate;
            }

            const endDateLabel = document.querySelector('label[for="endDate"]');
            if (endDateLabel) {
                endDateLabel.textContent = translations[lang].endDate;
            }

            const startDateInput = document.getElementById('startDate');
            if (startDateInput) {
                startDateInput.placeholder = translations[lang].startDatePlaceholder;
            }

            const endDateInput = document.getElementById('endDate');
            if (endDateInput) {
                endDateInput.placeholder = translations[lang].endDatePlaceholder;
            }

            const confirmButton = document.getElementById('submitReservation');
            if (confirmButton) {
                confirmButton.textContent = translations[lang].confirmReservation;
            }
        }

        // Update apartment detail page specific elements
        if (pageName === 'apt-detail') {
            const backLink = document.querySelector('a[href="apartments.html"]');
            if (backLink) {
                backLink.textContent = translations[lang].navigation.backToApartments;
            }

            const locationHeading = document.querySelector('.details-section h3:nth-of-type(1)');
            if (locationHeading) {
                locationHeading.textContent = translations[lang].location;
            }

            const pricingHeading = document.querySelector('.details-section h3:nth-of-type(2)');
            if (pricingHeading) {
                pricingHeading.textContent = translations[lang].pricing;
            }

            // Update amenities
            const amenityTexts = document.querySelectorAll('.amenities-section span');
            amenityTexts.forEach(span => {
                if (span.textContent.includes('WiFi') || span.textContent.includes('wifi')) {
                    span.textContent = translations[lang].amenities.wifi;
                } else if (span.textContent.includes('Piscina') || span.textContent.includes('Pool')) {
                    span.textContent = translations[lang].amenities.pool;
                } else if (span.textContent.includes('Gimnasio') || span.textContent.includes('Gym')) {
                    span.textContent = translations[lang].amenities.gym;
                } else if (span.textContent.includes('Estacionamiento') || span.textContent.includes('Parking')) {
                    span.textContent = translations[lang].amenities.parking;
                }
            });

            const bookingDetailsHeading = document.querySelector('.booking-section h3');
            if (bookingDetailsHeading) {
                bookingDetailsHeading.textContent = translations[lang].bookingDetails;
            }

            const adultsLabel = document.querySelector('label.block:nth-of-type(1)');
            if (adultsLabel) {
                adultsLabel.textContent = translations[lang].adults;
            }

            const adultsOptions = document.querySelectorAll('#adultsCount option');
            if (adultsOptions.length >= 4) {
                adultsOptions[0].textContent = `1 ${translations[lang].adult}`;
                adultsOptions[1].textContent = `2 ${translations[lang].adults2}`;
                adultsOptions[2].textContent = `3 ${translations[lang].adults3}`;
                adultsOptions[3].textContent = `4 ${translations[lang].adults4}`;
            }

            const childrenLabel = document.querySelector('label.block:nth-of-type(2)');
            if (childrenLabel) {
                childrenLabel.textContent = translations[lang].children;
            }

            const childrenOptions = document.querySelectorAll('#childrenCount option');
            if (childrenOptions.length >= 5) {
                childrenOptions[0].textContent = `0 ${translations[lang].children}`;
                childrenOptions[1].textContent = `1 ${translations[lang].child}`;
                childrenOptions[2].textContent = `2 ${translations[lang].children2}`;
                childrenOptions[3].textContent = `3 ${translations[lang].children3}`;
                childrenOptions[4].textContent = `4 ${translations[lang].children4}`;
            }

            const bookNowButton = document.querySelector('.booking-section button');
            if (bookNowButton) {
                bookNowButton.textContent = translations[lang].bookNow;
            }
        }

        // Update car detail page specific elements
        if (pageName === 'car-detail') {
            const backLink = document.querySelector('a[href="cars.html"]');
            if (backLink) {
                backLink.textContent = translations[lang].navigation.backToCars;
            }
        }

        // Update navigation titles
        const homeLink = document.querySelector('a[href="../index.html"], a[href="index.html"]');
        if (homeLink) {
            homeLink.title = translations[lang].navigation.home;
        }

        const apartmentsLink = document.querySelector('a[href="apartments.html"], a[href="/pages/apartments.html"]');
        if (apartmentsLink) {
            apartmentsLink.title = translations[lang].navigation.apartments;
        }

        const carsLink = document.querySelector('a[href="cars.html"], a[href="/pages/cars.html"]');
        if (carsLink) {
            carsLink.title = translations[lang].navigation.cars;
        }

        const planningLink = document.getElementById('planningLink');
        if (planningLink) {
            planningLink.title = translations[lang].navigation.planning;
        }

        const aboutLink = document.querySelector('a[href="about.html"], a[href="/pages/about.html"]');
        if (aboutLink) {
            aboutLink.title = translations[lang].navigation.aboutUs;
        }

        // Update footer
        const footerText = document.querySelector('footer p');
        if (footerText) {
            footerText.textContent = translations[lang].copyright;
        }

        // Update aria labels for social media
        const socialLinks = document.querySelectorAll('a[href*="twitter"], a[href*="instagram"], a[href*="facebook"]');
        socialLinks.forEach(link => {
            if (link.getAttribute('href').includes('twitter')) {
                link.setAttribute('aria-label', `${translations[lang].followUs} X (Twitter)`);
            } else if (link.getAttribute('href').includes('instagram')) {
                link.setAttribute('aria-label', `${translations[lang].followUs} Instagram`);
            } else if (link.getAttribute('href').includes('facebook')) {
                link.setAttribute('aria-label', `${translations[lang].followUs} Facebook`);
            }
        });
    }

    // Add event listener to language selector
    languageSelector.addEventListener('change', function () {
        updateLanguage(this.value);
    });

    // Initialize with the selected language
    updateLanguage(languageSelector.value);
});