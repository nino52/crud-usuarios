// Array para almacenar los datos (simulando una base de datos)
let products = [];
let nextId = 1; // Contador para asignar IDs únicos

// >>> VARIABLES DE ESTADO PARA EDITAR <<<
let isEditing = false; // Indica si el formulario está en modo edición
let editingId = null; // Almacena el ID del producto que se está editando
// >>> FIN VARIABLES DE ESTADO <<<

// Función para inicializar listeners de eventos
document.addEventListener('DOMContentLoaded', () => {
    console.log('¡Aplicación CRUD cargada correctamente!');
    
    // 1. Asignar el listener de envío al formulario (maneja Crear Y Editar)
    document.getElementById('product-form').addEventListener('submit', handleFormSubmit);
    
    // 2. Mostrar la lista inicial
    renderProducts();
});

// FUNCIÓN CLAVE: Maneja el envío del formulario para CREAR (C) o ACTUALIZAR (U)
function handleFormSubmit(event) {
    event.preventDefault(); // Detiene el comportamiento de envío estándar del formulario
    
    const nameInput = document.getElementById('name');
    const priceInput = document.getElementById('price');
    const saveButton = document.querySelector('#product-form button'); // Referencia al botón de guardar
    
    const name = nameInput.value.trim();
    const price = parseFloat(priceInput.value);
    
    // Validación básica
    if (name && !isNaN(price) && price > 0) {
        
        if (isEditing) {
            // >>> RUTA DE ACTUALIZAR (Update)
            products = products.map(p => {
                // Si encontramos el producto, lo actualizamos con los nuevos valores
                if (p.id === editingId) {
                    return { ...p, name: name, price: price };
                }
                return p;
            });
            console.log('Producto Editado:', editingId);

            // Restablecer el estado de edición
            isEditing = false;
            editingId = null;
            saveButton.textContent = 'Guardar Producto'; // Vuelve al texto de "Crear"
            
        } else {
            // >>> RUTA DE CREAR (Create)
            const newProduct = {
                id: nextId++,
                name: name,
                price: price
            };
            products.push(newProduct);
            console.log('Producto Creado:', newProduct);
        }
        
        // Limpiar el formulario y actualizar la lista después de la operación
        nameInput.value = '';
        priceInput.value = '';
        renderProducts(); // Refresca la tabla
    } else {
        alert('Por favor, ingresa un nombre y un precio válido (mayor a cero).');
    }
}

// FUNCIÓN PARA LA LECTURA (R): Renderiza la lista y asigna listeners
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
                    <button class="edit-btn" data-id="${product.id}">Editar</button>
                    <button class="delete-btn" data-id="${product.id}">Eliminar</button>
                </td>
            `;
        });
        
        // Asignar listeners de evento a los nuevos botones de Editar
        document.querySelectorAll('.edit-btn').forEach(button => {
            button.addEventListener('click', startEdit);
        });
        
        // >>> NUEVO: Asignar listeners de evento a los nuevos botones de Eliminar
        document.querySelectorAll('.delete-btn').forEach(button => {
            button.addEventListener('click', deleteProduct);
        });
    }
}

// FUNCIÓN NUEVA: Inicia el modo edición (carga datos al formulario)
function startEdit(event) {
    const idToEdit = parseInt(event.target.dataset.id);
    const product = products.find(p => p.id === idToEdit);

    if (product) {
        // Cargar datos del producto seleccionado al formulario
        document.getElementById('name').value = product.name;
        document.getElementById('price').value = product.price;

        // Establecer el estado de edición global
        isEditing = true;
        editingId = idToEdit;

        // Cambiar el texto del botón para que el usuario sepa que está actualizando
        document.querySelector('#product-form button').textContent = 'Actualizar Producto';
    }
}

// >>> FUNCIÓN NUEVA: ELIMINA UN PRODUCTO (Delete)
function deleteProduct(event) {
    // Pedir confirmación antes de eliminar
    if (!confirm('¿Estás seguro de que quieres eliminar este producto?')) {
        return;
    }
    
    const idToDelete = parseInt(event.target.dataset.id);
    
    // FILTRAR (Delete): Crea un nuevo array excluyendo el producto con el ID a eliminar
    products = products.filter(p => p.id !== idToDelete);

    console.log('Producto Eliminado:', idToDelete);
    
    // Actualizar la lista
    renderProducts();
}