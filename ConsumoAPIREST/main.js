// URLs de la API para obtener imágenes aleatorias y favoritos respectivamente
const API_URL_RANDOM = 'https://api.thecatapi.com/v1/images/search?limit=2&api_key=live_0y2Ocv0c6XnnSZkts2SDpe6RtmjS7mb4Jrl7ujYMF0EJznLk9yz0Yvy6tUIA6jVB';
const API_URL_FAVOURITES = 'https://api.thecatapi.com/v1/favourites?api_key=live_0y2Ocv0c6XnnSZkts2SDpe6RtmjS7mb4Jrl7ujYMF0EJznLk9yz0Yvy6tUIA6jVB';

// Referencia al elemento donde se mostrarán errores
const spanError = document.getElementById('error')

// Función para cargar imágenes aleatorias de gatos
async function loadRandomMichis() {
  const res = await fetch(API_URL_RANDOM); // Petición GET a la API
  const data = await res.json(); // Convertir respuesta a JSON

  console.log('Random')
  console.log(data)

  // Validación de error en la respuesta
  if (res.status !== 200) {
    spanError.innerHTML = "Hubo un error: " + res.status;
  } else {
    // Obtener referencias de las imágenes en el HTML
    const img1 = document.getElementById('img1');
    const img2 = document.getElementById('img2');
    
    // Asignar URLs de las imágenes obtenidas
    img1.src = data[0].url;
    img2.src = data[1].url;
  }
}

// Función para cargar gatos favoritos desde la API
async function loadFavouriteMichis() {
  const res = await fetch(API_URL_FAVOURITES); // Petición GET
  const data = await res.json(); // Convertir respuesta a JSON

  console.log('Favoritos')
  console.log(data)

  // Validación de error
  if (res.status !== 200) {
    spanError.innerHTML = "Hubo un error: " + res.status + data.message;
  }
}

// Función para guardar un gato en favoritos
async function saveFavouriteMichis() {
  const res = await fetch(API_URL_FAVOURITES, {
    method: 'POST', // Método POST para enviar datos
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      image_id: 'dje' // ID de la imagen a guardar
    }),
  });
  const data = await res.json();

  console.log('Save')
  console.log(res)

  if (res.status !== 200) {
    spanError.innerHTML = "Hubo un error: " + res.status + data.message;
  }
}

// Llamadas iniciales al cargar la página
loadRandomMichis();
loadFavouriteMichis();