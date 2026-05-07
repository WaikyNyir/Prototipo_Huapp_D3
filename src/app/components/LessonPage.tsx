import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import { CheckCircle, XCircle, ChevronRight } from 'lucide-react';
import { getLesson, Exercise, ExerciseItem, QuizQuestion } from '../data/courseData';
import { useProgressContext } from '../context/ProgressContext';

type LessonStep = 'content' | 'exercise' | 'quiz' | 'completed';

// --- Content display ---
function ContentDisplay({ lesson }: { lesson: ReturnType<typeof getLesson> }) {
  if (!lesson) return null;
  return (
    <div className="flex flex-col gap-5">
      {lesson.contentBlocks.map((block, i) => {
        if (block.type === 'text') {
          return (
            <div key={i}>
              {block.title && <h3 style={{ color: 'var(--color-azul)', marginBottom: 8 }}>{block.title}</h3>}
              <p style={{ margin: 0, whiteSpace: 'pre-line' }}>{block.content as string}</p>
            </div>
          );
        }
        if (block.type === 'tip') {
          return (
            <div
              key={i}
              className="rounded-xl p-4 border-l-4"
              style={{ backgroundColor: 'var(--color-success-bg)', borderLeftColor: 'var(--color-success)' }}
            >
              {block.title && (
                <p style={{ color: 'var(--color-success)', fontWeight: 700, margin: '0 0 6px' }}>
                  💡 {block.title}
                </p>
              )}
              <p style={{ margin: 0, whiteSpace: 'pre-line' }}>{block.content as string}</p>
            </div>
          );
        }
        if (block.type === 'warning') {
          return (
            <div
              key={i}
              className="rounded-xl p-4 border-l-4"
              style={{ backgroundColor: 'var(--color-warning-bg)', borderLeftColor: 'var(--color-warning)' }}
            >
              {block.title && (
                <p style={{ color: 'var(--color-warning)', fontWeight: 700, margin: '0 0 6px' }}>
                  ⚠️ {block.title}
                </p>
              )}
              <p style={{ margin: 0, whiteSpace: 'pre-line' }}>{block.content as string}</p>
            </div>
          );
        }
        if (block.type === 'list') {
          const items = block.content as string[];
          return (
            <div key={i}>
              {block.title && <h3 style={{ color: 'var(--color-azul)', marginBottom: 8 }}>{block.title}</h3>}
              <ul className="flex flex-col gap-2 pl-0 list-none">
                {items.map((item, j) => (
                  <li key={j} className="rounded-lg px-3 py-2" style={{ backgroundColor: 'var(--color-azul-light)', fontSize: '0.95rem' }}>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          );
        }
        if (block.type === 'example') {
          return (
            <div
              key={i}
              className="rounded-xl p-4 border"
              style={{ backgroundColor: '#f8f8f6', borderColor: 'var(--color-border)' }}
            >
              {block.title && (
                <p style={{ color: 'var(--color-azul)', fontWeight: 700, margin: '0 0 8px' }}>
                  📌 {block.title}
                </p>
              )}
              <p style={{ margin: 0, whiteSpace: 'pre-line', fontSize: '0.95rem' }}>
                {block.content as string}
              </p>
            </div>
          );
        }
        return null;
      })}
    </div>
  );
}

// --- Generic exercise with semaforo (green/red), detective (trust/suspect), triaje (ia/doctor/urgencias), etc. ---
function ExerciseDisplay({
  exercise,
  onComplete
}: {
  exercise: Exercise;
  onComplete: () => void;
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [feedback, setFeedback] = useState<{ correct: boolean; message: string } | null>(null);
  const [answered, setAnswered] = useState(false);
  const [allDone, setAllDone] = useState(false);
  const [score, setScore] = useState(0);

  const current = exercise.items[currentIndex];

  const handleAnswer = (answer: string) => {
    if (answered) return;
    const isCorrect = answer === current.correctAnswer;
    setAnswered(true);
    if (isCorrect) setScore(s => s + 1);
    setFeedback({ correct: isCorrect, message: current.feedback });
  };

  const handleNext = () => {
    if (currentIndex < exercise.items.length - 1) {
      setCurrentIndex(i => i + 1);
      setAnswered(false);
      setFeedback(null);
    } else {
      setAllDone(true);
    }
  };

  if (allDone) {
    return (
      <div className="flex flex-col items-center gap-4 text-center py-6">
        <span style={{ fontSize: '3rem' }}>🌟</span>
        <h3 style={{ color: 'var(--color-azul)' }}>
          Ejercicio completado
        </h3>
        <p style={{ fontSize: '1.1rem' }}>
          Respondiste bien <strong>{score}</strong> de <strong>{exercise.items.length}</strong> preguntas
        </p>
        <p style={{ color: 'var(--color-muted)', fontSize: '0.9rem' }}>
          ¡Bien hecho! Ahora viene un pequeño quiz de repaso.
        </p>
        <button
          onClick={onComplete}
          className="mt-2 px-8 py-4 rounded-xl text-white font-bold shadow-md hover:shadow-lg transition-shadow w-full"
          style={{ backgroundColor: 'var(--color-azul)' }}
        >
          Ir al quiz →
        </button>
      </div>
    );
  }

  const renderButtons = () => {
    const type = exercise.type;

    if (type === 'semaforo') {
      return (
        <div className="flex gap-3">
          <button
            onClick={() => handleAnswer('green')}
            disabled={answered}
            className="flex-1 py-4 rounded-xl font-bold text-white shadow-sm hover:shadow-md transition-all disabled:opacity-60"
            style={{ backgroundColor: 'var(--color-success)', minHeight: 56 }}
          >
            ✅ Seguro compartir
          </button>
          <button
            onClick={() => handleAnswer('red')}
            disabled={answered}
            className="flex-1 py-4 rounded-xl font-bold text-white shadow-sm hover:shadow-md transition-all disabled:opacity-60"
            style={{ backgroundColor: 'var(--color-error)', minHeight: 56 }}
          >
            🔴 No compartir
          </button>
        </div>
      );
    }

    if (type === 'detective') {
      return (
        <div className="flex gap-3">
          <button
            onClick={() => handleAnswer('trust')}
            disabled={answered}
            className="flex-1 py-4 rounded-xl font-bold text-white shadow-sm hover:shadow-md transition-all disabled:opacity-60"
            style={{ backgroundColor: 'var(--color-success)', minHeight: 56 }}
          >
            ✅ Confiable
          </button>
          <button
            onClick={() => handleAnswer('suspect')}
            disabled={answered}
            className="flex-1 py-4 rounded-xl font-bold text-white shadow-sm hover:shadow-md transition-all disabled:opacity-60"
            style={{ backgroundColor: 'var(--color-error)', minHeight: 56 }}
          >
            🚩 Sospechoso
          </button>
        </div>
      );
    }

    if (type === 'triaje') {
      return (
        <div className="flex flex-col gap-3">
          <button
            onClick={() => handleAnswer('ia')}
            disabled={answered}
            className="w-full py-4 rounded-xl font-bold text-white shadow-sm hover:shadow-md transition-all disabled:opacity-60"
            style={{ backgroundColor: 'var(--color-azul)', minHeight: 56 }}
          >
            🤖 Le pregunto a la IA
          </button>
          <button
            onClick={() => handleAnswer('medico')}
            disabled={answered}
            className="w-full py-4 rounded-xl font-bold text-white shadow-sm hover:shadow-md transition-all disabled:opacity-60"
            style={{ backgroundColor: 'var(--color-warning)', minHeight: 56 }}
          >
            👨‍⚕️ Pido hora con mi médico
          </button>
          <button
            onClick={() => handleAnswer('urgencias')}
            disabled={answered}
            className="w-full py-4 rounded-xl font-bold text-white shadow-sm hover:shadow-md transition-all disabled:opacity-60"
            style={{ backgroundColor: 'var(--color-error)', minHeight: 56 }}
          >
            🚨 Voy a Urgencias YA
          </button>
        </div>
      );
    }

    if (type === 'respuestas') {
      return (
        <div className="flex flex-col gap-3">
          <button
            onClick={() => handleAnswer('useful')}
            disabled={answered}
            className="w-full py-4 rounded-xl font-bold text-white shadow-sm hover:shadow-md transition-all disabled:opacity-60"
            style={{ backgroundColor: 'var(--color-azul)', minHeight: 56 }}
          >
            📘 Información útil
          </button>
          <button
            onClick={() => handleAnswer('doctor-needed')}
            disabled={answered}
            className="w-full py-4 rounded-xl font-bold text-white shadow-sm hover:shadow-md transition-all disabled:opacity-60"
            style={{ backgroundColor: 'var(--color-success)', minHeight: 56 }}
          >
            👨‍⚕️ Debo consultar al médico
          </button>
          <button
            onClick={() => handleAnswer('caution')}
            disabled={answered}
            className="w-full py-4 rounded-xl font-bold text-white shadow-sm hover:shadow-md transition-all disabled:opacity-60"
            style={{ backgroundColor: 'var(--color-error)', minHeight: 56 }}
          >
            ⚠️ ¡Cuidado! La IA se excede
          </button>
        </div>
      );
    }

    if (type === 'consulta') {
      return (
        <div className="flex gap-3">
          <button
            onClick={() => handleAnswer('util')}
            disabled={answered}
            className="flex-1 py-4 rounded-xl font-bold text-white shadow-sm hover:shadow-md transition-all disabled:opacity-60"
            style={{ backgroundColor: 'var(--color-success)', minHeight: 56 }}
          >
            ✅ Útil para llevar
          </button>
          <button
            onClick={() => handleAnswer('no-util')}
            disabled={answered}
            className="flex-1 py-4 rounded-xl font-bold text-white shadow-sm hover:shadow-md transition-all disabled:opacity-60"
            style={{ backgroundColor: '#888', minHeight: 56 }}
          >
            ❌ No muy útil
          </button>
        </div>
      );
    }

    // Default: buttons (verdadero/falso, si/no, A/B options)
    const item = current as ExerciseItem;
    const text = item.text;
    if (text.includes(' vs ')) {
      // A vs B question
      const [optA, optB] = text.split(' vs ');
      return (
        <div className="flex flex-col gap-3">
          <p style={{ fontWeight: 600, margin: '0 0 4px' }}>¿Cuál es mejor?</p>
          <button
            onClick={() => handleAnswer('A')}
            disabled={answered}
            className="w-full py-3 px-4 rounded-xl border-2 text-left hover:bg-gray-50 transition-all disabled:opacity-60"
            style={{ borderColor: 'var(--color-azul)', minHeight: 56 }}
          >
            {optA.trim()}
          </button>
          <button
            onClick={() => handleAnswer('B')}
            disabled={answered}
            className="w-full py-3 px-4 rounded-xl border-2 text-left hover:bg-gray-50 transition-all disabled:opacity-60"
            style={{ borderColor: 'var(--color-azul)', minHeight: 56 }}
          >
            {optB.trim()}
          </button>
        </div>
      );
    }

    // Verdadero/Falso, Sí/No, Bueno/Malo
    const answers: Array<[string, string, string]> = [
      ['verdadero', '✅ Verdadero', 'var(--color-success)'],
      ['falso', '❌ Falso', 'var(--color-error)'],
      ['si', '✅ Sí puede', 'var(--color-success)'],
      ['no', '❌ No puede', 'var(--color-error)'],
      ['bueno', '✅ Buen uso', 'var(--color-success)'],
      ['malo', '❌ No adecuado', 'var(--color-error)'],
      ['confiable', '✅ Confiable', 'var(--color-success)'],
      ['desconfiar', '⚠️ Desconfiar', 'var(--color-error)'],
      ['no-confiable', '❌ No confiable', 'var(--color-error)'],
      ['inicio', '🏠 Botón Inicio', 'var(--color-azul)'],
      ['agrandar', '🔠 Botón A+', 'var(--color-azul)'],
      ['asistente', '🤖 Botón Asistente', 'var(--color-azul)'],
    ];

    const correct = current.correctAnswer;
    const pairs: Array<[string, string, string][]> = [
      [['verdadero', '✅ Verdadero', 'var(--color-success)'], ['falso', '❌ Falso', 'var(--color-error)']],
      [['si', '✅ Sí puede', 'var(--color-success)'], ['no', '❌ No puede', 'var(--color-error)']],
      [['bueno', '✅ Buen uso', 'var(--color-success)'], ['malo', '❌ No adecuado', 'var(--color-error)']],
      [['confiable', '✅ Confiable', 'var(--color-success)'], ['desconfiar', '⚠️ Desconfiar', 'var(--color-error)']],
      [['confiable', '✅ Confiable', 'var(--color-success)'], ['no-confiable', '❌ No confiable', 'var(--color-error)']],
    ];

    let matchedPair = pairs.find(p => p.some(([v]) => v === correct));
    if (!matchedPair) {
      // Button-specific options
      if (correct === 'inicio' || correct === 'agrandar' || correct === 'asistente') {
        return (
          <div className="flex flex-col gap-3">
            {[
              ['inicio', '🏠 Botón Inicio'],
              ['agrandar', '🔠 Botón A+'],
              ['asistente', '🤖 Botón Asistente'],
            ].map(([val, label]) => (
              <button
                key={val}
                onClick={() => handleAnswer(val)}
                disabled={answered}
                className="w-full py-4 rounded-xl font-bold text-white shadow-sm hover:shadow-md transition-all disabled:opacity-60"
                style={{ backgroundColor: 'var(--color-azul)', minHeight: 56 }}
              >
                {label}
              </button>
            ))}
          </div>
        );
      }
      matchedPair = [
        ['verdadero', '✅ Verdadero', 'var(--color-success)'],
        ['falso', '❌ Falso', 'var(--color-error)']
      ];
    }

    return (
      <div className="flex gap-3">
        {matchedPair.map(([val, label, color]) => (
          <button
            key={val}
            onClick={() => handleAnswer(val)}
            disabled={answered}
            className="flex-1 py-4 rounded-xl font-bold text-white shadow-sm hover:shadow-md transition-all disabled:opacity-60"
            style={{ backgroundColor: color, minHeight: 56 }}
          >
            {label}
          </button>
        ))}
      </div>
    );
  };

  return (
    <div className="flex flex-col gap-5">
      {/* Progress dots */}
      <div className="flex justify-center gap-2">
        {exercise.items.map((_, i) => (
          <div
            key={i}
            className="rounded-full transition-all"
            style={{
              width: i === currentIndex ? 24 : 10,
              height: 10,
              backgroundColor:
                i < currentIndex
                  ? 'var(--color-success)'
                  : i === currentIndex
                  ? 'var(--color-azul)'
                  : '#d0d0cc'
            }}
          />
        ))}
      </div>

      {/* Question counter */}
      <p style={{ fontSize: '0.85rem', color: 'var(--color-muted)', margin: 0 }}>
        Pregunta {currentIndex + 1} de {exercise.items.length}
      </p>

      {/* Question */}
      <div
        className="rounded-xl p-4 border"
        style={{ backgroundColor: 'white', borderColor: 'var(--color-border)' }}
      >
        <p style={{ fontSize: '1rem', fontWeight: 600, margin: 0 }}>
          {current.text}
        </p>
      </div>

      {/* Answer buttons */}
      {renderButtons()}

      {/* Feedback */}
      {feedback && (
        <div
          className="rounded-xl p-4 border-l-4"
          style={{
            backgroundColor: feedback.correct ? 'var(--color-success-bg)' : 'var(--color-warning-bg)',
            borderLeftColor: feedback.correct ? 'var(--color-success)' : 'var(--color-warning)'
          }}
        >
          <div className="flex items-start gap-3">
            {feedback.correct
              ? <CheckCircle size={22} style={{ color: 'var(--color-success)', flexShrink: 0, marginTop: 2 }} />
              : <XCircle size={22} style={{ color: 'var(--color-warning)', flexShrink: 0, marginTop: 2 }} />
            }
            <p style={{ margin: 0 }}>{feedback.message}</p>
          </div>
        </div>
      )}

      {/* Next button */}
      {answered && (
        <button
          onClick={handleNext}
          className="w-full py-4 rounded-xl font-bold text-white shadow-md hover:shadow-lg transition-shadow"
          style={{ backgroundColor: 'var(--color-azul)' }}
        >
          {currentIndex < exercise.items.length - 1 ? 'Siguiente →' : 'Ver resultado →'}
        </button>
      )}
    </div>
  );
}

// --- Quiz display ---
function QuizDisplay({
  questions,
  onComplete
}: {
  questions: QuizQuestion[];
  onComplete: (score: number) => void;
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [answers, setAnswers] = useState<boolean[]>([]);
  const [done, setDone] = useState(false);

  const current = questions[currentIndex];

  const handleSelect = (optionIndex: number) => {
    if (showFeedback) return;
    setSelectedOption(optionIndex);
  };

  const handleConfirm = () => {
    if (selectedOption === null) return;
    const isCorrect = selectedOption === current.correctIndex;
    setShowFeedback(true);
    setAnswers(prev => [...prev, isCorrect]);
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(i => i + 1);
      setSelectedOption(null);
      setShowFeedback(false);
    } else {
      setDone(true);
      const score = answers.filter(Boolean).length + (selectedOption === current.correctIndex ? 1 : 0);
      // Already handled via answers
    }
  };

  if (done) {
    const finalScore = answers.filter(Boolean).length;
    const passed = finalScore >= Math.ceil(questions.length * 0.7);
    return (
      <div className="flex flex-col items-center gap-4 text-center py-6">
        <span style={{ fontSize: '3.5rem' }}>{passed ? '🎉' : '💪'}</span>
        <h3 style={{ color: passed ? 'var(--color-success)' : 'var(--color-azul)' }}>
          {passed ? '¡Muy bien!' : '¡Sigue adelante!'}
        </h3>
        <p style={{ fontSize: '1.2rem', fontWeight: 700 }}>
          Respondiste bien {finalScore} de {questions.length} preguntas
        </p>
        <div
          className="rounded-xl p-4 w-full"
          style={{
            backgroundColor: passed ? 'var(--color-success-bg)' : 'var(--color-warning-bg)',
            borderLeft: `4px solid ${passed ? 'var(--color-success)' : 'var(--color-warning)'}`
          }}
        >
          <p style={{ margin: 0 }}>
            {passed
              ? '¡Excelente trabajo! Tienes una buena comprensión del tema. Puedes continuar con la siguiente lección.'
              : 'No te preocupes, puedes volver a leer la lección y repetir el quiz cuando quieras. No hay penalización.'}
          </p>
        </div>
        <button
          onClick={() => onComplete(finalScore)}
          className="w-full py-4 rounded-xl text-white font-bold shadow-md hover:shadow-lg transition-shadow mt-2"
          style={{ backgroundColor: 'var(--color-azul)' }}
        >
          {passed ? 'Continuar →' : 'Finalizar lección →'}
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-5">
      {/* Progress */}
      <div className="flex items-center justify-between">
        <p style={{ fontSize: '0.85rem', color: 'var(--color-muted)', margin: 0 }}>
          Pregunta {currentIndex + 1} de {questions.length}
        </p>
        <div className="flex gap-1">
          {questions.map((_, i) => (
            <div
              key={i}
              className="rounded-full"
              style={{
                width: 10,
                height: 10,
                backgroundColor:
                  i < answers.length
                    ? answers[i]
                      ? 'var(--color-success)'
                      : 'var(--color-error)'
                    : i === currentIndex
                    ? 'var(--color-azul)'
                    : '#d0d0cc'
              }}
            />
          ))}
        </div>
      </div>

      {/* Question */}
      <div
        className="rounded-xl p-4"
        style={{ backgroundColor: 'var(--color-azul)', color: 'white' }}
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
            if (i === current.correctIndex) {
              bg = 'var(--color-success-bg)';
              border = 'var(--color-success)';
              textColor = 'var(--color-success)';
            } else if (i === selectedOption && i !== current.correctIndex) {
              bg = 'var(--color-error-bg)';
              border = 'var(--color-error)';
              textColor = 'var(--color-error)';
            }
          } else if (i === selectedOption) {
            bg = 'var(--color-azul-light)';
            border = 'var(--color-azul)';
          }

          return (
            <button
              key={i}
              onClick={() => handleSelect(i)}
              disabled={showFeedback}
              className="flex items-start gap-3 p-4 rounded-xl border-2 text-left w-full transition-all hover:shadow-sm disabled:cursor-default"
              style={{ backgroundColor: bg, borderColor: border, minHeight: 56 }}
              aria-pressed={selectedOption === i}
            >
              <div
                className="rounded-full flex items-center justify-center shrink-0 font-bold"
                style={{
                  width: 30,
                  height: 30,
                  backgroundColor: i === selectedOption && !showFeedback ? 'var(--color-azul)' : '#e8e8e8',
                  color: i === selectedOption && !showFeedback ? 'white' : 'var(--color-muted)',
                  fontSize: '0.85rem'
                }}
              >
                {showFeedback
                  ? i === current.correctIndex
                    ? '✓'
                    : i === selectedOption
                    ? '✗'
                    : String.fromCharCode(65 + i)
                  : String.fromCharCode(65 + i)}
              </div>
              <p style={{ margin: 0, color: textColor, fontSize: '0.95rem' }}>{option}</p>
            </button>
          );
        })}
      </div>

      {/* Feedback explanation */}
      {showFeedback && (
        <div
          className="rounded-xl p-4 border-l-4"
          style={{
            backgroundColor: selectedOption === current.correctIndex ? 'var(--color-success-bg)' : 'var(--color-warning-bg)',
            borderLeftColor: selectedOption === current.correctIndex ? 'var(--color-success)' : 'var(--color-warning)'
          }}
        >
          <p style={{ margin: 0, fontWeight: 600 }}>
            {selectedOption === current.correctIndex ? '✅ ¡Correcto!' : '❌ No exactamente'}
          </p>
          <p style={{ margin: '6px 0 0' }}>{current.explanation}</p>
        </div>
      )}

      {/* Confirm / Next */}
      {!showFeedback ? (
        <button
          onClick={handleConfirm}
          disabled={selectedOption === null}
          className="w-full py-4 rounded-xl font-bold text-white shadow-md hover:shadow-lg transition-all disabled:opacity-40"
          style={{ backgroundColor: 'var(--color-azul)' }}
        >
          Confirmar respuesta
        </button>
      ) : (
        <button
          onClick={handleNext}
          className="w-full py-4 rounded-xl font-bold text-white shadow-md hover:shadow-lg transition-shadow"
          style={{ backgroundColor: 'var(--color-azul)' }}
        >
          {currentIndex < questions.length - 1 ? 'Siguiente pregunta →' : 'Ver resultado →'}
        </button>
      )}
    </div>
  );
}

// --- Main Lesson Page ---
export function LessonPage() {
  const { moduleId, lessonId } = useParams<{ moduleId: string; lessonId: string }>();
  const navigate = useNavigate();
  const { markLessonComplete, saveQuizResult, isLessonCompleted } = useProgressContext();

  const [step, setStep] = useState<LessonStep>('content');

  const lesson = getLesson(moduleId ?? '', lessonId ?? '');

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [step]);

  if (!lesson) {
    return (
      <div className="text-center py-12">
        <p style={{ fontSize: '1.2rem' }}>Lección no encontrada</p>
        <button
          onClick={() => navigate(`/modulo/${moduleId}`)}
          className="mt-4 px-6 py-3 rounded-xl text-white"
          style={{ backgroundColor: 'var(--color-azul)' }}
        >
          Volver al módulo
        </button>
      </div>
    );
  }

  const alreadyCompleted = isLessonCompleted(lesson.id);

  const handleQuizComplete = (score: number) => {
    markLessonComplete(lesson.id);
    saveQuizResult(`lesson-${lesson.id}`, score, lesson.quiz.length);
    setStep('completed');
  };

  const steps: LessonStep[] = ['content', 'exercise', 'quiz', 'completed'];
  const stepLabels = ['Leer', 'Practicar', 'Quiz', 'Completado'];
  const stepIcons = ['📖', '✍️', '❓', '✅'];

  return (
    <div className="flex flex-col gap-5">
      {/* Lesson header */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <span style={{ fontSize: '0.8rem', color: 'var(--color-muted)' }}>
            Módulo {lesson.moduleId} · Lección {lesson.moduleId}.{lesson.lessonNumber}
          </span>
          {alreadyCompleted && step !== 'completed' && (
            <span
              className="px-2 py-0.5 rounded-full text-white"
              style={{ fontSize: '0.7rem', backgroundColor: 'var(--color-success)' }}
            >
              Ya completada ✓
            </span>
          )}
        </div>
        <h1 style={{ margin: 0, fontSize: '1.4rem' }}>
          {lesson.icon} {lesson.title}
        </h1>
        <p style={{ color: 'var(--color-muted)', margin: '4px 0 0', fontSize: '0.85rem' }}>
          ⏱ {lesson.duration}
        </p>
      </div>

      {/* Step indicator */}
      {step !== 'completed' && (
        <div
          className="flex rounded-xl overflow-hidden border"
          style={{ borderColor: 'var(--color-border)' }}
        >
          {(['content', 'exercise', 'quiz'] as const).map((s, i) => (
            <div
              key={s}
              className="flex-1 flex flex-col items-center py-2 gap-0.5"
              style={{
                backgroundColor:
                  step === s
                    ? 'var(--color-azul)'
                    : steps.indexOf(step) > i
                    ? 'var(--color-success-bg)'
                    : 'white',
                borderRight: i < 2 ? '1px solid var(--color-border)' : 'none'
              }}
            >
              <span style={{ fontSize: '1.1rem' }}>
                {steps.indexOf(step) > i ? '✅' : stepIcons[i]}
              </span>
              <span
                style={{
                  fontSize: '0.7rem',
                  fontWeight: 600,
                  color:
                    step === s
                      ? 'white'
                      : steps.indexOf(step) > i
                      ? 'var(--color-success)'
                      : 'var(--color-muted)'
                }}
              >
                {stepLabels[i]}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Step content */}
      {step === 'content' && (
        <>
          <ContentDisplay lesson={lesson} />
          <button
            onClick={() => setStep('exercise')}
            className="w-full py-4 rounded-xl font-bold text-white shadow-md hover:shadow-lg transition-shadow mt-2"
            style={{ backgroundColor: 'var(--color-azul)' }}
          >
            Hacer el ejercicio →
          </button>
        </>
      )}

      {step === 'exercise' && (
        <>
          <div>
            <h2 style={{ margin: '0 0 4px', fontSize: '1.2rem' }}>{lesson.exercise.title}</h2>
            <p style={{ margin: 0, color: 'var(--color-muted)', fontSize: '0.9rem' }}>
              {lesson.exercise.instruction}
            </p>
          </div>
          <ExerciseDisplay
            exercise={lesson.exercise}
            onComplete={() => setStep('quiz')}
          />
        </>
      )}

      {step === 'quiz' && (
        <>
          <div>
            <h2 style={{ margin: '0 0 4px', fontSize: '1.2rem' }}>🧩 Quiz de repaso</h2>
            <p style={{ margin: 0, color: 'var(--color-muted)', fontSize: '0.9rem' }}>
              Responde estas preguntas para completar la lección. Sin penalización — si te equivocas, aprenderás la respuesta correcta.
            </p>
          </div>
          <QuizDisplay
            questions={lesson.quiz}
            onComplete={handleQuizComplete}
          />
        </>
      )}

      {step === 'completed' && (
        <div className="flex flex-col items-center gap-5 text-center py-6">
          <div
            className="rounded-full flex items-center justify-center"
            style={{
              width: 90,
              height: 90,
              backgroundColor: 'var(--color-success-bg)',
              border: '3px solid var(--color-success)'
            }}
          >
            <CheckCircle size={48} style={{ color: 'var(--color-success)' }} />
          </div>
          <h2 style={{ color: 'var(--color-success)', margin: 0 }}>
            ¡Lección completada!
          </h2>
          <p style={{ fontSize: '1.1rem', margin: 0 }}>
            Terminaste: <strong>{lesson.title}</strong>
          </p>

          <div
            className="rounded-xl p-4 border-l-4 text-left w-full"
            style={{ backgroundColor: 'var(--color-success-bg)', borderLeftColor: 'var(--color-success)' }}
          >
            <p style={{ margin: 0 }}>
              ¡Muy bien! Cada lección que completas te acerca más a dominar el uso seguro de la inteligencia artificial en salud.
            </p>
          </div>

          <div className="flex flex-col gap-3 w-full">
            <button
              onClick={() => navigate(`/modulo/${moduleId}`)}
              className="w-full py-4 rounded-xl font-bold text-white shadow-md hover:shadow-lg transition-shadow"
              style={{ backgroundColor: 'var(--color-azul)' }}
            >
              Volver al módulo →
            </button>
            <button
              onClick={() => navigate('/')}
              className="w-full py-4 rounded-xl font-bold border-2 hover:bg-gray-50 transition-colors"
              style={{ borderColor: 'var(--color-azul)', color: 'var(--color-azul)', backgroundColor: 'white' }}
            >
              🏠 Ir al inicio
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
