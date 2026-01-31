// --- PARTE 1: EL RELOJ Y LA FECHA (FORMATO GIGANTE) ---
function actualizarReloj() {
    const ahora = new Date();

    // 1. Hora y Minutos
    let horas = ahora.getHours();
    const minutos = String(ahora.getMinutes()).padStart(2, '0');
    
    // Formato 12 horas (AM/PM)
    const ampm = horas >= 12 ? 'PM' : 'AM';
    horas = horas % 12;
    horas = horas ? horas : 12; // Si es 0, poner 12

    // 2. Fecha
    const dias = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    const meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    
    const diaSemana = dias[ahora.getDay()];
    const diaNumero = ahora.getDate();
    const mesNombre = meses[ahora.getMonth()];

    // 3. Generar HTML con clases GIGANTES
    const htmlReloj = `
        <div style="line-height: 1;">
            <span class="hora-gigante">${horas}:${minutos}</span>
            <span style="font-size: 2rem; color: #ffd700;">${ampm}</span>
        </div>
        <div class="fecha-grande">
            ${diaSemana}, ${diaNumero} de ${mesNombre}
        </div>
    `;

    document.getElementById('reloj').innerHTML = htmlReloj;
}

setInterval(actualizarReloj, 1000);
actualizarReloj();


// --- PARTE 2: EL CLIMA ---
function obtenerIconoWMO(codigo) {
    let icono = 'day.svg'; 
    switch (codigo) {
        case 0: return '☀️'; 
        case 1: case 2: case 3: return '⛅'; 
        case 45: case 48: return '🌫️'; 
        case 51: case 53: case 55: return '🌧️'; 
        case 61: case 63: case 65: return '☔'; 
        case 80: case 81: case 82: return '🌦️'; 
        case 95: case 96: case 99: return '⛈️'; 
        default: return '🌡️';
    }
    const baseUrl = 'https://raw.githubusercontent.com/basmilius/weather-icons/master/production/fill/svg/';
    return `<img src="${baseUrl}${icono}" alt="Icono clima">`;
}

async function obtenerClima() {
    // Coordenadas: Las Arenas
    const lat = 19.8577761;
    const lon = -99.865033;
    const nombreCiudad = "Las Arenas"; 

    try {
        const respuesta = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`);
        const datos = await respuesta.json();
        
        const temperatura = Math.round(datos.current_weather.temperature);
        const codigoClima = datos.current_weather.weathercode;

        document.getElementById('clima-icono').innerHTML = obtenerIconoWMO(codigoClima);
        document.getElementById('temperatura').innerHTML = `${temperatura}°`;
        document.getElementById('ubicacion').innerText = nombreCiudad;
        
    } catch (error) {
        console.error("Error clima:", error);
    }
}

obtenerClima();
setInterval(obtenerClima, 3600000); // Cada 1 hora


// --- PARTE 3: EL CARRUSEL SECUENCIAL ---

// OJO: ORDENA AQUÍ TU LISTA (VIDEO, IMAGEN, VIDEO, IMAGEN...)
const playlist = [
    { type: 'video', src: 'Calendario/Videos/1(1).mp4' },
    { type: 'image', src: 'Calendario/Recuerdos/1.png' }, 
    { type: 'image', src: 'Calendario/Recuerdos/z2.jpg' },
    { type: 'video', src: 'Calendario/Videos/1(2).mp4' }, 
    { type: 'image', src: 'Calendario/Recuerdos/2.png' },
    { type: 'image', src: 'Calendario/Recuerdos/z3.jpg' },
    { type: 'video', src: 'Calendario/Videos/1(3).mp4' }, 
    { type: 'image', src: 'Calendario/Recuerdos/3.png' },
    { type: 'image', src: 'Calendario/Recuerdos/z4.jpg' },
    { type: 'video', src: 'Calendario/Videos/1(4).mp4' }, 
    { type: 'image', src: 'Calendario/Recuerdos/4.png' },
    { type: 'image', src: 'Calendario/Recuerdos/z5.jpg' },
    { type: 'video', src: 'Calendario/Videos/1(5).mp4' }, 
    { type: 'image', src: 'Calendario/Recuerdos/5.png' },
    { type: 'image', src: 'Calendario/Recuerdos/z6.jpg' },
    { type: 'video', src: 'Calendario/Videos/1(6).mp4' }, 
    { type: 'image', src: 'Calendario/Recuerdos/6.png' },
    { type: 'image', src: 'Calendario/Recuerdos/z7.jpg' },
    { type: 'video', src: 'Calendario/Videos/1(7).mp4' }, 
    { type: 'image', src: 'Calendario/Recuerdos/7.png' },
    { type: 'image', src: 'Calendario/Recuerdos/z8.jpg' },
    { type: 'video', src: 'Calendario/Videos/1(8).mp4' }, 
    { type: 'image', src: 'Calendario/Recuerdos/8.png' },
    { type: 'image', src: 'Calendario/Recuerdos/z9.jpg' },
    { type: 'video', src: 'Calendario/Videos/1(9).mp4' }, 
    { type: 'image', src: 'Calendario/Recuerdos/9.png' },
    { type: 'image', src: 'Calendario/Recuerdos/z10.jpg' },
    { type: 'video', src: 'Calendario/Videos/1(10).mp4' }, 
    { type: 'image', src: 'Calendario/Recuerdos/10.png' },
    { type: 'image', src: 'Calendario/Recuerdos/z11.jpg' },
    { type: 'video', src: 'Calendario/Videos/1(11).mp4' }, 
    { type: 'image', src: 'Calendario/Recuerdos/11.png' },
    { type: 'image', src: 'Calendario/Recuerdos/z12.jpg' },
    { type: 'video', src: 'Calendario/Videos/1(12).mp4' }, 
    { type: 'image', src: 'Calendario/Recuerdos/12.png' },
    { type: 'image', src: 'Calendario/Recuerdos/z13.jpg' },
    { type: 'video', src: 'Calendario/Videos/1(13).mp4' }, 
    { type: 'image', src: 'Calendario/Recuerdos/13.jpg' },
    { type: 'image', src: 'Calendario/Recuerdos/z14.jpg' },
    { type: 'video', src: 'Calendario/Videos/1(14).mp4' }, 
    { type: 'image', src: 'Calendario/Recuerdos/14.jpg' },
    { type: 'image', src: 'Calendario/Recuerdos/z15.jpg' },
    { type: 'video', src: 'Calendario/Videos/1(15).mp4' }, 
    { type: 'image', src: 'Calendario/Recuerdos/15.jpg' },
    { type: 'image', src: 'Calendario/Recuerdos/z1.jpg' },
    { type: 'video', src: 'Calendario/Videos/1(16).mp4' }, 
    { type: 'image', src: 'Calendario/Recuerdos/16.jpg' },
    { type: 'video', src: 'Calendario/Videos/1(17).mp4' }, 
    { type: 'image', src: 'Calendario/Recuerdos/a(7).jpg' },
    { type: 'video', src: 'Calendario/Videos/1(18).mp4' }, 
    { type: 'image', src: 'Calendario/Recuerdos/b(8).jpg' },
    { type: 'video', src: 'Calendario/Videos/1(19).mp4' }, 
    { type: 'image', src: 'Calendario/Recuerdos/c(33).jpg' },
    { type: 'video', src: 'Calendario/Videos/1(20).mp4' }, 
    { type: 'image', src: 'Calendario/Recuerdos/f(18).jpg' },
    { type: 'video', src: 'Calendario/Videos/1(21).mp4' }, 
    { type: 'image', src: 'Calendario/Recuerdos/f(29).jpg' },
    { type: 'video', src: 'Calendario/Videos/1(22).mp4' }, 
    { type: 'image', src: 'Calendario/Recuerdos/f(79).jpg' },
    { type: 'video', src: 'Calendario/Videos/0118a8f77fa31d5dac0c7a61525bc4b2.mp4' }, 
    { type: 'image', src: 'Calendario/Recuerdos/f(134).jpg' },
    { type: 'video', src: 'Calendario/Videos/d(6).mp4' }, 
    { type: 'image', src: 'Calendario/Recuerdos/f(142).jpg' },
    { type: 'video', src: 'Calendario/Videos/f(12).mp4' }, 
    { type: 'image', src: 'Calendario/Recuerdos/f(143).jpg' },
    { type: 'video', src: 'Calendario/Videos/FPV.mp4' }, 
    { type: 'image', src: 'Calendario/Recuerdos/FB_IMG_1669778965046.jpg' },
    { type: 'video', src: 'Calendario/Videos/tiktok1.mp4' }, 
    { type: 'image', src: 'Calendario/Recuerdos/IMG_20190223_225728891_PORTRAIT.jpg' },
    { type: 'video', src: 'Calendario/Videos/tiktok_nwm_7538058131285282070.mp4' }, 
    { type: 'image', src: 'Calendario/Recuerdos/IMG_20190401_173118902.jpg' },
    { type: 'image', src: 'Calendario/Recuerdos/z.jpg' },
    { type: 'video', src: 'Calendario/Videos/z21.mp4' }, 
];

let indiceActual = -1; 
const contenedorCarrusel = document.getElementById('carrusel');
const tiempoImagen = 10000; // 10 segundos para imágenes

function cargarSiguienteMedia() {
    contenedorCarrusel.innerHTML = '';
    
    // Seguridad: si la lista está vacía, no hacer nada
    if (playlist.length === 0) return;

    const item = playlist[indiceActual];

    if (item.type === 'image') {
        const nuevaImagen = document.createElement('img');
        nuevaImagen.src = item.src;
        contenedorCarrusel.appendChild(nuevaImagen);
        
        // La imagen dura un tiempo fijo
        setTimeout(avanzarIndice, tiempoImagen);

    } else if (item.type === 'video') {
        const nuevoVideo = document.createElement('video');
        nuevoVideo.src = item.src;
        nuevoVideo.autoplay = true; 
        nuevoVideo.muted = true;    
        
        // Estilos forzados para asegurar que se vea
        nuevoVideo.style.width = "100%";
        nuevoVideo.style.height = "100%";
        
        contenedorCarrusel.appendChild(nuevoVideo);

        // El video dura lo que tenga que durar
        nuevoVideo.onended = function() {
            avanzarIndice();
        };
        
        // Si el video falla, salta al siguiente
        nuevoVideo.onerror = function() {
            console.log("Error en video, saltando...");
            avanzarIndice();
        }
    }
}

// NUEVA FUNCIÓN: SECUENCIAL (1, 2, 3...)
function avanzarIndice() {
    // Simplemente sumamos 1 al índice
    indiceActual++;

    // Si llegamos al final de la lista, volvemos al principio (0)
    if (indiceActual >= playlist.length) {
        indiceActual = 0;
    }

    cargarSiguienteMedia();
}

// Iniciamos el carrusel
avanzarIndice();


// --- PARTE 4: FRASES ---
async function actualizarFrase() {
    const cajaFrase = document.getElementById('frase-dia');
    cajaFrase.innerHTML = '<span style="font-size:0.5em; color:gray">...</span>';

    try {
        const respuestaQuote = await fetch('https://dummyjson.com/quotes/random');
        const datosQuote = await respuestaQuote.json();
        
        const fraseIngles = datosQuote.quote;
        const autor = datosQuote.author;
        const urlTraduccion = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(fraseIngles)}&langpair=en|es`;
        
        const respuestaTrad = await fetch(urlTraduccion);
        const datosTrad = await respuestaTrad.json();
        const fraseEspanol = datosTrad.responseData.translatedText;

        cajaFrase.innerHTML = `
            "${fraseEspanol}"
            <br><br>
            <small style="color: #888; font-style: normal;">— ${autor}</small>
        `;

    } catch (error) {
        cajaFrase.innerHTML = '"El éxito es ir de fracaso en fracaso sin perder el entusiasmo."';
    }
}
actualizarFrase();
setInterval(actualizarFrase, 14400000);

