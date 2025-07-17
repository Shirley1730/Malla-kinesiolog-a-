const malla = document.querySelector(".malla");

const ramos = {
  "1-I": [
    { id: "matematicas", nombre: "Principios Matemáticos", abre: ["biofisica", "fisiologia-tejidos", "estadistica"] },
    { id: "anatomia-base", nombre: "Fundamentos de Anatomía para el Movimiento Humano", abre: ["anatomia"] },
    { id: "biologia-celular", nombre: "Biología Celular" },
    { id: "movimiento-humano", nombre: "Fundamento del Movimiento Humano" },
    { id: "comunicacion", nombre: "Taller de Competencias Comunicativas" },
    { id: "aprendizaje", nombre: "Taller de Competencias para el Aprendizaje" },
  ],
  "1-II": [
    { id: "anatomia", nombre: "Anatomía / Fisiología", abre: ["fisiopato", "farmacologia", "desarrollo", "metabolismo", "biomecanica"] },
    { id: "biofisica", nombre: "Fisiología de Tejidos y Biofísica", abre: ["articular"] },
    { id: "actividad-fisica", nombre: "Actividad Física y Salud" },
    { id: "quimica", nombre: "Química", abre: ["bioquimica"] },
    { id: "valores", nombre: "Cultura y Valores" },
    { id: "desarrollo-personal-1", nombre: "Taller de Desarrollo Personal I" },
  ],
  "2-III": [
    { id: "estadistica", nombre: "Estadísticas para Ciencias de la Salud", abre: ["salud-publica", "investigacion"] },
    { id: "fisiopato", nombre: "Fisiopatología y Farmacología", abre: ["atencion"] },
    { id: "articular", nombre: "Fisiología Articular", abre: ["biomecanica", "semiologia"] },
    { id: "desarrollo", nombre: "Desarrollo Psic. Normal y Patológico", abre: ["semiologia"] },
    { id: "bioquimica", nombre: "Bioquímica" },
    { id: "ingles-1", nombre: "Inglés Básico I", abre: ["ingles-2"] },
  ],
  "2-IV": [
    { id: "salud-publica", nombre: "Fundamentos en Salud Pública", abre: ["rehab-familiar"] },
    { id: "biomecanica", nombre: "Biomecánica y Control Motor" },
    { id: "persona", nombre: "Persona y Sentido" },
    { id: "semiologia", nombre: "Semiología Kinésica e Imagenología", abre: ["ejercicio", "rehab-cardio-niño", "rehab-neuro-niño"] },
    { id: "desarrollo-personal-2", nombre: "Taller de Desarrollo Personal II" },
    { id: "ingles-2", nombre: "Inglés Básico II" },
  ],
  "3-V": [
    { id: "rehab-familiar", nombre: "Rehab. en Salud Familiar y Comunitaria" },
    { id: "metabolismo", nombre: "Fisiología del Metabolismo y Ejercicio", abre: ["prescripcion", "rehab-deportiva"] },
    { id: "atencion", nombre: "Atención Prehospitalaria y Primeros Auxilios" },
    { id: "gestion", nombre: "Gestión en Salud" },
    { id: "gerontologia", nombre: "Gerontología", abre: ["rehab-geriatrica"] },
    { id: "ejercicio", nombre: "Fisioterapia y Ejercicio Terapéutico", abre: ["rehab-locomotor-niño"] },
  ],
  "3-VI": [
    { id: "rehab-locomotor-niño", nombre: "Rehab. Sistema Locomotor Infantil", abre: ["rehab-locomotor-adulto"] },
    { id: "rehab-cardio-niño", nombre: "Rehab. Cardiorrespiratoria Infantil", abre: ["rehab-cardio-adulto"] },
    { id: "prescripcion", nombre: "Prescripción en Pacientes Crónicos" },
    { id: "etica", nombre: "Ética en Salud" },
    { id: "rehab-neuro-niño", nombre: "Neurorehabilitación Infantil", abre: ["rehab-neuro-adulto"] },
    { id: "rehab-geriatrica", nombre: "Rehabilitación Geriátrica" },
    { id: "electivo-1", nombre: "Electivo I", abre: ["electivo-2"] },
  ],
  "4-VII": [
    { id: "rehab-locomotor-adulto", nombre: "Rehab. Sistema Locomotor Adulto" },
    { id: "rehab-cardio-adulto", nombre: "Rehab. Cardiorrespiratoria Adulto" },
    { id: "investigacion", nombre: "Metodología de la Investigación", abre: ["seminario"] },
    { id: "rehab-deportiva", nombre: "Rehabilitación Deportiva" },
    { id: "rehab-neuro-adulto", nombre: "Neurorehabilitación Adulto" },
    { id: "ocupacional", nombre: "Salud Ocupacional" },
    { id: "electivo-2", nombre: "Electivo II", abre: ["electivo-3"] },
  ],
  "4-VIII": [
    { id: "rehab-especial", nombre: "Rehabilitación en Condiciones Especiales" },
    { id: "kinesico-cronico", nombre: "Tratamiento Kinésico del Paciente Crónico" },
    { id: "seminario", nombre: "Seminario de Investigación" },
    { id: "razonamiento", nombre: "Razonamiento Clínico" },
    { id: "electivo-3", nombre: "Electivo III" },
  ],
  "5-IX": [
    { id: "internado-1", nombre: "Internado Profesional I" },
    { id: "internado-2", nombre: "Internado Profesional II" },
  ],
  "5-X": [
    { id: "internado-3", nombre: "Internado Profesional III" },
    { id: "internado-4", nombre: "Internado Profesional IV" },
    { id: "titulo", nombre: "Actividad de Titulación" },
  ]
};

// Cargar estado guardado
let estado = JSON.parse(localStorage.getItem("estadoRamos") || "{}");

function guardarEstado() {
  localStorage.setItem("estadoRamos", JSON.stringify(estado));
}

function crearRamo(ramo) {
  const div = document.createElement("div");
  div.className = "ramo";
  div.textContent = ramo.nombre;

  const estaAprobado = estado[ramo.id];
  if (estaAprobado) div.classList.add("aprobado");

  const tienePrereq = Object.values(ramos).some(sem =>
    sem.some(r => (r.abre || []).includes(ramo.id))
  );

  if (tienePrereq && !estaAprobado) div.classList.add("bloqueado");

  div.addEventListener("click", () => {
    if (div.classList.contains("bloqueado")) return;

    estado[ramo.id] = !estado[ramo.id];
    guardarEstado();
    actualizarVista();
  });

  div.dataset.id = ramo.id;
  return div;
}

function actualizarVista() {
  malla.innerHTML = "";
  for (const clave in ramos) {
    const contenedor = document.createElement("div");
    contenedor.className = "semestre";
    const [año, sem] = clave.split("-");
    contenedor.innerHTML = `<h2>${año}° Año - Semestre ${sem}</h2>`;

    ramos[clave].forEach(r => contenedor.appendChild(crearRamo(r)));
    malla.appendChild(contenedor);
  }

  // Aplicar bloqueo según prerrequisitos
  for (const clave in ramos) {
    ramos[clave].forEach(ramo => {
      const div = document.querySelector(`[data-id='${ramo.id}']`);
      if (!div) return;

      const requisitos = Object.values(ramos)
        .flat()
        .filter(x => (x.abre || []).includes(ramo.id))
        .map(x => x.id);

      const habilitado = requisitos.every(req => estado[req]);
      if (requisitos.length > 0 && !habilitado) {
        div.classList.add("bloqueado");
      } else {
        div.classList.remove("bloqueado");
      }

      if (estado[ramo.id]) {
        div.classList.add("aprobado");
      } else {
        div.classList.remove("aprobado");
      }
    });
  }
}

actualizarVista();
