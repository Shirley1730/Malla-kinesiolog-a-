const prerequisitos = {
  "Anatomía/ fisiología": ["Fundamentos de anatomia para el movimiento humano"],
  "Fisiología de tejidos y biofísica": ["Principios matemáticos"],
  "Química": ["Principios matemáticos"],
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
  "Bioquimica": ["Química"],
  "Inglés básico II": ["Ingles basico I"]
};

document.querySelectorAll(".ramo").forEach(ramo => {
  ramo.addEventListener("click", () => {
    if (ramo.classList.contains("bloqueado")) return;

    ramo.classList.toggle("aprobado");

    const aprobado = ramo.classList.contains("aprobado");
    const nombre = ramo.dataset.nombre;

    document.querySelectorAll(".ramo").forEach(target => {
      const requisitos = prerequisitos[target.dataset.nombre] || [];
      if (requisitos.includes(nombre)) {
        const cumplidos = requisitos.every(req => {
          const ramoReq = [...document.querySelectorAll(".ramo")].find(r => r.dataset.nombre === req);
          return ramoReq && ramoReq.classList.contains("aprobado");
        });
        if (cumplidos) {
          target.classList.remove("bloqueado");
        } else {
          target.classList.add("bloqueado");
          target.classList.remove("aprobado");
        }
      }
    });
  });
});
