const products = [
    { nazev: "Tužka", cenaZaKus: 10, pocetNaSklade: 100 },
    { nazev: "Sešit", cenaZaKus: 20, pocetNaSklade: 150 },
    { nazev: "Batoh", cenaZaKus: 500, pocetNaSklade: 50 },
    { nazev: "Pravítko", cenaZaKus: 30, pocetNaSklade: 75 },
    { nazev: "Pero", cenaZaKus: 40, pocetNaSklade: 200 },
    { nazev: "Kalkulačka", cenaZaKus: 200, pocetNaSklade: 30 },
    { nazev: "Barvy", cenaZaKus: 150, pocetNaSklade: 80 },
    { nazev: "Štětce", cenaZaKus: 60, pocetNaSklade: 120 },
    { nazev: "Lepidlo", cenaZaKus: 300, pocetNaSklade: 40 },
    { nazev: "Mapa světa", cenaZaKus: 180, pocetNaSklade: 60 }
];

function createProductElement(product) {
    const div = document.createElement('div');
    div.className = 'product';
    div.innerHTML = `
        <strong>${product.nazev}</strong> - Cena: ${product.cenaZaKus} Kč/kus, Množství: ${product.pocetNaSklade}
        <br>
        <label for="quantity-${product.nazev}">Nové množství:</label>
        <input type="number" id="quantity-${product.nazev}" min="0" value="0">
        <button onclick="updateQuantity('${product.nazev}')">Aktualizovat</button>
    `;
    return div;
}

function displayProducts() {
    const productList = document.getElementById('product-list');
    productList.innerHTML = '';
    products.forEach(product => {
        const productElement = createProductElement(product);
        productList.appendChild(productElement);
    });
}

function findMostExpensiveProduct() {
    const mostExpensiveProduct = products.reduce((maxProduct, currentProduct) => {
        return currentProduct.cenaZaKus > maxProduct.cenaZaKus ? currentProduct : maxProduct;
    }, products[0]);

    alert(`Nejdražší produkt: ${mostExpensiveProduct.nazev} - Cena: ${mostExpensiveProduct.cenaZaKus} Kč/kus`);
}

function filterProductsByQuantity() {
    const filterQuantityInput = document.getElementById('filterQuantity');
    const quantity = parseInt(filterQuantityInput.value, 10);
    
    const filteredProducts = products.filter(product => product.pocetNaSklade < quantity);
    alert(`Produkty s méně než ${quantity} kusy na skladě:\n${filteredProducts.map(product => product.nazev).join(', ')}`);
}

function calculateTotalValue() {
    const totalValue = products.reduce((sum, product) => sum + (product.cenaZaKus * product.pocetNaSklade), 0);
    alert(`Celková hodnota zásob: ${totalValue} Kč`);
}

function updateQuantity(productName) {
    const quantityInput = document.getElementById(`quantity-${productName}`);
    const newQuantity = parseInt(quantityInput.value, 10);

    const product = products.find(product => product.nazev === productName);
    if (product) {
        product.pocetNaSklade += newQuantity;
        displayProducts();
        quantityInput.value = 0;
    }
}

displayProducts();