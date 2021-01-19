function setLocalStorage(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

// add to cart button event handler
function addToCart(e) {
    const product = products.find((item) => item.Id === e.target.dataset.id);
    setLocalStorage("so-cart", product);
}