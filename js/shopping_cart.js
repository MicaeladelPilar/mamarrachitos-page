// script.js

// Array para almacenar los productos en el carrito
let carrito = [];

// Función para agregar un producto al carrito
function agregarAlCarrito(nombre, precio, cantidad = 1) {
    // Verificar si el producto ya está en el carrito
    const productoExistente = carrito.find(item => item.nombre === nombre);

    if (productoExistente) {
        // Si ya existe, incrementar la cantidad
        productoExistente.cantidad += cantidad;
    } else {
        // Si no existe, agregarlo al carrito
        carrito.push({ nombre, precio, cantidad });
    }

    // Actualizar la interfaz del carrito
    actualizarCarrito();
    guardarCarritoEnLocalStorage();
}

// Función para actualizar la interfaz del carrito
function actualizarCarrito() {
    const carritoElement = document.getElementById('carrito');
    const totalElement = document.getElementById('total');

    // Limpiar el carrito antes de actualizarlo
    carritoElement.innerHTML = '';

    let total = 0;

    // Recorrer los productos en el carrito y mostrarlos
    carrito.forEach((item, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            ${item.nombre} - $${item.precio} x ${item.cantidad}
            <button onclick="eliminarDelCarrito(${index})">Eliminar</button>
        `;
        carritoElement.appendChild(li);

        // Calcular el total
        total += item.precio * item.cantidad;
    });

    // Mostrar el total
    totalElement.textContent = total.toFixed(2);
}

// Función para eliminar un producto del carrito
function eliminarDelCarrito(index) {
    carrito.splice(index, 1); // Eliminar el producto del array
    actualizarCarrito(); // Actualizar la interfaz
    guardarCarritoEnLocalStorage();
}

// Función para guardar el carrito en localStorage
function guardarCarritoEnLocalStorage() {
    localStorage.setItem('carrito', JSON.stringify(carrito));
}

// Función para cargar el carrito desde localStorage
function cargarCarritoDesdeLocalStorage() {
    const carritoGuardado = localStorage.getItem('carrito');
    if (carritoGuardado) {
        carrito = JSON.parse(carritoGuardado);
        actualizarCarrito();
    }
}

// Asignar eventos al botón "Comprar"
document.addEventListener('DOMContentLoaded', () => {
    // Cargar el carrito desde localStorage al iniciar la página
    cargarCarritoDesdeLocalStorage();

    // Asignar evento al botón "Comprar"
    const comprarBtn = document.getElementById('comprar-btn');
    if (comprarBtn) {
        comprarBtn.addEventListener('click', () => {
            // Capturar los detalles del producto
            const nombre = document.querySelector('.details h2').textContent;
            const precio = parseFloat(document.querySelector('.details h3').textContent.replace('$', ''));
            const cantidad = parseInt(document.querySelector('.select-quantity input').value);

            // Agregar el producto al carrito
            agregarAlCarrito(nombre, precio, cantidad);

            // Mostrar el modal del carrito
            document.getElementById('carrito-modal').style.display = 'flex';
        });
    }
});

// Mostrar el modal del carrito
document.getElementById('carrito-btn').addEventListener('click', () => {
    document.getElementById('carrito-modal').style.display = 'flex';
});

// Ocultar el modal del carrito
document.getElementById('carrito-cerrar').addEventListener('click', () => {
    document.getElementById('carrito-modal').style.display = 'none';
});

// Ocultar el modal si se hace clic fuera del contenido
window.addEventListener('click', (event) => {
    const modal = document.getElementById('carrito-modal');
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});
// Mostrar el modal del carrito al hacer clic en el ícono del carrito
document.getElementById('carrito-btn').addEventListener('click', () => {
    document.getElementById('carrito-modal').style.display = 'flex';
});

// Ocultar el modal del carrito al hacer clic en el botón de cerrar
document.getElementById('carrito-cerrar').addEventListener('click', () => {
    document.getElementById('carrito-modal').style.display = 'none';
});

// Ocultar el modal si se hace clic fuera del contenido
window.addEventListener('click', (event) => {
    const modal = document.getElementById('carrito-modal');
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});