// creation de var reliés aux infos de chaque carte 
let kanapImg = document.querySelector('article img');

// récupération des données de l'API 

fetch('http://localhost:3000/api/products')
    .then(function(res) {
        if(res.ok) {
            return res.json();
        }
    })
    .then(function(value) {
        console.log(value);
        document
            .querySelector('h3.productName')
            .innerHTML = value[0].name;
        document
            .querySelector('p.productDescription')
            .innerHTML = value[0].description;
            kanapImg.getAttribute('alt').innerHTML = value[0].altTxt;
    });

