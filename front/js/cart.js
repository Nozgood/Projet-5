// get html parent element
let itemSection = document.querySelector('section section');

// get localstorage
let basket = JSON.parse(localStorage.getItem('basket'));

// set article for each item in basket 
for (i=0; i < basket.length; i++) {

    // set article tag and attributes
    itemArticle = document.createElement('article');
    itemArticle.setAttribute('class', 'cart__item');
    itemArticle.setAttribute('data-color', basket[i].color);
    itemArticle.setAttribute('data-id', basket[i].id);
    itemSection.appendChild(itemArticle);

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
    inputQty.setAttribute('value', basket[i].qty);
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

    // fetch to get the infos (title, price, image, altdesc ...)
    fetch('http://localhost:3000/api/products/' + basket[i].id)
    .then(function(res) {
        if(res.ok) {
            return res.json()
        }
    })
    .then (function (value) {
        console.log(value);

        // display image and alt infos 
        itemImg.setAttribute('src', value.imageUrl);
        itemImg.setAttribute('alt', value.altTxt);

        // display price and title 
        pContentPrice.textContent = value.price + ' €';
        h2Content.textContent = value.name;
    })
}
