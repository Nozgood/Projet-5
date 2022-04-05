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



///////////////////////////////////////////////////////////////





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

        // total Basket 
        littleBasket = [id, selectedColor, selectedQty];

        totalBasket.push(littleBasket);
        console.log(littleBasket);
        console.log(totalBasket)
        if (totalBasket.length >= 2) {
            for (i in totalBasket) {
                if (totalBasket[i][0] == totalBasket[totalBasket.length - 1][0] && totalBasket[i][1] == totalBasket[totalBasket.length - 1][1]) {
                    totalBasket[i][2] = parseInt(totalBasket[i][2]) + parseInt(totalBasket[totalBasket.length - 1][2]);
                    totalBasket.pop();
            } else {
                console.log('hello');
            }
        }
    }
    // add array to localStorage
        localStorage.setItem('Total', totalBasket);
        console.log(localStorage);
})}

basket();


// il va falloir maintenant créer un nouveau tableau si id différent et incrémenter si id pareil quand j'ajoute un item au basket 
// de plus de nas oublier de bien vérifier qu'une couleur a été sélect et un quantité également

// if (totalBasket[i][0] == totalBasket[totalBasket.length - 1][0] && totalBasket[i][1] == totalBasket[totalBasket.length - 1][1]) {
//     totalBasket[i][2] = parseInt(totalBasket[i][2]) + parseInt(totalBasket[totalBasket.length - 1][2]);

// lorsque la boucle s'opère, je dois faire en sorte que le script ne compare pas 2x le même élément 
// la vérification doit se faire avant d'ajouter l'élément au tableau totalBasket et non pas après 
// se traduit par : vérifier si l'item littleBasket qui va rentrer dans totalBasket est déjà présent, si c'est le cas juste récup la qty et l'incrémenter 
// il existe des fonctions JS qui permettent de vérifier la prézsence d'un élément dans un tableau ou non 





































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