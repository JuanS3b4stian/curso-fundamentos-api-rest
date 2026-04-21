// URLs de la API para obtener imágenes aleatorias y favoritos respectivamente
const API_URL_RANDOM = 'https://api.thecatapi.com/v1/images/search?limit=2&api_key=live_0y2Ocv0c6XnnSZkts2SDpe6RtmjS7mb4Jrl7ujYMF0EJznLk9yz0Yvy6tUIA6jVB';
const API_URL_FAVOURITES = 'https://api.thecatapi.com/v1/favourites?api_key=live_0y2Ocv0c6XnnSZkts2SDpe6RtmjS7mb4Jrl7ujYMF0EJznLk9yz0Yvy6tUIA6jVB';

// Según la Documentación de la API, para DELETE por ID, su URL tiene formato: /favourites/{favourite_id}
const API_URL_FAVOURITES_DELETE = (id) => `https://api.thecatapi.com/v1/favourites/${id}?api_key=live_0y2Ocv0c6XnnSZkts2SDpe6RtmjS7mb4Jrl7ujYMF0EJznLk9yz0Yvy6tUIA6jVB`;

// Referencia al elemento donde se mostrarán errores
const spanError = document.getElementById('error')

// Función para cargar imágenes aleatorias de gatos
async function loadRandomMichis() {
  const res = await fetch(API_URL_RANDOM); // Petición GET a la API
  const data = await res.json(); // Convertir respuesta a JSON ``

  console.log('Random')
  console.log(data)

  // Validación de error en la respuesta
  if (res.status !== 200) {
    spanError.innerHTML = "Hubo un error: " + res.status;
  } else {
    // Obtener referencias de las imágenes en el HTML
    const img1 = document.getElementById('img1');
    const img2 = document.getElementById('img2');
    const btn1 = document.getElementById('btn1');
    const btn2 = document.getElementById('btn2');

    // Asignar URLs de las imágenes obtenidas
    img1.src = data[0].url;
    img2.src = data[1].url;

    // Obtener las imágenes de gatos por su ID, así ya no enviamos (en POST) el id hardcodeado
    btn1.onclick = () => saveFavouriteMichi(data[0].id);
    btn2.onclick = () => saveFavouriteMichi(data[1].id);

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
  } else {

    const section = document.getElementById('favouriteMichis');

    // Borrar HTML para que no se carguen de nuevo los Michis
    section.innerHTML = "";

    // Volver a crear nuestro h2
    const h2 = document.createElement('h2');
    const h2Text = document.createTextNode('Michis Favoritos');
    h2.appendChild(h2Text);
    section.appendChild(h2);

    data.forEach((michi) => {

      // Manipulación del DOM, creando elementos y asignando valores a los mismos
      const article = document.createElement('article');
      const img = document.createElement('img');
      const btn = document.createElement('button');
      const btnText = document.createTextNode('Sacar al Michi de Favoritos');

      btn.appendChild(btnText);
      img.src = michi.image.url;
      img.width = 150;

      article.appendChild(img);
      article.appendChild(btn);

      section.appendChild(article);
      // Añadir al evento onclick, el llamado a la función para eliminar un michi por su ID
      btn.onclick = () => deleteFavouriteMichi(michi.id);

    })
  }
}

// Función para guardar un gato en favoritos
async function saveFavouriteMichi(id) {
  const res = await fetch(API_URL_FAVOURITES, {
    method: 'POST', // Método POST para enviar datos
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      image_id: id // ID de la imagen a guardar
    }),
  });
  const data = await res.json();

  console.log('Save')
  console.log(res)

  if (res.status !== 200) {
    spanError.innerHTML = "Hubo un error: " + res.status + data.message;
  } else {
    console.log("Michi Añadido en Favoritos");
    loadFavouriteMichis();
  }
}

// Método para eliminar un Michi
async function deleteFavouriteMichi(id){
  const res = await fetch(API_URL_FAVOURITES_DELETE(id), {
  method: 'DELETE' // Método DELETE para eliminar datos
});
  const data = await res.json();

  if (res.status !== 200) {
    spanError.innerHTML = "Hubo un error: " + res.status + data.message;
  } else {
    console.log("Michi Eliminado de Favoritos")
    console.log(res);
    loadFavouriteMichis();
  }
}

// Llamadas iniciales al cargar la página
loadRandomMichis();
loadFavouriteMichis();