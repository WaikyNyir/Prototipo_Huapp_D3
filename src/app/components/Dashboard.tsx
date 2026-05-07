import { useNavigate } from 'react-router';
import { CheckCircle, Lock, ChevronRight, Award, Star, Calendar, TrendingUp } from 'lucide-react';
import { courseModules } from '../data/courseData';
import { useProgressContext } from '../context/ProgressContext';
import { useAuth } from '../context/AuthContext';

function ProgressRing({ percentage, size = 80, color = '#1B4F7A' }: { percentage: number; size?: number; color?: string }) {
  const radius = (size - 12) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} aria-hidden="true">
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="#e8f0f8"
        strokeWidth={10}
      />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke={color}
        strokeWidth={10}
        strokeDasharray={circumference}
        strokeDashoffset={strokeDashoffset}
        strokeLinecap="round"
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
        style={{ transition: 'stroke-dashoffset 0.6s ease' }}
      />
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        fill={color}
        style={{ fontSize: '1rem', fontWeight: 700 }}
      >
        {percentage}%
      </text>
    </svg>
  );
}

export function Dashboard() {
  const navigate = useNavigate();
  const { getTotalProgress, getModuleProgress, progress } = useProgressContext();
  const { user } = useAuth();

  const totalProgress = getTotalProgress();

  // Find next lesson to do
  const getNextLesson = () => {
    for (const mod of courseModules) {
      if (mod.id === 3) continue;
      for (const lesson of mod.lessons) {
        if (!progress.completedLessons.includes(lesson.id)) {
          return { module: mod, lesson };
        }
      }
    }
    return null;
  };

  const nextLesson = getNextLesson();

  return (
    <div className="flex flex-col gap-6">

      {/* ── USER PROFILE CARD ── */}
      {user && (
        <div
          className="rounded-2xl overflow-hidden shadow-lg"
          style={{ border: '1.5px solid var(--color-border)', backgroundColor: 'white' }}
        >
          {/* Gradient strip */}
          <div
            className="h-3 w-full"
            style={{ background: 'linear-gradient(90deg, #1B4F7A 0%, #2D6E3E 60%, #B85C00 100%)' }}
          />
          <div className="p-5">
            <div className="flex items-center gap-4">
              {/* Avatar circle */}
              <div
                className="rounded-full flex items-center justify-center shrink-0 shadow-md"
                style={{
                  width: 68,
                  height: 68,
                  background: 'linear-gradient(135deg, #1B4F7A, #153d60)',
                  border: '3px solid var(--color-azul)',
                }}
              >
                <span style={{ fontSize: '1.4rem', fontWeight: 800, color: 'white' }}>
                  {user.avatar}
                </span>
              </div>

              {/* Name + info */}
              <div className="flex-1 min-w-0">
                <p style={{ fontSize: '0.75rem', color: 'var(--color-muted)', margin: 0, fontWeight: 600 }}>
                  Cuenta Google
                </p>
                <h2 style={{ fontSize: '1.15rem', color: 'var(--color-azul)', margin: '2px 0 0', lineHeight: 1.2 }}>
                  {user.name}
                </h2>
                <p style={{ fontSize: '0.8rem', color: 'var(--color-muted)', margin: '2px 0 0' }}>
                  {user.email}
                </p>
                <div className="flex items-center gap-1 mt-1">
                  <Calendar size={13} style={{ color: 'var(--color-muted)' }} />
                  <span style={{ fontSize: '0.75rem', color: 'var(--color-muted)' }}>
                    Inscrito desde {user.joinDate}
                  </span>
                </div>
              </div>
            </div>

            {/* Progress summary row */}
            <div
              className="mt-4 rounded-xl p-4 flex items-center gap-4"
              style={{ backgroundColor: 'var(--color-azul-light)' }}
            >
              <ProgressRing percentage={totalProgress.percentage} size={64} color="var(--color-azul)" />
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <TrendingUp size={15} style={{ color: 'var(--color-azul)' }} />
                  <span style={{ fontSize: '0.8rem', color: 'var(--color-azul)', fontWeight: 700 }}>
                    Progreso del curso
                  </span>
                </div>
                <p style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--color-azul)', margin: 0 }}>
                  {totalProgress.completed} de {totalProgress.total} lecciones completadas
                </p>
                <div className="w-full rounded-full mt-2" style={{ height: 8, backgroundColor: 'white' }}>
                  <div
                    className="rounded-full transition-all duration-700"
                    style={{
                      height: 8,
                      width: `${totalProgress.percentage}%`,
                      background: totalProgress.percentage === 100
                        ? 'linear-gradient(90deg, #2D6E3E, #1a4d2a)'
                        : 'linear-gradient(90deg, #1B4F7A, #2D6E3E)',
                    }}
                  />
                </div>
                {/* Badges count */}
                {progress.earnedBadges.length > 0 && (
                  <div className="flex items-center gap-1 mt-2">
                    <span style={{ fontSize: '0.8rem' }}>⭐</span>
                    <span style={{ fontSize: '0.78rem', color: '#B85C00', fontWeight: 600 }}>
                      {progress.earnedBadges.length} insignia{progress.earnedBadges.length > 1 ? 's' : ''} obtenida{progress.earnedBadges.length > 1 ? 's' : ''}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Welcome header */}
      <div
        className="rounded-2xl p-6 text-white shadow-lg"
        style={{ background: 'linear-gradient(135deg, #1B4F7A 0%, #153d60 100%)' }}
      >
        <p className="text-white/80" style={{ fontSize: '0.9rem' }}>Hospital HUAP · Posta Central</p>
        <h1 className="text-white mt-1" style={{ fontSize: '1.5rem', color: 'white' }}>
          {user ? `¡Hola, ${user.name.split(' ')[0]}!` : 'IA y Salud'}
        </h1>
        <p className="text-white/90 mt-1" style={{ fontSize: '1rem' }}>
          Guía Digital para Personas Mayores
        </p>

        {/* Overall progress */}
        <div className="mt-4 bg-white/20 rounded-xl p-4 flex items-center gap-4">
          <ProgressRing percentage={totalProgress.percentage} size={72} color="white" />
          <div>
            <p className="text-white/80" style={{ fontSize: '0.85rem' }}>Tu progreso total</p>
            <p className="text-white font-bold" style={{ fontSize: '1.1rem' }}>
              {totalProgress.completed} de {totalProgress.total} lecciones
            </p>
            <div className="w-full bg-white/30 rounded-full mt-2 h-2">
              <div
                className="h-2 rounded-full bg-white transition-all duration-700"
                style={{ width: `${totalProgress.percentage}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Badges earned */}
      {progress.earnedBadges.length > 0 && (
        <div
          className="rounded-2xl p-4 border-2"
          style={{ backgroundColor: '#FFF4E6', borderColor: '#B85C00' }}
        >
          <div className="flex items-center gap-2 mb-3">
            <Award size={22} style={{ color: '#B85C00' }} />
            <h2 style={{ fontSize: '1.1rem', color: '#B85C00', margin: 0 }}>
              Insignias obtenidas
            </h2>
          </div>
          <div className="flex gap-3 flex-wrap">
            {progress.earnedBadges.map(badgeId => {
              const modId = parseInt(badgeId.replace('badge-', ''));
              const mod = courseModules.find(m => m.id === modId);
              return mod ? (
                <div key={badgeId} className="flex flex-col items-center gap-1 bg-white rounded-xl p-3 shadow-sm">
                  <span style={{ fontSize: '2rem' }}>{mod.badgeIcon}</span>
                  <span style={{ fontSize: '0.75rem', color: '#B85C00', fontWeight: 600, textAlign: 'center' }}>
                    {mod.badgeName}
                  </span>
                </div>
              ) : null;
            })}
          </div>
        </div>
      )}

      {/* Continue / Next lesson */}
      {nextLesson && (
        <button
          onClick={() => navigate(`/modulo/${nextLesson.module.id}/leccion/${nextLesson.lesson.id}`)}
          className="rounded-2xl p-4 text-left shadow-sm border-2 hover:shadow-md transition-shadow w-full"
          style={{ backgroundColor: 'var(--color-success-bg)', borderColor: 'var(--color-success)' }}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span style={{ fontSize: '1.8rem' }}>{nextLesson.lesson.icon}</span>
              <div>
                <p style={{ fontSize: '0.8rem', color: 'var(--color-success)', fontWeight: 600, margin: 0 }}>
                  Continuar aprendiendo
                </p>
                <p style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--color-text)', margin: '2px 0 0' }}>
                  {nextLesson.lesson.title}
                </p>
                <p style={{ fontSize: '0.8rem', color: 'var(--color-muted)', margin: 0 }}>
                  {nextLesson.module.subtitle} · {nextLesson.lesson.duration}
                </p>
              </div>
            </div>
            <ChevronRight size={24} style={{ color: 'var(--color-success)', flexShrink: 0 }} />
          </div>
        </button>
      )}

      {totalProgress.completed === totalProgress.total && (
        <div
          className="rounded-2xl p-5 text-center shadow-sm"
          style={{ background: 'linear-gradient(135deg, #2D6E3E, #1a4d2a)' }}
        >
          <span style={{ fontSize: '3rem' }}>🎉</span>
          <p className="text-white font-bold mt-2" style={{ fontSize: '1.2rem' }}>
            ¡Felicitaciones! Completaste todo el curso
          </p>
          <p className="text-white/80 mt-1" style={{ fontSize: '0.9rem' }}>
            Ahora puedes usar el asistente de IA con confianza
          </p>
        </div>
      )}

      {/* Module cards */}
      <h2 style={{ margin: '4px 0 -8px', fontSize: '1.2rem' }}>Tus módulos</h2>

      {courseModules.map(mod => {
        const modProgress = mod.id < 3
          ? getModuleProgress(mod.id, mod.lessons.length)
          : { completed: 0, total: 0, percentage: progress.module1QuizPassed ? 100 : 0 };

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
            className="rounded-2xl p-4 text-left shadow-sm border hover:shadow-md transition-all w-full disabled:opacity-60 disabled:cursor-not-allowed"
            style={{ backgroundColor: 'white', borderColor: 'var(--color-border)' }}
            aria-label={isLocked ? `${mod.subtitle} - Bloqueado. Necesitas completar el Módulo 1 primero` : `Ver ${mod.subtitle}`}
          >
            <div className="flex items-start gap-4">
              {/* Icon circle */}
              <div
                className="rounded-full flex items-center justify-center shrink-0"
                style={{
                  width: 56,
                  height: 56,
                  backgroundColor: isLocked ? '#e0e0e0' : `${mod.color}20`,
                  border: `2px solid ${isLocked ? '#ccc' : mod.color}`
                }}
              >
                <span style={{ fontSize: '1.5rem' }}>
                  {isLocked ? '🔒' : mod.icon}
                </span>
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <div>
                    <p style={{ fontSize: '0.8rem', color: mod.color, fontWeight: 600, margin: 0 }}>
                      {mod.title}
                    </p>
                    <p style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--color-text)', margin: '1px 0 4px' }}>
                      {mod.subtitle}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    {hasBadge && <Star size={20} fill="#B85C00" style={{ color: '#B85C00' }} />}
                    {!isLocked && <ChevronRight size={20} style={{ color: 'var(--color-muted)' }} />}
                    {isLocked && <Lock size={18} style={{ color: '#999' }} />}
                  </div>
                </div>

                <p style={{ fontSize: '0.85rem', color: 'var(--color-muted)', margin: 0 }}>
                  {isLocked
                    ? 'Completa el Módulo 1 para desbloquear'
                    : mod.description}
                </p>

                {/* Progress bar */}
                {mod.id < 3 && !isLocked && (
                  <div className="mt-3">
                    <div className="flex justify-between mb-1">
                      <span style={{ fontSize: '0.75rem', color: 'var(--color-muted)' }}>
                        {modProgress.completed}/{modProgress.total} lecciones
                      </span>
                      {isCompleted && (
                        <span className="flex items-center gap-1" style={{ fontSize: '0.75rem', color: 'var(--color-success)', fontWeight: 600 }}>
                          <CheckCircle size={14} />
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
                  </div>
                )}

                {mod.id === 3 && !isLocked && (
                  <div
                    className="mt-2 flex items-center gap-2 rounded-lg px-3 py-1 inline-block"
                    style={{ backgroundColor: '#f0e8f7' }}
                  >
                    <span style={{ fontSize: '0.8rem', color: '#6B3A8C', fontWeight: 600 }}>
                      ✅ Disponible — Ingresa al asistente
                    </span>
                  </div>
                )}
              </div>
            </div>
          </button>
        );
      })}

      {/* Disclaimer */}
      <div
        className="rounded-xl p-4 border-l-4"
        style={{ backgroundColor: 'var(--color-warning-bg)', borderLeftColor: 'var(--color-warning)' }}
        role="note"
        aria-label="Aviso importante"
      >
        <div className="flex items-start gap-3">
          <span style={{ fontSize: '1.2rem', flexShrink: 0 }}>ℹ️</span>
          <p style={{ fontSize: '0.85rem', color: 'var(--color-text)', margin: 0 }}>
            <strong>Recuerda:</strong> Esta aplicación es para orientación educativa. En caso de emergencia, llama al{' '}
            <strong>131 (SAMU)</strong> o acude a urgencias del HUAP.
          </p>
        </div>
      </div>
    </div>
  );
}