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
// init array 
let totalBasket = [];
let littleBasket = [];

// function to store item datas to display on the basket page 
function basket() {
    addBasket.addEventListener('click', function() {

        //init variables 
        let selectedColor = itemColors.options[itemColors.selectedIndex].text;
        let selectedQty = itemQuantity.value;

        // add little to totalBasket if not the same item  
        littleBasket = [id, selectedColor, selectedQty];
        if (totalBasket.length != 0) {
            for (i in totalBasket) {
                if (littleBasket[0] == totalBasket[i][0] && littleBasket[1] == totalBasket[i][1]) {
                    totalBasket[i][2] = parseInt(totalBasket[i][2]) + parseInt(littleBasket[2])
                } else {
                    totalBasket.push(littleBasket);
                }
            }
        } else {
            totalBasket.push(littleBasket);
        }

        // verif
        console.log(littleBasket);
        console.log(totalBasket)

    // add array to localStorage
        localStorage.setItem('Total', totalBasket);
        console.log(localStorage);
})}

// execution 
basket();





































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