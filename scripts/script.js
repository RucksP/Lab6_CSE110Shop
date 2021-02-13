// Script.js

window.addEventListener('DOMContentLoaded', () => {

  if(localStorage.getItem('products') === null) {
    fetch('https://fakestoreapi.com/products')
    .then(response => response.json())
    .then(data => {
      localStorage.setItem('products', JSON.stringify(data));
      populateList();
    });
  } else {
    populateList();
  }
  if(localStorage.getItem('cartItems') === null) {
  } else {
    cartItems = JSON.parse(localStorage.getItem('cartItems'));
    cartCount = document.getElementById('cart-count');
    cartSize = cartItems.length;
    cartCount.innerHTML = cartSize;
  }

});

function populateList() {
  productList = document.getElementById('product-list');
  productsString = localStorage.getItem('products');
  products = JSON.parse(productsString);

  products.forEach(product => {
    let dummy = document.createElement('product-item');
    dummy.setAttribute('img', product.image);
    dummy.setAttribute('name', product.title);
    dummy.setAttribute('price', product.price);
    dummy.setAttribute('id', product.id);
    let element = dummy.cloneNode(true);
    productList.appendChild(element);
  });

}

