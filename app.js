// Simulador de E-Commerce de productos para limpieza de autos

// Declaro mi constructor Producto
class Producto {
  constructor(id, nombre, precio, img, cantidad) {
    this.id = id;
    this.nombre = nombre;
    this.precio = precio;
    this.img = img;
    this.cantidad = cantidad;
  }
}

// Lugar donde voy a mostrar mis productos en el HTML
const contenedorProductos = document.getElementById('contenedor-productos')
// Lugar donde se va a mostrar el contenido de mi carrito
const items = document.getElementById('items')
// Footer del contenido del carrito
const footer = document.getElementById('footer-carrito')

// Plantillas Template de HTML a utilizar
const templateCard = document.getElementById('template-card').content
const templateFooter = document.getElementById('template-footer').content
const templateCarrito = document.getElementById('template-carrito').content

// Declaro mi objeto carrito vacío
let carrito = {} 

// Declaro mi "base de datos" de productos en el array stock
const stock = [];
stock.push(new Producto(1, "Shampoo Meguiars NXT Generation Car Wash (1.89 L.)", 7600, "./assets/img/shampoo_nxt.jpg",10));
stock.push(new Producto(2, "Shampoo Mothers California Gold Car Wash (1.89 L.)", 9500, "./assets/img/shampoo_california_gold.jpg", 8));
stock.push(new Producto(3, "Shampoo Sonax Xtreme wash & Dry (1 L.)", 6000, "./assets/img/shampoo_dry_xtreme.png",5));
stock.push(new Producto(4, "Shampoo 3D Pink Car Soap (4 L.)", 6400, "./assets/img/shampoo_pink_car_soap.jpg", 10));
stock.push(new Producto(5, "Cera Mothers California Gold Synthetic Paste Wax (311 gr.)",6500,"./assets/img/cera_california_gold.gif",15));
stock.push(new Producto(6, "Cera rápida Sonax High Speed Wax (500 mL.)", 6500, "./assets/img/cera_high_speed_wax.png", 20));
stock.push(new Producto(7, "Cera Meguiars NXT Generation Tech Wax (311 gr.)", 9000, "./assets/img/cera_nxt_wax_paste.jpg", 4));
stock.push(new Producto(8, "Cera rápida 3M Quick Wax (473 mL.)", 3800, "./assets/img/cera_quick_wax.jpg",20));
stock.push(new Producto(9, "Cepillo 3M para llantas y fundas", 1000, "./assets/img/CELLYF1_500x.webp",20));
stock.push(new Producto(10, "Cepillo 3M duro para alfombras", 1500, "./assets/img/CEPDALF_500x.webp",15));
stock.push(new Producto(12, "Cepillo 3M para pasaruedas", 3000, "./assets/img/CPAS1_500x.webp",20));
stock.push(new Producto(13, "Guante de lavado premium", 3800, "./assets/img/guante_lavadol.jpg",10));
stock.push(new Producto(14, "Microfibra Waffle de secado (60x40 cm.)", 2500, "./assets/img/microfibra-abc-waffle.jpg",15));
stock.push(new Producto(15, "Microfibra amarilla gold pelo corto (40x40 cm.)", 1000, "./assets/img/microfibra_lavado.jpg",30));
stock.push(new Producto(16, "Microfibra amarilla pulido (40x40 cm.)", 1400, "./assets/img/microfibra_pl_pc.jpg",20));

// Escucho "clicks" en el contenedor de productos
contenedorProductos.addEventListener('click', e =>{
  addCarrito(e)
})

// Reviso si el evento click se dá en el botón con la clase "btn-primary" y se envía toda la info de nuestro producto
// al carrito
const addCarrito = e =>{
  if(e.target.classList.contains('btn-primary')){    
    enviarAlCarrito(e.target.parentElement)
  }
}

// Dibujo mis tarjetas de productos
stock.forEach((producto)=>{
    templateCard.querySelector('h5').textContent = producto.nombre
    templateCard.querySelector('span').textContent = producto.precio
    templateCard.querySelector('img').setAttribute("src", producto.img)
    templateCard.querySelector(".product__card__cantidad").textContent =`En stock: ${producto.cantidad}`
    templateCard.querySelector(".btn-primary").dataset.id = producto.id
    const clone = templateCard.cloneNode(true)
    contenedorProductos.appendChild(clone)
})

// Creo el objeto en el carrito con las propiedades del template-card (sin imagen)
// Le agrego además la propiedad cantidad y la igualo a 1
const enviarAlCarrito = objeto =>{
  const producto = {
    id: objeto.querySelector('.btn-primary').dataset.id,
    nombre: objeto.querySelector('h5').textContent,
    precio: objeto.querySelector('span').textContent,
    cantidad: 1,
  }
  alert ("Agregaste al carrito el producto: " + producto.nombre)
// Reviso si ya existe el id del producto en el carrito e incremento su cantidad si es que ya existe. 
// Luego lo guardo en el carrito
  if(carrito.hasOwnProperty(producto.id)){
    producto.cantidad= carrito[producto.id].cantidad + 1
  }
  carrito[producto.id] = producto
  mostrarCarrito()  
}

// Función para mostrar el carrito
const mostrarCarrito = () =>{
  items.innerHTML = ''
// Obtengo un array de los valores de las propiedades del producto y los dibujo en el template del carrito  
  Object.values(carrito).forEach(producto =>{
    templateCarrito.querySelector('th').textContent = producto.id
    templateCarrito.querySelectorAll('td')[0].textContent = producto.nombre
    templateCarrito.querySelectorAll('td')[1].textContent = producto.cantidad
    templateCarrito.querySelector('.agregar').dataset.id = producto.id
    templateCarrito.querySelector('.quitar').dataset.id = producto.id
    templateCarrito.querySelector('span').textContent = producto.cantidad*producto.precio
    const clone = templateCarrito.cloneNode(true)
    items.appendChild(clone)
  })
  mostrarFooter()
}

// Función que va a mostrar el footer del carrito. Se va a actualizar si es distinto de 0
const mostrarFooter = () =>{
  footer.innerHTML = ''
  if (Object.keys(carrito).length === 0){
    footer.innerHTML = `<th scope="row" colspan="5">Carrito vacío</th>`
  }
  const clone = templateFooter.cloneNode(true)
  footer.appendChild(clone)

// Función para vaciar el carrito
  const btnVaciar = document.getElementById('vaciar-carrito')
  btnVaciar.addEventListener('click', ()=>{
    carrito = {}
    mostrarCarrito()
  })
}



         
