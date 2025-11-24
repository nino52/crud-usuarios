// Array para almacenar los datos (simulando una base de datos)
let products = [];
let nextId = 1; // Contador para asignar IDs únicos

// Función para inicializar listeners de eventos
document.addEventListener('DOMContentLoaded', () => {
    console.log('¡Aplicación CRUD cargada correctamente!');
    
    // Asignar el listener de envío al formulario
    document.getElementById('product-form').addEventListener('submit', handleFormSubmit);
    
    // Mostrar la lista inicial
    renderProducts();
});

// Función que maneja el envío del formulario para Crear (C)
function handleFormSubmit(event) {
    event.preventDefault(); // Detiene el comportamiento de envío estándar del formulario
    
    const nameInput = document.getElementById('name');
    const priceInput = document.getElementById('price');
    
    const name = nameInput.value.trim();
    const price = parseFloat(priceInput.value);
    
    // Validación básica
    if (name && !isNaN(price) && price > 0) {
        // CREAR (Create)
        const newProduct = {
            id: nextId++,
            name: name,
            price: price
        };
        
        products.push(newProduct);
        console.log('Producto Creado:', newProduct);
        
        // Limpiar el formulario y actualizar la lista
        nameInput.value = '';
        priceInput.value = '';
        renderProducts(); // Llama a la función de lectura para refrescar la tabla
    } else {
        alert('Por favor, ingresa un nombre y un precio válido (mayor a cero).');
    }
}

// Función que renderiza la lista de productos (función de Read, incompleta en esta feature)
function renderProducts() {
    const tbody = document.getElementById('product-table').querySelector('tbody');
    tbody.innerHTML = ''; // Limpia el contenido actual de la tabla

    if (products.length === 0) {
        tbody.innerHTML = '<tr><td colspan="4" style="text-align: center;">No hay productos disponibles. Usa el formulario para agregar uno.</td></tr>';
    } else {
        products.forEach(product => {
            const row = tbody.insertRow();
            row.innerHTML = `
                <td>${product.id}</td>
                <td>${product.name}</td>
                <td>$${product.price.toFixed(2)}</td>
                <td>
                    <button class="edit-btn" data-id="${product.id}" disabled>Editar</button>
                    <button class="delete-btn" data-id="${product.id}" disabled>Eliminar</button>
                </td>
            `;
        });
    }
}