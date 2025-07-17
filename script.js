document.querySelectorAll(".ramo").forEach((btn) => {
  btn.addEventListener("click", () => {
    if (btn.classList.contains("bloqueado")) return;

    btn.classList.toggle("aprobado");
    const desbloquea = btn.dataset.desbloquea;
    if (desbloquea) {
      desbloquea.split(",").forEach((id) => {
        const siguiente = document.getElementById(id);
        if (siguiente && !siguiente.classList.contains("aprobado")) {
          siguiente.classList.remove("bloqueado");
        }
      });
    }
  });
});
