// product-item.js

class ProductItem extends HTMLElement {
  constructor() {
    //docs say to always call super
    super();

    //create a shadow root
    let shadow = this.attachShadow({mode : 'open'});

    let imgURL = this.getAttribute('img');
    let cost = this.getAttribute('price');
    let name = this.getAttribute('name');
    var id = this.getAttribute('id');

    let product = document.createElement('li');
    product.setAttribute('class','product');

    let img = document.createElement('img');
    img.src = imgURL;
    //img.alt = name;
    img.setAttribute('alt', name);
    img.width = 200;
    product.appendChild(img);

    let title = document.createElement('p');
    title.innerHTML = name;
    title.setAttribute('class', 'title');
    product.appendChild(title);

    let price = document.createElement('p');
    price.innerHTML = cost;
    price.setAttribute('class', 'price');
    product.appendChild(price);

    let cartItems;
    if(localStorage.getItem('cartItems') === null) {
      cartItems = [];
    } else {
      cartItems = JSON.parse(localStorage.getItem('cartItems'));
    }

    let cart = document.createElement('button');
    if(cartItems.indexOf(id) > -1) {
      cart.onclick = removeCart;
      cart.innerHTML = "Remove from Cart";
    } else {
      cart.onclick = addCart;
      cart.innerHTML = "Add to Cart";      
    }
    cart.name = id;
    product.appendChild(cart);
    


  //CSS
  let style = document.createElement('style');
  style.textContent = `
  .price {
    color: green;
    font-size: 1.8em;
    font-weight: bold;
    margin: 0;
  }
  
  .product {
    align-items: center;
    background-color: white;
    border-radius: 5px;
    display: grid;
    grid-template-areas: 
    'image'
    'title'
    'price'
    'add';
    grid-template-rows: 67% 11% 11% 11%;
    height: 450px;
    filter: drop-shadow(0px 0px 6px rgb(0,0,0,0.2));
    margin: 0 30px 30px 0;
    padding: 10px 20px;
    width: 200px;
  }
  
  .product > button {
    background-color: rgb(255, 208, 0);
    border: none;
    border-radius: 5px;
    color: black;
    justify-self: center;
    max-height: 35px;
    padding: 8px 20px;
    transition: 0.1s ease all;
  }
  
  .product > button:hover {
    background-color: rgb(255, 166, 0);
    cursor: pointer;
    transition: 0.1s ease all;
  }
  
  .product > img {
    align-self: center;
    justify-self: center;
    width: 100%;
  }
  
  .title {
    font-size: 1.1em;
    margin: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  
  .title:hover {
    font-size: 1.1em;
    margin: 0;
    white-space: wrap;
    overflow: auto;
    text-overflow: unset;
  }`

  // attach the created elements to the shadow dom
  shadow.appendChild(style);
  shadow.appendChild(product);
  }
}

function addCart() {

  alert('Added to Cart!');
  
  if(localStorage.getItem('cartItems') === null) {
    cartItems = [];
  } else {
    cartItems = JSON.parse(localStorage.getItem('cartItems'));
  }
  
  cartItems.push(this.name);
  localStorage.setItem('cartItems', JSON.stringify(cartItems));
  
  cartCount = document.getElementById('cart-count');
  cartSize = Number(cartCount.innerHTML);
  cartSize = cartSize + 1;
  cartCount.innerHTML = cartSize;

  this.onclick = removeCart;
  this.innerHTML = 'Remove from Cart';
}

function removeCart() {

  alert('Removed from Cart!');

  if(localStorage.getItem('cartItems') === null) {
    cartItems = [];
  } else {
    cartItems = JSON.parse(localStorage.getItem('cartItems'));
  }
  
  let index = cartItems.indexOf(this.name);
  if (index > -1) {
    cartItems.splice(index, 1);
  }
  localStorage.setItem('cartItems', JSON.stringify(cartItems));

  cartCount = document.getElementById('cart-count');
  cartSize = Number(cartCount.innerHTML);
  cartSize = cartSize - 1;
  cartCount.innerHTML = cartSize;

  this.onclick = addCart;
  this.innerHTML = 'Add to Cart';
}

customElements.define('product-item', ProductItem);
