import checkoutProcess from './CheckoutProcess.js';
import ProductData from './productData.js';
import { loadHeaderFooter } from './utils.js';

loadHeaderFooter();

const dataSource = new ProductData();

const checkout = new checkoutProcess('so-cart', dataSource);
checkout.init();

document.querySelector('#checkoutSubmit').addEventListener('click', (e) => {
  e.preventDefault();
  
  checkout.checkout();

});

