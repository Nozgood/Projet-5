// get html elements
let itemSection = document.querySelector('section section')

// get localstorage
let basket = JSON.parse(localStorage.getItem('basket'));

// set article for each item in basket 
for (i in basket) {
    let itemArticle = document.createElement('article')
    itemArticle.setAttribute('class', 'cart__item');
    itemArticle.setAttribute('data-id', basket[i].id);
    itemSection.appendChild(itemArticle);

    // set img div
    let imgDiv = document.createElement('div');
    imgDiv.setAttribute('class', 'cart__item__img');
    itemArticle.appendChild(imgDiv);

    // set img element
    let itemImg = document.createElement('img');
    itemImg.setAttribute('src', '');
    itemImg.setAttribute('alt', '');
    imgDiv.appendChild(itemImg);

    // set content div 
    let contentDiv = document.createElement('div');
    contentDiv.setAttribute('class', 'cart__item__content');
    itemArticle.appendChild(contentDiv);

    // set content elements
    let contentDescDiv = document.createElement('div');
    contentDescDiv.setAttribute('class', 'cart__item__content__description');
    contentDiv.appendChild(contentDescDiv);
    let h2Content = document.createElement('h2');
    let pContent =  document.createElement('p');
    contentDescDiv.appendChild(h2Content);
    contentDescDiv.appendChild(pContent);

    // set content settings
    let contentSettDiv = document.createElement('div');
    contentSettDiv.setAttribute('class', 'cart__item__content__settings');
    contentDiv.appendChild(contentSettDiv);

    // set content settings qty 
    let contentSettQtyDiv = document.createElement('div');
    contentSettQtyDiv.setAttribute('class', 'cart__item__content__settings__quantity');
    contentSettDiv.appendChild(contentSettQtyDiv);
    let pQty = document.createElement('p');
    let inputQty = document.createElement('input');
    inputQty.setAttribute('type', 'number');
    inputQty.setAttribute('class', 'itemQuantity');
    inputQty.setAttribute('name', 'itemQuantity');
    inputQty.setAttribute('min', '1');
    inputQty.setAttribute('max', '100');
    inputQty.setAttribute('value', '');
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
}

// request API
fetch('http://localhost:3000/api/products/')
    .then(function(res) {
        if(res.ok) {
            return res.json()
        }
    })
    .then (function (value) {
        console.log(basket);
        console.log(value);
    })
