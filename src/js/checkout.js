import checkoutProcess from './CheckoutProcess.js';
import ProductData from './productData.js';
import { loadHeaderFooter } from './utils.js';

loadHeaderFooter();

const dataSource = new ProductData();

const checkout = new checkoutProcess('so-cart', dataSource);
checkout.init();

document.querySelector('#checkoutSubmit')
  .addEventListener('click', (e) => {
    e.preventDefault();
    var myForm = document.forms[0];
    var chk_status = myForm.checkValidity();
    myForm.reportValidity();
    if(chk_status)
      checkout.checkout();
  });

