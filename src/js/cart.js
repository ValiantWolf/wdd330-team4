import { loadHeaderFooter } from './utils.js';
import CartList from './cartList.js';
import ProductData from './productData.js';

loadHeaderFooter();

const dataSource = new ProductData('tents')

const cart = new CartList('so-cart', document.querySelector('.product-list'), dataSource);
cart.init();
