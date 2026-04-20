// API KEY live_0y2Ocv0c6XnnSZkts2SDpe6RtmjS7mb4Jrl7ujYMF0EJznLk9yz0Yvy6tUIA6jVB

// Quert Parameters que se pueden usar según la documentación de la api de gatitos
const API_URL = 'https://api.thecatapi.com/v1/images/search?limit=3&api_key=live_0y2Ocv0c6XnnSZkts2SDpe6RtmjS7mb4Jrl7ujYMF0EJznLk9yz0Yvy6tUIA6jVB';

// Función encapsulada que está a la espera de ser llamada
async function reload(){
  const res = await fetch(API_URL);
  const data = await res.json();

  console.log(data);

  // Llamar a cada imagen según el ID asignado
  const img1 = document.getElementById('img1');
  const img2 = document.getElementById('img2');
  const img3 = document.getElementById('img3');
  img1.src = data[0].url;
  img2.src = data[1].url;
  img3.src = data[2].url;
}

// Llamar a la función al cargar la página
reload();