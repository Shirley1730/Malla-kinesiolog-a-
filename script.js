const botones = document.querySelectorAll(".ramo");

const prerequisitos = {
  "Anatomía/ fisiología": ["Fundamentos de anatomia para el movimiento humano"],
  "Fisiología de tejidos y biofísica": ["Principios matemáticos"],
  "Química": ["Principios matemáticos"],
  "Bioquimica": ["Química"],
  "Estadísticas para ciencias de la salud": ["Principios matemáticos"],
  "Fisiopatología y farmacología": ["Anatomía/ fisiología"],
  "Fisiología articular": ["Fisiología de tejidos y biofísica"],
  "Desarrollo psicomotor normal y patológico": ["Anatomía/ fisiología"],
  "Fundamentos en salud pública": ["Estadísticas para ciencias de la salud"],
  "Semiologia kinésica e imagenología": ["Fisiología articular", "Desarrollo psicomotor normal y patológico"],
  "Metodología de la investigación": ["Estadísticas para ciencias de la salud"],
  "Fisiología del metabolismo energético y del ejercicio": ["Anatomía/ fisiología"],
  "Atención pre hospitalaria y primeros auxilios": ["Fisiopatología y farmacología"],
  "Gerontología": ["Fisiología del metabolismo energético y del ejercicio"],
  "Fisioterapia y ejercicio terapéutico": ["Semiologia kinésica e imagenología"],
  "Rehabilitación sistema locomotor infantil": ["Fisioterapia y ejercicio terapéutico"],
  "Rehabilitación cardio respiratorio infantil": ["Semiologia kinésica e imagenología"],
  "Neurorehabilitación infantil": ["Semiologia kinésica e imagenología"],
  "Rehabilitación geriátrica": ["Gerontología"],
  "Rehabilitación sistema locomotor adulto": ["Rehabilitación sistema locomotor infantil"],
  "Rehabilitación cardio respiratorio adulto": ["Rehabilitación cardio respiratorio infantil"],
  "Neurorehabilitación adulto": ["Neurorehabilitación infantil"],
  "Rehabilitación deportiva": ["Fisiología del metabolismo energético y del ejercicio"],
  "Seminario de investigación": ["Metodología de la investigación"],
  "Electivo II": ["Electivo I"],
  "Electivo III": ["Electivo II"],
  "Inglés básico II": ["Ingles basico I"]
};

botones.forEach(boton => {
  boton.addEventListener("click", () => {
    if (boton.disabled) return;

    boton.classList.toggle("aprobado");

    actualizarEstado();
  });
});

function actualizarEstado() {
  const aprobados = Array.from(document.querySelectorAll(".ramo.aprobado")).map(b => b.dataset.nombre);

  botones.forEach(boton => {
    const nombre = boton.dataset.nombre;
    if (prerequisitos[nombre]) {
      const requisitos = prerequisitos[nombre];
      const cumplido = requisitos.every(req => aprobados.includes(req));
      boton.disabled = !cumplido && !boton.classList.contains("aprobado");
    }
  });
}
