const nav = document.querySelector('nav');
const main = document.querySelector('main');

const videos = [
    ['/recursos/videos/video_espectro.mp4', '/recursos/videos/emf2.mp4', '/recursos/videos/video_espectro.mp4', '/recursos/videos/video_espectro.mp4', '/recursos/videos/emf2.mp4', '/recursos/videos/video_espectro.mp4', '/recursos/videos/emf2.mp4', '/recursos/videos/video_espectro.mp4'],
    ['/recursos/videos/video_huellas1.mp4', '/recursos/videos/huellas2.mp4', '/recursos/videos/huellas3.mp4'],
    ['/recursos/videos/esc1.mp4', '/recursos/videos/esc2.mp4']
];

const pruebaDescriptions = [
    ["Descripción EMF Nivel 1", "Holiholiholi", "Descripción EMF Nivel 3", "Descripción EMF Nivel 1", "Holiholiholi", "Descripción EMF Nivel 3", "Descripción EMF Nivel 1", "Descripción EMF Nivel 3"],
    ["Descripción UV Nivel 1", "Descripción UV Nivel 2", "Descripción UV Nivel 3"],
    ["Descripción Escritura Nivel 1", "Descripción Escritura Nivel 2"]
];

function abrirpopup(galeria, indice) {
    const popupId = `popup${galeria * 3 + indice}`;
    let popup = document.getElementById(popupId);
    if (!popup) {
        popup = document.createElement('div');
        popup.className = 'popup';
        popup.id = popupId;
        popup.innerHTML = `
            <video src="${videos[galeria][indice]}" controls="false" autoplay loop></video>
            <div class="descripcion_video">
                <h3>Prueba ${galeria + 1} Nivel ${indice + 1}:</h3>
                <p>${pruebaDescriptions[galeria][indice]}</p>
            </div>
        `;
        document.getElementById('popups').appendChild(popup);
    }
    popup.classList.add("active"); // Use add instead of toggle for more predictable behavior
    // play video when popup opens
    popup.querySelector('video').play();

    nav.style.filter = 'brightness(0.2)';
    main.style.filter = 'brightness(0.2)';
}

window.addEventListener("click", function (event) {
    if (!event.target.closest('.gallery img')) {
        for (let i = 0; i < videos.length; i++) {
            for (let j = 0; j < 3; j++) {
                const popupId = `popup${i * 3 + j}`;
                const popup = document.getElementById(popupId);
                if (popup && !popup.contains(event.target)) {
                    popup.classList.remove("active");
                    // pause video when popup closes
                    popup.querySelector('video').pause();

                    document.getElementById(popupId).remove();

                    nav.style.filter = 'brightness(1)';
                    main.style.filter = 'brightness(1)';
                }
            }
        }
    }
});