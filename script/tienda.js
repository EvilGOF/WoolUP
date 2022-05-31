const cards = document.getElementById("cards");

const items = document.getElementById("items");

const footer = document.getElementById("footer");

const templateCard = document.getElementById("template-card").content;

const templateFooter = document.getElementById("template-footer").content;

const templateCarrito = document.getElementById("template-carrito").content;

const fragment = document.createDocumentFragment();

const form = document.querySelector("#formulario");

const enviarFormulario = (event) => {
  event.preventDefault();

  const { name, email } = event.target;

  if (name.value.length === 0 || email.value.length === 0) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Ingrese su nombre y mail!",
    });
  } else {
    Swal.fire({
      title: `Bienvenido ${name.value}! Enviaremos su factura a ${email.value}`,
      showClass: {
        popup: "animate__animated animate__fadeInDown",
      },
      hideClass: {
        popup: "animate__animated animate__fadeOutUp",
      },
    });

    localStorage.setItem("name", name.value);

    localStorage.setItem("email", email.value);

    form.innerHTML = "";

    const title = document.getElementById("title-gallery");

    title.innerHTML = `Bienvenido ${name.value} !`;
  }
};

if (localStorage.getItem("name")) {
  const name = localStorage.getItem("name");

  form.innerHTML = "";

  const title = document.getElementById("title-gallery");

  title.innerHTML = `Bienvenido ${name} !`;
}

form.addEventListener("submit", enviarFormulario);

let carrito = {};

document.addEventListener("DOMContentLoaded", () => {
  fetchData();

  if (localStorage.getItem("carrito")) {
    carrito = JSON.parse(localStorage.getItem("carrito"));
    pintarCarrito();
  }
});

items.addEventListener("click", (e) => {
  btnAccion(e);
});

cards.addEventListener("click", (e) => {
  addCarrito(e);
});

const fetchData = async () => {
  try {
    const res = await fetch("../script/api.json");

    const data = await res.json();

    pintarCards(data);
  } catch (error) {
    console.log(error);
  }
};

const pintarCards = (data) => {
  data.forEach((producto) => {
    templateCard.querySelector("h5").textContent = producto.nombreArticulo;

    templateCard.querySelector("p").textContent = producto.precioArticulo;

    templateCard.querySelector("img").setAttribute("src", producto.img);

    templateCard.querySelector(".btn-dark").dataset.id = producto.id;

    const clone = templateCard.cloneNode(true);

    fragment.appendChild(clone);
  });

  cards.appendChild(fragment);
};

const addCarrito = (e) => {
  if (e.target.classList.contains("btn-dark")) {
    setCarrito(e.target.parentElement);
  }

  e.stopPropagation();
};

const setCarrito = (objeto) => {
  const producto = {
    id: objeto.querySelector(".btn-dark").dataset.id,

    nombre: objeto.querySelector("h5").textContent,

    precio: objeto.querySelector("p").textContent,

    cantidad: 1,
  };

  if (carrito.hasOwnProperty(producto.id)) {
    producto.cantidad = carrito[producto.id].cantidad + 1;
  }

  carrito[producto.id] = { ...producto };

  pintarCarrito();
};

const pintarCarrito = () => {
  items.innerHTML = "";

  Object.values(carrito).forEach((producto) => {
    templateCarrito.querySelector("th").textContent = producto.id;

    templateCarrito.querySelectorAll("td")[0].textContent = producto.nombre;

    templateCarrito.querySelectorAll("td")[1].textContent = producto.cantidad;

    templateCarrito.querySelector(".btn-info").dataset.id = producto.id;

    templateCarrito.querySelector(".btn-danger").dataset.id = producto.id;

    templateCarrito.querySelector("span").textContent =
      producto.cantidad * producto.precio;

    const clone = templateCarrito.cloneNode(true);

    fragment.appendChild(clone);
  });

  items.appendChild(fragment);

  pintarFooter();

  localStorage.setItem("carrito", JSON.stringify(carrito));
};

const pintarFooter = () => {
  footer.innerHTML = "";

  if (Object.keys(carrito).length === 0) {
    footer.innerHTML = ` <th scope="row" colspan="5">
    Carrito vacío, comience a comprar.
  </th>`;

    return;
  }

  const nCantidad = Object.values(carrito).reduce(
    (acc, { cantidad }) => acc + cantidad,
    0
  );

  const nPrecio = Object.values(carrito).reduce(
    (acc, { cantidad, precio }) => acc + cantidad * precio,
    0
  );

  templateFooter.querySelectorAll("td")[0].textContent = nCantidad;

  templateFooter.querySelector("#total").textContent = nPrecio;

  const clone = templateFooter.cloneNode(true);

  fragment.appendChild(clone);

  footer.appendChild(fragment);

  const vaciar = document.getElementById("vaciar-carrito");

  vaciar.addEventListener(`click`, () => {
    carrito = {};

    pintarCarrito();
  });

  const comprar = document.getElementById("comprar-carrito");

  comprar.addEventListener(`click`, () => {
    const title = document.getElementById("title-gallery");

    if (localStorage.getItem("name")) {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: `Muchas gracias por su compra!`,
        showConfirmButton: false,
        timer: 1500,
      });

      carrito = {};

      pintarCarrito();

      form.innerHTML = `<form class="form row" id="formulario">
      <input
        value=""
        type="text"
        name="name"
        id="nombre"
        class="form__input mb-2 col-12 col-md-4"
        placeholder="Nombre"
      />
      <input
        value=""
        type="text"
        name="email"
        id="email"
        class="form__input mb-2 col-12 col-md-4"
        placeholder="Email"
      />
      <button
        class="col-12 col-md-2 mb-1 btn btn-dark submit-user"
        type="submit"
      >
        Ingresar
      </button>
       </form>`;

      title.innerHTML = "";

      localStorage.removeItem("name");

      localStorage.removeItem("email");
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Debes ingresar tu nombre y mail!",
      });
    }
  });
};

const btnAccion = (e) => {
  if (e.target.classList.contains("btn-info")) {
    const producto = carrito[e.target.dataset.id];

    producto.cantidad++;

    carrito[e.target.dataset.id] = { ...producto };

    pintarCarrito();
  }

  if (e.target.classList.contains("btn-danger")) {
    const producto = carrito[e.target.dataset.id];

    producto.cantidad--;

    producto.cantidad === 0 && delete carrito[e.target.dataset.id];

    pintarCarrito();
  }

  e.stopPropagation();
};
