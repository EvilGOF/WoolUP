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

    const deLog = document.createElement("button");

    deLog.type = "button";

    deLog.innerText = "Salir";
  }
};

if (localStorage.getItem("name")) {
  const name = localStorage.getItem("name");

  form.innerHTML = "";

  const title = document.getElementById("title-gallery");

  title.innerHTML = `Bienvenido ${name} !`;
}

form.addEventListener("submit", enviarFormulario);
