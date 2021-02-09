import { renderListWithTemplate} from './utils';

export default class ProductList {
    constructor (catagory, dataSource, listElement) {
        this.catagory = catagory;
        this.dataSource = dataSource;
        this.listElement = listElement;
    }

    async init() {
        const list = await this.dataSource.getData(this.category);
        this.renderList(list)
    }

    prepareTemplate(template, product){
        template.querySelector('a').href +=  product.Id;
        template.querySelector('img').src = product.Image;
        template.querySelector('img').alt += product.Name;
        template.querySelector('.card__brand').textContent = product.Brand.Name;
        template.querySelector('.card__name').textContent = product.NameWithoutBrand;
        template.querySelector('.product-card__price').textContent += product.FinalPrice; 
        return template;
    }

    renderList (list) {
        this.listElement.innerHTML = '';
        const template = document.getElementById('product-card-template');
        renderListWithTemplate (template, this.listElement, list, this.prepareTemplate)
    }
}
