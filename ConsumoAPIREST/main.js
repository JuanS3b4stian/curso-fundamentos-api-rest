const URL = 'https://api.thecatapi.com/v1/images/search';

// Función que obtiene un nuevo gato
async function obtenerGatito() {
  try {
    const res = await fetch(URL);

    if (!res.ok) {
      throw new Error('Error al traer gatito');
    }

    const data = await res.json();
    // Manipulación DOM
    const img = document.querySelector('img');
    // Asignar primer elemento del array de data
    img.src = data[0].url;

  } catch (error) {
    console.error(error);
  }
}

// Ejecutar al cargar la página
obtenerGatito();

// Evento del botón
const btn = document.getElementById('btnGato');
btn.addEventListener('click', obtenerGatito);