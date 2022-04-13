// init variables to display infos 
let cartSection = document.getElementById('cart__items');
let cartArticle = document.querySelector('section article');
let cartImg = document.querySelector('section article div img');
let cartItem;

// request API
fetch('http://localhost:3000/api/products/')
    .then(function(res) {
        if(res.ok) {
            return res.json()
        }
    })
    .then (function (value) {
        let basket = JSON.parse(localStorage.getItem('basket'));
        console.log(basket);
        console.log(value);
        for (i in value) {
            if (value[i]._id == basket[0].id) {
                cartItem = value[i];
                cartImg.setAttribute('src', cartItem.imageUrl);
            }
        }
    })

