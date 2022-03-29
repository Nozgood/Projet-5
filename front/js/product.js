// init some variables
let itemName = document.getElementById('title');

// searchParams gets id to know which infos to display 
let lien = 'http://127.0.0.1:5500/front/html/product.html?id=';
let url = new URL(lien);
let id = url.searchParams.get('id');

// Get API infos 

fetch('http://localhost:3000/api/products/107fb5b75607497b96722bda5b504926')
    .then(function(res) {
        if(res.ok) {
            return res.json();
        }
    })
    .then (function(value) {
        console.log(value);
        if (id === value[0]._id) {
            console.log(id)
            itemName.innerHTML = value[0].name;
        }
    })
