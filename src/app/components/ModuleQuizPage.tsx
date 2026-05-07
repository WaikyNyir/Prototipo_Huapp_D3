import { useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { CheckCircle, XCircle } from 'lucide-react';
import { getModule } from '../data/courseData';
import { useProgressContext } from '../context/ProgressContext';

// Consolidated quiz questions for each module
const moduleQuizQuestions: Record<number, Array<{
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}>> = {
  1: [
    {
      question: '¿Qué es la inteligencia artificial?',
      options: [
        'Un robot físico que puede examinar pacientes',
        'Un programa de computadora avanzado que entiende y responde preguntas',
        'Un médico que trabaja desde internet',
        'Un aparato que se instala en el teléfono'
      ],
      correctIndex: 1,
      explanation: 'La IA es un software muy avanzado, no un ser físico. No puede examinar ni diagnosticar, pero puede dar información útil.'
    },
    {
      question: '¿Cuál de estas acciones es un buen uso de la IA en salud?',
      options: [
        'Pedirle que te recete un medicamento para la presión',
        'Preguntarle qué significa "insuficiencia venosa" para entender tu diagnóstico',
        'Confiar en su diagnóstico en lugar de ir al médico',
        'Darle tu RUT para que busque tu historial médico'
      ],
      correctIndex: 1,
      explanation: 'Usar la IA para entender términos médicos es un uso excelente y seguro. La IA no puede recetar ni diagnosticar.'
    },
    {
      question: '¿Qué información NO debes compartir con la IA?',
      options: [
        'Preguntas generales sobre enfermedades',
        'Síntomas como "me duele la cabeza hace 3 días"',
        'Tu RUT, dirección y datos bancarios',
        'Dudas sobre alimentación saludable'
      ],
      correctIndex: 2,
      explanation: 'Nunca compartas datos personales como RUT, dirección o claves bancarias con ninguna aplicación de IA.'
    },
    {
      question: '¿Cuál es la señal más clara de una estafa de salud en internet?',
      options: [
        'El sitio tiene muchas fotos de médicos',
        'Te prometen curas milagrosas para enfermedades crónicas en poco tiempo',
        'Te ofrecen información médica gratuita',
        'El sitio está bien diseñado'
      ],
      correctIndex: 1,
      explanation: 'Las promesas de curas milagrosas son la señal clásica de estafa. Las enfermedades crónicas no tienen soluciones mágicas e instantáneas.'
    },
    {
      question: '¿Qué significa que la IA tenga "alucinaciones"?',
      options: [
        'Que la aplicación tiene errores de pantalla',
        'Que la IA inventa información que suena real pero puede ser falsa',
        'Que la IA funciona mejor de noche',
        'Es un término técnico sin importancia práctica'
      ],
      correctIndex: 1,
      explanation: 'Las "alucinaciones" son cuando la IA genera información incorrecta con total seguridad. Por eso siempre hay que verificar datos médicos importantes.'
    },
    {
      question: 'Si recibes un mensaje de WhatsApp de "tu médico del HUAP" pidiéndote tu dirección para enviarte remedios gratis, ¿qué haces?',
      options: [
        'Le mandas la dirección porque es gratis y viene del hospital',
        'No respondes y llamas directamente al HUAP para verificar si es real',
        'Le das solo el nombre de tu barrio, no la dirección exacta',
        'Le preguntas a tu familiar si debería darla'
      ],
      correctIndex: 1,
      explanation: 'Los médicos reales no contactan por WhatsApp para pedir datos personales. Siempre verifica llamando directamente al hospital con el número oficial.'
    },
    {
      question: '¿Para qué sirven los botones A+ y A- en esta aplicación?',
      options: [
        'Para hacer más grande o más pequeña la pantalla completa',
        'Para ajustar el tamaño de la letra según tus necesidades',
        'Para subir o bajar el volumen del audio',
        'No existen esos botones en la aplicación'
      ],
      correctIndex: 1,
      explanation: 'Los botones A+ y A- permiten ajustar el tamaño de la letra para que la lectura sea más cómoda según tus necesidades visuales.'
    },
    {
      question: '¿Cuáles son las páginas web más confiables para información de salud en Chile?',
      options: [
        'Cualquier página que tenga fotos de médicos y se vea profesional',
        'Las páginas que venden remedios mientras dan información',
        'Sitios oficiales como minsal.gob.cl o huap.redsalud.gob.cl (dominio .gob.cl)',
        'Foros donde personas comparten sus experiencias personales'
      ],
      correctIndex: 2,
      explanation: 'Los sitios con dominio .gob.cl son páginas oficiales del gobierno de Chile. Son las más confiables para información de salud.'
    }
  ],
  2: [
    {
      question: '¿Cuál es la mejor manera de pedirle información a la IA?',
      options: [
        '"Tengo dolor" (sin más detalles)',
        '"Tengo dolor en la rodilla izquierda hace 2 semanas que empeora al bajar escaleras. ¿Qué podría ser?"',
        '"Háblame de todo sobre las enfermedades"',
        'Escribir en inglés para que entienda mejor'
      ],
      correctIndex: 1,
      explanation: 'Las preguntas específicas generan respuestas mucho más útiles. Incluye ubicación, duración y factores que agravan o mejoran el síntoma.'
    },
    {
      question: 'La IA te responde con total seguridad: "Usted tiene artritis reumatoide." ¿Cómo reaccionas?',
      options: [
        'La creo porque suena muy segura',
        'Busco en internet para confirmar ese diagnóstico',
        'No confío en ese diagnóstico — solo un médico puede diagnosticar con exámenes',
        'Compro medicamentos para artritis en la farmacia'
      ],
      correctIndex: 2,
      explanation: 'La IA no puede diagnosticar. Cuando habla con total seguridad sobre diagnósticos, eso en realidad es señal de una respuesta irresponsable. Ve al médico.'
    },
    {
      question: '¿Cuándo debes ir a urgencias en lugar de preguntarle a la IA?',
      options: [
        'Cuando quieres entender qué es el colesterol alto',
        'Cuando tienes dolor fuerte en el pecho que llega al brazo',
        'Cuando tienes dolor de espalda hace dos semanas',
        'Cuando quieres preparar preguntas para tu próxima consulta médica'
      ],
      correctIndex: 1,
      explanation: 'Dolor en el pecho que llega al brazo puede ser señal de infarto. Es una emergencia. Llama al 131 o ve a urgencias de inmediato — no uses la IA.'
    },
    {
      question: 'La IA te dice "sus síntomas podrían ser de gastritis o úlcera. Le recomiendo consultar a su médico". ¿Esta respuesta es?',
      options: [
        'Mala, porque no te da un diagnóstico claro',
        'Sospechosa, porque no puede hacer eso',
        'Responsable, porque reconoce sus límites y recomienda al médico',
        'Inútil porque no te ayuda'
      ],
      correctIndex: 2,
      explanation: 'Cuando la IA reconoce su incertidumbre y recomienda al médico, está siendo responsable. Esas son las mejores respuestas que puede darte.'
    },
    {
      question: '¿Para qué NO sirve la IA en salud?',
      options: [
        'Para entender palabras médicas difíciles que te dijo el doctor',
        'Para preparar preguntas antes de tu consulta médica',
        'Para diagnosticar tu enfermedad y recetarte medicamentos',
        'Para obtener información general sobre enfermedades'
      ],
      correctIndex: 2,
      explanation: 'La IA no puede diagnosticar ni recetar. Esas son funciones exclusivas de los médicos. Usarla para eso sería peligroso.'
    },
    {
      question: '¿Qué debes hacer con la información que te da la IA sobre tu salud?',
      options: [
        'Seguirla al pie de la letra sin consultar a nadie más',
        'Anotarla y verificarla con tu médico o farmacéutico en la próxima consulta',
        'Compartirla con todos tus contactos de WhatsApp',
        'Ignorarla, la IA nunca es útil en temas de salud'
      ],
      correctIndex: 1,
      explanation: 'La IA puede darte información útil, pero siempre debes verificarla con tu médico antes de tomar decisiones de salud importantes.'
    },
    {
      question: 'Si tienes un dolor de cabeza desde hace 2 semanas, ¿cuál es la respuesta correcta?',
      options: [
        'Es una emergencia, llama al 131 de inmediato',
        'Usa la IA para diagnosticarte y compra el medicamento que recomiende',
        'Pide hora con tu médico de cabecera para una evaluación',
        'No es necesario consultar al médico'
      ],
      correctIndex: 2,
      explanation: 'Un dolor de cabeza persistente por 2 semanas necesita evaluación médica, pero no es una emergencia. Pide hora con tu médico.'
    }
  ]
};

export function ModuleQuizPage() {
  const { moduleId } = useParams<{ moduleId: string }>();
  const navigate = useNavigate();
  const { saveQuizResult, progress } = useProgressContext();

  const mod = getModule(moduleId ?? '');
  const modId = parseInt(moduleId ?? '0');
  const questions = moduleQuizQuestions[modId] ?? [];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [answers, setAnswers] = useState<boolean[]>([]);
  const [done, setDone] = useState(false);
  const [finalScore, setFinalScore] = useState(0);

  const alreadyPassed = progress.earnedBadges.includes(`badge-${modId}`);

  if (!mod || questions.length === 0) {
    return (
      <div className="text-center py-12">
        <p>Quiz no disponible</p>
        <button onClick={() => navigate(`/modulo/${moduleId}`)} className="mt-4 px-6 py-3 rounded-xl text-white" style={{ backgroundColor: 'var(--color-azul)' }}>
          Volver
        </button>
      </div>
    );
  }

  if (alreadyPassed && !done) {
    return (
      <div className="flex flex-col items-center gap-5 text-center py-8">
        <span style={{ fontSize: '4rem' }}>{mod.badgeIcon}</span>
        <h1 style={{ color: 'var(--color-success)' }}>¡Ya obtuviste esta insignia!</h1>
        <p style={{ fontSize: '1.1rem' }}>
          Completaste el quiz del <strong>{mod.subtitle}</strong> con éxito.
        </p>
        <button
          onClick={() => navigate(`/modulo/${moduleId}`)}
          className="px-8 py-4 rounded-xl text-white font-bold shadow-md"
          style={{ backgroundColor: 'var(--color-azul)' }}
        >
          Volver al módulo
        </button>
      </div>
    );
  }

  const current = questions[currentIndex];

  const handleSelect = (i: number) => {
    if (!showFeedback) setSelectedOption(i);
  };

  const handleConfirm = () => {
    if (selectedOption === null) return;
    setShowFeedback(true);
    setAnswers(prev => [...prev, selectedOption === current.correctIndex]);
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(i => i + 1);
      setSelectedOption(null);
      setShowFeedback(false);
    } else {
      const score = answers.filter(Boolean).length + (selectedOption === current.correctIndex ? 1 : 0);
      setFinalScore(score);
      saveQuizResult(`module-${modId}-final`, score, questions.length);
      setDone(true);
    }
  };

  if (done) {
    const passed = finalScore >= Math.ceil(questions.length * 0.7);
    return (
      <div className="flex flex-col items-center gap-5 text-center py-6">
        <span style={{ fontSize: '4rem' }}>{passed ? mod.badgeIcon : '💪'}</span>
        <h1 style={{ color: passed ? 'var(--color-success)' : 'var(--color-azul)', fontSize: '1.5rem' }}>
          {passed ? `¡Felicitaciones! Obtuviste la insignia` : 'Sigue intentando'}
        </h1>
        {passed && (
          <div
            className="rounded-xl px-4 py-2"
            style={{ backgroundColor: 'var(--color-success)', color: 'white' }}
          >
            <p style={{ margin: 0, fontWeight: 700, fontSize: '1rem', color: 'white' }}>
              {mod.badgeName} {mod.badgeIcon}
            </p>
          </div>
        )}
        <p style={{ fontSize: '1.2rem', fontWeight: 700 }}>
          {finalScore} de {questions.length} respuestas correctas
        </p>
        <div
          className="rounded-xl p-4 text-left w-full border-l-4"
          style={{
            backgroundColor: passed ? 'var(--color-success-bg)' : 'var(--color-warning-bg)',
            borderLeftColor: passed ? 'var(--color-success)' : 'var(--color-warning)'
          }}
        >
          {passed ? (
            <p style={{ margin: 0 }}>
              ¡Excelente! Demostraste un buen dominio de los contenidos del módulo.
              {modId === 1 && ' Ahora tienes acceso al Asistente de IA (Módulo 3).'}
            </p>
          ) : (
            <p style={{ margin: 0 }}>
              Necesitas responder bien al menos {Math.ceil(questions.length * 0.7)} preguntas.
              Puedes volver a hacer el quiz — no hay penalización por intentar de nuevo.
            </p>
          )}
        </div>

        <div className="flex flex-col gap-3 w-full">
          {passed ? (
            <>
              {modId === 1 && (
                <button
                  onClick={() => navigate('/asistente')}
                  className="w-full py-4 rounded-xl font-bold text-white shadow-md"
                  style={{ backgroundColor: '#6B3A8C' }}
                >
                  🤖 Ir al Asistente de IA →
                </button>
              )}
              <button
                onClick={() => navigate('/')}
                className="w-full py-4 rounded-xl font-bold text-white shadow-md"
                style={{ backgroundColor: 'var(--color-azul)' }}
              >
                🏠 Ir al inicio
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => {
                  setCurrentIndex(0);
                  setSelectedOption(null);
                  setShowFeedback(false);
                  setAnswers([]);
                  setDone(false);
                  setFinalScore(0);
                }}
                className="w-full py-4 rounded-xl font-bold text-white shadow-md"
                style={{ backgroundColor: 'var(--color-azul)' }}
              >
                Intentar de nuevo
              </button>
              <button
                onClick={() => navigate(`/modulo/${moduleId}`)}
                className="w-full py-4 rounded-xl font-bold border-2 hover:bg-gray-50"
                style={{ borderColor: 'var(--color-azul)', color: 'var(--color-azul)', backgroundColor: 'white' }}
              >
                Repasar las lecciones
              </button>
            </>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-5">
      {/* Header */}
      <div
        className="rounded-2xl p-4 text-white"
        style={{ background: `linear-gradient(135deg, ${mod.color}dd, ${mod.color}88)` }}
      >
        <p style={{ margin: 0, fontSize: '0.85rem', color: 'white/80' }}>Quiz Final</p>
        <h1 className="text-white" style={{ color: 'white', fontSize: '1.2rem', margin: '4px 0' }}>
          {mod.subtitle}
        </h1>
        <p style={{ margin: 0, fontSize: '0.85rem', color: 'rgba(255,255,255,0.8)' }}>
          Necesitas responder bien {Math.ceil(questions.length * 0.7)} de {questions.length} preguntas para obtener la insignia {mod.badgeIcon}
        </p>
      </div>

      {/* Progress */}
      <div className="flex items-center justify-between">
        <p style={{ fontSize: '0.85rem', color: 'var(--color-muted)', margin: 0 }}>
          Pregunta {currentIndex + 1} de {questions.length}
        </p>
        <div className="flex gap-1.5">
          {questions.map((_, i) => (
            <div
              key={i}
              className="rounded-full transition-all"
              style={{
                width: i === currentIndex ? 20 : 10,
                height: 10,
                backgroundColor:
                  i < answers.length
                    ? answers[i] ? 'var(--color-success)' : 'var(--color-error)'
                    : i === currentIndex ? 'var(--color-azul)' : '#d0d0cc'
              }}
            />
          ))}
        </div>
      </div>

      {/* Question */}
      <div
        className="rounded-xl p-4"
        style={{ backgroundColor: 'var(--color-azul)' }}
      >
        <p style={{ margin: 0, fontWeight: 600, fontSize: '1rem', color: 'white' }}>
          {current.question}
        </p>
      </div>

      {/* Options */}
      <div className="flex flex-col gap-3">
        {current.options.map((option, i) => {
          let bg = 'white';
          let border = 'var(--color-border)';
          let textColor = 'var(--color-text)';

          if (showFeedback) {
            if (i === current.correctIndex) { bg = 'var(--color-success-bg)'; border = 'var(--color-success)'; textColor = 'var(--color-success)'; }
            else if (i === selectedOption) { bg = 'var(--color-error-bg)'; border = 'var(--color-error)'; textColor = 'var(--color-error)'; }
          } else if (i === selectedOption) {
            bg = 'var(--color-azul-light)'; border = 'var(--color-azul)';
          }

          return (
            <button
              key={i}
              onClick={() => handleSelect(i)}
              disabled={showFeedback}
              className="flex items-start gap-3 p-4 rounded-xl border-2 text-left w-full transition-all hover:shadow-sm disabled:cursor-default"
              style={{ backgroundColor: bg, borderColor: border, minHeight: 56 }}
            >
              <div
                className="rounded-full flex items-center justify-center shrink-0 font-bold"
                style={{
                  width: 30, height: 30,
                  backgroundColor: i === selectedOption && !showFeedback ? 'var(--color-azul)' : '#e8e8e8',
                  color: i === selectedOption && !showFeedback ? 'white' : 'var(--color-muted)',
                  fontSize: '0.85rem'
                }}
              >
                {showFeedback ? (i === current.correctIndex ? '✓' : i === selectedOption ? '✗' : String.fromCharCode(65 + i)) : String.fromCharCode(65 + i)}
              </div>
              <p style={{ margin: 0, color: textColor, fontSize: '0.95rem' }}>{option}</p>
            </button>
          );
        })}
      </div>

      {/* Feedback */}
      {showFeedback && (
        <div
          className="rounded-xl p-4 border-l-4"
          style={{
            backgroundColor: selectedOption === current.correctIndex ? 'var(--color-success-bg)' : 'var(--color-warning-bg)',
            borderLeftColor: selectedOption === current.correctIndex ? 'var(--color-success)' : 'var(--color-warning)'
          }}
        >
          <div className="flex items-start gap-3">
            {selectedOption === current.correctIndex
              ? <CheckCircle size={22} style={{ color: 'var(--color-success)', flexShrink: 0 }} />
              : <XCircle size={22} style={{ color: 'var(--color-warning)', flexShrink: 0 }} />
            }
            <div>
              <p style={{ margin: 0, fontWeight: 600 }}>
                {selectedOption === current.correctIndex ? '✅ ¡Correcto!' : '❌ No exactamente'}
              </p>
              <p style={{ margin: '6px 0 0' }}>{current.explanation}</p>
            </div>
          </div>
        </div>
      )}

      {/* Buttons */}
      {!showFeedback ? (
        <button
          onClick={handleConfirm}
          disabled={selectedOption === null}
          className="w-full py-4 rounded-xl font-bold text-white shadow-md disabled:opacity-40"
          style={{ backgroundColor: 'var(--color-azul)' }}
        >
          Confirmar respuesta
        </button>
      ) : (
        <button
          onClick={handleNext}
          className="w-full py-4 rounded-xl font-bold text-white shadow-md"
          style={{ backgroundColor: 'var(--color-azul)' }}
        >
          {currentIndex < questions.length - 1 ? 'Siguiente pregunta →' : 'Ver resultado →'}
        </button>
      )}
    </div>
  );
}
