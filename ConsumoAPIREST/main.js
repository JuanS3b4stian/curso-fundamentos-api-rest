const API_URL_RANDOM = 'https://api.thecatapi.com/v1/images/search?limit=2&api_key=live_0y2Ocv0c6XnnSZkts2SDpe6RtmjS7mb4Jrl7ujYMF0EJznLk9yz0Yvy6tUIA6jVB';
const API_URL_FAVOURITES = 'https://api.thecatapi.com/v1/favourites?api_key=live_0y2Ocv0c6XnnSZkts2SDpe6RtmjS7mb4Jrl7ujYMF0EJznLk9yz0Yvy6tUIA6jVB';

const spanError = document.getElementById('error')

async function loadRandomMichis() {
  const res = await fetch(API_URL_RANDOM);
  const data = await res.json();
  console.log('Random')
  console.log(data)

  if (res.status !== 200) {
    spanError.innerHTML = "Hubo un error: " + res.status;
  } else {
    const img1 = document.getElementById('img1');
    const img2 = document.getElementById('img2');
    
    img1.src = data[0].url;
    img2.src = data[1].url;
  }
}

async function loadFavouriteMichis() {
  const res = await fetch(API_URL_FAVOURITES);
  const data = await res.json();
  console.log('Favoritos')
  console.log(data)

  if (res.status !== 200) {
    spanError.innerHTML = "Hubo un error: " + res.status + data.message;
  }
}

async function saveFavouriteMichis() {
  const res = await fetch(API_URL_FAVOURITES, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      image_id: 'dje'
    }),
  });
  const data = await res.json();

  console.log('Save')
  console.log(res)

  if (res.status !== 200) {
    spanError.innerHTML = "Hubo un error: " + res.status + data.message;
  }
}

loadRandomMichis();
loadFavouriteMichis();
