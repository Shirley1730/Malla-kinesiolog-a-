// Lista de ramos con sus prerrequisitos
const ramos = [
  { id: "principios_matematicos", nombre: "Principios matemáticos", abre: ["fisiologia_tejidos", "biofisica", "estadisticas"] },
  { id: "fundamentos_anatomia", nombre: "Fundamentos de anatomía", abre: ["anatomia_fisiologia"] },
  { id: "biologia_celular", nombre: "Biología celular" },
  { id: "fundamento_movimiento", nombre: "Fundamento del movimiento humano" },
  { id: "taller_comunicativas", nombre: "Taller de competencias comunicativas" },
  { id: "taller_aprendizaje", nombre: "Taller de competencias para el aprendizaje" },

  { id: "anatomia_fisiologia", nombre: "Anatomía / Fisiología", abre: ["fisiopatologia", "farmacologia", "desarrollo_psicomotor", "fisiologia_metabolismo", "biomecanica_control"] },
  { id: "fisiologia_tejidos", nombre: "Fisiología de tejidos y biofísica", abre: ["fisiologia_articular"] },
  { id: "actividad_salud", nombre: "Actividad física y salud" },
  { id: "quimica", nombre: "Química", abre: ["bioquimica"] },
  { id: "cultura_valores", nombre: "Cultura y valores" },
  { id: "taller_personal_1", nombre: "Taller desarrollo personal I" },

  { id: "estadisticas", nombre: "Estadísticas para ciencias de la salud", abre: ["fundamentos_salud_publica", "metodologia_investigacion"] },
  { id: "fisiopatologia", nombre: "Fisiopatología y farmacología", abre: ["atencion_prehospitalaria"] },
  { id: "fisiologia_articular", nombre: "Fisiología articular", abre: ["biomecanica_control", "semiologia"] },
  { id: "desarrollo_psicomotor", nombre: "Desarrollo psicomotor normal y patológico", abre: ["semiologia"] },
  { id: "bioquimica", nombre: "Bioquímica" },
  { id: "ingles1", nombre: "Inglés básico I", abre: ["ingles2"] },

  { id: "fundamentos_salud_publica", nombre: "Fundamentos en salud pública", abre: ["rehab_salud_comunitaria"] },
  { id: "biomecanica_control", nombre: "Biomecánica y control motor" },
  { id: "persona_sentido", nombre: "Persona y sentido" },
  { id: "semiologia", nombre: "Semiología kinésica e imagenología", abre: ["fisioterapia", "rehab_cardio_inf", "neurorehab_inf"] },
  { id: "taller_personal_2", nombre: "Taller desarrollo personal II" },
  { id: "ingles2", nombre: "Inglés básico II" },

  { id: "rehab_salud_comunitaria", nombre: "Rehabilitación en base en salud familiar y comunitaria" },
  { id: "fisiologia_metabolismo", nombre: "Fisiología del metabolismo energético", abre: ["prescripcion_cronicos", "rehab_deportiva"] },
  { id: "atencion_prehospitalaria", nombre: "Atención prehospitalaria y primeros auxilios" },
  { id: "gestion_salud", nombre: "Gestión en salud" },
  { id: "gerontologia", nombre: "Gerontología", abre: ["rehab_geriatrica"] },
  { id: "fisioterapia", nombre: "Fisioterapia y ejercicio terapéutico", abre: ["rehab_locomotor_inf"] },

  { id: "rehab_locomotor_inf", nombre: "Rehab. sistema locomotor infantil", abre: ["rehab_locomotor_adulto"] },
  { id: "rehab_cardio_inf", nombre: "Rehab. cardiorrespiratoria infantil", abre: ["rehab_cardio_adulto"] },
  { id: "prescripcion_cronicos", nombre: "Prescripción ejercicio crónicos" },
  { id: "etica_salud", nombre: "Ética en salud" },
  { id: "neurorehab_inf", nombre: "Neurorehabilitación infantil", abre: ["neurorehab_adulto"] },
  { id: "rehab_geriatrica", nombre: "Rehabilitación geriátrica" },
  { id: "electivo1", nombre: "Electivo I", abre: ["electivo2"] },

  { id: "rehab_locomotor_adulto", nombre: "Rehab. locomotor adulto" },
  { id: "rehab_cardio_adulto", nombre: "Rehab. cardio adulto" },
  { id: "metodologia_investigacion", nombre: "Metodología de la investigación", abre: ["seminario"] },
  { id: "rehab_deportiva", nombre: "Rehabilitación deportiva" },
  { id: "neurorehab_adulto", nombre: "Neurorehabilitación adulto" },
  { id: "salud_ocupacional", nombre: "Salud ocupacional" },
  { id: "electivo2", nombre: "Electivo II", abre: ["electivo3"] },

  { id: "rehab_especial", nombre: "Rehab. en condiciones especiales" },
  { id: "tratamiento_cronico", nombre: "Tratamiento kinésico del paciente crónico" },
  { id: "seminario", nombre: "Seminario de investigación" },
  { id: "razonamiento_clinico", nombre: "Razonamiento clínico" },
  { id: "electivo3", nombre: "Electivo III" },

  { id: "internado1", nombre: "Internado profesional I y II" },
  { id: "internado2", nombre: "Internado profesional III y IV" },
  { id: "actividad_titulacion", nombre: "Actividad de Titulación" }
];

// Estado de aprobación
const aprobados = new Set();

function crearRamo(ramo) {
  const div = document.createElement("div");
  div.classList.add("ramo");
  div.id = ramo.id;
  div.textContent = ramo.nombre;

  // Se bloquea si tiene prerequisitos
  if (tienePrerequisitos(ramo)) {
    div.classList.add("bloqueado");
  }

  div.addEventListener("click", () => {
    if (div.classList.contains("bloqueado")) return;

    // Marcar como aprobado
    div.classList.add("aprobado");
    aprobados.add(ramo.id);

    // Desbloquear siguientes
    (ramo.abre || []).forEach(id => {
      const siguiente = document.getElementById(id);
      if (siguiente && puedeDesbloquearse(id)) {
        siguiente.classList.remove("bloqueado");
      }
    });
  });

  return div;
}

function tienePrerequisitos(ramo) {
  return ramos.some(r => (r.abre || []).includes(ramo.id));
}

function puedeDesbloquearse(id) {
  // Solo se desbloquea si todos sus requisitos están aprobados
  const requisitos = ramos.filter(r => (r.abre || []).includes(id)).map(r => r.id);
  return requisitos.every(req => aprobados.has(req));
}

window.onload = () => {
  const contenedor = document.getElementById("malla");
  ramos.forEach(ramo => {
    contenedor.appendChild(crearRamo(ramo));
  });
};
