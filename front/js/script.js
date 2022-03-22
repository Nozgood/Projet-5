// creation de variables pointant les infos des items
let kanapImg = document.querySelector('article img');
let kanapName = document.querySelector('h3.productName');
let kanapDescription = document.querySelector('p.productDescription');
let kanapSection = document.getElementById('items');
let kanapItem = document.querySelector('section a');
let kanapCopy = kanapItem.cloneNode(true);

// récupération et affichage des données de l'API 

fetch('http://localhost:3000/api/products')
    .then(function(res) {
        if(res.ok) {
            return res.json();
        }
    })
    .then(function(value) {
        console.log(value);
        for (let i = 0; i < value.length; i++) {
            kanapName.innerHTML = value[i].name,
            kanapItem.setAttribute('href', 'product.html?id=' + value[0]._id);
            kanapDescription.innerHTML = value[i].description;
            kanapImg.setAttribute('src', value[i].imageUrl);
            kanapImg.setAttribute('alt', value[i].altTxt);
        }
    });
