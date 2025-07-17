const ramos = {
  'Principios matemáticos': [],
  'Fundamentos de anatomia para el movimiento humano': [],
  'Biologia celular': [],
  'Fundamento del movimiento humano': [],
  'Taller de competencias comunicativas': [],
  'Taller de competencias para el aprendizaje': [],

  'Anatomía/ fisiología': ['Fundamentos de anatomia para el movimiento humano'],
  'Fisiología de tejidos y biofísica': ['Principios matemáticos'],
  'Actividad física y salud': [],
  'Química': [],
  'Cultura y valores': [],
  'Taller de desarrollo personal 1': [],

  'Estadísticas para ciencias de la salud': ['Principios matemáticos'],
  'Fisiopatología y farmacología': ['Anatomía/ fisiología'],
  'Fisiología articular': ['Fisiología de tejidos y biofísica'],
  'Desarrollo psicomotor normal y patológico': ['Anatomía/ fisiología'],
  'Bioquimica': ['Química'],
  'Ingles basico I': [],

  'Fundamentos en salud pública': ['Estadísticas para ciencias de la salud'],
  'Biomecánica y control motor': ['Fisiología articular'],
  'Persona y sentido': [],
  'Semiologia kinésica e imagenología': ['Fisiología articular', 'Desarrollo psicomotor normal y patológico'],
  'Taller de desarrollo personal II': [],
  'Inglés básico II': ['Ingles basico I'],

  'Rehabilitación en base en salud familiar y comunitaria': ['Fundamentos en salud pública'],
  'Fisiología del metabolismo energético y del ejercicio': ['Anatomía/ fisiología'],
  'Atención pre hospitalaria y primeros auxilios': ['Fisiopatología y farmacología'],
  'Gestión en salud': [],
  'Gerontología': [],
  'Fisioterapia y ejercicio terapéutico': ['Semiologia kinésica e imagenología'],

  'Rehabilitación sistema locomotor infantil': ['Fisioterapia y ejercicio terapéutico'],
  'Rehabilitación cardio respiratorio infantil': ['Semiologia kinésica e imagenología'],
  'Prescripcion ejercicio en pacientes crónicos': ['Fisiología del metabolismo energético y del ejercicio'],
  'Etica en salud': [],
  'Neurorehabilitación infantil': ['Semiologia kinésica e imagenología'],
  'Rehabilitación geriátrica': ['Gerontología'],
  'Electivo I': [],

  'Rehabilitación sistema locomotor adulto': ['Rehabilitación sistema locomotor infantil'],
  'Rehabilitación cardio respiratorio adulto': ['Rehabilitación cardio respiratorio infantil'],
  'Metodología de la investigación': ['Estadísticas para ciencias de la salud'],
  'Rehabilitación deportiva': ['Fisiología del metabolismo energético y del ejercicio'],
  'Neurorehabilitación adulto': ['Neurorehabilitación infantil'],
  'Salud ocupacional': [],
  'Electivo II': ['Electivo I'],

  'Rehabilitación en condiciones especiales de salud': [],
  'Tratamiento kinésico del paciente cronico': [],
  'Seminario de investigación': ['Metodología de la investigación'],
  'Razonamiento clínico': [],
  'Electivo III': ['Electivo II'],

  'internado profesional I y II': [],
  'internado profesional III y IV': [],
  'ACTIVIDAD DE TITULACIÓN': []
};

const aprobados = new Set();

function crearMalla() {
  const malla = document.getElementById('malla');

  let semestres = [
    ['Primer año - I semestre', [
      'Principios matemáticos',
      'Fundamentos de anatomia para el movimiento humano',
      'Biologia celular',
      'Fundamento del movimiento humano',
      'Taller de competencias comunicativas',
      'Taller de competencias para el aprendizaje'
    ]],
    ['Primer año - II semestre', [
      'Anatomía/ fisiología',
      'Fisiología de tejidos y biofísica',
      'Actividad física y salud',
      'Química',
      'Cultura y valores',
      'Taller de desarrollo personal 1'
    ]],
    ['Segundo año - III semestre', [
      'Estadísticas para ciencias de la salud',
      'Fisiopatología y farmacología',
      'Fisiología articular',
      'Desarrollo psicomotor normal y patológico',
      'Bioquimica',
      'Ingles basico I'
    ]],
    ['Segundo año - IV semestre', [
      'Fundamentos en salud pública',
      'Biomecánica y control motor',
      'Persona y sentido',
      'Semiologia kinésica e imagenología',
      'Taller de desarrollo personal II',
      'Inglés básico II'
    ]],
    ['Tercer año - V semestre', [
      'Rehabilitación en base en salud familiar y comunitaria',
      'Fisiología del metabolismo energético y del ejercicio',
      'Atención pre hospitalaria y primeros auxilios',
      'Gestión en salud',
      'Gerontología',
      'Fisioterapia y ejercicio terapéutico'
    ]],
    ['Tercer año - VI semestre', [
      'Rehabilitación sistema locomotor infantil',
      'Rehabilitación cardio respiratorio infantil',
      'Prescripcion ejercicio en pacientes crónicos',
      'Etica en salud',
      'Neurorehabilitación infantil',
      'Rehabilitación geriátrica',
      'Electivo I'
    ]],
    ['Cuarto año - VII semestre', [
      'Rehabilitación sistema locomotor adulto',
      'Rehabilitación cardio respiratorio adulto',
      'Metodología de la investigación',
      'Rehabilitación deportiva',
      'Neurorehabilitación adulto',
      'Salud ocupacional',
      'Electivo II'
    ]],
    ['Cuarto año - VIII semestre', [
      'Rehabilitación en condiciones especiales de salud',
      'Tratamiento kinésico del paciente cronico',
      'Seminario de investigación',
      'Razonamiento clínico',
      'Electivo III'
    ]],
    ['Quinto año - IX semestre', ['internado profesional I y II']],
    ['Quinto año - X semestre', ['internado profesional III y IV']],
    ['Actividad de titulación', ['ACTIVIDAD DE TITULACIÓN']]
  ];

  semestres.forEach(([titulo, ramosLista]) => {
    const semestreDiv = document.createElement('div');
    semestreDiv.className = 'semestre';
    const h2 = document.createElement('h2');
    h2.textContent = titulo;
    semestreDiv.appendChild(h2);

    ramosLista.forEach(nombre => {
      const div = document.createElement('div');
      div.className = 'ramo';
      div.textContent = nombre;
      div.dataset.nombre = nombre;
      semestreDiv.appendChild(div);
    });

    malla.appendChild(semestreDiv);
  });

  actualizarEstado();
  document.querySelectorAll('.ramo').forEach(el => {
    el.addEventListener('click', () => aprobarRamo(el.dataset.nombre));
  });
}

function actualizarEstado() {
  document.querySelectorAll('.ramo').forEach(el => {
    const nombre = el.dataset.nombre;
    const requisitos = ramos[nombre] || [];
    const desbloqueado = requisitos.every(req => aprobados.has(req));

    el.classList.remove('aprobado', 'desbloqueado');
    if (aprobados.has(nombre)) {
      el.classList.add('aprobado');
    } else if (desbloqueado || requisitos.length === 0) {
      el.classList.add('desbloqueado');
    }
  });
}

function aprobarRamo(nombre) {
  if (!aprobados.has(nombre)) {
    aprobados.add(nombre);
  } else {
    aprobados.delete(nombre);
  }
  actualizarEstado();
}

crearMalla();
