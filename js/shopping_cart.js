// script.js

// Array para almacenar los productos en el carrito
let carrito = [];

// Función para agregar un producto al carrito
function agregarAlCarrito(nombre, precio, cantidad = 1) {
    const productoExistente = carrito.find(item => item.nombre === nombre);

    if (productoExistente) {
        productoExistente.cantidad += cantidad;
    } else {
        carrito.push({ nombre, precio, cantidad });
    }

    actualizarCarrito();
    guardarCarritoEnLocalStorage();
}

// Función para actualizar la interfaz del carrito
function actualizarCarrito() {
    const carritoElement = document.getElementById('carrito');
    const totalElement = document.getElementById('total');

    carritoElement.innerHTML = '';

    let total = 0;

    carrito.forEach((item, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            ${item.nombre} - $${item.precio} x ${item.cantidad}
            <button onclick="eliminarDelCarrito(${index})">Eliminar</button>
        `;
        carritoElement.appendChild(li);

        total += item.precio * item.cantidad;
    });

    totalElement.textContent = total.toFixed(2);
}

// Función para eliminar un producto del carrito
function eliminarDelCarrito(index) {
    carrito.splice(index, 1);
    actualizarCarrito();
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

// Función para finalizar la compra
function finalizarCompra() {
    if (carrito.length === 0) {
        alert("El carrito está vacío. Agrega productos antes de finalizar la compra.");
        return;
    }

    alert("¡Compra finalizada con éxito! Gracias por tu compra.");
    vaciarCarrito();
}

// Función para vaciar el carrito
function vaciarCarrito() {
    carrito = [];
    actualizarCarrito();
    guardarCarritoEnLocalStorage();
}

// Cargar el carrito al iniciar la página
document.addEventListener('DOMContentLoaded', cargarCarritoDesdeLocalStorage);

// Asignar eventos al botón "Comprar"
document.addEventListener('DOMContentLoaded', () => {
    const comprarBtn = document.getElementById('comprar-btn');
    if (comprarBtn) {
        comprarBtn.addEventListener('click', () => {
            const nombre = document.querySelector('.details h2').textContent;
            const precio = parseFloat(document.querySelector('.details h3').textContent.replace('$', ''));
            const cantidad = parseInt(document.querySelector('.select-quantity input').value);

            agregarAlCarrito(nombre, precio, cantidad);
            document.getElementById('carrito-modal').style.display = 'flex';
        });
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