import { useParams, useNavigate } from 'react-router';
import { CheckCircle, Clock, ChevronRight, Lock } from 'lucide-react';
import { getModule } from '../data/courseData';
import { useProgressContext } from '../context/ProgressContext';

export function ModulePage() {
  const { moduleId } = useParams<{ moduleId: string }>();
  const navigate = useNavigate();
  const { isLessonCompleted, getModuleProgress, progress } = useProgressContext();

  const mod = getModule(moduleId ?? '');

  if (!mod) {
    return (
      <div className="text-center py-12">
        <p style={{ fontSize: '1.2rem' }}>Módulo no encontrado</p>
        <button
          onClick={() => navigate('/')}
          className="mt-4 px-6 py-3 rounded-xl text-white"
          style={{ backgroundColor: 'var(--color-azul)' }}
        >
          Volver al inicio
        </button>
      </div>
    );
  }

  const modProgress = getModuleProgress(mod.id, mod.lessons.length);
  const isLocked = mod.requiresModule && !progress.module1QuizPassed;

  if (isLocked) {
    return (
      <div className="flex flex-col items-center gap-6 text-center py-12">
        <span style={{ fontSize: '4rem' }}>🔒</span>
        <h1 style={{ color: 'var(--color-azul)' }}>{mod.subtitle}</h1>
        <div
          className="rounded-xl p-4 border-l-4 text-left"
          style={{ backgroundColor: 'var(--color-warning-bg)', borderLeftColor: 'var(--color-warning)' }}
        >
          <p style={{ margin: 0 }}>
            Para acceder al Asistente de IA, primero debes completar y aprobar el{' '}
            <strong>Módulo 1: Conocer la Inteligencia Artificial</strong>.
          </p>
          <p style={{ margin: '8px 0 0' }}>
            Esto es importante para que uses la IA de forma segura y responsable.
          </p>
        </div>
        <button
          onClick={() => navigate('/modulo/1')}
          className="px-8 py-4 rounded-xl text-white font-bold shadow-md hover:shadow-lg transition-shadow"
          style={{ backgroundColor: 'var(--color-azul)' }}
        >
          Ir al Módulo 1
        </button>
      </div>
    );
  }

  // Get next incomplete lesson for "continue" button
  const nextIncomplete = mod.lessons.find(l => !isLessonCompleted(l.id));

  return (
    <div className="flex flex-col gap-6">
      {/* Module header */}
      <div
        className="rounded-2xl p-5 text-white shadow-lg"
        style={{ background: `linear-gradient(135deg, ${mod.color}ee, ${mod.color}aa)` }}
      >
        <div className="flex items-start gap-4">
          <span style={{ fontSize: '2.5rem' }}>{mod.icon}</span>
          <div className="flex-1">
            <p className="text-white/80" style={{ fontSize: '0.85rem', margin: 0 }}>
              {mod.title}
            </p>
            <h1 className="text-white mt-1" style={{ color: 'white', fontSize: '1.3rem' }}>
              {mod.subtitle}
            </h1>
            <p className="text-white/90 mt-1" style={{ fontSize: '0.9rem' }}>
              {mod.description}
            </p>
          </div>
        </div>

        {/* Progress */}
        <div className="mt-4 bg-white/20 rounded-xl p-3">
          <div className="flex justify-between mb-2">
            <span className="text-white/80" style={{ fontSize: '0.85rem' }}>
              {modProgress.completed} de {modProgress.total} lecciones completadas
            </span>
            <span className="text-white font-bold" style={{ fontSize: '0.85rem' }}>
              {modProgress.percentage}%
            </span>
          </div>
          <div className="w-full bg-white/30 rounded-full h-3">
            <div
              className="h-3 rounded-full bg-white transition-all duration-700"
              style={{ width: `${modProgress.percentage}%` }}
            />
          </div>
        </div>

        {/* Badge info */}
        <div className="mt-3 flex items-center gap-2">
          <span style={{ fontSize: '1.2rem' }}>{mod.badgeIcon}</span>
          <span className="text-white/80" style={{ fontSize: '0.8rem' }}>
            Completa el módulo para obtener la insignia: <strong className="text-white">{mod.badgeName}</strong>
          </span>
        </div>
      </div>

      {/* Continue button */}
      {nextIncomplete && (
        <button
          onClick={() => navigate(`/modulo/${mod.id}/leccion/${nextIncomplete.id}`)}
          className="flex items-center justify-between p-4 rounded-xl shadow-sm border-2 hover:shadow-md transition-shadow text-left w-full"
          style={{
            backgroundColor: 'var(--color-success-bg)',
            borderColor: 'var(--color-success)'
          }}
        >
          <div className="flex items-center gap-3">
            <span style={{ fontSize: '1.5rem' }}>{nextIncomplete.icon}</span>
            <div>
              <p style={{ fontSize: '0.8rem', color: 'var(--color-success)', fontWeight: 600, margin: 0 }}>
                ▶ Continuar aquí
              </p>
              <p style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--color-text)', margin: 0 }}>
                {nextIncomplete.title}
              </p>
            </div>
          </div>
          <ChevronRight size={22} style={{ color: 'var(--color-success)', flexShrink: 0 }} />
        </button>
      )}

      {/* Lessons list */}
      <h2 style={{ margin: 0, fontSize: '1.1rem' }}>Lecciones del módulo</h2>

      <div className="flex flex-col gap-3">
        {mod.lessons.map((lesson, idx) => {
          const completed = isLessonCompleted(lesson.id);
          const isFirst = idx === 0;
          const prevCompleted = idx === 0 || isLessonCompleted(mod.lessons[idx - 1].id);
          const accessible = isFirst || prevCompleted || completed;

          return (
            <button
              key={lesson.id}
              onClick={() => {
                if (accessible) navigate(`/modulo/${mod.id}/leccion/${lesson.id}`);
              }}
              disabled={!accessible}
              className="flex items-center gap-4 p-4 rounded-xl border shadow-sm text-left w-full transition-all hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
              style={{
                backgroundColor: completed ? 'var(--color-success-bg)' : 'white',
                borderColor: completed
                  ? 'var(--color-success)'
                  : accessible
                  ? 'var(--color-border)'
                  : '#e0e0e0'
              }}
              aria-label={`${lesson.title}${completed ? ' - Completada' : !accessible ? ' - Bloqueada' : ''}`}
            >
              {/* Lesson number / status */}
              <div
                className="rounded-full flex items-center justify-center shrink-0 font-bold"
                style={{
                  width: 44,
                  height: 44,
                  backgroundColor: completed
                    ? 'var(--color-success)'
                    : accessible
                    ? `${mod.color}20`
                    : '#e0e0e0',
                  color: completed ? 'white' : accessible ? mod.color : '#999',
                  fontSize: '0.9rem'
                }}
              >
                {completed ? (
                  <CheckCircle size={22} />
                ) : !accessible ? (
                  <Lock size={18} />
                ) : (
                  `${lesson.moduleId}.${lesson.lessonNumber}`
                )}
              </div>

              {/* Lesson info */}
              <div className="flex-1 min-w-0">
                <p style={{
                  fontSize: '1rem',
                  fontWeight: 700,
                  color: 'var(--color-text)',
                  margin: 0
                }}>
                  {lesson.icon} {lesson.title}
                </p>
                <div className="flex items-center gap-3 mt-1">
                  <div className="flex items-center gap-1">
                    <Clock size={14} style={{ color: 'var(--color-muted)' }} />
                    <span style={{ fontSize: '0.8rem', color: 'var(--color-muted)' }}>
                      {lesson.duration}
                    </span>
                  </div>
                  {completed && (
                    <span style={{ fontSize: '0.75rem', color: 'var(--color-success)', fontWeight: 600 }}>
                      ✓ Completada
                    </span>
                  )}
                </div>
              </div>

              {accessible && !completed && (
                <ChevronRight size={20} style={{ color: 'var(--color-muted)', flexShrink: 0 }} />
              )}
            </button>
          );
        })}
      </div>

      {/* Module quiz section */}
      {modProgress.completed === modProgress.total && modProgress.total > 0 && (
        <div
          className="rounded-2xl p-5 border-2 mt-2"
          style={{
            backgroundColor: 'var(--color-azul-light)',
            borderColor: 'var(--color-azul)'
          }}
        >
          <h3 style={{ color: 'var(--color-azul)', margin: '0 0 8px' }}>
            🎓 Quiz Final del Módulo
          </h3>
          <p style={{ margin: '0 0 12px', fontSize: '0.9rem' }}>
            ¡Completaste todas las lecciones! Ahora puedes hacer el quiz final para obtener tu insignia{' '}
            <strong>{mod.badgeName}</strong>.
          </p>
          {progress.earnedBadges.includes(`badge-${mod.id}`) ? (
            <div className="flex items-center gap-2">
              <span style={{ fontSize: '1.5rem' }}>{mod.badgeIcon}</span>
              <span style={{ color: 'var(--color-success)', fontWeight: 600 }}>
                ¡Insignia obtenida! Módulo completado.
              </span>
            </div>
          ) : (
            <button
              onClick={() => navigate(`/modulo/${mod.id}/quiz`)}
              className="w-full py-4 rounded-xl text-white font-bold shadow-md hover:shadow-lg transition-shadow"
              style={{ backgroundColor: 'var(--color-azul)' }}
            >
              Hacer el Quiz Final →
            </button>
          )}
        </div>
      )}
    </div>
  );
}
