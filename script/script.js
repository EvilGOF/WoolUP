function user(nombre, localidad) {
  this.nombre = nombre;
  this.localidad = localidad;
}

function articulo(nombreArticulo, precioArticulo) {
  this.nombreArticulo = nombreArticulo;

  this.precioArticulo = precioArticulo;
}

function calculoImporteFinal(articulo, envio, iva) {
  return articulo + envio + iva;
}

const iva = (x) => x * 0.21;

function saludoImporte(importeFinal) {
  alert(`El importe final es de : $` + importeFinal + `\nDisfrute su compra!`);
}

function menuArticulos() {
  alert(
    `\n ${articulo1.nombreArticulo} : $${articulo1.precioArticulo} \n ${articulo2.nombreArticulo} : $${articulo2.precioArticulo} \n ${articulo3.nombreArticulo} : $${articulo3.precioArticulo} \n ${articulo4.nombreArticulo} : $${articulo4.precioArticulo} \n ${articulo5.nombreArticulo} : $${articulo5.precioArticulo} \n ${articulo6.nombreArticulo} : $${articulo6.precioArticulo}`
  );
}

const articulo1 = new articulo("Alfombra", 500);

const articulo2 = new articulo("Bufanda", 400);

const articulo3 = new articulo("Guantes", 200);

const articulo4 = new articulo("Gorro", 500);

const articulo5 = new articulo("Manta", 1000);

const articulo6 = new articulo("Canasta", 600);

let nombre = prompt("Ingrese su nombre:");

let localidad = prompt("Ingrese su localidad:");

const name = new user(nombre, localidad);

let menu = menuArticulos();

let entrada = prompt(
  `Bienvenido ${nombre}! \nIngrese el importe del artículo. Ingrese ESC si desea salir del programa.`
);

while (entrada != "ESC") {
  let envio;

  if (localidad == "CABA") {
    envio = 200;
  } else {
    envio = 300;
  }

  let articulo = parseInt(entrada);

  let importeFinal = calculoImporteFinal(articulo, envio, iva(articulo));

  const saludo = saludoImporte(importeFinal);

  entrada = prompt(
    `Ingrese otro importe. O ingrese ESC si desea salir del programa.`
  );
}
