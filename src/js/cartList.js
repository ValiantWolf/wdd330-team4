import { renderListWithTemplate, getLocalStorage } from './utils.js';

export default class CartList {
    constructor (key, listElement, dataSource) {
        this.key = key;
        this.listElement = listElement;
        this.dataSource = dataSource;
        this.products = {};
        this.list = getLocalStorage(this.key);
    }

    async init() {
        this.renderList();
    }
      
    prepareTemplate(template, product) {
        template.querySelector('.cart-card__image img').src =  product.Images.PrimaryMedium;
        template.querySelector('.cart-card__image img').alt += product.Name;
        template.querySelector('.card__name').textContent = product.Name;
        template.querySelector('.cart-card__color').textContent = product.Colors[0].ColorName;
        template.querySelector('.cart-card__quantity').textContent = product.qty + 'qty';
        template.querySelector('.cart-card__price').textContent += product.FinalPrice;
        return template;
    }

    async renderList() {
        // make sure the list is empty
        this.listElement.innerHTML = '';
        //check list again to see if empty
        if (this.list === null) {
            return document.querySelector('section.products > h2').textContent = 'Your cart looks empty';
        }
        this.cartItemTotal();
        //convert id into json list
        let newList = this.list.items;
        //takes the ids and makes a new array
        newList = [...new Set(newList.map(itemId => itemId.id).flat())];
        let fakeCart = [];
        for (let i = 0; i < newList.length; i++) {
            this.products = await this.dataSource.findProductById(newList[i]);
            this.products.qty = this.list.items[i].qty
            fakeCart.push(this.products)
        }
        //get the template
        const template = document.getElementById('cart-card-template');
        renderListWithTemplate(template, this.listElement, fakeCart, this.prepareTemplate);
    }

    cartItemTotal() {
        let itemAmount = 0
        for (let i = 0; i < this.list.items.length; i++) {
            itemAmount += this.list.items[i].qty;
        }
        return document.querySelector('section.products > h2 > span#num-items').textContent = itemAmount;
    }
}