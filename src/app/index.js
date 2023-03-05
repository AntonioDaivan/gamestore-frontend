function createCard({ image, title, price }) {
  const card = document.createElement('div')
  const cardImage = document.createElement('img')
  const cardDescription = document.createElement('div')
  const cardTitle = document.createElement('p')
  const cardPrice = document.createElement('p')
  const cardButton = document.createElement('button')

  card.classList.add('card')
  cardDescription.classList.add('game-infos')
  cardTitle.classList.add('game-title')
  cardPrice.classList.add('game-price')
  cardImage.classList.add('img-game')
  cardButton.classList.add('btn-buy')

  cardTitle.textContent = title
  cardPrice.textContent = convertToReal(price)
  cardButton.textContent = 'Comprar agora'
  cardImage.setAttribute('src', image)

  card.appendChild(cardImage)
  cardDescription.appendChild(cardTitle)
  cardDescription.appendChild(cardPrice)
  cardDescription.appendChild(cardButton)
  card.appendChild(cardDescription)

  return card
}

function convertToReal(valor) {
  return `R$ ${parseFloat(valor).toFixed(2).replace('.', ',')}`
}

async function insertGamesIntoHTML(url){
  try{
    const cardContainer = document.querySelector('.card-container')
    const { data } = await axios.get(url)
    for( const game of data.games){
      cardContainer.appendChild(createCard(game))
    }
  }
  catch(e){
    console.error(e)
  }
}

async function insertNewGameIntoDatabase(url, data) {
  try {
    const response = await axios.post(url, data)
  } catch (error) {
    console.error(error)
  }
}

function clearFieldsAndReloadPage(url, title, genres, price) {
  url.value = ""
  title.value = ""
  genres.value = ""
  price.value = ""
  window.location.reload()
}

function getValuesAndSaveNewGame(event) {
  event.preventDefault()

  const urlEl = document.getElementById('url')
  const titleEl = document.getElementById('title')
  const genresEl = document.getElementById('genres')
  const priceEl = document.getElementById('price')

  const data = {
    image: urlEl.value,
    title: titleEl.value,
    genres: genresEl.value.split(" "),
    price: parseFloat(priceEl.value)
  }

  insertNewGameIntoDatabase("http://localhost:3000/api/game", data)
  clearFieldsAndReloadPage(urlEl, titleEl, genresEl, priceEl)
}

function main() {
  const formEl = document.querySelector('.form')
  formEl.addEventListener('submit', getValuesAndSaveNewGame)
  insertGamesIntoHTML('http://localhost:3000/api/games')
}

main()