document.addEventListener("DOMContentLoaded", () => {
  console.log("El documento se ha cargado");
});

//Declaración Clases y Funciones

class User {
  constructor(nombre, localidad) {
    this.nombre = nombre;

    this.localidad = localidad;
  }

  userData(nombre, localidad, envio) {
    return `${nombre}, ya que vivís en ${localidad} el envio es de $${envio}. Se sumara el IVA a cada producto elegido.`;
  }
}

function calculoImporteFinal(articulo, envio, iva) {
  return articulo + envio + iva;
}

function menu() {
  return `Ingrese un Id para agregar un articulo.
  \nId 1 Alfombra: $500 
  \nId 2 Bufanda: $400 
  \nId 3 Guantes: $200
  \nId 4 Gorro: $500 
  \nId 5 Manta: $1000 
  \nId 6 Canasta: $600 
  \nO ingrese ESC si desea salir del programa.`;
}

const iva = (x) => x * 0.21;

function saludoImporte(importeFinal) {
  alert(`El importe final es de : $` + importeFinal + `\nDisfrute su compra!`);
}

//script

const listaArticulos = [
  { idArticulo: 1, nombreArticulo: "Alfombra", precioArticulo: 500 },
  { idArticulo: 2, nombreArticulo: "Bufanda", precioArticulo: 400 },
  { idArticulo: 3, nombreArticulo: "Guantes", precioArticulo: 200 },
  { idArticulo: 4, nombreArticulo: "Gorro", precioArticulo: 500 },
  { idArticulo: 5, nombreArticulo: "Manta", precioArticulo: 1000 },
  { idArticulo: 6, nombreArticulo: "Canasta", precioArticulo: 600 },
];

const carrito = [];

let articulosFaltantes = ["Alfombra de baño", "Medias", "Set de mesa de luz"];

let faltante = document.getElementById("faltante");

let faltanteTitle = document.createElement("h4");

faltanteTitle.innerText = `Articulos Faltantes`;

faltanteTitle.className = `faltante-title`;

faltante.append(faltanteTitle);

for (const articuloFaltante of articulosFaltantes) {
  let li = document.createElement("li");

  li.innerHTML = articuloFaltante;

  li.className = `faltante-item`;

  faltante.append(li);
}

let nombre = prompt("Ingrese su nombre:");

let localidad = prompt("Ingrese su localidad:");

let newUser = new User(nombre, localidad);

let welcomeUser = document.getElementById("title-gallery");

welcomeUser.innerText = `Hola!\nBienvenido/a ${newUser.nombre}`;

let menuArticulos = menu();

let entrada = prompt(`Bienvenido ${nombre}!\n${menuArticulos}`);

while (entrada != "ESC") {
  if (localidad === "CABA") {
    envio = 200;
  } else {
    envio = 300;
  }

  const data = newUser.userData(nombre, localidad, envio);

  alert(data);

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

    saludoImporte(importeFinal);

    entrada = prompt(menuArticulos);
  } else if (entrada > 6 || entrada == 0) {
    alert("Error. Ingrese un ID valido.");

    entrada = prompt(menuArticulos);
  } else {
    alert("Error. Dato ingresado erroneo.");

    entrada = prompt(menuArticulos);
  }
}
