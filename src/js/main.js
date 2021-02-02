import ProductData from './productData.js';
import ProductList from './productList.js';
import { loadHeaderFooter } from './utils.js';

loadHeaderFooter();

const dataSource = new ProductData('tents');
const listElement = document.querySelector('.product-list');
const myList = new ProductList('tents', dataSource, listElement);
//Use the init method to show the tents.
myList.init();