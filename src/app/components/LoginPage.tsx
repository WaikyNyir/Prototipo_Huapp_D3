import { useState } from 'react';
import { Shield, BookOpen, Bot, Award, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

function GoogleIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path
        d="M21.6 11.227c0-.709-.064-1.39-.182-2.045H11v3.868h5.946a5.082 5.082 0 01-2.205 3.332v2.768h3.568C20.336 17.273 21.6 14.464 21.6 11.227z"
        fill="#4285F4"
      />
      <path
        d="M11 22c2.977 0 5.473-.987 7.3-2.668l-3.568-2.768c-.99.663-2.255 1.055-3.732 1.055-2.87 0-5.3-1.937-6.168-4.541H1.136v2.858A11.001 11.001 0 0011 22z"
        fill="#34A853"
      />
      <path
        d="M4.832 13.078A6.606 6.606 0 014.4 11c0-.72.123-1.42.432-2.078V6.064H1.136A11.001 11.001 0 000 11c0 1.773.425 3.454 1.136 4.936l3.696-2.858z"
        fill="#FBBC05"
      />
      <path
        d="M11 4.381c1.618 0 3.073.556 4.215 1.646l3.163-3.163C16.468.987 13.972 0 11 0A11.001 11.001 0 001.136 6.064L4.832 8.922C5.7 6.318 8.13 4.381 11 4.381z"
        fill="#EA4335"
      />
    </svg>
  );
}

function SpinnerIcon() {
  return (
    <svg
      className="animate-spin"
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
      />
    </svg>
  );
}

export function LoginPage() {
  const { signInWithGoogle, isLoading } = useAuth();
  const [error, setError] = useState(false);

  const handleGoogleLogin = async () => {
    setError(false);
    try {
      await signInWithGoogle();
    } catch {
      setError(true);
    }
  };

  const features = [
    { icon: BookOpen, label: 'Módulos de aprendizaje interactivo' },
    { icon: Bot, label: 'Asistente de IA personalizado' },
    { icon: Award, label: 'Sistema de insignias y progreso' },
  ];

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ backgroundColor: 'var(--color-bg)' }}
    >
      {/* Header strip */}
      <div
        className="w-full py-4 px-6 flex items-center gap-3 shadow-sm"
        style={{ backgroundColor: 'var(--color-azul)' }}
      >
        <span style={{ fontSize: '1.8rem' }}>🏥</span>
        <div>
          <p className="text-white" style={{ fontSize: '1rem', fontWeight: 700, lineHeight: 1.2, margin: 0 }}>
            Hospital HUAP · Posta Central
          </p>
          <p className="text-white/80" style={{ fontSize: '0.75rem', margin: 0 }}>
            IA y Salud: Guía Digital para Personas Mayores
          </p>
        </div>
      </div>

      {/* Hero image banner */}
      <div
        className="w-full relative overflow-hidden"
        style={{ height: 180 }}
      >
        <img
          src="https://images.unsplash.com/photo-1758691462848-ba1e929da259?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3NwaXRhbCUyMG1lZGljYWwlMjB0ZWNobm9sb2d5JTIwZGlnaXRhbCUyMGhlYWx0aHxlbnwxfHx8fDE3NzgxMjA1NzR8MA&ixlib=rb-4.1.0&q=80&w=1080"
          alt="Tecnología en salud"
          className="w-full h-full object-cover"
        />
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(to bottom, rgba(27,79,122,0.55) 0%, rgba(27,79,122,0.85) 100%)' }}
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
          <p className="text-white" style={{ fontSize: '1.5rem', fontWeight: 700, margin: 0, lineHeight: 1.3 }}>
            Bienvenido/a al Curso
          </p>
          <p className="text-white/90 mt-1" style={{ fontSize: '0.95rem', margin: 0 }}>
            Aprende a usar la Inteligencia Artificial en tu salud cotidiana
          </p>
        </div>
      </div>

      {/* Main login card */}
      <div className="flex-1 flex flex-col items-center px-4 py-8">
        <div
          className="w-full max-w-sm rounded-3xl shadow-xl p-6 flex flex-col gap-5"
          style={{ backgroundColor: 'white', border: '1.5px solid var(--color-border)' }}
        >
          {/* Card title */}
          <div className="text-center">
            <h1 style={{ fontSize: '1.4rem', margin: 0, color: 'var(--color-azul)' }}>
              Acceder al Curso
            </h1>
            <p style={{ fontSize: '0.9rem', color: 'var(--color-muted)', margin: '6px 0 0' }}>
              Usa tu cuenta Google para guardar tu progreso y volver cuando quieras
            </p>
          </div>

          {/* Divider */}
          <hr style={{ borderColor: 'var(--color-border)', margin: 0 }} />

          {/* Features list */}
          <ul className="flex flex-col gap-3" style={{ listStyle: 'none', margin: 0, padding: 0 }}>
            {features.map(({ icon: Icon, label }) => (
              <li key={label} className="flex items-center gap-3">
                <div
                  className="rounded-full flex items-center justify-center shrink-0"
                  style={{ width: 38, height: 38, backgroundColor: 'var(--color-azul-light)' }}
                >
                  <Icon size={18} style={{ color: 'var(--color-azul)' }} />
                </div>
                <span style={{ fontSize: '0.95rem', color: 'var(--color-text)' }}>{label}</span>
              </li>
            ))}
          </ul>

          {/* Error alert */}
          {error && (
            <div
              className="flex items-center gap-3 rounded-xl p-3"
              style={{ backgroundColor: 'var(--color-error-bg)', border: '1px solid var(--color-error)' }}
              role="alert"
            >
              <AlertCircle size={18} style={{ color: 'var(--color-error)', flexShrink: 0 }} />
              <p style={{ fontSize: '0.85rem', color: 'var(--color-error)', margin: 0 }}>
                Ocurrió un error. Por favor inténtalo de nuevo.
              </p>
            </div>
          )}

          {/* Google sign-in button */}
          <button
            onClick={handleGoogleLogin}
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-3 rounded-2xl px-5 py-4 shadow-sm transition-all hover:shadow-md active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
            style={{
              backgroundColor: 'white',
              border: '2px solid #dadce0',
              color: '#3c4043',
              minHeight: 56,
            }}
            aria-label="Iniciar sesión con Google"
          >
            {isLoading ? (
              <>
                <SpinnerIcon />
                <span style={{ fontSize: '1rem', fontWeight: 600 }}>Conectando con Google…</span>
              </>
            ) : (
              <>
                <GoogleIcon />
                <span style={{ fontSize: '1rem', fontWeight: 600 }}>Iniciar sesión con Google</span>
              </>
            )}
          </button>

          {/* Demo note */}
          <div
            className="rounded-xl p-3 flex items-start gap-2"
            style={{ backgroundColor: 'var(--color-azul-light)' }}
          >
            <Shield size={16} style={{ color: 'var(--color-azul)', flexShrink: 0, marginTop: 2 }} />
            <p style={{ fontSize: '0.78rem', color: 'var(--color-azul)', margin: 0, lineHeight: 1.5 }}>
              <strong>Solo demostración:</strong> El acceso es simulado. No se envían datos reales a Google. Tu progreso se guarda localmente en este dispositivo.
            </p>
          </div>
        </div>

        {/* Footer */}
        <p
          className="text-center mt-6"
          style={{ fontSize: '0.78rem', color: 'var(--color-muted)', maxWidth: 320 }}
        >
          Al ingresar, aceptas que esta app es de uso educativo. En caso de emergencia médica, llama al{' '}
          <strong style={{ color: 'var(--color-error)' }}>131 (SAMU)</strong>.
        </p>
      </div>
    </div>
  );
}
