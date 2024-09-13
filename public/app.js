// Initialize storage for products
let productLibrary = [];

// Load products from localStorage when the page loads
document.addEventListener('DOMContentLoaded', () => {
    const storedProducts = localStorage.getItem('productsStorage');
    if (storedProducts) {
        productLibrary = JSON.parse(storedProducts);
        productLibrary.forEach(product => insertProductHtml(product));
    }
});

// Function to save a product to localStorage
function saveProductToLocalStorage(product) {
    productLibrary.push(product);
    localStorage.setItem('productsStorage', JSON.stringify(productLibrary));
}

// Handle 'Add Product' form submission
document.getElementById('add-product-form').addEventListener('submit', (event) => {
    event.preventDefault();

    const nombre = document.getElementById('product-name').value;
    const cantidad = document.getElementById('product-quantity').value;
    const alerta = document.getElementById('product-alert').value;
    const categoria = document.getElementById('product-category').value; // New Category input
    const precio = document.getElementById('product-price').value;

    const product = { nombre, cantidad, alerta, categoria, precio }; // Added category to product object

    // Save product and insert it into the product list
    saveProductToLocalStorage(product);
    insertProductHtml(product);

    // Clear form fields after submission
    document.getElementById('product-name').value = '';
    document.getElementById('product-quantity').value = '';
    document.getElementById('product-alert').value = '';
    document.getElementById('product-category').value = ''; // Clear new Category field
    document.getElementById('product-price').value = '';
});

// Function to insert a product into the product list section
function insertProductHtml(product) {
    const productList = document.getElementById('product-list');
    const productDiv = document.createElement('div');
    productDiv.classList.add('product');

    // Check if product quantity is less than the alert level and display "Alerta"
    const alertaText = product.cantidad < product.alerta ? '<span class="alerta">Alerta</span>' : '';

    // Create HTML structure for the product using ul and li elements, with <img> as separator
    productDiv.innerHTML = `
        <ul>
                    <li>Producto: ${product.nombre}</li>
                    <img src="images/or.png" alt="">
                    <li>Precio: $${product.precio}</li>
                    <img src="images/or.png" alt="">
                    <li>Cantidad: ${product.cantidad} ${alertaText}</li>
                    <img src="images/or.png" alt="">
                    <li>Categoría: ${product.categoria}</li>
        </ul>
        <button class="remove-btn">Remove</button>
    `;

    // Add event listener for the "Remove" button
    productDiv.querySelector('.remove-btn').addEventListener('click', () => {
        removeProduct(product);
        productDiv.remove();
    });

    productList.appendChild(productDiv);
}

// Function to remove a product from localStorage
function removeProduct(productToRemove) {
    productLibrary = productLibrary.filter(product => product.nombre !== productToRemove.nombre);
    localStorage.setItem('productsStorage', JSON.stringify(productLibrary));
}

// Handle 'Search Product' form submission
document.getElementById('search-product-form').addEventListener('submit', (event) => {
    event.preventDefault();

    const searchName = document.getElementById('search-name').value.toLowerCase();
    const searchCategory = document.getElementById('search-category').value.toLowerCase();
    const searchResultsDiv = document.getElementById('search-results');
    searchResultsDiv.innerHTML = ''; // Clear previous search results

    const filteredProducts = productLibrary.filter(product => {
        return product.nombre.toLowerCase().includes(searchName) && product.categoria.toLowerCase().includes(searchCategory);
    });

    if (filteredProducts.length > 0) {
        filteredProducts.forEach(product => {
            const productDiv = document.createElement('div');
            productDiv.classList.add('product');

            // Check if product quantity is less than the alert level and display "Alerta"
            const alertaText = product.cantidad < product.alerta ? '<span class="alerta">Alerta</span>' : '';

            productDiv.innerHTML = `
        <ul>
                    <li>Producto: ${product.nombre}</li>
                    <img src="images/or.png" alt="">
                    <li>Precio: $${product.precio}</li>
                    <img src="images/or.png" alt="">
                    <li>Cantidad: ${product.cantidad} ${alertaText}</li>
                    <img src="images/or.png" alt="">
                    <li>Categoría: ${product.categoria}</li>
        </ul>
        <button class="remove-btn">Remove</button>
            `;

            searchResultsDiv.appendChild(productDiv);
        });
    } else {
        searchResultsDiv.innerHTML = `<p>No se encontraron productos.</p>`;
    }

    // Clear search form fields after submission
    document.getElementById('search-name').value = '';
    document.getElementById('search-category').value = '';
});
