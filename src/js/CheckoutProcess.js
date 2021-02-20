import { getLocalStorage } from './utils.js';
import ExternalServices from './ExternalServices.js';

const services = new ExternalServices();
function formDataToJSON(formElement) {    
  var formData = new FormData(formElement),
      convertedJSON = {};

  formData.forEach(function(value, key) { 
      convertedJSON[key] = value;
  });

  return convertedJSON;
}

export default class checkoutProcess {
    constructor (key, dataSource) {
        this.key = key;
        this.outputSelector = '.checkout-summary';
        this.dataSource = dataSource;
        this.shipping = 0;
        this.tax = 0;
        this.orderTotal = 0;
        this.itemAmount = 0;
    }

    async init() {
        const list = await getLocalStorage(this.key);
        this.calculateItemSummary(list);
    }
    calculateItemSummary(list){
        const itemNumElement = document.querySelector(this.outputSelector + ' #num-items');
        const summaryElement = document.querySelector(this.outputSelector + ' #cartTotal');
        const shipping = document.querySelector(this.outputSelector + ' #shipping');
        const tax = document.querySelector(this.outputSelector + ' #tax');
        const orderTotal = document.querySelector(this.outputSelector + ' #orderTotal');

        for (let i = 0; i < list.items.length; i++) {
            this.itemAmount += list.items[i].qty;
        }
        itemNumElement.innerText = this.itemAmount;
        summaryElement.innerText = '$' + list.totalPrice;

        this.shipping = 10 + ((this.itemAmount - 1) * 2);
        this.tax = (list.totalPrice * .06).toFixed(2);
        this.orderTotal = (parseFloat(list.totalPrice) + parseFloat(this.shipping) + parseFloat(this.tax)).toFixed(2);

        shipping.innerText = '$' + this.shipping;
        tax.innerText = '$' + this.tax;
        orderTotal.innerText = '$' + this.orderTotal;
    }

    async checkout() {
        const list = await getLocalStorage(this.key);
        var formElement = document.querySelector('form');
    
        const json = formDataToJSON(formElement);
        // add totals, and item details
        json.orderDate = new Date();
        json.orderTotal = this.orderTotal;
        json.tax = this.tax;
        json.shipping = this.shipping;
        json.items = list;
       console.log(json);
       try {
       const res = await services.checkout(json);
       console.log(res);
       }
       catch(err) {
         console.log(err);
       }
    }
}

