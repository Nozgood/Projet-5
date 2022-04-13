// init kanap variables
let title = document.querySelector('title');
let itemName = document.getElementById('title');
let itemImg = document.querySelector('article div img');
let itemPrice = document.getElementById('price');
let itemDesc = document.getElementById('description');
let itemColors = document.getElementById('colors');
let itemQuantity = document.getElementById('quantity')
let addBasket = document.getElementById('addToCart')

// id recup to display infos 
let url = new URL(window.location.href);
let id = url.searchParams.get('id');

// fetch function to do not repeat 
function fetchi() {
    fetch('http://localhost:3000/api/products/' + id)
    .then
    (function (res) {
        if (res.ok) {
            return res.json()
        }
    })
    .then
    (function(value) {
        title.innerHTML = value.name;
        itemName.innerHTML = value.name;
        itemImg.setAttribute('src', value.imageUrl)
        itemImg.setAttribute('alt', value.altTxt);
        itemPrice.innerHTML = value.price;
        itemDesc.innerHTML = value.description;
        for (i = 0; i < value.colors.length; i++) {
            let color = document.createElement('option');
            itemColors.appendChild(color);
            color.setAttribute('value', value.colors[i]);
            color.innerHTML = value.colors[i];
        }
    })
}
// display infos according to the id 
fetchi();

// add to basket 
// save the localstorage
function saveBasket(basket) {
    localStorage.setItem('basket', JSON.stringify(basket));
}

// get the localstorage
function getBasket() {
    let littleBasket = (localStorage.getItem('basket'));
    if (littleBasket == null) {
        return [];
    } else {
        return JSON.parse(littleBasket);
    }
}

// add a product to the localstorage
function pushBasket(product) {
    let basket = getBasket();

    if (basket.length > 0) {
        let foundProductId = basket.find(p => p.id == product.id)
        let foundProductColor = basket.find(p => p.color == product.color)

        if (foundProductColor != undefined && foundProductId != undefined) {
            foundProductColor.qty = parseInt(product.qty) + parseInt(foundProductColor.qty);
        } else {
            basket.push(product);
        }
    } else {
        basket.push(product);
    }
    saveBasket(basket);
}

// add to basket when user click 
addBasket.addEventListener('click', function basket() {
    let selectedColor = itemColors.options[itemColors.selectedIndex].text;
    let selectedQty = itemQuantity.value;
    let product =  {
        'id' : id,
        'color' : selectedColor,
        'qty': selectedQty
    };

    pushBasket(product);
});
