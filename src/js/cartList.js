import { renderListWithTemplate, getLocalStorage } from './utils.js';


export default class CartList {
    constructor (key, listElement, dataSource) {
        this.key = key;
        this.listElement = listElement;
        this.dataSource = dataSource;
        this.products = {};
    }

    async init() {
        const list = getLocalStorage(this.key);
        this.renderList(list);
    }
      
    prepareTemplate(template, product) {  
        template.querySelector('.cart-card__image img').src =  product.Image;
        template.querySelector('.cart-card__image img').alt += product.Name;
        template.querySelector('.card__name').textContent = product.Name;
        template.querySelector('.cart-card__color').textContent = product.Colors[0].ColorName;
        template.querySelector('.cart-card__price').textContent += product.FinalPrice; 
        return template;
    }

    async renderList(list) {
        // make sure the list is empty
        this.listElement.innerHTML = '';
        //convert id into json list
        let newList = list.products;
        //takes the ids and makes a new array
        newList = [...new Set(newList.map(itemId => itemId.id).flat())];
        let fakeCart = [];
        for (let i = 0; i < newList.length; i++) {
            this.products = await this.dataSource.findProductById(newList[i]);
            fakeCart.push(this.products)
        }
        //get the template
        const template = document.getElementById('cart-card-template');
        renderListWithTemplate(template, this.listElement, fakeCart, this.prepareTemplate);
    }
}