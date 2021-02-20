import { setLocalStorage, getLocalStorage } from './utils.js';

export default class ProductDetails {
  constructor(productId, dataSource){
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;
    
  }
  async init() {
    this.product = await this.dataSource.findProductById(this.productId);
    document.querySelector('main').innerHTML = this.renderProductDetails();
    // add listener to Add to Cart button
    document.getElementById('addToCart')
            .addEventListener('click', this.addToCart.bind(this));
  }
  addToCart() {
    let existingProductIndex;
    let cart = getLocalStorage('so-cart');
    if(!cart){
         cart = { items: [], totalPrice: 0 };
    }
    const existingProduct = cart.items.find(
      (prod, index) => {
        if (prod.id === this.productId){
          existingProductIndex = index;
          return true;
      }
      return false;
    });
    let updatedProduct;
    if (existingProduct) {
      updatedProduct = { ...existingProduct };
      updatedProduct.qty = updatedProduct.qty + 1;
      cart.items = [...cart.items];
      cart.items[existingProductIndex] = updatedProduct;
    } else {
      updatedProduct = { id: this.productId, qty: 1 };
      cart.items = [...cart.items, updatedProduct];
    }
    updatedProduct.name = this.product.Name;
    updatedProduct.price = this.product.FinalPrice
    cart.totalPrice += this.product.FinalPrice;

    
    // let total = 0,  //set a variable that holds our total
    // cartQty = cart.products,
    // i;
    // for (i = 0; i < cartQty.length; i++) {  //loop through the array
    //     total += cartQty[i].qty;  //Do the math!
    // }
    // console.log(total);
   
    setLocalStorage('so-cart', cart);
  }
  renderProductDetails() {
    return `<section class="product-detail"> 
    <h3>${this.product.Brand.Name}</h3>
    <h2 class="divider">${this.product.NameWithoutBrand}</h2>
    <img
      class="divider"
      src="${this.product.Images.PrimaryLarge}"
      alt="${this.product.NameWithoutBrand}"
    />
    <p class="product-card__price">$${this.product.FinalPrice}</p>
    <p class="product__color">${this.product.Colors[0].ColorName}</p>
    <p class="product__description">
    ${this.product.DescriptionHtmlSimple}
    </p>
    <div class="product-detail__add">
      <button id="addToCart" data-id="${this.product.Id}">Add to Cart</button>
    </div></section>`;
  }
}