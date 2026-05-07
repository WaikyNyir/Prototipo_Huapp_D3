import { useNavigate } from 'react-router';
import { ChevronRight, Lock, CheckCircle } from 'lucide-react';
import { courseModules } from '../data/courseData';
import { useProgressContext } from '../context/ProgressContext';

export function ModulesListPage() {
  const navigate = useNavigate();
  const { getModuleProgress, progress } = useProgressContext();

  return (
    <div className="flex flex-col gap-5">
      <div>
        <h1 style={{ margin: '0 0 4px' }}>📚 Módulos del Curso</h1>
        <p style={{ margin: 0, color: 'var(--color-muted)', fontSize: '0.9rem' }}>
          Completa los módulos en orden para aprender a usar la IA de forma segura
        </p>
      </div>

      {courseModules.map(mod => {
        const modProgress = mod.id < 3
          ? getModuleProgress(mod.id, mod.lessons.length)
          : { completed: 0, total: 0, percentage: 0 };
        const isLocked = mod.requiresModule && !progress.module1QuizPassed;
        const isCompleted = mod.id < 3 && modProgress.completed === modProgress.total && modProgress.total > 0;
        const hasBadge = progress.earnedBadges.includes(`badge-${mod.id}`);

        return (
          <button
            key={mod.id}
            onClick={() => {
              if (isLocked) return;
              if (mod.id === 3) navigate('/asistente');
              else navigate(`/modulo/${mod.id}`);
            }}
            disabled={!!isLocked}
            className="rounded-2xl p-5 border shadow-sm text-left w-full hover:shadow-md transition-all disabled:opacity-60 disabled:cursor-not-allowed"
            style={{ backgroundColor: 'white', borderColor: 'var(--color-border)' }}
          >
            <div className="flex items-start gap-4">
              <div
                className="rounded-2xl flex items-center justify-center shrink-0"
                style={{
                  width: 64,
                  height: 64,
                  backgroundColor: isLocked ? '#e8e8e8' : `${mod.color}18`,
                  border: `2px solid ${isLocked ? '#ccc' : mod.color}`
                }}
              >
                <span style={{ fontSize: '1.8rem' }}>{isLocked ? '🔒' : mod.icon}</span>
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <p style={{ fontSize: '0.8rem', color: isLocked ? '#999' : mod.color, fontWeight: 700, margin: 0 }}>
                    {mod.title}
                  </p>
                  {hasBadge && <span style={{ fontSize: '1.2rem' }}>{mod.badgeIcon}</span>}
                </div>
                <h3 style={{ margin: '4px 0 6px', color: isLocked ? '#999' : 'var(--color-text)', fontSize: '1.1rem' }}>
                  {mod.subtitle}
                </h3>
                <p style={{ margin: 0, color: 'var(--color-muted)', fontSize: '0.85rem' }}>
                  {isLocked ? 'Completa el Módulo 1 para desbloquear' : mod.description}
                </p>

                {mod.id < 3 && !isLocked && (
                  <div className="mt-3">
                    <div className="flex justify-between mb-1">
                      <span style={{ fontSize: '0.75rem', color: 'var(--color-muted)' }}>
                        {modProgress.completed}/{modProgress.total} lecciones
                      </span>
                      {isCompleted && (
                        <span className="flex items-center gap-1" style={{ fontSize: '0.75rem', color: 'var(--color-success)', fontWeight: 600 }}>
                          <CheckCircle size={12} />
                          Completado
                        </span>
                      )}
                    </div>
                    <div className="w-full rounded-full h-2" style={{ backgroundColor: '#e8f0f8' }}>
                      <div
                        className="h-2 rounded-full transition-all duration-700"
                        style={{
                          width: `${modProgress.percentage}%`,
                          backgroundColor: isCompleted ? 'var(--color-success)' : mod.color
                        }}
                      />
                    </div>
                    <p style={{ fontSize: '0.75rem', color: 'var(--color-muted)', margin: '4px 0 0' }}>
                      {mod.lessons.length} lecciones · ~{mod.lessons.reduce((acc, l) => acc + parseInt(l.duration), 0)} min
                    </p>
                  </div>
                )}

                {mod.id === 3 && !isLocked && (
                  <div
                    className="mt-2 inline-flex items-center gap-2 rounded-lg px-3 py-1"
                    style={{ backgroundColor: '#f0e8f7' }}
                  >
                    <span style={{ fontSize: '0.8rem', color: '#6B3A8C', fontWeight: 600 }}>
                      ✅ Disponible — Ingresa al chat
                    </span>
                  </div>
                )}
              </div>

              {!isLocked && (
                <ChevronRight size={22} style={{ color: 'var(--color-muted)', flexShrink: 0, alignSelf: 'center' }} />
              )}
              {isLocked && (
                <Lock size={20} style={{ color: '#ccc', flexShrink: 0, alignSelf: 'center' }} />
              )}
            </div>
          </button>
        );
      })}
    </div>
  );
}
