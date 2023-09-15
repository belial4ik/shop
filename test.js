const classCard = document.querySelector('.cards');
const basketCount = document.getElementById('basket-count');
const basketSum = document.getElementById('sum');

let getItemFromStorage = JSON.parse(localStorage.getItem('products'))

basketCount.innerText = getItemFromStorage === null ? [].length : getItemFromStorage.flat().length

function loadContent() {
  const products = getItemFromStorage === null ? [] : getItemFromStorage.flat()

  const sumCountVar = countSum(products)
  // const sumCountVar = products.flat().reduce((a,b) => a + b)

  for (let i = 0; i < products.length; i++) {
    let cardItem = document.createElement('div')
    let cardImage = document.createElement('div')
    let descriptionCard = document.createElement('div')
    let cardName = document.createElement('p')
    let cardPrice = document.createElement('p')
    removeButton = document.createElement('button')
    cardItem.classList.add('card-item')
    cardImage.classList.add('image')
    descriptionCard.classList.add('description-card')
    cardName.classList.add('card-name')
    cardPrice.classList.add('card-price')
    cardItem.appendChild(cardImage)
    cardItem.appendChild(descriptionCard)
    descriptionCard.appendChild(cardName)
    descriptionCard.appendChild(cardPrice)
    descriptionCard.appendChild(removeButton)
    basketSum.textContent = sumCountVar.toFixed(2)
    removeButton.textContent = 'remove'
    cardImage.style.background = `url(${products[i].image})`
    cardImage.style.backgroundPosition = 'center'
    cardImage.style.backgroundSize = 'contain'
    cardImage.style.backgroundRepeat = 'no-repeat'
    cardName.textContent = products[i].title
    cardPrice.textContent = 'Price : ' + products[i].price;
    removeButton.id = products[i].id
    classCard.appendChild(cardItem)

    removeButton.addEventListener('click', function (id) {
      const res = products.filter(el => el.id != id.srcElement.id)
      localStorage.setItem('products', JSON.stringify(res))
      setTimeout(() => location.reload(), 300)
    })

  }
}

function countSum(arr) {
  let res = [];
  for (let i = 0; i < arr.length; i++) {
    res.push(arr[i].price)
  }
  if(res.length > 0) {
    return res.reduce((a, b) => a + b)
  } else {
    return 0
  }
}

loadContent();