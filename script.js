document.querySelectorAll('.ramo').forEach(ramo => {
  ramo.addEventListener('click', () => {
    if (ramo.classList.contains('bloqueado')) return;

    ramo.classList.toggle('aprobado');

    const id = ramo.dataset.id;
    document.querySelectorAll(`.ramo[data-prereq*="${id}"]`).forEach(dep => {
      const requisitos = dep.dataset.prereq.split(',');
      const cumplido = requisitos.every(reqId =>
        document.querySelector(`.ramo[data-id="${reqId}"]`).classList.contains('aprobado')
      );

      if (cumplido) {
        dep.classList.remove('bloqueado');
      } else {
        dep.classList.add('bloqueado');
        dep.classList.remove('aprobado');
      }
    });
  });
});
