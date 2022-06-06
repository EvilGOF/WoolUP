const form = document.querySelector("#formulario");

const pintarForm = () => {
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
};

const createTitle = () => {
  const name = localStorage.getItem("name");

  form.innerHTML = "";

  const title = document.createElement("h2");

  title.setAttribute("id", "title-gallery");

  title.innerText = `Bienvenido ${name} !`;

  document.querySelector("#title").appendChild(title);

  const deLog = document.createElement("button");

  deLog.type = "button";

  deLog.innerText = "Salir";

  deLog.setAttribute("id", "deLog-btn");

  deLog.classList.add("btn", "btn-dark");

  document.querySelector("#title").appendChild(deLog);

  const eliminarInformacion = (event) => {
    event.preventDefault();

    const deLogContainer = document.getElementById("deLog-btn");

    const titleContainer = document.getElementById("title-gallery");

    const title = document.getElementById("title-gallery");

    deLogContainer.parentNode.removeChild(deLog);

    titleContainer.parentNode.removeChild(title);

    localStorage.removeItem("name");

    localStorage.removeItem("email");

    pintarForm();
  };

  deLog.addEventListener("click", eliminarInformacion);
};

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

    createTitle();
  }
};

if (localStorage.getItem("name")) {
  createTitle();
}

form.addEventListener("submit", enviarFormulario);
