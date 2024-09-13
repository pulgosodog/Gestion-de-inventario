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

// Function to generate a unique ID for each product
function generateUniqueId() {
    return '_' + Math.random().toString(36).substr(2, 9);
}

// Function to save a product to localStorage
function saveProductToLocalStorage(product) {
    const existingProductIndex = productLibrary.findIndex(p => p.id === product.id);
    if (existingProductIndex > -1) {
        productLibrary[existingProductIndex] = product;
    } else {
        productLibrary.push(product);
    }
    localStorage.setItem('productsStorage', JSON.stringify(productLibrary));
}

// Handle 'Add Product' form submission
document.getElementById('add-product-form').addEventListener('submit', (event) => {
    event.preventDefault();

    const nombre = document.getElementById('product-name').value;
    const cantidad = document.getElementById('product-quantity').value;
    const alerta = document.getElementById('product-alert').value;
    const categoria = document.getElementById('product-category').value;
    const precio = document.getElementById('product-price').value;

    // Generate a unique ID for the new product
    const product = { id: generateUniqueId(), nombre, cantidad, alerta, categoria, precio };

    // Save product and insert it into the product list
    saveProductToLocalStorage(product);
    insertProductHtml(product);

    // Clear form fields after submission
    document.getElementById('product-name').value = '';
    document.getElementById('product-quantity').value = '';
    document.getElementById('product-alert').value = '';
    document.getElementById('product-category').value = '';
    document.getElementById('product-price').value = '';
});

// Function to hide/show product list and buttons (Remove and Actualizar)
function toggleProductVisibility(productDiv, isHidden) {
    const ul = productDiv.querySelector('ul');
    const buttons = productDiv.querySelectorAll('button');

    ul.style.display = isHidden ? 'none' : 'flex'; // Hide or show product ul
    buttons.forEach(button => button.style.display = isHidden ? 'none' : 'inline-block'); // Hide or show buttons
}

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
        <button class="update-btn">Actualizar</button>
        <button class="remove-btn">Remover</button>
        <form class="update-form" style="display:none;">
            <input type="number" class="update-quantity" value="${product.cantidad}">
            <input type="number" class="update-alert" value="${product.alerta}">
            <input type="text" class="update-category" value="${product.categoria}">
            <input type="number" step="0.01" class="update-price" value="${product.precio}">
            <input type="submit" value="Guardar cambios">
        </form>
    `;

    // Add event listener for the "Remove" button
    productDiv.querySelector('.remove-btn').addEventListener('click', () => {
        removeProduct(product);
        productDiv.remove();
    });

    // Add event listener for the "Actualizar" button
    productDiv.querySelector('.update-btn').addEventListener('click', () => {
        const updateForm = productDiv.querySelector('.update-form');
        toggleProductVisibility(productDiv, true); // Hide product details and buttons
        updateForm.style.display = 'flex'; // Show update form
    });

    // Add event listener for the "Save Changes" button within the update form
    productDiv.querySelector('.update-form').addEventListener('submit', (event) => {
        event.preventDefault();

        const updatedProduct = {
            id: product.id,
            nombre: product.nombre,
            cantidad: event.target.querySelector('.update-quantity').value,
            alerta: event.target.querySelector('.update-alert').value,
            categoria: event.target.querySelector('.update-category').value,
            precio: event.target.querySelector('.update-price').value
        };

        saveProductToLocalStorage(updatedProduct);
        toggleProductVisibility(productDiv, false); // Show product details and buttons again
        productDiv.querySelector('.update-form').style.display = 'none'; // Hide update form
        
        // Update the HTML to reflect the changes
        productDiv.querySelector('ul').innerHTML = `
            <li>Producto: ${updatedProduct.nombre}</li>
            <img src="images/or.png" alt="">
            <li>Precio: $${updatedProduct.precio}</li>
            <img src="images/or.png" alt="">
            <li>Cantidad: ${updatedProduct.cantidad} ${updatedProduct.cantidad < updatedProduct.alerta ? '<span class="alerta">Alerta</span>' : ''}</li>
            <img src="images/or.png" alt="">
            <li>Categoría: ${updatedProduct.categoria}</li>
        `;

        // Update the product in the productLibrary
        const productIndex = productLibrary.findIndex(p => p.id === updatedProduct.id);
        if (productIndex > -1) {
            productLibrary[productIndex] = updatedProduct;
        }
    });

    productList.appendChild(productDiv);
}

// Function to remove a product from localStorage
function removeProduct(productToRemove) {
    productLibrary = productLibrary.filter(product => product.id !== productToRemove.id);
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
                <button class="update-btn">Actualizar</button>
                <button class="remove-btn">Remover</button>
                <form class="update-form" style="display:none;">
                    <input type="number" class="update-quantity" value="${product.cantidad}">
                    <input type="number" class="update-alert" value="${product.alerta}">
                    <input type="text" class="update-category" value="${product.categoria}">
                    <input type="number" step="0.01" class="update-price" value="${product.precio}">
                    <input type="submit" value="Guardar Cambios">
                </form>
            `;

            // Add event listener for the "Remove" button
            productDiv.querySelector('.remove-btn').addEventListener('click', () => {
                removeProduct(product);
                productDiv.remove();
            });

            // Add event listener for the "Actualizar" button
            productDiv.querySelector('.update-btn').addEventListener('click', () => {
                const updateForm = productDiv.querySelector('.update-form');
                toggleProductVisibility(productDiv, true); // Hide product details and buttons
                updateForm.style.display = 'flex'; // Show update form
            });

            // Add event listener for the "Save Changes" button within the update form
            productDiv.querySelector('.update-form').addEventListener('submit', (event) => {
                event.preventDefault();

                const updatedProduct = {
                    id: product.id,
                    nombre: product.nombre,
                    cantidad: event.target.querySelector('.update-quantity').value,
                    alerta: event.target.querySelector('.update-alert').value,
                    categoria: event.target.querySelector('.update-category').value,
                    precio: event.target.querySelector('.update-price').value
                };

                saveProductToLocalStorage(updatedProduct);
                toggleProductVisibility(productDiv, false); // Show product details and buttons again
                productDiv.querySelector('.update-form').style.display = 'none'; // Hide update form

                // Update the HTML to reflect the changes
                productDiv.querySelector('ul').innerHTML = `
                    <li>Producto: ${updatedProduct.nombre}</li>
                    <img src="images/or.png" alt="">
                    <li>Precio: $${updatedProduct.precio}</li>
                    <img src="images/or.png" alt="">
                    <li>Cantidad: ${updatedProduct.cantidad} ${updatedProduct.cantidad < updatedProduct.alerta ? '<span class="alerta">Alerta</span>' : ''}</li>
                    <img src="images/or.png" alt="">
                    <li>Categoría: ${updatedProduct.categoria}</li>
                `;

                // Update the product in the productLibrary
                const productIndex = productLibrary.findIndex(p => p.id === updatedProduct.id);
                if (productIndex > -1) {
                    productLibrary[productIndex] = updatedProduct;
                }
            });

            searchResultsDiv.appendChild(productDiv);
        });
    } else {
        searchResultsDiv.innerHTML = '<p>No se encontraron productos.</p>';
    }
});
