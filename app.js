const classCard = document.querySelector('.cards');
const basketElement = document.querySelector('#basket');
const sortingBtn = document.querySelector('#sorting');
const sortingCheckbox = document.querySelector('#sort-by');

let getItemFromStorage = JSON.parse(localStorage.getItem('products'))
let basket = getItemFromStorage === null ? [] : getItemFromStorage.flat();



async function loadContent() {
  const response = await fetch("https://fakestoreapi.com/products");
  let products = await response.json()

  for (let i = 0; i < products.length; i++) {
    let cardItem = document.createElement('div')
    let cardImage = document.createElement('div')
    let descriptionCard = document.createElement('div')
    let cardName = document.createElement('p')
    let cardPrice = document.createElement('p')
    addButton = document.createElement('button')
    cardItem.classList.add('card-item')
    cardImage.classList.add('image')
    descriptionCard.classList.add('description-card')
    cardName.classList.add('card-name')
    cardPrice.classList.add('card-price')
    cardItem.appendChild(cardImage)
    cardItem.appendChild(descriptionCard)
    descriptionCard.appendChild(cardName)
    descriptionCard.appendChild(cardPrice)
    descriptionCard.appendChild(addButton)
    addButton.textContent = 'add to basket'
    cardImage.style.background = `url(${products[i].image})`
    cardImage.style.backgroundPosition = 'center'
    cardImage.style.backgroundSize = 'contain'
    cardImage.style.backgroundRepeat = 'no-repeat'
    cardName.textContent = products[i].title
    cardPrice.textContent = 'Price : ' + products[i].price;
    addButton.id = products[i].id
    classCard.appendChild(cardItem)

    //Add to basket button
    addButton.addEventListener('click', function (id) {
      basket.push(products.filter(el => el.id == id.srcElement.id))
      localStorage.setItem('products', JSON.stringify(basket))
      setTimeout(() => {
        basketElement.textContent = basket.length
      }, 500)
    });
    sortingBtn.addEventListener('click', function () {
      if (sortingCheckbox.value === 'low-price') {
        let res = products.sort((a,b) => a.price - b.price)
        console.log(res, 'DEFAULT');
      }else {
        console.log(products, 'SORTED');
      }
    })
  }
  
}

basketElement.textContent = basket.length

loadContent()