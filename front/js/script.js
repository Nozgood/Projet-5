// init variable
let kanapSection = document.getElementById('items');

// get API datas
fetch('http://localhost:3000/api/products')
    .then
    (function(res) {
        if(res.ok) {
            return res.json();
        }
    })
    .then
    (function(value) {
        for (let i = 0; i < value.length; i++) {
            // tag create
            let itemLien = document.createElement('a');
            kanapSection.appendChild(itemLien);
            let itemArticle = document.createElement('article');
            let itemImg = document.createElement('img');
            let itemTitle = document.createElement('h3');
            let itemParagraph = document.createElement('p');

            // affiliate 
            itemLien.appendChild(itemArticle);
            itemArticle.appendChild(itemImg);
            itemArticle.appendChild(itemTitle);
            itemArticle.appendChild(itemParagraph);

            // display content
            itemTitle.innerHTML = value[i].name;
            itemParagraph.innerHTML = value[i].description 
            itemImg.setAttribute('src', value[i].imageUrl);
            itemImg.setAttribute('alt', value[i].altTxt);
            itemLien.setAttribute('href', 'product.html?id=' + value[i]._id)
        }
    });