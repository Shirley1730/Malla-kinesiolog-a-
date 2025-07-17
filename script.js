
const ramos = {
  "Principios matemáticos": ["Fisiología de tejidos y biofísica", "Biofísica", "Estadísticas para ciencias de salud"],
  "Fundamentos de anatomia para el movimiento humano": ["Anatomía/ fisiología"],
  "Anatomía/ fisiología": ["Fisiopatología y farmacología", "Desarrollo psicomotor normal y patológico", "Fisiología del metabolismo energético y del ejercicio", "Biomecánica y control motor"],
  "Fisiología de tejidos y biofísica": ["Fisiología articular"],
  "Química": ["Bioquimica"],
  "Estadísticas para ciencias de la salud": ["Fundamentos en salud pública", "Metodología de la investigación"],
  "Fisiopatología y farmacología": ["Atención pre hospitalaria y primeros auxilios"],
  "Fisiología articular": ["Biomecánica y control motor", "Semiología kinésica e imagenología"],
  "Desarrollo psicomotor normal y patológico": ["Semiología kinésica e imagenología"],
  "Ingles basico I": ["Inglés básico II"],
  "Fundamentos en salud pública": ["Rehabilitación en base en salud familiar y comunitaria"],
  "Semiologia kinésica e imagenología": ["Fisioterapia y ejercicio terapéutico", "Rehabilitación cardio respiratorio infantil", "Neurorehabilitación infantil"],
  "Fisiología del metabolismo energético y del ejercicio": ["Prescripcion ejercicio en pacientes crónicos", "Rehabilitación deportiva"],
  "Gerontología": ["Rehabilitación geriátrica"],
  "Fisioterapia y ejercicio terapéutico": ["Rehabilitación sistema locomotor infantil"],
  "Rehabilitación sistema locomotor infantil": ["Rehabilitación sistema locomotor adulto"],
  "Rehabilitación cardio respiratorio infantil": ["Rehabilitación cardio respiratorio adulto"],
  "Neurorehabilitación infantil": ["Neurorehabilitación adulto"],
  "Electivo I": ["Electivo II"],
  "Metodología de la investigación": ["Seminario de investigación"],
  "Electivo II": ["Electivo III"]
};

const nombres = Object.keys(ramos);
const aprobados = new Set();

const contenedor = document.getElementById("malla-container");

function crearCaja(nombre) {
  const div = document.createElement("div");
  div.className = "ramo";
  div.innerText = nombre;
  div.dataset.nombre = nombre;
  div.onclick = () => aprobarRamo(nombre, div);
  contenedor.appendChild(div);
}

function aprobarRamo(nombre, div) {
  if (aprobados.has(nombre)) return;

  div.classList.add("aprobado");
  aprobados.add(nombre);

  for (const [ramo, prerequisitos] of Object.entries(ramos)) {
    if (prerequisitos.includes(nombre)) {
      const todosCumplidos = prerequisitos.every(r => aprobados.has(r));
      if (todosCumplidos) {
        const desbloqueado = document.querySelector(`.ramo[data-nombre="${ramo}"]`);
        if (desbloqueado) desbloqueado.style.borderColor = "#28a745";
      }
    }
  }
}

const todosRamos = new Set([
  ...Object.keys(ramos),
  ...Object.values(ramos).flat()
]);

[...todosRamos].forEach(crearCaja);
