// Mapa de prerrequisitos
const prerrequisitos = {
  "Fisiología de tejidos y biofísica": ["Principios matemáticos"],
  "Estadísticas para ciencias de la salud": ["Principios matemáticos"],
  "Anatomía/ fisiología": ["Fundamentos de anatomia para el movimiento humano"],
  "Fisiopatología y farmacología": ["Anatomía/ fisiología"],
  "Desarrollo psicomotor normal y patológico": ["Anatomía/ fisiología"],
  "Fisiología del metabolismo energético y del ejercicio": ["Anatomía/ fisiología"],
  "Biomecánica y control motor": ["Fisiología articular", "Anatomía/ fisiología"],
  "Fisiología articular": ["Fisiología de tejidos y biofísica"],
  "Semiologia kinésica e imagenología": ["Fisiología articular", "Desarrollo psicomotor normal y patológico"],
  "Fundamentos en salud pública": ["Estadísticas para ciencias de la salud"],
  "Metodología de la investigación": ["Estadísticas para ciencias de la salud"],
  "Atención pre hospitalaria y primeros auxilios": ["Fisiopatología y farmacología"],
  "Inglés básico II": ["Ingles basico I"],
  "Fisioterapia y ejercicio terapéutico": ["Semiologia kinésica e imagenología"],
  "Rehabilitación cardio respiratorio infantil": ["Semiologia kinésica e imagenología"],
  "Neurorehabilitación infantil": ["Semiologia kinésica e imagenología"],
  "Rehabilitación en base en salud familiar y comunitaria": ["Fundamentos en salud pública"],
  "Rehabilitación sistema locomotor infantil": ["Fisioterapia y ejercicio terapéutico"],
  "Rehabilitación sistema locomotor adulto": ["Rehabilitación sistema locomotor infantil"],
  "Rehabilitación cardio respiratorio adulto": ["Rehabilitación cardio respiratorio infantil"],
  "Prescripcion ejercicio en pacientes crónicos": ["Fisiología del metabolismo energético y del ejercicio"],
  "Neurorehabilitación adulto": ["Neurorehabilitación infantil"],
  "Rehabilitación deportiva": ["Fisiología del metabolismo energético y del ejercicio"],
  "Rehabilitación geriátrica": ["Gerontología"],
  "Electivo II": ["Electivo I"],
  "Electivo III": ["Electivo II"],
  "Seminario de investigación": ["Metodología de la investigación"]
};

// Estado de aprobación
const estado = {};

document.querySelectorAll('.ramo').forEach(ramo => {
  const nombre = ramo.dataset.nombre;
  estado[nombre] = false;

  ramo.addEventListener('click', () => {
    if (ramo.classList.contains('bloqueado')) return;

    if (!ramo.classList.contains('aprobado')) {
      ramo.classList.add('aprobado');
      estado[nombre] = true;
      desbloquearRamos(nombre);
    } else {
      ramo.classList.remove('aprobado');
      estado[nombre] = false;
      bloquearDependientes(nombre);
    }
  });
});

function desbloquearRamos(ramoAprobado) {
  for (const [ramo, requisitos] of Object.entries(prerrequisitos)) {
    if (requisitos.includes(ramoAprobado)) {
      const todosAprobados = requisitos.every(req => estado[req]);
      if (todosAprobados) {
        const elemento = buscarRamo(ramo);
        if (elemento) {
          elemento.classList.remove('bloqueado');
          elemento.classList.add('desbloqueado');
        }
      }
    }
  }
}

function bloquearDependientes(ramoRevertido) {
  for (const [ramo, requisitos] of Object.entries(prerrequisitos)) {
    if (requisitos.includes(ramoRevertido)) {
      const elemento = buscarRamo(ramo);
      if (elemento && estado[ramo]) {
        // Si el ramo dependiente ya estaba aprobado, lo revertimos
        elemento.classList.remove('aprobado');
        estado[ramo] = false;
      }
      if (elemento) {
        elemento.classList.remove('desbloqueado');
        elemento.classList.add('bloqueado');
      }
      bloquearDependientes(ramo); // Recursivo por si otros dependen de este
    }
  }
}

function buscarRamo(nombre) {
  return document.querySelector(`.ramo[data-nombre='${nombre}']`);
}
