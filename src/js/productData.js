const baseURL = 'http://157.201.228.93:2992/'
function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Bad Response");
  }
}

export default class ProductData {
    constructor() {
      //  this.category = category;
      //  this.path = `../json/${this.category}.json`;
    }
    getData() {
      return fetch(baseURL + `products/search/${category}`)
      .then(convertToJson).then((data) => data.Result);
    }
    async findProductById(id) {
      return await fetch(baseURL + `product/${id}`).then(convertToJson)
      .then((data) => data.Result);

    }
};