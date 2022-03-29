// init kanap variables
let title = document.querySelector('title');
let itemName = document.getElementById('title');
let itemImg = document.querySelector('article div img');
let itemPrice = document.getElementById('price');
let itemDesc = document.getElementById('description');
let itemColors = document.getElementById('colors');

let url = new URL(window.location.href);
let id = url.searchParams.get('id');
console.log(id);

// init id to variables 
let sinope = '107fb5b75607497b96722bda5b504926';
let cyllene = '415b7cacb65d43b2b5c1ff70f3393ad1';
let calyce = '055743915a544fde83cfdfc904935ee7';
let autonoe = 'a557292fe5814ea2b15c6ef4bd73ed83';
let eurydome = '8906dfda133f4c20a9d0e34f18adcf06';
let helice = '77711f0e466b4ddf953f677d30b0efc9';
let thyone = '034707184e8e4eefb46400b5a3774b5f';
let orthosie = 'a6ec5b49bd164d7fbe10f37b6363f9fb';

// fetch function (dry)
function fetchi() {
    fetch('http://localhost:3000/api/products/' + id)
    .then(function(res) {
        if(res.ok) {
            return res.json();
        }
    })
    .then(function(value) {
        console.log(value);
        title.innerHTML = value.name;
        itemName.innerHTML = value.name;
        itemImg.setAttribute('src', value.imageUrl)
        itemImg.setAttribute('alt', value.altTxt);
        itemPrice.innerHTML = value.price;
        itemDesc.innerHTML = value.description;
        for (i=0; i < value.colors.length; i++) {
            let color = document.createElement('option');
            itemColors.appendChild(color);
            color.setAttribute('value', value.colors[i]);
            color.innerHTML = value.colors[i];
        }
    });
}
// display infos in function of the id 
if(id == sinope) {
    fetchi();
} else if (id == cyllene) {
    fetchi();
} else if (id == calyce) {
    fetchi()
} else if (id == autonoe) {
    fetchi();
} else if (id == eurydome) {
    fetchi();
} else if (id == helice) {
    fetchi();
} else if (id == thyone) {
    fetchi();
} else if (id == orthosie) {
    fetchi();
}

// si besoin des datas 
fetch('http://localhost:3000/api/products/')
    .then(function(res) {
        if(res.ok) {
            return res.json();
        }
    })
    .then(function(value) {
        console.log(value);
    })