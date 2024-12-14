document.addEventListener('DOMContentLoaded', function () {
    const images = document.querySelectorAll('#carousel img'); // Seleccionar imágenes
    const prevButton = document.querySelector('.carousel-button.prev'); // Botón izquierdo
    const nextButton = document.querySelector('.carousel-button.next'); // Botón derecho
    let currentIndex = 0; // Índice de la imagen actual

    function changeImage(index) {
        // Quitar la clase "active" de la imagen actual
        images[currentIndex].classList.remove('active');

        // Actualizar el índice actual
        currentIndex = (index + images.length) % images.length; // Asegura un índice válido

        // Añadir la clase "active" a la nueva imagen
        images[currentIndex].classList.add('active');
    }

    // Cambiar a la siguiente imagen automáticamente cada 8 segundos
    const autoChange = setInterval(() => changeImage(currentIndex + 1), 8000);

    // Función para manejar el clic en los botones
    function handleManualNavigation(offset) {
        clearInterval(autoChange); // Detener el cambio automático
        changeImage(currentIndex + offset); // Cambiar imagen según el botón
    }

    // Eventos para los botones
    prevButton.addEventListener('click', () => handleManualNavigation(-1)); // Retrocede una imagen
    nextButton.addEventListener('click', () => handleManualNavigation(1));  // Avanza una imagen
});






document.addEventListener('DOMContentLoaded', function () {
    const imagenes_pruebas = document.querySelectorAll('.gallery img');
    const possibleGhostsDiv = document.getElementById('lista_fantasmas');
    const posibles_fantasmas = document.getElementById('posibles_fantasmas');

    const evidenciaFantasmas = {
        "Espíritu": ["emf5", "spirit box", "escritura"],
        "Espectro": ["emf5", "spirit box", "dots"],
        "Ente": ["spirit box", "ultravioleta", "dots"],
        "Poltergeist": ["spirit box", "ultravioleta", "escritura"],
        "Banshee": ["ultravioleta", "orbes", "dots"],
        "Jinn": ["emf5", "ultravioleta", "temperaturas"],
        "Pesadilla": ["espíritu caja", "orbes", "escritura"],
        "Revenant": ["orbes", "escritura", "temperaturas"],
        "Sombra": ["emf5", "escritura", "temperaturas"],
        "Demonio": ["ultravioleta", "escritura", "temperaturas"],
        "Yurei": ["orbes", "temperaturas", "dots"],
        "Oni": ["emf5", "temperaturas", "dots"],
        "Yokai": ["spirit box", "orbes", "dots"],
        "Hantu": ["ultravioleta", "orbes", "temperaturas"],
        "Goryo": ["emf5", "ultravioleta", "dots"],
        "Myling": ["emf5", "ultravioleta", "escritura"],
        "Onryo": ["spirit box", "orbes", "temperaturas"],
        "Gemelos": ["emf5", "espíritu box", "temperaturas"],
        "Raiju": ["emf5", "orbes", "dots"],
        "Obake": ["emf5", "ultravioleta", "orbes"],
        "Mímico": ["spirit box", "ultravioleta", "temperaturas"],
        "Moroi": ["spirit box", "escritura", "temperaturas"],
        "Deogen": ["spirit box", "escritura", "dots"],
        "Thaye": ["orbes", "escritura", "dots"]
    };

    const links_fantasmas = {
        "Espíritu": "/fantasmas.html#espiritu",
        "Espectro": "/fantasmas.html#espectro",
        "Ente": "/fantasmas.html#ente",
        "Poltergeist": "/fantasmas.html#poltergeist",
        "Banshee": "/fantasmas.html#banshee",
        "Jinn": "/fantasmas.html#jinn",
        "Pesadilla": "/fantasmas.html#pesadilla",
        "Revenant": "/fantasmas.html#revenant",
        "Sombra": "/fantasmas.html#sombra",
        "Demonio": "/fantasmas.html#demonio",
        "Yurei": "/fantasmas.html#yurei",
        "Oni": "/fantasmas.html#oni",
        "Yokai": "/fantasmas.html#yokai",
        "Hantu": "/fantasmas.html#hantu",
        "Goryo": "/fantasmas.html#goryo",
        "Myling": "/fantasmas.html#myling",
        "Onryo": "/fantasmas.html#onryo",
        "Gemelos": "/fantasmas.html#gemelos",
        "Raiju": "/fantasmas.html#raiju",
        "Obake": "/fantasmas.html#obake",
        "Mímico": "/fantasmas.html#mimico",
        "Moroi": "/fantasmas.html#moroi",
        "Deogen": "/fantasmas.html#deogen",
        "Thaye": "/fantasmas.html#thaye"
    };

    let evidenciaSeleccionada = []; // Lista de evidencias confirmadas
    let evidenciaDescartada = []; // Lista de evidencias descartadas

    // Mostrar todos los fantasmas posibles al cargar la página
    mostrarFantasmasPosibles(Object.keys(evidenciaFantasmas));

    // Añade evento de click a cada imagen
    imagenes_pruebas.forEach(imagen => {
        imagen.addEventListener('click', function () {
            const tipoEvidencia = imagen.alt;

            // Determinar estado actual
            if (!evidenciaSeleccionada.includes(tipoEvidencia) && !evidenciaDescartada.includes(tipoEvidencia)) {
                // Si no está seleccionada ni descartada: confirmarla (verde)
                imagen.style.filter = 'drop-shadow(10px 10px 10px rgba(80, 129, 32, 0.8))';
                evidenciaSeleccionada.push(tipoEvidencia);
            } else if (evidenciaSeleccionada.includes(tipoEvidencia)) {
                // Si está confirmada, descartarla (rojo)
                imagen.style.filter = 'drop-shadow(10px 10px 10px rgba(170, 32, 32, 0.8))';
                evidenciaSeleccionada = evidenciaSeleccionada.filter(ev => ev !== tipoEvidencia);
                evidenciaDescartada.push(tipoEvidencia);
            } else if (evidenciaDescartada.includes(tipoEvidencia)) {
                // Si está descartada, resetearla (negro)
                imagen.style.filter = 'drop-shadow(3px 3px 5px black)';
                evidenciaDescartada = evidenciaDescartada.filter(ev => ev !== tipoEvidencia);
            }

            const fantasmasPosibles = deducirFantasmasPosibles(evidenciaSeleccionada, evidenciaDescartada, evidenciaFantasmas);

            mostrarFantasmasPosibles(fantasmasPosibles);
        });
    });

    function deducirFantasmasPosibles(evidencia, descartada, datosFantasmas) {
        return Object.keys(datosFantasmas).filter(fantasma => {
            const contieneEvidencias = evidencia.every(ev => datosFantasmas[fantasma].includes(ev));
            const noContieneDescartadas = !descartada.some(ev => datosFantasmas[fantasma].includes(ev));
            return contieneEvidencias && noContieneDescartadas;
        });
    }

    function mostrarFantasmasPosibles(fantasmasPosibles) {
        possibleGhostsDiv.innerHTML = ''; // Limpiar el contenedor

        if (fantasmasPosibles.length === 0) {
            possibleGhostsDiv.textContent = 'Ninguno'; // Mostrar 'Ninguno' si no hay fantasmas
        } else {
            // Crear una cadena con los nombres como enlaces separados por comas
            const links = fantasmasPosibles.map(fantasma => {
                return `<a href="${links_fantasmas[fantasma]}"">${fantasma}</a>`;
            }).join(', ');

            // Insertar los enlaces como contenido HTML del contenedor
            possibleGhostsDiv.innerHTML = links;
        }
    }
});