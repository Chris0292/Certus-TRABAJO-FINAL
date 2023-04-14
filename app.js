//Establecemos nuestra lista de productos
const stockProductos = [
    {
        id: 1,
        marca: "IBANEZ",
        cantidad: 3,
        desc: "Ibanez - GRX70QAL TBB",
        precio: 1200,
        img: "https://cdn.shopify.com/s/files/1/0456/2652/3809/products/ibanez-grx70qal-tbb_300x.jpg?v=1670789683",
    },
    {
        id: 2,
        marca: "EPIPHONE",
        cantidad: 1,
        desc: "Epiphone - GRX70QAL Color TRB",
        precio: 1500,
        img: "https://cdn.shopify.com/s/files/1/0456/2652/3809/products/16858285_800_300x.jpg?v=1670788271",
    },
    {
        id: 3,
        marca: "GIBSON",
        cantidad: 1,
        desc: "Gibson - Custom Shop ’57 Les Paul Special",
        precio: 6000,
        img: "https://cdn.shopify.com/s/files/1/0456/2652/3809/products/1109184_1_300x.webp?v=1670026879",
    },
    {
        id: 4,
        marca: "GIBSON",
        cantidad: 1,
        desc: "Gibson - Usa Melody Maker Les Paul",
        precio: 4200,
        img: "https://cdn.shopify.com/s/files/1/0456/2652/3809/products/esp-ltd-ec-256-sw_300x.jpg?v=1670026721",
    },
    {
        id: 5,
        marca: "IBANEZ",
        cantidad: 1,
        desc: "Ibanez - SA360NQM-BMG",
        precio: 2000,
        img: "https://audiomusica.vtexassets.com/arquivos/ids/156870/SA360NQM3.jpg?v=637813423317400000",
    },
    {
        id: 6,
        marca: "FENDER",
        cantidad: 1,
        desc: "Fender - American Professional II Tele RW",
        precio: 2500,
        img: "https://images.musicstore.de/images/0640/fender-american-professional-ii-tele-rw-mercury-_1_GIT0054158-000.jpg",
    },
    {
        id: 7,
        marca: "GIBSON",
        cantidad: 1,
        desc: "Gibson SG61W00VENH1 SG Standard ’61 Sideways Vibrola",
        precio: 9000,
        img: "https://marinimport.com.pe/wp-content/uploads/2019/10/1-2.jpg",
    },
    {
        id: 8,
        marca: "FENDER",
        cantidad: 1,
        desc: "Fender - American Professional II Strat RW HSS",
        precio: 1800,
        img: "https://images.musicstore.de/images/0640/fender-american-professional-ii-strat-rw-hss-miami-blue-_1_GIT0054147-000.jpg",
    },
    {
        id: 9,
        marca: "FENDER",
        cantidad: 1,
        desc: "Fender - Brad Paisley Road Worn Esquire",
        precio: 3200,
        img: "https://images.musicstore.de/images/0960/fender-brad-paisley-road-worn-esquire_1_GIT0054121-000.jpg",
    },
    {
        id: 10,
        marca: "BC RICH",
        cantidad: 1,
        desc: "B.C.Rich - Best Avenger",
        precio: 1800,
        img: "https://amadeus123.com/wp-content/uploads/2021/05/ssobo-150x150.jpg",
    },
];
let carrito = [];

//atribuimos valores para las constantes que usaremos
const contenedor = document.querySelector("#contenedor");
const carritoContenedor = document.querySelector("#carritoContenedor");
const vaciarCarrito = document.querySelector("#vaciarCarrito");
const precioTotal = document.querySelector("#precioTotal");
const activarFuncion = document.querySelector("#activarFuncion");
const procesarCompra = document.querySelector("#procesarCompra");
const totalProceso = document.querySelector("#totalProceso");
const formulario = document.querySelector('#procesar-pago')

//se establece una funcion que activa un evento al hacer click 
if (activarFuncion) {
    activarFuncion.addEventListener("click", procesarPedido);
}

document.addEventListener("DOMContentLoaded", () => {
    carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    mostrarCarrito();
    document.querySelector("#activarFuncion").click(procesarPedido);
});
if (formulario) {
    formulario.addEventListener('submit', enviarCompra)
}


if (vaciarCarrito) {
    vaciarCarrito.addEventListener("click", () => {
        carrito.length = [];
        mostrarCarrito();
    });
}

//Evento para cuando queremos comprar sin items en el carrito
if (procesarCompra) {
    procesarCompra.addEventListener("click", () => {
        if (carrito.length === 0) {
            Swal.fire({
                title: "¡Tu carrito está vacio!",
                text: "Compra algo para continuar con la compra",
                icon: "error",
                confirmButtonText: "Aceptar",
            });
        } else {
            location.href = "compra.html";
        }
    });
}

//Agregamos los productos de nuestra lista al documento producto.html
stockProductos.forEach((prod) => {
    const { id, marca, precio, desc, img, cantidad } = prod;
    if (contenedor) {
        contenedor.innerHTML += `
      <div class="card mt-3" style="width: 18rem;">
      <img class="card-img-top mt-2" style="height: 14rem" src="${img}" alt="Card image cap">
      <div class="card-body">
        <h5 class="card-title">${marca}</h5>
        <p class="card-text">Precio: ${precio}</p>
        <p class="card-text">Descripcion: ${desc}</p>
        <p class="card-text">Cantidad: ${cantidad}</p>
        <button class="btn btn-primary" onclick="agregarProducto(${id})">Comprar Producto</button>
      </div>
    </div>
      `;
    }
});

const agregarProducto = (id) => {
    const existe = carrito.some(prod => prod.id === id)

    if (existe) {
        const prod = carrito.map(prod => {
            if (prod.id === id) {
                prod.cantidad++
            }
        })
    } else {
        const item = stockProductos.find((prod) => prod.id === id)
        carrito.push(item)
    }
    mostrarCarrito()

};

//Se realizan acciones para cada vez que se agregan productos o no, y se quiere realizar la compra
const mostrarCarrito = () => {
    const modalBody = document.querySelector(".modal .modal-body");
    if (modalBody) {
        modalBody.innerHTML = "";
        carrito.forEach((prod) => {
            const { id, marca, precio, desc, img, cantidad } = prod;
            console.log(modalBody);
            modalBody.innerHTML += `
        <div class="modal-contenedor">
          <div>
          <img class="img-fluid img-carrito" src="${img}"/>
          </div>
          <div>
          <p>Producto: ${marca}</p>
        <p>Precio: ${precio}</p>
        <p>Cantidad :${cantidad}</p>
        <button class="btn btn-danger"  onclick="eliminarProducto(${id})">Eliminar producto</button>
          </div>
        </div>
        
    
        `;
        });
    }

    if (carrito.length === 0) {
        console.log("Nada");
        modalBody.innerHTML = `
      <p class="text-center text-primary parrafo">¡Aun no agregaste nada!</p>
      `;
    } else {
        console.log("Algo");
    }
    carritoContenedor.textContent = carrito.length;

    if (precioTotal) {
        precioTotal.innerText = carrito.reduce(
            (acc, prod) => acc + prod.cantidad * prod.precio,
            0
        );
    }

    guardarStorage();
};

function guardarStorage() {
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

function eliminarProducto(id) {
    const juegoId = id;
    carrito = carrito.filter((juego) => juego.id !== juegoId);
    mostrarCarrito();
}
function procesarPedido() {
    carrito.forEach((prod) => {
        const listaCompra = document.querySelector("#lista-compra tbody");
        const { id, marca, precio, img, cantidad } = prod;
        if (listaCompra) {
            const row = document.createElement("tr");
            row.innerHTML += `
                <td>
                <img class="img-fluid img-carrito" style="height: 14rem" style="width:16rem" src="${img}"/>
                </td>
                <td>${marca}</td>
              <td>${precio}</td>
              <td>${cantidad}</td>
              <td>${precio * cantidad}</td>
              `;
            listaCompra.appendChild(row);
        }
    });
    totalProceso.innerText = carrito.reduce(
        (acc, prod) => acc + prod.cantidad * prod.precio,
        0
    );
}

function enviarCompra(e) {
    e.preventDefault()
    const cliente = document.querySelector('#cliente').value
    const email = document.querySelector('#correo').value

    if (email === '' || cliente == '') {
        Swal.fire({
            title: "¡Debes completar tu email y marca!",
            text: "Rellena el formulario",
            icon: "error",
            confirmButtonText: "Aceptar",
        })
    } else {

        const btn = document.getElementById('button');

        // document.getElementById('procesar-pago')
        //  .addEventListener('submit', function(event) {
        //    event.preventDefault();

        btn.value = 'Enviando...';

        const serviceID = 'default_service';
        const templateID = 'template_qxwi0jn';

        emailjs.sendForm(serviceID, templateID, this)
            .then(() => {
                btn.value = 'Finalizar compra';
                alert('Correo enviado!');
            }, (err) => {
                btn.value = 'Finalizar compra';
                alert(JSON.stringify(err));
            });

        const spinner = document.querySelector('#spinner')
        spinner.classList.add('d-flex')
        spinner.classList.remove('d-none')

        setTimeout(() => {
            spinner.classList.remove('d-flex')
            spinner.classList.add('d-none')
            formulario.reset()

            const alertExito = document.createElement('p')
            alertExito.classList.add('alert', 'alerta', 'd-block', 'text-center', 'col-12', 'mt-2', 'alert-success')
            alertExito.textContent = 'Compra realizada correctamente'
            formulario.appendChild(alertExito)

            setTimeout(() => {
                alertExito.remove()
            }, 3000)


        }, 3000)
    }
    localStorage.clear()

}