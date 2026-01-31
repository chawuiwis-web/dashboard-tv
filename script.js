// --- PARTE 1: EL RELOJ Y LA FECHA ---
function actualizarReloj() {
    const ahora = new Date(); // Obtenemos la fecha y hora actual

    // Extraemos horas y minutos
    const horas = ahora.getHours().toString().padStart(2, '0');
    const minutos = ahora.getMinutes().toString().padStart(2, '0');
    
    // Extraemos día, número y mes
    const opcionesFecha = { weekday: 'long', day: 'numeric', month: 'long' };
    const fechaTexto = ahora.toLocaleDateString('es-ES', opcionesFecha);

    // INYECTAMOS LA INFO EN EL HTML
    // Buscamos la caja del reloj y cambiamos su texto
    const cajaReloj = document.getElementById('reloj');
    // Usamos `innerHTML` para poner la hora y un salto de línea para la fecha
    cajaReloj.innerHTML = `${horas}:${minutos}<br><span style="font-size:0.6em">${fechaTexto}</span>`;
}

// Hacemos que la función `actualizarReloj` se ejecute cada 1000 milisegundos (1 segundo)
setInterval(actualizarReloj, 1000);
// La ejecutamos una vez al inicio para que no tarde 1 segundo en aparecer
actualizarReloj();



// --- PARTE 2: EL CLIMA ---

// Funcion para obtener icono del clima
function obtenerIconoWMO(codigo) {
    let icono = 'day.svg'; // Icono por defecto (sol)

    // Mapeo básico de códigos WMO
    // https://open-meteo.com/en/docs#weathervariabledocumentation
    switch (codigo) {
        case 0: return '☀️'; // Despejado
        case 1: case 2: case 3: return '⛅'; // Nublado parcial
        case 45: case 48: return '🌫️'; // Niebla
        case 51: case 53: case 55: return '🌧️'; // Llovizna
        case 61: case 63: case 65: return '☔'; // Lluvia fuerte
        case 80: case 81: case 82: return '🌦️'; // Chubascos
        case 95: case 96: case 99: return '⛈️'; // Tormenta
        default: return '🌡️';
    }
    
    // Base URL de los iconos (usamos una librería gratuita de GitHub)
    const baseUrl = 'https://raw.githubusercontent.com/basmilius/weather-icons/master/production/fill/svg/';
    return `<img src="${baseUrl}${icono}" alt="Icono clima">`;
}


async function obtenerClima() {
    // Coordenadas de ejemplo (Ciudad de México). 
    // TAREA: Busca "coordenadas [tu ciudad]" en Google y cámbialas aquí.
    const lat = 19.8577761;
    const lon = -99.865033;
    const nombreCiudad = "San Bartolo el Arenal, Atlacomulco, México"
    try {
        // Hacemos la petición a la API de Open-Meteo
        const respuesta = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`);
        const datos = await respuesta.json();
        
        // Extraemos la temperatura
        const temperatura = Math.round(datos.current_weather.temperature);
        const codigoClima = datos.current_weather.weathercode;

        // Escribimos en el HTML
        // 1. El icono
        document.getElementById('clima-icono').innerHTML = obtenerIconoWMO(codigoClima);
        // 2. La temperatura
        document.getElementById('temperatura').innerHTML = `${temperatura}°C`;
        // 3. La ciudad
        document.getElementById('ubicacion').innerText = nombreCiudad;
        
    } catch (error) {
        console.error("Error al obtener clima:", error);
        document.getElementById('ubicacion').innerText = "Error clima";
    }
}

// Llamamos al clima al arrancar
obtenerClima();
// Y lo actualizamos cada 1 hora (3600000 milisegundos)
setInterval(obtenerClima, 3600000);

// --- PARTE 3: EL CARRUSEL MIXTO (FOTOS Y VIDEO) ---
// 1. La lista de reproducción (Playlist)
// Definimos qué archivos vamos a mostrar y qué tipo son.
const playlist = [
    { type: 'video', src: 'Calendario/Videos/1(1).mp4' }, 
    { type: 'video', src: 'Calendario/Videos/1(2).mp4' }, 
    { type: 'video', src: 'Calendario/Videos/1(3).mp4' }, 
    { type: 'video', src: 'Calendario/Videos/1(4).mp4' }, 
    { type: 'video', src: 'Calendario/Videos/1(5).mp4' }, 
    { type: 'video', src: 'Calendario/Videos/1(6).mp4' }, 
    { type: 'video', src: 'Calendario/Videos/1(7).mp4' }, 
    { type: 'video', src: 'Calendario/Videos/1(8).mp4' }, 
    { type: 'video', src: 'Calendario/Videos/1(9).mp4' }, 
    { type: 'video', src: 'Calendario/Videos/1(10).mp4' }, 
    { type: 'video', src: 'Calendario/Videos/1(11).mp4' }, 
    { type: 'video', src: 'Calendario/Videos/1(12).mp4' }, 
    { type: 'video', src: 'Calendario/Videos/1(13).mp4' }, 
    { type: 'video', src: 'Calendario/Videos/1(14).mp4' }, 
    { type: 'video', src: 'Calendario/Videos/1(15).mp4' }, 
    { type: 'video', src: 'Calendario/Videos/1(16).mp4' }, 
    { type: 'video', src: 'Calendario/Videos/1(17).mp4' }, 
    { type: 'video', src: 'Calendario/Videos/1(18).mp4' }, 
    { type: 'video', src: 'Calendario/Videos/1(19).mp4' }, 
    { type: 'video', src: 'Calendario/Videos/1(20).mp4' }, 
    { type: 'video', src: 'Calendario/Videos/1(21).mp4' }, 
    { type: 'video', src: 'Calendario/Videos/1(22).mp4' }, 
    { type: 'video', src: 'Calendario/Videos/0118a8f77fa31d5dac0c7a61525bc4b2.mp4' }, 
    { type: 'video', src: 'Calendario/Videos/d(6).mp4' }, 
    { type: 'video', src: 'Calendario/Videos/f(12).mp4' }, 
    { type: 'video', src: 'Calendario/Videos/FPV.mp4' }, 
    { type: 'video', src: 'Calendario/Videos/tiktok1.mp4' }, 
    { type: 'video', src: 'Calendario/Videos/tiktok_nwm_7538058131285282070.mp4' }, 
    { type: 'image', src: 'Calendario/Recuerdos/1.png' },
    { type: 'image', src: 'Calendario/Recuerdos/2.png' },
    { type: 'image', src: 'Calendario/Recuerdos/3.png' },
    { type: 'image', src: 'Calendario/Recuerdos/4.png' },
    { type: 'image', src: 'Calendario/Recuerdos/5.png' },
    { type: 'image', src: 'Calendario/Recuerdos/6.png' },
    { type: 'image', src: 'Calendario/Recuerdos/7.png' },
    { type: 'image', src: 'Calendario/Recuerdos/8.png' },
    { type: 'image', src: 'Calendario/Recuerdos/9.png' },
    { type: 'image', src: 'Calendario/Recuerdos/10.png' },
    { type: 'image', src: 'Calendario/Recuerdos/11.png' },
    { type: 'image', src: 'Calendario/Recuerdos/12.png' },
    { type: 'image', src: 'Calendario/Recuerdos/13.jpg' },
    { type: 'image', src: 'Calendario/Recuerdos/14.jpg' },
    { type: 'image', src: 'Calendario/Recuerdos/15.jpg' },
    { type: 'image', src: 'Calendario/Recuerdos/16.jpg' },
    { type: 'image', src: 'Calendario/Recuerdos/a(7).jpg' },
    { type: 'image', src: 'Calendario/Recuerdos/b(8).jpg' },
    { type: 'image', src: 'Calendario/Recuerdos/c(33).jpg' },
    { type: 'image', src: 'Calendario/Recuerdos/f(18).jpg' },
    { type: 'image', src: 'Calendario/Recuerdos/f(29).jpg' },
    { type: 'image', src: 'Calendario/Recuerdos/f(79).jpg' },
    { type: 'image', src: 'Calendario/Recuerdos/f(134).jpg' },
    { type: 'image', src: 'Calendario/Recuerdos/f(142).jpg' },
    { type: 'image', src: 'Calendario/Recuerdos/f(143).jpg' },
    { type: 'image', src: 'Calendario/Recuerdos/FB_IMG_1669778965046.jpg' },
    { type: 'image', src: 'Calendario/Recuerdos/IMG_20190223_225728891_PORTRAIT.jpg' },
    { type: 'image', src: 'Calendario/Recuerdos/IMG_20190401_173118902.jpg' },
    { type: 'image', src: 'Calendario/Recuerdos/z.jpg' },
    { type: 'image', src: 'Calendario/Recuerdos/z2.png' },
    { type: 'image', src: 'Calendario/Recuerdos/z3.png' },
    { type: 'image', src: 'Calendario/Recuerdos/z4.png' },
    { type: 'image', src: 'Calendario/Recuerdos/z5.png' },
    { type: 'image', src: 'Calendario/Recuerdos/z6.png' },
    { type: 'image', src: 'Calendario/Recuerdos/z7.png' },
    { type: 'image', src: 'Calendario/Recuerdos/z8.png' },
    { type: 'image', src: 'Calendario/Recuerdos/z9.png' },
    { type: 'image', src: 'Calendario/Recuerdos/z10.png' },
    { type: 'image', src: 'Calendario/Recuerdos/z11.png' },
    { type: 'image', src: 'Calendario/Recuerdos/z12.png' },
    { type: 'image', src: 'Calendario/Recuerdos/z13.jpg' },
    { type: 'image', src: 'Calendario/Recuerdos/z14.jpg' },
    { type: 'image', src: 'Calendario/Recuerdos/z15.jpg' },
    { type: 'image', src: 'Calendario/Recuerdos/z1.jpg' },

];

let indiceActual = -1; // Controla en qué posición de la lista estamos (empieza en 0)
const contenedorCarrusel = document.getElementById('carrusel');
const tiempoImagen = 10000; // 8 segundos para cada imagen (en milisegundos)

// Función principal que carga el contenido
function cargarSiguienteMedia() {
    // Limpiamos lo que haya antes en la caja
    contenedorCarrusel.innerHTML = '';

    // Obtenemos el ítem que toca ahora
    const item = playlist[indiceActual];

    // --- LÓGICA DE DECISIÓN ---
    if (item.type === 'image') {
        // SI ES IMAGEN:
        console.log("Mostrando imagen...");
        // 1. Creamos una etiqueta <img> en memoria
        const nuevaImagen = document.createElement('img');
        // 2. Le asignamos la ruta (src)
        nuevaImagen.src = item.src;
        // 3. La metemos en la caja visible
        contenedorCarrusel.appendChild(nuevaImagen);

        // 4. Programamos el siguiente cambio después de X segundos
        setTimeout(avanzarIndice, tiempoImagen);

    } else if (item.type === 'video') {
        // SI ES VIDEO:
        console.log("Mostrando video...");
        // 1. Creamos una etiqueta <video> en memoria
        const nuevoVideo = document.createElement('video');
        nuevoVideo.src = item.src;
        nuevoVideo.autoplay = true; // Que arranque solo
        nuevoVideo.muted = true;    // Importante: Los navegadores bloquean autoplay si tiene sonido
        
        // 2. La metemos en la caja
        contenedorCarrusel.appendChild(nuevoVideo);

        // Cuando el video avise "ya terminé", ejecutamos avanzarIndice.
        nuevoVideo.onended = function() {
            console.log("Video terminado.");
            avanzarIndice();
        };
    }
}

// Función ayudante para calcular cuál es el siguiente número
function avanzarIndice() {
    // Seguridad: Si la lista está vacía o tiene solo 1 elemento, no hay nada que barajar
    if (playlist.length <= 1) {
        indiceActual = 0;
    } else {
        // EL DADO INTELIGENTE
        let nuevoIndice;
        
        // Bucle "Do... While" (Hacer... Mientras)
        // Traducción: "Elige un número al azar. Si es igual al anterior, elige otro".
        do {
            nuevoIndice = Math.floor(Math.random() * playlist.length);
        } while (nuevoIndice === indiceActual);
        
        indiceActual = nuevoIndice;
    }

    // Llamamos a la función principal para mostrar el nuevo ítem ganador
    cargarSiguienteMedia();
}
// --- ARRANCAMOS EL CARRUSEL ---
// Iniciamos el proceso una vez al cargar la página
avanzarIndice();


// --- PARTE 4 AVANZADA: FRASES EXTERNAS TRADUCIDAS ---

async function actualizarFrase() {
    const cajaFrase = document.getElementById('frase-dia');
    
    // Ponemos un texto de "Cargando..." mientras esperamos a internet
    cajaFrase.innerHTML = '<span style="font-size:0.5em; color:gray">Buscando inspiración...</span>';

    try {
        // PASO 1: Conseguir la frase en INGLÉS
        // Usamos dummyjson que es muy rápida y gratuita
        const respuestaQuote = await fetch('https://dummyjson.com/quotes/random');
        const datosQuote = await respuestaQuote.json();
        
        const fraseIngles = datosQuote.quote;
        const autor = datosQuote.author;

        console.log("Original:", fraseIngles); // Para que lo veas en la consola

        // PASO 2: Traducir al ESPAÑOL
        // MyMemory API: langpair=en|es (De Inglés a Español)
        // encodeURIComponent asegura que los espacios y símbolos viajen bien por la URL
        const urlTraduccion = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(fraseIngles)}&langpair=en|es`;
        
        const respuestaTrad = await fetch(urlTraduccion);
        const datosTrad = await respuestaTrad.json();

        // MyMemory a veces devuelve la traducción en 'responseData.translatedText'
        const fraseEspanol = datosTrad.responseData.translatedText;

        // PASO 3: Mostrar en pantalla
        cajaFrase.innerHTML = `
            "${fraseEspanol}"
            <br><br>
            <small style="color: #888; font-style: normal;">— ${autor}</small>
        `;

    } catch (error) {
        console.error("Falló la inspiración:", error);
        // Si algo falla (internet, límite de API), mostramos una frase de respaldo
        cajaFrase.innerHTML = '"El éxito es ir de fracaso en fracaso sin perder el entusiasmo."<br><small>— Winston Churchill</small>';
    }
}

// Llamamos a la función al iniciar
actualizarFrase();

// Actualizar cada 4 horas
setInterval(actualizarFrase, 14400000);