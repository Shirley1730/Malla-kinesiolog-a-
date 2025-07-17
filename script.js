document.addEventListener("DOMContentLoaded", () => {
  const ramos = document.querySelectorAll(".ramo");
  const aprobados = JSON.parse(localStorage.getItem("ramosAprobados")) || [];

  const actualizarEstado = () => {
    ramos.forEach((ramo) => {
      const id = ramo.dataset.id;
      const requisitos = ramo.dataset.prerequisitos ? ramo.dataset.prerequisitos.split(",") : [];

      const cumpleRequisitos = requisitos.every(req => aprobados.includes(req));

      if (requisitos.length === 0 || cumpleRequisitos) {
        ramo.classList.remove("bloqueado");
        ramo.style.pointerEvents = "auto";
      } else {
        ramo.classList.add("bloqueado");
        ramo.style.pointerEvents = "none";
      }

      if (aprobados.includes(id)) {
        ramo.classList.add("aprobado");
      } else {
        ramo.classList.remove("aprobado");
      }
    });
  };

  ramos.forEach((ramo) => {
    ramo.addEventListener("click", () => {
      const id = ramo.dataset.id;

      if (aprobados.includes(id)) {
        const index = aprobados.indexOf(id);
        aprobados.splice(index, 1);
      } else {
        aprobados.push(id);
      }

      localStorage.setItem("ramosAprobados", JSON.stringify(aprobados));
      actualizarEstado();
    });
  });

  actualizarEstado();
});
