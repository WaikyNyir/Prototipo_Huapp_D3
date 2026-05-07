import { useEffect, useState } from 'react';
import { Outlet, NavLink, useNavigate, useLocation } from 'react-router';
import { Home, BookOpen, Bot, ChevronLeft, Plus, Minus, LogOut, UserRound } from 'lucide-react';
import { useProgressContext } from '../context/ProgressContext';
import { useAuth } from '../context/AuthContext';

export function Root() {
  const { progress, setFontSize, applyFontSize } = useProgressContext();
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [showUserMenu, setShowUserMenu] = useState(false);

  useEffect(() => {
    applyFontSize();
  }, [applyFontSize]);

  const isHome = location.pathname === '/';

  useEffect(() => {
    if (!showUserMenu) return;
    const close = () => setShowUserMenu(false);
    window.addEventListener('click', close);
    return () => window.removeEventListener('click', close);
  }, [showUserMenu]);

  const handleLogout = () => {
    setShowUserMenu(false);
    signOut();
  };

  /* ── Pill de tamaño de letra (reutilizable) ── */
  const FontSizeControls = () => (
    <div
      className="flex items-center gap-1 rounded-2xl px-3 py-2"
      style={{ backgroundColor: 'rgba(255,255,255,0.18)' }}
    >
      <button
        onClick={() => setFontSize(progress.fontSizeLevel - 1)}
        disabled={progress.fontSizeLevel === 0}
        className="text-white disabled:opacity-40 hover:bg-white/20 rounded-lg flex items-center justify-center transition-colors"
        style={{ width: 36, height: 36, minHeight: 36, minWidth: 36, border: 'none', backgroundColor: 'transparent' }}
        aria-label="Reducir tamaño de letra"
      >
        <Minus size={16} />
      </button>
      <span className="text-white select-none" style={{ fontSize: '1.05rem', fontWeight: 700, padding: '0 4px' }}>A</span>
      <button
        onClick={() => setFontSize(progress.fontSizeLevel + 1)}
        disabled={progress.fontSizeLevel === 2}
        className="text-white disabled:opacity-40 hover:bg-white/20 rounded-lg flex items-center justify-center transition-colors"
        style={{ width: 36, height: 36, minHeight: 36, minWidth: 36, border: 'none', backgroundColor: 'transparent' }}
        aria-label="Aumentar tamaño de letra"
      >
        <Plus size={16} />
      </button>
    </div>
  );

  /* ── Botón "Mi perfil" con círculo blanco ── */
  const UserProfileButton = () => (
    <div className="relative flex justify-end">
      <button
        onClick={e => { e.stopPropagation(); setShowUserMenu(v => !v); }}
        className="flex flex-col items-center gap-1 hover:opacity-90 transition-opacity"
        style={{ border: 'none', backgroundColor: 'transparent', minHeight: 'auto', minWidth: 'auto', cursor: 'pointer' }}
        aria-label="Mi perfil"
      >
        <div
          className="rounded-full flex items-center justify-center shadow-md"
          style={{ width: 56, height: 56, backgroundColor: 'white', flexShrink: 0 }}
        >
          <UserRound size={30} style={{ color: 'var(--color-azul)' }} strokeWidth={1.8} />
        </div>
        <span className="text-white" style={{ fontSize: '0.8rem', fontWeight: 600, lineHeight: 1 }}>
          Mi perfil
        </span>
      </button>

      {/* Dropdown */}
      {showUserMenu && user && (
        <div
          className="absolute right-0 rounded-2xl shadow-xl py-3 z-50"
          style={{
            top: 'calc(100% + 8px)',
            backgroundColor: 'white',
            border: '1.5px solid var(--color-border)',
            minWidth: 230,
          }}
          onClick={e => e.stopPropagation()}
        >
          <div className="px-4 pb-3 border-b" style={{ borderColor: 'var(--color-border)' }}>
            <div className="flex items-center gap-3">
              <div
                className="rounded-full flex items-center justify-center shrink-0"
                style={{ width: 44, height: 44, backgroundColor: 'var(--color-azul-light)', border: '2px solid var(--color-azul)' }}
              >
                <UserRound size={22} style={{ color: 'var(--color-azul)' }} strokeWidth={1.8} />
              </div>
              <div>
                <p style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--color-text)', margin: 0 }}>
                  {user.name}
                </p>
                <p style={{ fontSize: '0.75rem', color: 'var(--color-muted)', margin: 0 }}>
                  {user.email}
                </p>
              </div>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors text-left"
            style={{ minHeight: 48, color: 'var(--color-error)', border: 'none', backgroundColor: 'transparent' }}
          >
            <LogOut size={18} />
            <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>Cerrar sesión</span>
          </button>
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: 'var(--color-bg)' }}>
      {/* ══════════ HEADER ══════════ */}
      <header
        className="sticky top-0 z-50 shadow-md"
        style={{ backgroundColor: 'var(--color-azul)' }}
      >
        <div className="max-w-4xl mx-auto px-4 py-3">

          {/* ── NON-HOME: 3 columnas Volver | A controls | Mi perfil ── */}
          {!isHome && (
            <div className="grid items-center" style={{ gridTemplateColumns: '1fr auto 1fr' }}>
              {/* Col izquierda: Volver */}
              <div className="flex justify-start">
                <button
                  onClick={() => navigate(-1)}
                  className="flex flex-col items-center gap-1 hover:opacity-90 transition-opacity"
                  style={{ border: 'none', backgroundColor: 'transparent', minHeight: 'auto', minWidth: 'auto', cursor: 'pointer' }}
                  aria-label="Volver atrás"
                >
                  <div
                    className="rounded-full flex items-center justify-center shadow-md"
                    style={{ width: 56, height: 56, backgroundColor: 'white' }}
                  >
                    <ChevronLeft size={30} style={{ color: 'var(--color-azul)' }} strokeWidth={2.2} />
                  </div>
                  <span className="text-white" style={{ fontSize: '0.8rem', fontWeight: 600, lineHeight: 1 }}>
                    Volver
                  </span>
                </button>
              </div>

              {/* Col central: A−/+ */}
              <div className="flex justify-center">
                <FontSizeControls />
              </div>

              {/* Col derecha: Mi perfil */}
              <UserProfileButton />
            </div>
          )}

          {/* ── HOME: Logo | A controls | Mi perfil ── */}
          {isHome && (
            <div className="grid items-center" style={{ gridTemplateColumns: '1fr auto 1fr' }}>
              {/* Logo */}
              <div className="flex items-center gap-2">
                <span style={{ fontSize: '1.6rem' }}>🏥</span>
                <div>
                  <p className="text-white" style={{ fontSize: '0.95rem', fontWeight: 700, lineHeight: 1.2, margin: 0 }}>
                    IA y Salud
                  </p>
                  <p className="text-white/80" style={{ fontSize: '0.72rem', margin: 0 }}>
                    HUAP · Posta Central
                  </p>
                </div>
              </div>

              {/* A−/+ centrado */}
              <div className="flex justify-center">
                <FontSizeControls />
              </div>

              {/* Mi perfil */}
              <UserProfileButton />
            </div>
          )}

        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 max-w-4xl mx-auto w-full px-4 pb-32 pt-6">
        <Outlet />
      </main>

      {/* Bottom navigation */}
      <nav
        className="fixed bottom-0 left-0 right-0 border-t shadow-lg z-40"
        style={{ backgroundColor: '#ffffff', borderColor: 'var(--color-border)' }}
        aria-label="Navegación principal"
      >
        <div className="max-w-4xl mx-auto flex">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `flex-1 flex flex-col items-center justify-center py-3 gap-1 transition-colors min-h-[64px] ${
                isActive
                  ? 'text-[var(--color-azul)] bg-[var(--color-azul-light)]'
                  : 'text-[var(--color-muted)] hover:text-[var(--color-azul)] hover:bg-gray-50'
              }`
            }
            aria-label="Ir al inicio"
          >
            <Home size={24} />
            <span style={{ fontSize: '0.75rem', fontWeight: 600 }}>Inicio</span>
          </NavLink>

          <NavLink
            to="/modulos"
            className={({ isActive }) =>
              `flex-1 flex flex-col items-center justify-center py-3 gap-1 transition-colors min-h-[64px] ${
                isActive || location.pathname.startsWith('/modulo')
                  ? 'text-[var(--color-azul)] bg-[var(--color-azul-light)]'
                  : 'text-[var(--color-muted)] hover:text-[var(--color-azul)] hover:bg-gray-50'
              }`
            }
            aria-label="Ver módulos"
          >
            <BookOpen size={24} />
            <span style={{ fontSize: '0.75rem', fontWeight: 600 }}>Módulos</span>
          </NavLink>

          <NavLink
            to="/asistente"
            className={({ isActive }) =>
              `flex-1 flex flex-col items-center justify-center py-3 gap-1 transition-colors min-h-[64px] ${
                isActive
                  ? 'text-[var(--color-azul)] bg-[var(--color-azul-light)]'
                  : 'text-[var(--color-muted)] hover:text-[var(--color-azul)] hover:bg-gray-50'
              }`
            }
            aria-label="Ir al asistente de IA"
          >
            <Bot size={24} />
            <span style={{ fontSize: '0.75rem', fontWeight: 600 }}>Asistente</span>
          </NavLink>
        </div>
      </nav>
    </div>
  );
}