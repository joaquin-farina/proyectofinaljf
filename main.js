document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("formularioIngreso");

    loginForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;

        
        fetch("./users.json")
            .then((response) => response.json())
            .then((data) => {
                const users = data.users;

                
                const user = users.find((user) => user.username === username && user.password === password);

                if (user) {
                    
                    window.location.href = "./pages/comics.html";
                } else {
                    alert("Credenciales incorrectas. Inténtelo de nuevo.");
                }
            })
            .catch((error) => {
                console.error("Error al cargar los usuarios:", error);
            });
    });
});


class Producto {
    constructor(nombre, precio, imagen) {
        this.nombre = nombre;
        this.precio = precio;
        this.imagen = imagen;
    }
}

const productos = [
    new Producto("Superman El Nuevo Mundo", 5000, "../images/superman.webp"),
    new Producto("Marvel Legacy Daredevil", 4200, "../images/dd.webp"),
    new Producto("Spiderman", 7000, "../images/spiderman.webp"),
    new Producto("Civil War parte 1", 5200, "../images/civilwar.webp"),
    new Producto("Batman la broma asesina", 3800, "../images/comicbatman.webp"),
    new Producto("DC Flash", 4000, "../images/flash.webp"),
    new Producto("Deadpool Clasico Vol. 3", 4800, "../images/deadpool.webp"),
    new Producto("Justice League Vol. 2", 6300, "../images/jl.webp"),
    
];

const calcularTotal = (cantidad, precio) => cantidad * precio;

const productosContainer = document.querySelector('.productos');
const carritoLista = document.querySelector('.carrito-lista');
const totalElement = document.getElementById('total');
const finalizarCompraButton = document.getElementById('finalizar-compra');

function mostrarProductos() {
    productosContainer.innerHTML = productos.map((producto, index) => `
        <div class="producto">
            <img src="${producto.imagen}" alt="${producto.nombre}">
            <span>${producto.nombre} - $${producto.precio}</span>
            <input type="number" class="cantidad" min="1" value="1">
            <button class="agregar-carrito" data-index="${index}">Agregar al carrito</button>
        </div>
    `).join('');
}

function actualizarCarrito() {
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    carritoLista.innerHTML = carrito.map((item, index) => `
        <li>
            <img src="${item.imagen}" alt="${item.nombre}" class="miniatura">
            ${item.nombre} - Cantidad: ${item.cantidad} - Subtotal: $${item.subtotal}
            <button class="eliminar-producto" data-index="${index}">Eliminar</button>
        </li>
    `).join('');

    const total = carrito.reduce((acc, item) => acc + item.subtotal, 0);
    totalElement.textContent = total;
}
function agregarAlCarrito(event) {
    if (event.target.classList.contains('agregar-carrito')) {
        const index = parseInt(event.target.dataset.index);
        const cantidad = parseInt(event.target.previousElementSibling.value);
        const productoSeleccionado = productos[index];
        const subtotal = calcularTotal(cantidad, productoSeleccionado.precio);

        const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
        carrito.push({
            nombre: productoSeleccionado.nombre,
            cantidad: cantidad,
            subtotal: subtotal,
            imagen: productoSeleccionado.imagen
        });
        localStorage.setItem("carrito", JSON.stringify(carrito));

        actualizarCarrito();
    }
}
function mostrarNotificacion() {
    notificacion.style.display = 'block';

    
    setTimeout(function () {
        notificacion.style.display = 'none';
    }, 3000);
}
function eliminarDelCarrito(event) {
    if (event.target.classList.contains('eliminar-producto')) {
        const index = parseInt(event.target.dataset.index);

        const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
        carrito.splice(index, 1);
        localStorage.setItem("carrito", JSON.stringify(carrito));

        actualizarCarrito();
    }
}

function finalizarCompra() {
        const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    
    if (carrito.length > 0) {
        
        Swal.fire({
            icon: 'success',
            title: 'Gracias por elegirnos',
            text: 'Nos contactaremos a la brevedad para confirmar el envio',
            confirmButtonText: 'Aceptar',
            confirmButtonColor: "#2e4f4f"
        }).then((result) => {
            
            if (result.isConfirmed) {
                
            }
        });

        localStorage.removeItem("carrito");
        actualizarCarrito();
    } else {
        
        Swal.fire({
            icon: 'error',
            title: 'Oops!',
            text: 'Primero selecciona un producto',
            confirmButtonText: 'Aceptar',
            confirmButtonColor: "#2e4f4f"
        });
    }
}


mostrarProductos();
actualizarCarrito();
productosContainer.addEventListener('click', agregarAlCarrito);
carritoLista.addEventListener('click', eliminarDelCarrito);
finalizarCompraButton.addEventListener('click', finalizarCompra);

 