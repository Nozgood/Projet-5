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
let totalBasket = [];

// function to store item datas to display on the basket page 

addBasket.addEventListener('click', function basket() {
    let selectedColor = itemColors.options[itemColors.selectedIndex].text;
    let selectedQty = itemQuantity.value;
    let product =  {
        'id' : id,
        'color' : selectedColor,
        'qty': selectedQty
    };
    if (totalBasket.length > 0) {
        let foundProductId = totalBasket.find(p => p.id == product.id)
        let foundProductColor = totalBasket.find(p => p.color == product.color)
        if (foundProductColor != undefined && foundProductId != undefined) {
            foundProductColor.qty = parseInt(product.qty) + parseInt(foundProductColor.qty);
        } else {
            totalBasket.push(product);
        }
    } else {
        totalBasket.push(product);
    }

    console.log(product);
    console.log(totalBasket);

    localStorage.setItem('basket', JSON.stringify(totalBasket));

    });






































// if datas needed
// fetch('http://localhost:3000/api/products/')
//     .then
//     (function (res) {
//         if (res.ok) {
//             return res.json();
//         }
//     })
//     .then
//     (function (value) {
//         console.log(value);
//     })