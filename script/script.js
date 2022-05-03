function user(nombre, localidad) {
  this.nombre = nombre;

  this.localidad = localidad;
}

function calculoImporteFinal(articulo, envio, iva) {
  return articulo + envio + iva;
}

const iva = (x) => x * 0.21;

function saludoImporte(importeFinal) {
  alert(`El importe final es de : $` + importeFinal + `\nDisfrute su compra!`);
}

const listaArticulos = [
  { idArticulo: 1, nombreArticulo: "Alfombra", precioArticulo: 500 },
  { idArticulo: 2, nombreArticulo: "Bufanda", precioArticulo: 400 },
  { idArticulo: 3, nombreArticulo: "Guantes", precioArticulo: 200 },
  { idArticulo: 4, nombreArticulo: "Gorro", precioArticulo: 500 },
  { idArticulo: 5, nombreArticulo: "Manta", precioArticulo: 1000 },
  { idArticulo: 6, nombreArticulo: "Canasta", precioArticulo: 600 },
];

const carrito = [];

let nombre = prompt("Ingrese su nombre:");

let localidad = prompt("Ingrese su localidad:");

const name = new user(nombre, localidad);

let entrada = prompt(
  `Bienvenido ${nombre}! \nIngrese el número de ID del artículo deseado.  
  \nId 1 Alfombra: $500 
  \nId 2 Bufanda: $400 
  \nId 3 Guantes: $200
  \nId 4 Gorro: $500 
  \nId 5 Manta: $1000 
  \nId 6 Canasta: $600 
  \nIngrese ESC si desea salir del programa.`
);

while (entrada != "ESC") {
  let envio;

  if (localidad === "CABA") {
    envio = 200;
  } else {
    envio = 300;
  }

  entrada = parseInt(entrada);
  if (entrada <= 6 && entrada >= 1) {
    const elementoCarrito = listaArticulos.find(
      (i) => i.idArticulo === entrada
    );

    carrito.push(elementoCarrito.precioArticulo);

    let alertCarrito = "";

    for (const [key, value] of Object.entries({
      Articulo: elementoCarrito.nombreArticulo,

      Precio: "$" + elementoCarrito.precioArticulo,
    })) {
      alertCarrito += `${key}: ${value}\n`;
    }

    alert(`Felicidades, agregaste a tu carrito:\n${alertCarrito}`);

    const total = parseInt(carrito.reduce((j, i) => j + i, 0));

    let importeFinal = calculoImporteFinal(total, envio, iva(total));

    const saludo = saludoImporte(importeFinal);

    entrada = prompt(
      `Ingrese otro Id para agregar un articulo.
    \nId 1 Alfombra: $500 
    \nId 2 Bufanda: $400 
    \nId 3 Guantes: $200
    \nId 4 Gorro: $500 
    \nId 5 Manta: $1000 
    \nId 6 Canasta: $600 
    \nO ingrese ESC si desea salir del programa.`
    );
  } else if (entrada > 6 || entrada == 0) {
    alert("Error. Ingrese un ID valido.");

    entrada = prompt(
      `Ingrese otro Id para agregar un articulo.
    \nId 1 Alfombra: $500 
    \nId 2 Bufanda: $400 
    \nId 3 Guantes: $200
    \nId 4 Gorro: $500 
    \nId 5 Manta: $1000 
    \nId 6 Canasta: $600 
    \nO ingrese ESC si desea salir del programa.`
    );
  }
}
