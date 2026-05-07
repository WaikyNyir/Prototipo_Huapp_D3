export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface ExerciseItem {
  id: string;
  text: string;
  correctAnswer: string; // 'green' | 'red' | 'trust' | 'suspect' | 'ia' | 'doctor' | 'urgencias' | 'useful' | 'caution' | 'doctor-needed'
  feedback: string;
}

export interface Exercise {
  type: 'semaforo' | 'detective' | 'triaje' | 'respuestas' | 'consulta' | 'buttons';
  title: string;
  instruction: string;
  items: ExerciseItem[];
}

export interface ContentBlock {
  type: 'text' | 'tip' | 'warning' | 'list' | 'example';
  title?: string;
  content: string | string[];
}

export interface Lesson {
  id: string;
  moduleId: number;
  lessonNumber: number;
  title: string;
  duration: string;
  icon: string;
  contentBlocks: ContentBlock[];
  exercise: Exercise;
  quiz: QuizQuestion[];
}

export interface CourseModule {
  id: number;
  title: string;
  subtitle: string;
  icon: string;
  color: string;
  description: string;
  lessons: Lesson[];
  badgeName: string;
  badgeIcon: string;
  requiresModule?: number;
}

export const courseModules: CourseModule[] = [
  {
    id: 1,
    title: 'Módulo 1',
    subtitle: 'Conocer la Inteligencia Artificial',
    icon: '🧠',
    color: '#1B4F7A',
    description: 'Aprende qué es la IA, cómo se usa en salud, cuáles son sus límites y cómo proteger tu privacidad.',
    badgeName: 'Explorador Digital',
    badgeIcon: '🏅',
    lessons: [
      {
        id: '1-1',
        moduleId: 1,
        lessonNumber: 1,
        title: 'Bienvenida y navegación',
        duration: '3 min',
        icon: '👋',
        contentBlocks: [
          {
            type: 'text',
            title: 'Hola, bienvenido o bienvenida',
            content: 'Te vamos a enseñar a usar esta aplicación paso a paso. No te preocupes si te equivocas — puedes volver atrás cuando quieras y repetir las lecciones todas las veces que necesites.'
          },
          {
            type: 'tip',
            title: '¿Cómo funciona esta app?',
            content: 'Cada lección tiene tres partes:\n1. Información fácil de leer\n2. Un ejercicio práctico\n3. Preguntas cortas para repasar'
          },
          {
            type: 'list',
            title: 'Los botones principales',
            content: [
              '🏠 Inicio — Te lleva al menú principal',
              '📚 Módulos — Ver los temas de aprendizaje',
              '🤖 Asistente — Hablar con la inteligencia artificial',
              '◀ Atrás — Volver a la pantalla anterior',
              'A+ / A- — Cambiar el tamaño de la letra'
            ]
          },
          {
            type: 'tip',
            title: '¡Muy bien!',
            content: 'Ya casi terminas esta primera lección. Recuerda: no hay respuestas malas. Si algo no está claro, puedes releer la lección cuantas veces quieras.'
          }
        ],
        exercise: {
          type: 'buttons',
          title: 'Ejercicio: Reconoce los botones',
          instruction: 'Lee cada descripción y elige el botón correcto:',
          items: [
            {
              id: 'ex1-1',
              text: '¿Qué botón usas para volver al menú principal?',
              correctAnswer: 'inicio',
              feedback: '¡Correcto! El botón 🏠 Inicio siempre te lleva al menú principal.'
            },
            {
              id: 'ex1-2',
              text: '¿Qué botón usas para agrandar la letra?',
              correctAnswer: 'agrandar',
              feedback: '¡Muy bien! El botón A+ agranda la letra para que sea más fácil de leer.'
            },
            {
              id: 'ex1-3',
              text: '¿Qué botón usas para hablar con la inteligencia artificial?',
              correctAnswer: 'asistente',
              feedback: '¡Excelente! El botón 🤖 Asistente te conecta con la inteligencia artificial.'
            }
          ]
        },
        quiz: [
          {
            id: 'q1-1-1',
            question: 'Si te pierdes en una lección, ¿qué botón usas para volver al menú principal?',
            options: [
              'El botón rojo de emergencia',
              'El botón 🏠 Inicio, que siempre está visible en la parte superior',
              'Hay que cerrar la aplicación y volver a abrirla',
              'Llamar a un familiar para que me ayude'
            ],
            correctIndex: 1,
            explanation: '¡Correcto! El botón 🏠 Inicio siempre está visible y te lleva al menú principal. Nunca necesitas cerrar la aplicación.'
          },
          {
            id: 'q1-1-2',
            question: '¿Puedes hacer la letra más grande en esta aplicación?',
            options: [
              'No, el tamaño de letra está fijo y no se puede cambiar',
              'Sí, hay un botón A+ para agrandar y A- para achicar la letra',
              'Solo se puede cambiar si tienes un teléfono nuevo',
              'Necesitas pedirle a alguien más joven que lo haga'
            ],
            correctIndex: 1,
            explanation: '¡Exacto! Los botones A+ y A- están siempre disponibles para que puedas ajustar el tamaño de letra según lo que necesites.'
          },
          {
            id: 'q1-1-3',
            question: 'Si no entiendes algo en una lección, ¿qué puedes hacer?',
            options: [
              'Debes pasar al siguiente tema aunque no hayas entendido',
              'Mejor cerrar la aplicación y no volver',
              'Puedes volver a leer la lección, preguntar al asistente, o repetir el ejercicio',
              'Tienes que llamar al hospital'
            ],
            correctIndex: 2,
            explanation: '¡Muy bien! Puedes releer, repetir ejercicios o preguntarle al asistente. Esta aplicación está diseñada para que aprendas a tu propio ritmo.'
          }
        ]
      },
      {
        id: '1-2',
        moduleId: 1,
        lessonNumber: 2,
        title: '¿Qué es la inteligencia artificial?',
        duration: '4 min',
        icon: '💡',
        contentBlocks: [
          {
            type: 'text',
            title: '¿Qué es la inteligencia artificial?',
            content: 'La inteligencia artificial (IA) es un programa de computadora muy avanzado que puede entender preguntas escritas en español normal y responderlas. No es un robot, no es un ser vivo — es un software muy sofisticado.'
          },
          {
            type: 'example',
            title: 'Ejemplos cotidianos de IA',
            content: 'Ya has usado IA sin darte cuenta:\n• El corrector de texto del teléfono que sugiere palabras\n• El GPS que te indica la ruta más corta\n• La búsqueda de Google que entiende lo que escribes\n• Los subtítulos automáticos de YouTube'
          },
          {
            type: 'text',
            title: '¿Cómo "sabe" tanto?',
            content: 'La IA aprendió leyendo millones de textos: libros, artículos, páginas web, enciclopedias. Por eso puede responder preguntas sobre muchos temas. Pero como aprendió de lo que otros escribieron, a veces puede cometer errores o tener información desactualizada.'
          },
          {
            type: 'warning',
            title: 'Importante recordar',
            content: 'La IA NO es un médico. NO puede examinar tu cuerpo. NO puede diagnosticar enfermedades. Es una herramienta de información, como una enciclopedia interactiva.'
          }
        ],
        exercise: {
          type: 'buttons',
          title: 'Ejercicio: ¿IA o no IA?',
          instruction: 'Indica si estas afirmaciones sobre la IA son verdaderas o falsas:',
          items: [
            {
              id: 'ex2-1',
              text: 'La IA es un programa de computadora muy avanzado',
              correctAnswer: 'verdadero',
              feedback: '¡Correcto! La IA es un software muy sofisticado, no un ser vivo ni un robot físico.'
            },
            {
              id: 'ex2-2',
              text: 'La IA puede diagnosticar enfermedades con certeza',
              correctAnswer: 'falso',
              feedback: 'Incorrecto. La IA no puede diagnosticar enfermedades. Solo un médico puede hacerlo después de examinar al paciente.'
            },
            {
              id: 'ex2-3',
              text: 'El GPS que usamos para buscar caminos es un tipo de IA',
              correctAnswer: 'verdadero',
              feedback: '¡Muy bien! El GPS es uno de los ejemplos más cotidianos de inteligencia artificial.'
            }
          ]
        },
        quiz: [
          {
            id: 'q1-2-1',
            question: '¿Qué es la inteligencia artificial?',
            options: [
              'Un robot físico que puede caminar y hablar',
              'Un programa de computadora avanzado que entiende y responde preguntas en lenguaje normal',
              'Un médico que trabaja en línea desde otro país',
              'Un teléfono inteligente muy caro'
            ],
            correctIndex: 1,
            explanation: '¡Correcto! La IA es un programa de software muy avanzado. No tiene cuerpo físico y no es un médico, pero puede responder preguntas de forma muy útil.'
          },
          {
            id: 'q1-2-2',
            question: '¿Cuál de estos NO es un ejemplo de inteligencia artificial que ya usamos en la vida diaria?',
            options: [
              'El corrector de texto del celular que sugiere palabras',
              'El GPS que nos indica la ruta más rápida',
              'Un termómetro que mide la temperatura',
              'Los subtítulos automáticos de YouTube'
            ],
            correctIndex: 2,
            explanation: '¡Exacto! Un termómetro es un aparato simple de medición, no usa inteligencia artificial. Los otros tres sí son ejemplos de IA cotidiana.'
          }
        ]
      },
      {
        id: '1-3',
        moduleId: 1,
        lessonNumber: 3,
        title: 'La IA en salud',
        duration: '4 min',
        icon: '🏥',
        contentBlocks: [
          {
            type: 'text',
            title: '¿Para qué sirve la IA en salud?',
            content: 'Los programas de IA en salud están diseñados para ayudarte a entender mejor tu situación médica. Pueden explicar términos médicos difíciles, darte información general sobre enfermedades y ayudarte a prepararte para hablar con tu médico.'
          },
          {
            type: 'list',
            title: 'Lo que la IA SÍ puede hacer en salud',
            content: [
              '✅ Explicar en palabras simples qué es una enfermedad',
              '✅ Decirte qué preguntas hacerle a tu médico',
              '✅ Explicar qué significan palabras médicas difíciles',
              '✅ Dar información general sobre alimentación y hábitos saludables',
              '✅ Recordarte la importancia de tomar los medicamentos'
            ]
          },
          {
            type: 'list',
            title: 'Lo que la IA NO puede hacer',
            content: [
              '❌ Diagnosticar tu enfermedad',
              '❌ Recetarte medicamentos',
              '❌ Reemplazar a tu médico o enfermera',
              '❌ Examinar tu cuerpo',
              '❌ Acceder a tu historial médico real'
            ]
          },
          {
            type: 'warning',
            title: 'Esta aplicación es para orientación',
            content: 'El asistente de IA de esta app está diseñado solo para informarte sobre temas de salud generales. Si tienes una emergencia, llama al 131 (SAMU) o ve a urgencias.'
          }
        ],
        exercise: {
          type: 'buttons',
          title: 'Ejercicio: ¿La IA puede hacerlo?',
          instruction: 'Para cada situación, indica si la IA puede ayudar (SÍ) o no puede hacerlo (NO):',
          items: [
            {
              id: 'ex3-1',
              text: 'Explicar en palabras simples qué es la diabetes tipo 2',
              correctAnswer: 'si',
              feedback: '¡Correcto! La IA puede explicar conceptos médicos en lenguaje sencillo. Eso es muy útil.'
            },
            {
              id: 'ex3-2',
              text: 'Recetar un medicamento para la presión arterial alta',
              correctAnswer: 'no',
              feedback: 'Exacto. Solo un médico puede recetar medicamentos después de examinar al paciente. La IA NUNCA receta.'
            },
            {
              id: 'ex3-3',
              text: 'Sugerir preguntas para hacerle al cardiólogo en la próxima consulta',
              correctAnswer: 'si',
              feedback: '¡Muy bien! Usar la IA para preparar tu consulta médica es uno de los usos más útiles y seguros.'
            }
          ]
        },
        quiz: [
          {
            id: 'q1-3-1',
            question: '¿Cuál es un buen uso de la IA en salud?',
            options: [
              'Pedirle a la IA que te diagnostique una enfermedad basada en tus síntomas',
              'Usar la IA para entender qué significa "insuficiencia venosa" que te dijo el médico',
              'Pedirle a la IA que te recete el medicamento correcto para tu presión',
              'Confiar en la IA en lugar de ir al médico cuando tienes dolor fuerte'
            ],
            correctIndex: 1,
            explanation: '¡Exacto! Usar la IA para entender palabras médicas difíciles es un uso perfecto. Es seguro, útil y te ayuda a estar mejor preparado.'
          },
          {
            id: 'q1-3-2',
            question: 'Si una IA te dice "usted tiene hipertensión arterial", ¿qué deberías hacer?',
            options: [
              'Creerle y empezar a tomar medicamentos para la presión',
              'Compartir ese diagnóstico con familiares y amigos',
              'No confiar en ese diagnóstico — ir a un médico para que te haga los exámenes reales',
              'La IA siempre tiene razón en temas de salud, así que seguir su consejo'
            ],
            correctIndex: 2,
            explanation: '¡Correcto! La IA no puede diagnosticar. Solo un médico, después de examinarte y hacerte exámenes, puede dar un diagnóstico real.'
          }
        ]
      },
      {
        id: '1-4',
        moduleId: 1,
        lessonNumber: 4,
        title: 'Riesgos y limitaciones',
        duration: '4 min',
        icon: '⚠️',
        contentBlocks: [
          {
            type: 'text',
            title: 'La IA puede equivocarse',
            content: 'La inteligencia artificial no siempre tiene razón. A veces inventa información que suena muy convincente pero es falsa. Los expertos llaman a esto "alucinaciones". Por eso es muy importante verificar la información importante con tu médico o enfermera.'
          },
          {
            type: 'list',
            title: 'Principales limitaciones de la IA',
            content: [
              '⚠️ Puede inventar datos o estadísticas que suenan reales pero son falsas',
              '⚠️ Su información puede estar desactualizada (no siempre sabe lo último)',
              '⚠️ No conoce tu historial médico personal',
              '⚠️ No puede ver cómo te ves físicamente ni cómo te sientes realmente',
              '⚠️ Generaliza — lo que dice puede ser cierto para "la mayoría" pero no para ti'
            ]
          },
          {
            type: 'example',
            title: 'Ejemplo real de error de IA',
            content: 'Una persona preguntó a una IA: "¿Cuál es la dosis normal de ibuprofeno?" La IA respondió con una dosis correcta para adultos jóvenes, sin preguntar la edad, el peso ni si tomaba otros medicamentos. Para un adulto mayor con problemas de riñón, esa dosis puede ser peligrosa. Por eso SIEMPRE consulta las dosis con tu médico o farmacéutico.'
          },
          {
            type: 'warning',
            title: 'Señales de que debes desconfiar de una respuesta de IA',
            content: 'Desconfía cuando la IA:\n• Suena demasiado segura en temas médicos complejos\n• No recomienda ir al médico ante síntomas serios\n• Da un diagnóstico específico\n• Te recomienda cambiar tus medicamentos'
          }
        ],
        exercise: {
          type: 'buttons',
          title: 'Ejercicio: ¿Confío en esta respuesta?',
          instruction: 'Lee cada respuesta de IA e indica si es CONFIABLE o debes DESCONFIAR:',
          items: [
            {
              id: 'ex4-1',
              text: '"La hipertensión se controla con dieta baja en sal y ejercicio regular. Le recomiendo hablar con su médico sobre medicamentos."',
              correctAnswer: 'confiable',
              feedback: '¡Correcto! Esta respuesta da información general útil y recomienda ir al médico. Es una respuesta responsable.'
            },
            {
              id: 'ex4-2',
              text: '"Con sus síntomas puedo determinar que usted tiene diabetes tipo 2. Tome metformina 500mg dos veces al día."',
              correctAnswer: 'desconfiar',
              feedback: 'Exacto, hay que desconfiar. La IA no puede diagnosticar ni recetar. Esta respuesta es peligrosa y nunca debería ocurrir.'
            },
            {
              id: 'ex4-3',
              text: '"El dolor de rodilla podría tener varias causas. Le recomiendo consultar a un traumatólogo para un diagnóstico preciso."',
              correctAnswer: 'confiable',
              feedback: '¡Muy bien! Esta respuesta reconoce que no puede saber la causa exacta y recomienda al especialista. Es responsable.'
            }
          ]
        },
        quiz: [
          {
            id: 'q1-4-1',
            question: '¿Qué son las "alucinaciones" de la IA?',
            options: [
              'Cuando la IA se pone a soñar y deja de funcionar',
              'Cuando la IA inventa información que suena real pero es falsa',
              'Cuando la pantalla se ve borrosa al usar la aplicación',
              'Es un término técnico para cuando la IA está aprendiendo'
            ],
            correctIndex: 1,
            explanation: '¡Correcto! Las "alucinaciones" son cuando la IA inventa datos o afirmaciones falsas pero que suenan muy convincentes. Por eso siempre hay que verificar información médica importante con tu médico.'
          },
          {
            id: 'q1-4-2',
            question: '¿Por qué la IA puede darte información desactualizada?',
            options: [
              'Porque los programadores la actualizan solo cuando llueve',
              'Porque aprendió con textos de una fecha determinada y puede no conocer los últimos avances',
              'Porque las personas mayores no merecen información actualizada',
              'La IA siempre está actualizada al minuto'
            ],
            correctIndex: 1,
            explanation: '¡Exacto! La IA aprendió con textos hasta cierta fecha. Puede no conocer los medicamentos más nuevos o los últimos cambios en las recomendaciones médicas.'
          }
        ]
      },
      {
        id: '1-5',
        moduleId: 1,
        lessonNumber: 5,
        title: 'Privacidad y datos',
        duration: '4 min',
        icon: '🔒',
        contentBlocks: [
          {
            type: 'text',
            title: 'La IA no es tu médico personal',
            content: 'Cuando escribes algo a una IA, es como gritarlo en una plaza pública. Algunas aplicaciones de IA guardan todo lo que escribes para mejorar sus sistemas. No es como hablar en privado con tu médico en su consulta.'
          },
          {
            type: 'list',
            title: 'Información que SÍ puedes compartir con la IA',
            content: [
              '✅ Preguntas generales sobre enfermedades ("¿qué es la diabetes?")',
              '✅ Síntomas generales sin mencionar tu nombre ("tengo dolor de cabeza hace 3 días")',
              '✅ Dudas sobre medicamentos en general',
              '✅ Preguntas sobre alimentación y hábitos saludables',
              '✅ Solicitar preguntas para hacerle a tu médico'
            ]
          },
          {
            type: 'list',
            title: 'Información que NO debes compartir con la IA',
            content: [
              '❌ Tu RUT o número de identificación',
              '❌ Tu dirección o número de teléfono',
              '❌ Tu número de afiliación a FONASA o ISAPRE',
              '❌ Fotos de exámenes con tu nombre',
              '❌ Datos de tarjetas bancarias o contraseñas',
              '❌ Contraseñas o códigos de seguridad'
            ]
          },
          {
            type: 'warning',
            title: 'Recuerda siempre',
            content: 'Los datos personales se guardan para ti y tu doctor, no para la IA. Si una IA te pide tu RUT o dirección "para ayudarte mejor", eso es una señal de alerta.'
          }
        ],
        exercise: {
          type: 'semaforo',
          title: 'Semáforo de Privacidad',
          instruction: 'Para cada frase, decide si es SEGURO compartirla con la IA (verde) o NO debes compartirla (rojo):',
          items: [
            {
              id: 'priv1',
              text: 'Tengo dolor de cabeza desde hace 3 días',
              correctAnswer: 'green',
              feedback: '✅ Es seguro. Describir síntomas generales está bien. No estás dando datos personales identificables.'
            },
            {
              id: 'priv2',
              text: 'Mi RUT es 12.345.678-9 y tengo presión alta',
              correctAnswer: 'red',
              feedback: '🔴 No compartas tu RUT. La IA no necesita tu número de identificación para ayudarte. Es un dato personal sensible.'
            },
            {
              id: 'priv3',
              text: '¿Qué es la diabetes tipo 2?',
              correctAnswer: 'green',
              feedback: '✅ Perfecto. Preguntas generales sobre enfermedades son completamente seguras de hacer.'
            },
            {
              id: 'priv4',
              text: 'Soy Juan Pérez, vivo en calle Los Aromos 234',
              correctAnswer: 'red',
              feedback: '🔴 No. Tu nombre completo y dirección son datos personales que no debes compartir con la IA.'
            },
            {
              id: 'priv5',
              text: 'Mi madre tomaba este remedio, ¿es seguro?',
              correctAnswer: 'green',
              feedback: '✅ Bien. Preguntas sobre medicamentos en general son seguras. No estás dando datos personales.'
            },
            {
              id: 'priv6',
              text: 'Aquí está mi tarjeta bancaria para que me cobres la consulta',
              correctAnswer: 'red',
              feedback: '🔴 ¡Alerta de estafa! Ninguna IA médica legítima te pedirá datos de tarjeta bancaria. Esto es una estafa.'
            },
            {
              id: 'priv7',
              text: 'Tengo 70 años y me cuesta dormir',
              correctAnswer: 'green',
              feedback: '✅ Seguro. Dar tu edad y describir un síntoma general está bien para obtener información útil.'
            },
            {
              id: 'priv8',
              text: 'Mi clave del banco es 1234',
              correctAnswer: 'red',
              feedback: '🔴 ¡Nunca! Jamás compartas contraseñas o claves con nadie ni con ninguna aplicación.'
            }
          ]
        },
        quiz: [
          {
            id: 'q1-5-1',
            question: 'Si una IA te pide tu RUT y tu dirección para "ayudarte mejor con tu salud", ¿qué haces?',
            options: [
              'Se los das porque la IA necesita esos datos para darte mejor información',
              'Le das solo el RUT pero no la dirección',
              'No se los das, desconfías y cierras esa aplicación — es una señal de estafa',
              'Llamas a un familiar antes de decidir qué hacer'
            ],
            correctIndex: 2,
            explanation: '¡Correcto! Ninguna IA médica legítima necesita tu RUT ni dirección. Cuando una aplicación pide esos datos, es una señal de alerta de posible estafa.'
          },
          {
            id: 'q1-5-2',
            question: '¿Está bien preguntarle a una IA "¿qué es el colesterol alto?"',
            options: [
              'No, es mejor buscar solo en sitios médicos oficiales',
              'Sí, es una pregunta general sobre información médica, no son datos personales',
              'Solo si primero le das tu nombre para que la IA sepa quién pregunta',
              'No, las IAs no saben de salud'
            ],
            correctIndex: 1,
            explanation: '¡Exacto! Preguntar sobre qué es una enfermedad o condición es completamente seguro. No estás dando datos personales, solo pidiendo información general.'
          },
          {
            id: 'q1-5-3',
            question: 'Tu nieto te dice que le mandes una foto de tu carnet por WhatsApp porque "una IA del hospital la necesita". ¿Qué haces?',
            options: [
              'Le mandas la foto porque tu nieto es de confianza',
              'No lo haces — ningún hospital pide documentos por WhatsApp. Llamas directamente al hospital para confirmar',
              'Mandas solo el frente del carnet, no el reverso',
              'Primero mandas la foto y después verificas'
            ],
            correctIndex: 1,
            explanation: '¡Muy bien! Ningún hospital ni IA legítima pide documentos de identidad por WhatsApp. Ante cualquier duda, llama directamente al hospital usando el número que encuentras en el sitio oficial.'
          }
        ]
      },
      {
        id: '1-6',
        moduleId: 1,
        lessonNumber: 6,
        title: 'Reconocer engaños en internet',
        duration: '4 min',
        icon: '🕵️',
        contentBlocks: [
          {
            type: 'text',
            title: 'No todo lo que parece hospital, lo es',
            content: 'En internet hay personas que crean páginas web falsas, mensajes de WhatsApp falsos y aplicaciones engañosas que se hacen pasar por hospitales o médicos reales. Estas personas quieren robar tu dinero o tus datos personales.'
          },
          {
            type: 'list',
            title: 'Tres señales claras de una estafa de salud',
            content: [
              '🚩 Te promete curas milagrosas o instantáneas para enfermedades complejas',
              '🚩 Te apura y dice que tienes que actuar "ahora mismo" o "en las próximas horas"',
              '🚩 Te pide pagar dinero antes de explicarte qué es el servicio'
            ]
          },
          {
            type: 'list',
            title: 'Cómo verificar si una página es real',
            content: [
              '🔍 Busca el nombre del hospital en Google y compara la dirección web',
              '📞 Llama por teléfono al hospital usando el número del sitio oficial',
              '🌐 Las páginas del gobierno chileno terminan en .gob.cl',
              '❌ No hagas clic en links que lleguen por WhatsApp sin verificar'
            ]
          },
          {
            type: 'warning',
            title: 'Recuerda',
            content: 'El Hospital HUAP (Posta Central) tiene su sitio oficial en huap.redsalud.gob.cl. Si ves una página diferente que dice ser el HUAP, llama al hospital para confirmar.'
          }
        ],
        exercise: {
          type: 'detective',
          title: 'Detective de Estafas',
          instruction: 'Analiza cada situación y decide si es CONFIABLE o SOSPECHOSA:',
          items: [
            {
              id: 'det1',
              text: 'WhatsApp: "Hola abuelita 👵 soy Dr. Ramírez del HUAP, tengo un remedio gratis para la artrosis, mándeme su dirección"',
              correctAnswer: 'suspect',
              feedback: '🔴 Sospechoso. Los médicos reales no contactan por WhatsApp para ofrecer remedios. Nunca mandes tu dirección a desconocidos.'
            },
            {
              id: 'det2',
              text: 'Página web: huap.redsalud.gob.cl con información oficial sobre horarios y servicios',
              correctAnswer: 'trust',
              feedback: '✅ Confiable. El dominio .gob.cl indica que es una página del gobierno de Chile. Es el sitio oficial del HUAP.'
            },
            {
              id: 'det3',
              text: 'Anuncio: "¡Médicos odian este truco! Baja 10 kilos en una semana con esta hierba milagrosa"',
              correctAnswer: 'suspect',
              feedback: '🔴 Sospechoso. "Soluciones milagrosas", "médicos lo odian" son señales clásicas de fraude. No existen curas mágicas.'
            },
            {
              id: 'det4',
              text: 'Un chatbot de IA te dice: "Le receto paracetamol 500mg cada 8 horas para su dolor de cabeza"',
              correctAnswer: 'suspect',
              feedback: '🔴 Sospechoso. La IA no puede recetar medicamentos. Solo un médico puede hacerlo. Ante esto, consulta a tu médico o farmacéutico.'
            },
            {
              id: 'det5',
              text: 'Email formal: "Estimado paciente, su próxima consulta en HUAP es el 15 de mayo. Para consultas llame al 27004600"',
              correctAnswer: 'trust',
              feedback: '✅ Parece confiable, pero siempre es bueno verificar llamando al hospital con el número que encuentras en el sitio oficial (.gob.cl).'
            }
          ]
        },
        quiz: [
          {
            id: 'q1-6-1',
            question: '¿Cuál es la señal más clara de una estafa de salud en internet?',
            options: [
              'El sitio web tiene muchas fotos de médicos',
              'Te ofrecen información de salud gratis',
              'Te prometen curas milagrosas para enfermedades complejas en poco tiempo',
              'La página tiene muchos colores y está bien diseñada'
            ],
            correctIndex: 2,
            explanation: '¡Correcto! Las promesas de curas milagrosas son la señal más clara de fraude. Las enfermedades crónicas como diabetes o hipertensión no tienen curas instantáneas.'
          },
          {
            id: 'q1-6-2',
            question: 'Si recibes un WhatsApp de "tu hospital" pidiéndote dinero para confirmar tu próxima cita, ¿qué haces?',
            options: [
              'Pagas el dinero porque no quieres perder la cita',
              'Le preguntas a tu familiar si es normal pagar así',
              'No pagas nada — cuelgas y llamas al hospital al número oficial para confirmar',
              'Mandas solo la mitad del monto pedido'
            ],
            correctIndex: 2,
            explanation: '¡Exacto! Los hospitales del sistema público chileno no cobran por confirmar citas por WhatsApp. Ante cualquier solicitud de dinero, llama directamente al hospital usando el número del sitio oficial.'
          }
        ]
      }
    ]
  },
  {
    id: 2,
    title: 'Módulo 2',
    subtitle: 'Practicar con la IA',
    icon: '💬',
    color: '#2D6E3E',
    description: 'Aprende a hacer preguntas útiles, interpretar respuestas, verificar información y preparar tu consulta médica.',
    badgeName: 'Experto en IA',
    badgeIcon: '🥇',
    lessons: [
      {
        id: '2-1',
        moduleId: 2,
        lessonNumber: 1,
        title: 'Hacer mejores preguntas',
        duration: '4 min',
        icon: '❓',
        contentBlocks: [
          {
            type: 'text',
            title: 'La calidad de la respuesta depende de tu pregunta',
            content: 'La IA responde según lo que le preguntas. Si haces una pregunta vaga, te dará una respuesta general. Si haces una pregunta específica y clara, te dará una respuesta mucho más útil.'
          },
          {
            type: 'example',
            title: 'Comparación de preguntas',
            content: '❌ Pregunta vaga: "Tengo dolor"\n\n✅ Pregunta mejor: "Tengo dolor de rodilla izquierda hace una semana cuando bajo escaleras. ¿Qué podría ser y qué especialista debería ver?"\n\n❌ Pregunta vaga: "¿Qué como?"\n\n✅ Pregunta mejor: "Tengo diabetes tipo 2 y presión alta. ¿Qué alimentos debo evitar y cuáles son buenos para mí?"'
          },
          {
            type: 'list',
            title: 'Los 4 elementos de una buena pregunta médica',
            content: [
              '1️⃣ Describe el síntoma o situación específica',
              '2️⃣ Indica hace cuánto tiempo lo tienes',
              '3️⃣ Menciona si mejora o empeora con algo',
              '4️⃣ Dile qué información necesitas exactamente'
            ]
          },
          {
            type: 'tip',
            title: 'Truco útil',
            content: 'Empieza tus preguntas con: "¿Puedes explicarme en palabras simples..." o "Quiero entender qué es..." o "¿Qué preguntas debo hacerle a mi médico sobre..."'
          }
        ],
        exercise: {
          type: 'buttons',
          title: 'Ejercicio: ¿Qué pregunta es mejor?',
          instruction: 'De cada par de preguntas, elige cuál es la MEJOR para hacerle a la IA:',
          items: [
            {
              id: 'ex-2-1-a',
              text: 'A) "Me duele la espalda" vs B) "Tengo dolor en la parte baja de la espalda hace 2 semanas que empeora cuando estoy mucho tiempo sentado. ¿Qué puede ser?"',
              correctAnswer: 'B',
              feedback: '¡Correcto! La opción B es mucho mejor porque especifica dónde duele, hace cuánto y qué lo agrava. Así la IA puede darte información más útil.'
            },
            {
              id: 'ex-2-1-b',
              text: 'A) "¿Qué es la hipertensión arterial y cómo afecta el corazón?" vs B) "Háblame de la presión"',
              correctAnswer: 'A',
              feedback: '¡Muy bien! La opción A es específica y pide exactamente lo que quieres saber. La opción B es demasiado vaga.'
            }
          ]
        },
        quiz: [
          {
            id: 'q2-1-1',
            question: '¿Por qué es importante hacer preguntas específicas a la IA?',
            options: [
              'Porque la IA se confunde si las preguntas son cortas',
              'Porque preguntas más específicas permiten obtener respuestas más útiles y precisas',
              'Porque hay que escribir mucho para que la IA funcione bien',
              'No importa cómo preguntes, la respuesta siempre será igual'
            ],
            correctIndex: 1,
            explanation: '¡Correcto! La calidad de la respuesta de la IA depende directamente de la calidad de tu pregunta. Cuanto más específico seas, más útil será la respuesta.'
          },
          {
            id: 'q2-1-2',
            question: '¿Cuál es la mejor forma de pedirle a la IA que te explique algo difícil?',
            options: [
              '"Explícame todo sobre la medicina"',
              '"¿Puedes explicarme en palabras simples qué es la insuficiencia cardíaca?"',
              '"Medicina"',
              '"Dame información médica"'
            ],
            correctIndex: 1,
            explanation: '¡Exacto! Pedir que te explique "en palabras simples" un tema específico es una excelente estrategia. La IA adaptará su lenguaje para ser más comprensible.'
          }
        ]
      },
      {
        id: '2-2',
        moduleId: 2,
        lessonNumber: 2,
        title: 'Leer una respuesta de la IA',
        duration: '4 min',
        icon: '📖',
        contentBlocks: [
          {
            type: 'text',
            title: 'La IA siempre responde, aunque no esté segura',
            content: 'Una respuesta de IA puede sonar muy segura aunque sea errónea. Tu trabajo es aprender a leer entre líneas: reconocer cuándo la IA está siendo cautelosa, cuándo está adivinando y cuándo reconoce sus propios límites.'
          },
          {
            type: 'list',
            title: '3 frases que deben hacerte reflexionar',
            content: [
              '⚠️ "Generalmente..." o "En la mayoría de los casos..." → La IA está generalizando. Tu caso puede ser diferente.',
              '✅ "Le recomiendo consultar a un médico" → Buena señal: la IA reconoce sus límites. ¡Hazle caso!',
              '🔶 "Podría ser X, Y o Z..." → La IA está adivinando entre opciones. Necesitas un médico para saber cuál es.'
            ]
          },
          {
            type: 'example',
            title: 'Ejemplo de respuesta responsable',
            content: '"Sus síntomas podrían corresponder a varias condiciones diferentes, incluyendo gastritis, reflujo o úlcera. Sin embargo, es difícil determinarlo sin un examen médico. Le recomiendo consultar a su médico, especialmente si el dolor es intenso o persistente."\n\n→ Esta respuesta ES responsable porque no da un diagnóstico y recomienda al médico.'
          },
          {
            type: 'warning',
            title: 'Cuidado con esto',
            content: 'Si una IA te da un diagnóstico con mucha seguridad ("usted tiene...") y no recomienda ir al médico, eso es una señal de alerta. Un buen sistema de IA médica siempre recomienda la consulta médica para síntomas.'
          }
        ],
        exercise: {
          type: 'respuestas',
          title: 'Clasifica las respuestas de IA',
          instruction: 'Lee cada respuesta de la IA y clasifícala: ¿es INFORMACIÓN ÚTIL, debería CONSULTAR AL MÉDICO, o la IA está ADIVINANDO?',
          items: [
            {
              id: 'resp1',
              text: '"La hipertensión arterial es cuando la presión sanguínea está sobre 140/90 mmHg de forma sostenida. Es importante medirla regularmente en casa o en la farmacia."',
              correctAnswer: 'useful',
              feedback: '✅ Información útil. Es un dato médico verificable y correcto que te ayuda a entender qué es la hipertensión.'
            },
            {
              id: 'resp2',
              text: '"Sus síntomas de mareo y dolor de cabeza podrían indicar presión alta, deshidratación, anemia o problemas de oído interno. Le recomiendo ir a urgencias si el mareo es muy fuerte."',
              correctAnswer: 'doctor-needed',
              feedback: '✅ Bien. La IA está siendo honesta sobre la incertidumbre y correctamente recomienda ir al médico. Sigue ese consejo.'
            },
            {
              id: 'resp3',
              text: '"Con sus síntomas puedo determinar que tiene artritis reumatoide. Tome naproxeno 500mg dos veces al día y verá mejoría en una semana."',
              correctAnswer: 'caution',
              feedback: '🔴 Cuidado. La IA NO puede diagnosticar ni recetar. Esta respuesta es irresponsable y potencialmente peligrosa. No sigas este consejo.'
            }
          ]
        },
        quiz: [
          {
            id: 'q2-2-1',
            question: 'Si la IA te dice "podría ser indigestión o algo más serio", ¿qué significa?',
            options: [
              'Que definitivamente tienes indigestión',
              'Que la IA no está segura y deberías ir al médico para un diagnóstico real',
              'Que debes probar el remedio para indigestión primero',
              'Que la IA está funcionando mal ese día'
            ],
            correctIndex: 1,
            explanation: '¡Exacto! Cuando la IA dice "podría ser", está siendo honesta sobre su incertidumbre. En temas de salud, esa incertidumbre es una señal para ir al médico.'
          },
          {
            id: 'q2-2-2',
            question: 'Una IA te dice con mucha seguridad: "Usted tiene diabetes. Empiece a tomar metformina." ¿Qué haces?',
            options: [
              'Compras metformina en la farmacia y empiezas a tomarla',
              'No le crees — solo un médico puede diagnosticar y recetar. Pides hora con tu médico',
              'Le haces otra pregunta a la IA para confirmar el diagnóstico',
              'Le preguntas a un familiar si está de acuerdo con ese diagnóstico'
            ],
            correctIndex: 1,
            explanation: '¡Correcto! Un diagnóstico real requiere exámenes de sangre y una consulta médica. La IA nunca puede diagnosticar con certeza. Ante esta respuesta, ve al médico.'
          }
        ]
      },
      {
        id: '2-3',
        moduleId: 2,
        lessonNumber: 3,
        title: 'Verificar la información',
        duration: '4 min',
        icon: '🔍',
        contentBlocks: [
          {
            type: 'text',
            title: '¿Por qué verificar?',
            content: 'La IA puede dar información muy buena la mayor parte del tiempo, pero también puede equivocarse. Antes de tomar una decisión de salud basada en lo que te dijo la IA, es importante confirmar esa información con fuentes confiables.'
          },
          {
            type: 'list',
            title: 'Fuentes confiables para verificar información médica',
            content: [
              '👨‍⚕️ Tu médico o enfermera del HUAP — siempre la mejor fuente',
              '💊 El farmacéutico de tu farmacia — experto en medicamentos',
              '🌐 Minsal.gob.cl — sitio oficial del Ministerio de Salud de Chile',
              '📚 MedlinePlus en español — información médica verificada por NIH',
              '🏥 El sitio oficial del hospital (huap.redsalud.gob.cl)'
            ]
          },
          {
            type: 'list',
            title: 'Señales de una fuente NO confiable',
            content: [
              '❌ Sitios que venden remedios mientras dan información médica',
              '❌ Páginas sin autores ni fechas de publicación',
              '❌ Información que contradice totalmente lo que te dijo tu médico',
              '❌ Testimonios de personas ("yo me curé con...")',
              '❌ Páginas que no terminan en .gob.cl o .org reconocidas'
            ]
          },
          {
            type: 'tip',
            title: 'El mejor método de verificación',
            content: 'Anota lo que te dijo la IA y llévalo a tu próxima consulta médica. Dile a tu médico: "La IA me dijo esto sobre mi enfermedad, ¿es correcto?" Esa es la verificación más segura.'
          }
        ],
        exercise: {
          type: 'buttons',
          title: 'Ejercicio: ¿Es una fuente confiable?',
          instruction: 'Para cada fuente, indica si es CONFIABLE o NO CONFIABLE para información de salud:',
          items: [
            {
              id: 'ver1',
              text: 'minsal.gob.cl — Ministerio de Salud de Chile',
              correctAnswer: 'confiable',
              feedback: '✅ Muy confiable. Es el sitio oficial del Ministerio de Salud del gobierno de Chile.'
            },
            {
              id: 'ver2',
              text: 'Un video de YouTube de alguien que dice "me curé el cáncer con jugo de limón"',
              correctAnswer: 'no-confiable',
              feedback: '❌ No confiable. Los testimonios personales no son evidencia médica. Puede ser bienintencionado pero peligroso.'
            },
            {
              id: 'ver3',
              text: 'Tu médico del HUAP',
              correctAnswer: 'confiable',
              feedback: '✅ La fuente más confiable de todas. Tu médico te conoce y puede darte información personalizada.'
            }
          ]
        },
        quiz: [
          {
            id: 'q2-3-1',
            question: 'La IA te dio información sobre tu medicamento para la presión. ¿Cómo verificas si es correcta?',
            options: [
              'Le preguntas a otra IA para comparar',
              'Preguntas a un vecino que también toma medicamentos para la presión',
              'Lo consultas con tu médico o farmacéutico en tu próxima visita',
              'Buscas en una página de internet que venda ese medicamento'
            ],
            correctIndex: 2,
            explanation: '¡Correcto! Tu médico o farmacéutico son las fuentes más confiables para información sobre medicamentos. Ellos conocen tu historial y pueden darte orientación personalizada.'
          }
        ]
      },
      {
        id: '2-4',
        moduleId: 2,
        lessonNumber: 4,
        title: 'Casos por patología',
        duration: '5 min',
        icon: '📋',
        contentBlocks: [
          {
            type: 'text',
            title: 'Ejemplos reales de uso de la IA en salud',
            content: 'En esta lección verás ejemplos concretos de cómo pacientes como tú pueden usar la IA de forma útil y segura para las cinco enfermedades más comunes que tratamos en el HUAP.'
          },
          {
            type: 'example',
            title: 'Caso 1: Hipertensión arterial (presión alta)',
            content: 'Don Carlos, 72 años, le preguntó a la IA:\n"¿Qué alimentos aumentan la presión arterial y cuáles la ayudan a bajar?"\n\nLa IA respondió con una lista útil de alimentos ricos en sodio (sal) a evitar y alimentos ricos en potasio (plátanos, espinacas) que ayudan. Luego Don Carlos llevó esa lista a su médico para confirmarla. ✅'
          },
          {
            type: 'example',
            title: 'Caso 2: Diabetes tipo 2',
            content: 'Doña Rosa, 68 años, preguntó:\n"¿Qué significa tener hemoglobina glicosilada en 7.5% y es un nivel bueno o malo?"\n\nLa IA explicó que la HbA1c mide el control de la azúcar en los últimos 3 meses y que 7.5% está en el límite. Le recomendó hablar con su diabetólogo sobre el resultado. Doña Rosa llegó mucho más preparada a su próxima consulta. ✅'
          },
          {
            type: 'example',
            title: 'Caso 3: Depresión',
            content: 'Don Pedro, 75 años, preguntó:\n"Me siento triste hace meses y no tengo ganas de hacer nada. ¿Esto es normal en la vejez?"\n\nLa IA respondió que la tristeza prolongada NO es normal ni inevitable en la vejez, y que puede ser depresión. Le recomendó buscar atención médica. Don Pedro fue al médico y recibió el tratamiento que necesitaba. ✅'
          },
          {
            type: 'warning',
            title: 'Importante en todos los casos',
            content: 'La IA sirvió para entender, prepararse y motivarse a ir al médico — no para reemplazarlo. El médico siempre tiene la última palabra.'
          }
        ],
        exercise: {
          type: 'buttons',
          title: 'Ejercicio: ¿Buen uso de la IA?',
          instruction: 'Para cada situación, indica si es un BUEN USO de la IA o NO es adecuado:',
          items: [
            {
              id: 'caso1',
              text: 'Preguntarle a la IA qué significa "HbA1c" antes de una consulta con el diabetólogo',
              correctAnswer: 'bueno',
              feedback: '✅ Excelente uso. Entender los términos médicos antes de la consulta te permite participar mejor y hacer mejores preguntas.'
            },
            {
              id: 'caso2',
              text: 'Pedirle a la IA que elija qué medicamento para la presión debes tomar entre dos opciones',
              correctAnswer: 'malo',
              feedback: '❌ No adecuado. Solo tu médico, conociendo tu historial completo, puede decidir qué medicamento es mejor para ti.'
            },
            {
              id: 'caso3',
              text: 'Usar la IA para entender qué ejercicios son generalmente recomendados para personas con artritis de rodilla',
              correctAnswer: 'bueno',
              feedback: '✅ Buen uso. Pedir información general sobre ejercicios para una condición es útil, aunque siempre debes confirmar con tu médico si esos ejercicios son apropiados para ti.'
            }
          ]
        },
        quiz: [
          {
            id: 'q2-4-1',
            question: 'Don Carlos tiene hipertensión y quiere saber si puede comer mariscos. ¿Cómo debería usar la IA de forma útil?',
            options: [
              'Pedirle a la IA que le dé permiso para comer mariscos',
              'Preguntarle a la IA sobre el contenido de sodio de los mariscos en general, y luego consultar con su médico o nutricionista',
              'Si la IA dice que puede comer, no necesita preguntarle al médico',
              'No usar la IA para temas de alimentación'
            ],
            correctIndex: 1,
            explanation: '¡Correcto! Usar la IA para entender el contenido nutricional de los alimentos es un buen uso. Pero la decisión final sobre su dieta específica la debe tomar con su médico o nutricionista.'
          }
        ]
      },
      {
        id: '2-5',
        moduleId: 2,
        lessonNumber: 5,
        title: 'Preparar tu consulta médica',
        duration: '5 min',
        icon: '📝',
        contentBlocks: [
          {
            type: 'text',
            title: 'La IA como tu asistente para el médico',
            content: 'La IA puede ayudarte a llegar mucho mejor preparado a tu consulta médica. Úsala antes de la consulta para organizarte, no para reemplazar al médico.'
          },
          {
            type: 'list',
            title: '3 formas de usar la IA antes de tu consulta',
            content: [
              '📝 Pídele que te ayude a hacer una lista de preguntas para tu doctor',
              '📖 Úsala para entender palabras médicas que escuchaste o viste en exámenes',
              '🗓️ Ayúdate a recordar y ordenar tus síntomas (cuándo empezaron, qué los agrava)'
            ]
          },
          {
            type: 'example',
            title: 'Ejemplo: Preparando consulta con el cardiólogo',
            content: 'María le preguntó a la IA: "Voy a ir al cardiólogo la próxima semana por presión alta. ¿Qué preguntas importantes debería hacerle?"\n\nLa IA sugirió:\n• ¿Es necesario cambiar mi medicamento actual?\n• ¿Qué actividades físicas son seguras para mí?\n• ¿Cuándo debería preocuparme por la presión?\n• ¿Cómo afecta mi presión alta a otros órganos?\n• ¿Necesito hacerme algún examen adicional?\n\nMaría anotó esas preguntas y tuvo una consulta mucho más productiva.'
          },
          {
            type: 'tip',
            title: 'Consejo práctico',
            content: 'Anota o toma foto de las preguntas que te sugirió la IA antes de ir al médico. Así no se te olvidan en el momento de la consulta.'
          }
        ],
        exercise: {
          type: 'consulta',
          title: 'Ejercicio: Construye tu consulta',
          instruction: 'Vas al cardiólogo por presión alta. De las siguientes preguntas, elige las 3 más útiles para llevar a la consulta:',
          items: [
            {
              id: 'cons1',
              text: '¿Qué actividades físicas son seguras para mi nivel de presión?',
              correctAnswer: 'util',
              feedback: '✅ Muy útil. El cardiólogo puede darte indicaciones específicas sobre el ejercicio según tu condición.'
            },
            {
              id: 'cons2',
              text: '¿Cuándo debería preocuparme si mi presión sube mucho?',
              correctAnswer: 'util',
              feedback: '✅ Muy útil. Saber los números o síntomas de alerta te ayuda a saber cuándo ir a urgencias.'
            },
            {
              id: 'cons3',
              text: '¿Cuál es la cura definitiva para la presión alta?',
              correctAnswer: 'no-util',
              feedback: '⚠️ No muy útil. La hipertensión generalmente se controla pero no "se cura". Una mejor pregunta sería cómo controlarla mejor.'
            },
            {
              id: 'cons4',
              text: '¿Cómo afecta la presión alta a mi corazón y riñones?',
              correctAnswer: 'util',
              feedback: '✅ Muy útil. Entender las consecuencias te motiva a seguir el tratamiento.'
            },
            {
              id: 'cons5',
              text: '¿La IA puede operarme en lugar del cardiólogo?',
              correctAnswer: 'no-util',
              feedback: '❌ No útil. La IA no realiza procedimientos médicos. Esta pregunta demostraría que no entendiste el rol de la IA.'
            }
          ]
        },
        quiz: [
          {
            id: 'q2-5-1',
            question: '¿La IA puede reemplazar a tu cardiólogo?',
            options: [
              'Sí, si es una IA muy avanzada puede hacer lo mismo',
              'No, la IA solo te ayuda a prepararte para hablar mejor con tu médico',
              'Depende de lo complicada que sea tu enfermedad',
              'Sí, para preguntas simples la IA puede reemplazarlo'
            ],
            correctIndex: 1,
            explanation: '¡Correcto! La IA nunca reemplaza al médico. Su rol es ayudarte a llegar mejor preparado a la consulta y entender mejor tu condición de salud.'
          },
          {
            id: 'q2-5-2',
            question: 'Tu doctor te dijo "tiene insuficiencia venosa crónica". No entendiste bien ese término. ¿Para qué te sirve la IA?',
            options: [
              'Para que la IA me trate la insuficiencia venosa',
              'Para entender qué significa ese término en palabras simples y preparar preguntas para la próxima consulta',
              'Para obtener un segundo diagnóstico de la IA',
              'Para buscar si ese diagnóstico es correcto o no'
            ],
            correctIndex: 1,
            explanation: '¡Exacto! La IA es perfecta para explicar términos médicos en lenguaje simple y ayudarte a preparar preguntas para tu próxima consulta.'
          }
        ]
      },
      {
        id: '2-6',
        moduleId: 2,
        lessonNumber: 6,
        title: 'Cuándo NO usar la IA',
        duration: '4 min',
        icon: '🚨',
        contentBlocks: [
          {
            type: 'text',
            title: 'Hay momentos en que la IA puede hacerte perder tiempo valioso',
            content: 'La IA es útil para muchas cosas, pero hay situaciones de salud en las que perder tiempo preguntándole puede ser muy peligroso. Aprende a reconocer cuándo debes ir directo a urgencias o llamar al SAMU.'
          },
          {
            type: 'list',
            title: 'Señales de URGENCIA: llama al 131 o ve a urgencias YA',
            content: [
              '💔 Dolor fuerte en el pecho (especialmente si se irradia al brazo)',
              '😮‍💨 Dificultad para respirar de repente',
              '💪 Pérdida de fuerza en un lado del cuerpo (brazo o pierna)',
              '💬 Dificultad para hablar o entender lo que te dicen',
              '😵 Desmayos o pérdida de conciencia',
              '🩸 Sangrado que no para',
              '🤕 Caída con golpe fuerte en la cabeza',
              '🌡️ Fiebre muy alta (sobre 39°C) que no baja'
            ]
          },
          {
            type: 'warning',
            title: 'El tiempo es crucial en emergencias',
            content: 'En un infarto o accidente vascular (ACV), cada minuto cuenta. No le preguntes a la IA — llama al 131 (SAMU) de inmediato o pide a alguien que te lleve a urgencias.'
          },
          {
            type: 'tip',
            title: 'Si dudas, ve al hospital',
            content: 'Una consulta de más nunca es un error. Si dudas si algo es urgente, es mejor ir al hospital y que el médico te diga que todo está bien, que quedarte en casa esperando.'
          }
        ],
        exercise: {
          type: 'triaje',
          title: '¿IA, Médico de cabecera o Urgencias?',
          instruction: 'Para cada situación, elige la respuesta correcta: IA (puedo preguntarle a la IA), MÉDICO (debo pedir hora con mi médico), o URGENCIAS (debo ir a urgencias ya):',
          items: [
            {
              id: 'tri1',
              text: 'Quiero entender qué es el colesterol alto',
              correctAnswer: 'ia',
              feedback: '✅ Correcto. Obtener información general sobre enfermedades es un uso ideal para la IA.'
            },
            {
              id: 'tri2',
              text: 'Hace una hora empezó un dolor fuerte en el pecho que llega al brazo izquierdo',
              correctAnswer: 'urgencias',
              feedback: '🚨 ¡Urgencias YA! Estos síntomas pueden ser de un infarto. Llama al 131 de inmediato. No uses la IA.'
            },
            {
              id: 'tri3',
              text: 'Tengo dolor de espalda desde hace dos semanas',
              correctAnswer: 'medico',
              feedback: '👨‍⚕️ Correcto. Un dolor que lleva semanas necesita evaluación médica, pero no es una emergencia urgente.'
            },
            {
              id: 'tri4',
              text: 'Acabo de caer y me golpeé la cabeza. Me siento mareado',
              correctAnswer: 'urgencias',
              feedback: '🚨 ¡Urgencias! Un golpe en la cabeza con mareo puede ser grave. Ve a urgencias o llama al 131.'
            },
            {
              id: 'tri5',
              text: '¿Qué alimentos son buenos para controlar la presión arterial?',
              correctAnswer: 'ia',
              feedback: '✅ Perfecto. Información general sobre alimentación saludable es ideal para preguntarle a la IA.'
            },
            {
              id: 'tri6',
              text: 'Me siento muy triste hace varios meses y no tengo ganas de hacer nada',
              correctAnswer: 'medico',
              feedback: '👨‍⚕️ Correcto. La tristeza prolongada necesita evaluación médica. No es urgencia pero necesita atención.'
            }
          ]
        },
        quiz: [
          {
            id: 'q2-6-1',
            question: 'Si tienes dolor fuerte en el pecho, ¿qué haces primero?',
            options: [
              'Le preguntas a la IA qué puede ser',
              'Buscas en Google los síntomas',
              'Llamas al 131 (SAMU) o pides que te lleven a urgencias de inmediato',
              'Esperas para ver si pasa solo'
            ],
            correctIndex: 2,
            explanation: '¡Exacto! El dolor en el pecho es una emergencia potencial. El tiempo es crítico. Llama al 131 de inmediato sin perder tiempo en apps o internet.'
          },
          {
            id: 'q2-6-2',
            question: 'Si dudas si algo es una urgencia o no, ¿qué es mejor hacer?',
            options: [
              'Esperar a ver si mejora en unas horas',
              'Preguntarle a la IA si es urgente',
              'Ir al hospital — mejor una consulta de más que perder una urgencia',
              'Llamar a un familiar para que decida'
            ],
            correctIndex: 2,
            explanation: '¡Muy bien! Ante la duda, ir al hospital es siempre la decisión correcta. Una consulta de más nunca es un error.'
          }
        ]
      }
    ]
  },
  {
    id: 3,
    title: 'Módulo 3',
    subtitle: 'Asistente de IA',
    icon: '🤖',
    color: '#6B3A8C',
    description: 'Chatea con el asistente de inteligencia artificial. Disponible para consultas sobre las 5 patologías principales.',
    badgeName: 'Maestro Digital',
    badgeIcon: '🏆',
    requiresModule: 1,
    lessons: []
  }
];

export const getLesson = (moduleId: string, lessonId: string): Lesson | undefined => {
  const mod = courseModules.find(m => m.id === parseInt(moduleId));
  return mod?.lessons.find(l => l.id === lessonId);
};

export const getModule = (moduleId: string): CourseModule | undefined => {
  return courseModules.find(m => m.id === parseInt(moduleId));
};
