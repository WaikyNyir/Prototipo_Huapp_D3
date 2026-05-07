import { useEffect, useState } from 'react';
import { Outlet, NavLink, useNavigate, useLocation } from 'react-router';
import { Home, BookOpen, Bot, ChevronLeft, Plus, Minus, LogOut } from 'lucide-react';
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

  // Close menu on outside click
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

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: 'var(--color-bg)' }}>
      {/* Header */}
      <header
        className="sticky top-0 z-50 shadow-md"
        style={{ backgroundColor: 'var(--color-azul)' }}
      >
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between gap-3">
          {/* Left: Back button or logo */}
          <div className="flex items-center gap-3">
            {!isHome && (
              <button
                onClick={() => navigate(-1)}
                className="flex items-center gap-1 text-white rounded-lg px-2 py-2 transition-colors hover:bg-white/20 min-h-[48px] min-w-[48px] justify-center"
                aria-label="Volver atrás"
              >
                <ChevronLeft size={24} />
                <span className="hidden sm:inline" style={{ fontSize: '0.95rem' }}>Volver</span>
              </button>
            )}
            {isHome && (
              <div className="flex items-center gap-2">
                <span style={{ fontSize: '1.6rem' }}>🏥</span>
                <div>
                  <p className="text-white font-bold" style={{ fontSize: '1rem', lineHeight: 1.2 }}>
                    IA y Salud
                  </p>
                  <p className="text-white/80" style={{ fontSize: '0.75rem' }}>
                    HUAP · Posta Central
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Right: Font size controls + user avatar */}
          <div className="flex items-center gap-2">
            <span className="text-white/80 hidden sm:block" style={{ fontSize: '0.8rem' }}>
              Tamaño:
            </span>
            <button
              onClick={() => setFontSize(progress.fontSizeLevel - 1)}
              disabled={progress.fontSizeLevel === 0}
              className="text-white rounded-lg border border-white/50 px-3 py-2 disabled:opacity-40 hover:bg-white/20 min-h-[44px] min-w-[44px] flex items-center justify-center"
              aria-label="Reducir tamaño de letra"
              title="Reducir letra"
            >
              <Minus size={16} />
            </button>
            <span className="text-white font-bold" style={{ fontSize: '1rem' }}>A</span>
            <button
              onClick={() => setFontSize(progress.fontSizeLevel + 1)}
              disabled={progress.fontSizeLevel === 2}
              className="text-white rounded-lg border border-white/50 px-3 py-2 disabled:opacity-40 hover:bg-white/20 min-h-[44px] min-w-[44px] flex items-center justify-center"
              aria-label="Aumentar tamaño de letra"
              title="Agrandar letra"
            >
              <Plus size={16} />
            </button>

            {/* User avatar button */}
            {user && (
              <div className="relative ml-1">
                <button
                  onClick={e => { e.stopPropagation(); setShowUserMenu(v => !v); }}
                  className="flex items-center justify-center rounded-full border-2 border-white/70 hover:border-white transition-all min-h-[44px] min-w-[44px]"
                  style={{ width: 44, height: 44, backgroundColor: '#e8f0f8', flexShrink: 0 }}
                  aria-label="Menú de usuario"
                  title={user.name}
                >
                  <span style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--color-azul)' }}>
                    {user.avatar}
                  </span>
                </button>

                {/* Dropdown menu */}
                {showUserMenu && (
                  <div
                    className="absolute right-0 top-12 rounded-2xl shadow-xl py-3 z-50"
                    style={{
                      backgroundColor: 'white',
                      border: '1.5px solid var(--color-border)',
                      minWidth: 220,
                    }}
                    onClick={e => e.stopPropagation()}
                  >
                    <div className="px-4 pb-3 border-b" style={{ borderColor: 'var(--color-border)' }}>
                      <div className="flex items-center gap-3">
                        <div
                          className="rounded-full flex items-center justify-center shrink-0"
                          style={{ width: 42, height: 42, backgroundColor: 'var(--color-azul-light)', border: '2px solid var(--color-azul)' }}
                        >
                          <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--color-azul)' }}>
                            {user.avatar}
                          </span>
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
            )}
          </div>
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