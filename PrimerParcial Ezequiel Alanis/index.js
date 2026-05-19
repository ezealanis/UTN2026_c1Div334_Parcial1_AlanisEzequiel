const listaProductos = [
{"id":1,"nombre":"Armonía","categoria":"hamburguesas","precio":12000,"descripcion":"Doble medallón de carne, queso cheddar, queso roquefort, huevo frito y pan con queso gratinado.","imagen":"./assets/hamburguesas/burga-1.jpg"},
{"id":2,"nombre":"Doble batalla","categoria":"hamburguesas","precio":15000,"descripcion":"Doble medallón de carne, doble queso cheddar, doble beacon, cebolla caramelizada y pan con semillas de sésamo.","imagen":"./assets/hamburguesas/burga-2.jpg"},
{"id":3,"nombre":"Clásica Law","categoria":"hamburguesas","precio":9000,"descripcion":"Medallón de carne, queso cheddar, panceta, cebolla crispy, salsa barbacoa, tomate, lechuga y pan con semillas de sésamo.","imagen":"./assets/hamburguesas/burga-3.jpg"},
{"id":4,"nombre":"Exotically","categoria":"hamburguesas","precio":16500,"descripcion":"Medallón de carne, doble queso roquefort, rúcula, cebolla caramelizada, tomate, hongo portobello salteado y pan brioche con semillas.","imagen":"./assets/hamburguesas/burga-4.jpg"},
{"id":5,"nombre":"La Bestia","categoria":"hamburguesas","precio":19000,"descripcion":"Quíntuple medallón de carne, 5 capas de cheddar, panceta en cada piso, cheddar en cada piso, queso especial derretido y pan con queso gratinado.","imagen":"./assets/hamburguesas/burga-5.jpg"},
{"id":6,"nombre":"Nuggy Chop","categoria":"hamburguesas","precio":14500,"descripcion":"Doble medallón de carne, doble queso cheddar, doble panceta, cebolla caramelizada, Nuggets de muzzarella y pan con queso gratinado.","imagen":"./assets/hamburguesas/burga-6.jpg"},
{"id":7,"nombre":"Agua sin gas (1L)","categoria":"bebidas","precio":2000,"descripcion":"Botella 1 litro agua Villavicencio sin gas.","imagen":"./assets/bebidas/agua-sin-gas.png"},
{"id":8,"nombre":"Agua con gas (1L)","categoria":"bebidas","precio":1500,"descripcion":"Botella 1 litro agua Saldan con gas.","imagen":"./assets/bebidas/agua-con-gas.png"},
{"id":9,"nombre":"Aquarius Manzana (3L)","categoria":"bebidas","precio":5500,"descripcion":"Botella 3 litros agua saborizada Aquarius de manzana.","imagen":"./assets/bebidas/aquarius-manzana.png"},
{"id":10,"nombre":"Aquarius Pomelo (3L)","categoria":"bebidas","precio":5500,"descripcion":"Botella 3 litros agua saborizada Aquarius de pomelo.","imagen":"./assets/bebidas/aquarius-pomelo.png"},
{"id":11,"nombre":"Aquarius Naranja (3L)","categoria":"bebidas","precio":5500,"descripcion":"Botella 3 litros agua saborizada Aquarius de naranja.","imagen":"./assets/bebidas/aquarius-naranja.png"},
{"id":12,"nombre":"Coca-Cola (1.5L)","categoria":"bebidas","precio":4500,"descripcion":"Botella 1.5 litros de Coca-Cola.","imagen":"./assets/bebidas/coca-cola.png"},
{"id":13,"nombre":"Sprite (1.5L)","categoria":"bebidas","precio":4500,"descripcion":"Botella 1.5 litros de Sprite.","imagen":"./assets/bebidas/sprite.png"},
{"id":14,"nombre":"Campari","categoria":"tragos","precio":6000,"descripcion":"Vaso de Campari y jugo de naranja.","imagen":"./assets/tragos/campari.png"},
{"id":15,"nombre":"Fernet","categoria":"tragos","precio":7000,"descripcion":"Vaso de Coca-Cola y Fernet.","imagen":"./assets/tragos/fernet.png"},
{"id":16,"nombre":"Gancia","categoria":"tragos","precio":6000,"descripcion":"Vaso de Gancia y Sprite.","imagen":"./assets/tragos/gancia.png"},
{"id":17,"nombre":"Ron Havana Club","categoria":"tragos","precio":9000,"descripcion":"Vaso de Ron y Coca-Cola.","imagen":"./assets/tragos/ron.png"},
{"id":18,"nombre":"Daiquiri","categoria":"tragos","precio":7000,"descripcion":"Vaso de Daiquiri.","imagen":"./assets/tragos/daiquiri.png"}]

let carrito = obtenerCarrito();

//--- Funcion que obtiene el carrito del LocalStorage, lo parsea a un array y lo retorna ---//
function obtenerCarrito() 
{
    // Parsea el texto a formato JSON y lo retorna.
    return JSON.parse(localStorage.getItem("carrito")) || [];
}

//--- Funcion que guarda el carrito recibido al LocalStorage, previamente transformado a string ---//
function guardarCarrito(carrito) 
{
    // Muestra el carrito en la consola, lo convierte a texto y lo guarda en el localStorage
    console.log(carrito);
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

function sumarAlCarrito(e) 
{
    //--- Obtengo la referencia al elemento clickeado desde en base al evento (Propiedad exclusivamente de todos los Events) ---//
    let elementoClickeado = e.target;
    let liProducto = elementoClickeado.closest("li");
    let productoClickeado = liProducto.querySelector(".nombre-producto").innerText;

    //valido si el producto existe en el carrito
    let productoExiste = carrito.find(prod => prod.nombre === productoClickeado)

    //si existe le sumo uno a la cantidad, sino lo agrego al carrito con cantidad 1 y lanzo el alert()
    if(productoExiste){
        productoExiste.cantidad++;
    }else{
        let productoNuevo = listaProductos.find(prod => prod.nombre === productoClickeado);
        carrito.push({...productoNuevo, cantidad:1});
        alert(`Un/una: ${productoNuevo.nombre} fue agregado al carrito.`);
    }

    guardarCarrito(carrito);
}

function restarDelCarrito(e) 
{
    //--- Obtengo la referencia al elemento clickeado desde en base al evento (Propiedad exclusivamente de todos los Events) ---//
    let elementoClickeado = e.target;
    let liProducto = elementoClickeado.closest("li");
    let productoClickeado = liProducto.querySelector(".nombre-producto").innerText;

    let productoExiste = carrito.find(prod => prod.nombre === productoClickeado)

    // Si se apreta en el boton de eliminar un producto con el carrito vacio, se muestra el mensaje
    if(!carrito.length){
        alert(`El carrito esta vacio.`);
    }

    // Si el producto existe y tiene cantidad para restar, resta 1 y muestra el mensaje
    // Si llega a 0 lo elimina del carrito y muestra el mensaje de que ya no existe ese producto en el carrito.
    if(productoExiste && productoExiste.cantidad > 0){
        productoExiste.cantidad--; 
        alert(`Un/una ${productoExiste.nombre} fue eliminado del carrito.`);

        if(productoExiste.cantidad === 0){
            carrito = carrito.filter(prod => prod.nombre !== productoClickeado);
            alert(`No hay mas ${productoExiste.nombre} en el carrito.`);
        }   
    }

    guardarCarrito(carrito);
}

//--- [EVENTOS] Asociacion del evento "click" a los botones "+" y "-" con la funcion manejadora del evento ---//
window.addEventListener("DOMContentLoaded", () => 
{
    const botonesSumar = document.querySelectorAll(".btn-sumar-a-carrito");
    const botonesRestar = document.querySelectorAll(".btn-restar-a-carrito");

    botonesSumar.forEach(btn => btn.addEventListener("click", sumarAlCarrito));
    botonesRestar.forEach(btn => btn.addEventListener("click", restarDelCarrito));
});
