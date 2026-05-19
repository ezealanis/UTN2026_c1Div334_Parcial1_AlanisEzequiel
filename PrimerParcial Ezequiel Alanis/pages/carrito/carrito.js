

function actualizarTotal(){
    
    const total = document.getElementById("valor-final");
    const carrito = obtenerCarrito();

    // Se usa la funcion reduce para recorrer el carrito y sumar el total
    let totalCarrito = carrito.reduce((suma, producto) => suma + (producto.precio * producto.cantidad), 0);
    // Mostramos el total en el html
    total.innerText = `El valor final a pagar es: $${totalCarrito}`;
}

function obtenerCarrito() 
{
    return carrito = JSON.parse(localStorage.getItem("carrito")) || [];
}

function cargarProductosCarrito() 
{
    let tabla = document.getElementById("tabla-carrito");
    let carrito = obtenerCarrito();

    // Guardo la cabecera de la tabla para que cuando se borre el carrito no desaparezca todo
    let htmlCarrito = `<tr class="fila-header-carrito">
                            <td class="celda-header-tabla-carrito">Nombre del producto</td>
                            <td class="celda-header-tabla-carrito">Cantidad</td>
                            <td class="celda-header-tabla-carrito">Precio unitario</td>
                        </tr>`;

    // Recorro el carrito para armar el html a mostrar
    carrito.forEach(prod => {
        htmlCarrito += `<tr>
                            <td>${prod.nombre}</td>
                            <td>${prod.cantidad}</td>
                            <td>${prod.precio}</td>
                        </tr>`
    });

    tabla.innerHTML = htmlCarrito;
    actualizarTotal();
}

function limpiarCarrito() 
{
    // Vacio el carrito y actualizo todo
    let carritoVacio = [];
    localStorage.setItem("carrito", JSON.stringify(carritoVacio));
    cargarProductosCarrito();
    actualizarTotal();
}

// Asociar evento al botón cuando la página carga
window.addEventListener("DOMContentLoaded", () =>
{
    cargarProductosCarrito();
    document.querySelector(".btn-limpiar-carrito").addEventListener("click", limpiarCarrito);
});