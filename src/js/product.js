import ProductData from './productData.js';
import ProductDetails from './productDetails.js';
import { getParams, loadHeaderFooter } from './utils.js';
loadHeaderFooter();

const productId = getParams('product');
const dataSource = new ProductData();

const product = new ProductDetails(productId, dataSource);
product.init();