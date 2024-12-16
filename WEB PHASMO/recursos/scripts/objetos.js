const nav = document.querySelector('nav');
const main = document.querySelector('main');

const videos = [
    ['/recursos/videos/emf2.mp4'],
    ['/recursos/videos/video_espectro.mp4'],
    ['/recursos/videos/emf2.mp4'],
    ['/recursos/videos/emf2.mp4'],
    ['/recursos/videos/emf2.mp4'],
    ['/recursos/videos/emf2.mp4'],
    ['/recursos/videos/emf2.mp4']
];

const pruebaDescriptions = [
    ["Descripción Espirítu"],
    ["Descripción Espectro"],
    ["Descripción Ente"],
    ["Descripción Poltergeist"],
    ["Descripción Banshee"],
    ["Descripción Jinn"],
    ["Descripción Pesadilla"]
];

const fantasmas = [
    ["Espirítu"],
    ["Espectro"],
    ["Ente"],
    ["Poltergeist"],
    ["Banshee"],
    ["Jinn"],
    ["Pesadilla"]
];

function abrirpopup(galeria) {
    const popupId = `popup${galeria * 3}`;
    let popup = document.getElementById(popupId);
    if (!popup) {
        popup = document.createElement('div');
        popup.className = 'popup';
        popup.id = popupId;
        popup.innerHTML = `
            <video src="${videos[galeria]}" controls="false" autoplay loop></video>
            <div class="descripcion_video">
                <h3>Prueba ${fantasmas[galeria]}:</h3>
                <p>${pruebaDescriptions[galeria]}</p>
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
    if (!event.target.closest('.apartados img')) {
        for (let i = 0; i < videos.length; i++) {
            const popupId = `popup${i * 3}`;
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
});