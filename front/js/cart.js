// get html parent elements and init variables
let itemSection = document.querySelector('section section');
let littlePrice = [];
let itemsQty = [];
let totalPrice = 0;

// get localstorage
let basket = JSON.parse(localStorage.getItem('basket'));

// get the quantity and price span 
let spanPrice = document.getElementById('totalPrice');
let spanQty = document.getElementById('totalQuantity');

// function to get the total price and display on the span 
function getPrice(id, count) {
    fetch('http://localhost:3000/api/products/' + id)
    .then(function(res) {
        if(res.ok) {
            return res.json()
        }
    })
    .then (function (value) {
        let price = value.price * count
        littlePrice.push(price);
        totalPrice = 0;
        for (i in littlePrice) {
            totalPrice += littlePrice[i];
        }
        spanPrice.textContent = totalPrice;
    })
}

// function to get the total qty and display it 
function totalQty(){
    let totalQty = 0;
    for (i in itemsQty) {
        totalQty += itemsQty[i];
        spanQty.textContent = totalQty;
    }
}

// set article for each item in basket
if (basket != null) {
    for (i=0; i < basket.length; i++) {
        getPrice(basket[i].id, basket[i].qty);
        // set article tag and attributes
        itemArticle = document.createElement('article');
        itemArticle.setAttribute('class', 'cart__item');
        itemArticle.setAttribute('data-color', basket[i].color);
        itemArticle.setAttribute('data-id', basket[i].id);
        itemSection.appendChild(itemArticle);
        itemsQty.push(parseInt(basket[i].qty));

        // set the div to display img infos 
        let imgDiv = document.createElement('div');
        imgDiv.setAttribute('class', 'cart__item__img');
        itemArticle.appendChild(imgDiv);
        let itemImg = document.createElement('img');
        imgDiv.appendChild(itemImg);
    
        // set the div to display content infos (title, price ...)
        let contentDiv = document.createElement('div');
        contentDiv.setAttribute('class', 'cart__item__content');
        itemArticle.appendChild(contentDiv);
    
        // 1st child for the description (color for example)
        let contentDescDiv = document.createElement('div');
        contentDescDiv.setAttribute('class', 'cart__item__content__description');
        contentDiv.appendChild(contentDescDiv);
        let h2Content = document.createElement('h2');
        pContentColor =  document.createElement('p');
        pContentColor.textContent = basket[i].color;
        let pContentPrice =  document.createElement('p');
        pContentPrice.setAttribute('class', 'price');
        contentDescDiv.appendChild(h2Content);
        contentDescDiv.appendChild(pContentColor);
        contentDescDiv.appendChild(pContentPrice);
    
        //2nd child for the settings (qty and delete)
        let contentSettDiv = document.createElement('div');
        contentSettDiv.setAttribute('class', 'cart__item__content__settings');
        contentDiv.appendChild(contentSettDiv);
        let contentSettQtyDiv = document.createElement('div');
        contentSettQtyDiv.setAttribute('class', 'cart__item__content__settings__quantity');
        contentSettDiv.appendChild(contentSettQtyDiv);
        let pQty = document.createElement('p');
        pQty.textContent = 'Qté :';
        let inputQty = document.createElement('input');
        inputQty.setAttribute('type', 'number');
        inputQty.setAttribute('class', 'itemQuantity');
        inputQty.setAttribute('name', 'itemQuantity');
        inputQty.setAttribute('min', '1');
        inputQty.setAttribute('max', '100');
        inputQty.setAttribute('value', parseInt(basket[i].qty));
        contentSettQtyDiv.appendChild(pQty);
        contentSettQtyDiv.appendChild(inputQty);
    
        // set delete div
        let deleteDiv = document.createElement('div');
        deleteDiv.setAttribute('class', 'cart__item__content__settings__delete');
        let pDelete = document.createElement('p');
        pDelete.setAttribute('class', 'deleteItem');
        pDelete.textContent = 'Supprimer';
        contentSettDiv.appendChild(deleteDiv);
        deleteDiv.appendChild(pDelete);
    
        // fetch to get and display the infos (title, price, image, altdesc ...)
        fetch('http://localhost:3000/api/products/' + basket[i].id)
        .then(function(res) {
            if(res.ok) {
                return res.json()
            }
        })
        .then (function (value) {
    
            // display image and alt infos 
            itemImg.setAttribute('src', value.imageUrl);
            itemImg.setAttribute('alt', value.altTxt);
    
            // display price and title 
            pContentPrice.textContent = value.price + ' €';
            h2Content.textContent = value.name;
        })
    }
    totalQty();
}

// modify quantity 
let getQty = document.querySelectorAll('input.itemQuantity');
getQty.forEach(newQty => {
    let qty = newQty.value;
    newQty.addEventListener('change', event => {
        let oldQty = parseInt(qty);
        if (newQty.value <= 0) {
            alert('Veuillez saisir une quantité comprise entre 1 et 100');
            newQty.value = oldQty;
        } else if (newQty.value > 100) {
            alert('Veuillez saisir une quantité comprise entre 1 et 100');
            newQty.value = oldQty;
        }
        newQty.setAttribute('value', newQty.value);
        let realQty = parseInt(newQty.value) - oldQty;
        spanQty.textContent = parseInt(spanQty.textContent) + realQty;
        qty = newQty.value;
    })
})


// display the correct quantity (when amended) on the localstorage
let getArticle = document.querySelectorAll('article.cart__item');
getArticle.forEach(newInfo => {
    newInfo.addEventListener('change', event => {
            littlePrice.splice(0);
            let getArticleColor = newInfo.dataset.color;
            let getArticleId = newInfo.dataset.id;
            for (i in basket) {
                if (getArticleColor == basket[i].color && getArticleId == basket[i].id) {
                    basket[i].qty = getQty[i].value;
                    localStorage.setItem('basket', JSON.stringify(basket));
                }
                // according the price to the new quantity
                getPrice(basket[i].id, basket[i].qty);
            }
    })
})

// delete an item 
// get the delete button to listen
let deleteButton = document.querySelectorAll('p.deleteItem');

// listen all the buttons
deleteButton.forEach(remove => {
    remove.addEventListener('click',function() {
        // init variables
        let articleToRemove = remove.closest('article');
        let articleColor = articleToRemove.dataset.color;
        let articleId = articleToRemove.dataset.id;
        let resultat = window.confirm('Êtes-vous sûr de vouloir supprimer cet article ?');

        if (resultat === true) {
            // reinitialise price and qty arrays
            littlePrice.splice(0);
            itemsQty.splice(0);

            // loop to find the item to delete
            for (i in basket) {
                if (articleColor == basket[i].color && articleId == basket[i].id) {
                    basket.splice(i, 1);
                    if (basket.length != 0) {
                        localStorage.setItem('basket', JSON.stringify(basket));
                    } else {
                        localStorage.removeItem('basket');
                        spanPrice.textContent = '0';
                        spanQty.textContent = '0';
                    }
                    articleToRemove.remove();
                }
            }
            // display the new price / quantity 
            for(i in basket) {
                itemsQty.push(parseInt(basket[i].qty));
                getPrice(basket[i].id, basket[i].qty);
                totalQty();
            }
        }
    })
})

// user form and make the command 

// init variables 
// get the form
let form = document.getElementsByClassName('cart__order__form');

// get first Name
let firstName = document.getElementById('firstName');
let firstNameError = document.getElementById('firstNameErrorMsg');
let nameErrorText = 'Veuillez saisir un prénom/nom contenant uniquement des lettres sans espaces';

// get last Name
let lastName = document.getElementById('lastName');
let lastNameError = document.getElementById('lastNameErrorMsg');

// get address
let address = document.getElementById('address');
let addressError = document.getElementById('addressErrorMsg');
let addressErrorText = 'Veuillez saisir une adresse adéquate';

// get city
let city = document.getElementById('city');
let cityError = document.getElementById('cityErrorMsg');
let cityErrorText = 'Veuillez saisir une ville existante';

// get mail 
let mail = document.getElementById('email');
let mailError = document.getElementById('emailErrorMsg');
let mailErrorText = 'Veuillez saisir une adresse mail adéquate';

// event to listen
let commandButton = document.getElementById('order');

// regex variables 
let regName = /^[a-zA-Zéèêëàâæáäîïôœöùûü]+$/;
let regAddress = /^([0-9]{1,4}) ([a-zA-Z]+) [a-zA-Zéèêëàâæáäîïôœöùûü\s,.'-]{3,}$/;
let regCity = /^([a-zA-Z]+)[a-zA-Z-\s]{3,}$/;
let regMail = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/;

// init the object and the product array to post to POST 
let contact = {
    firstName : '',
    lastName : '',
    address : '',
    city : '', 
    email : ''
}
let products = [];

// array to store regex verification 
let regexArray = [];

// init the object to send to the API 
let postAPI = {};

// function to verify the form's datas
function formVerify(data, regex, dataError, dataErrorText) {
    if (regex.test(data.value) == false) {
        dataError.textContent = dataErrorText;
        return false;
    } else {
        dataErrorText = '';
        dataError.textContent = dataErrorText;
        return true;
    }
}

// verify each field one by one 
let firstNameBoo;
firstName.addEventListener('change', function() {
    firstNameBoo = formVerify(firstName, regName, firstNameError, nameErrorText);
})

let lastNameBoo;
lastName.addEventListener('change', function() {
    lastNameBoo = formVerify(lastName, regName, lastNameError, nameErrorText);
})

let addressBoo;
address.addEventListener('change', function() {
    addressBoo = formVerify(address, regAddress, addressError, addressErrorText);
})

let cityBoo;
city.addEventListener('change', function() {
    cityBoo = formVerify(city, regCity, cityError, cityErrorText);
})

let mailBoo;
mail.addEventListener('change', function() {
    mailBoo = formVerify(mail, regMail, mailError, mailErrorText);
})

// form verify before submit
commandButton.addEventListener('click',function() {
    regexArray.push(firstNameBoo, lastNameBoo, addressBoo, cityBoo, mailBoo)
    if (regexArray.indexOf(false) >= 0) {
        alert('Votre requête n\'as pas été prise en compte')
    } else if (regexArray.indexOf(undefined) >= 0) {
        alert('Veuillez remplir les champs Prénom, nom, adresse, ville et email');
    }
})

// get the form's infos in the url 
let url = new URL(window.location.href);
let urlFirstName = url.searchParams.get('firstName');
let urlLastName = url.searchParams.get('lastName');
let urlAddress = url.searchParams.get('address');
let urlCity = url.searchParams.get('city');
let urlEmail = url.searchParams.get('email');

// condition to fetch 
if(urlFirstName != null && basket.length != null) {
    // set the contact array
    contact.firstName = urlFirstName;
    contact.lastName = urlLastName;
    contact.address = urlAddress;
    contact.city = urlCity;
    contact.email = urlEmail;

    // set the product array
    getArticle.forEach(getId => {
        products.push(getId.dataset.id);
    })

    postAPI = {contact, products};
    fetch('http://localhost:3000/api/products/order', {
        method: 'POST',
        headers : {
            'Content-Type' : 'application/json'
        },
        body : JSON.stringify(postAPI)
    })
    .then(function(res) {
        if (res.ok) {
            return res.json();
        }
    })
    .then(function(value) {
        window.open('confirmation.html' + '?orderId=' + value.orderId);
        localStorage.removeItem('basket');
        window.location.href = 'cart.html';
    })
}
