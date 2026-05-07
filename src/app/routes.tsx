import { createBrowserRouter } from 'react-router';
import { Root } from './components/Root';
import { Dashboard } from './components/Dashboard';
import { ModulesListPage } from './components/ModulesListPage';
import { ModulePage } from './components/ModulePage';
import { LessonPage } from './components/LessonPage';
import { ModuleQuizPage } from './components/ModuleQuizPage';
import { AIAssistantPage } from './components/AIAssistantPage';

function NotFound() {
  return (
    <div className="flex flex-col items-center gap-4 py-12 text-center">
      <span style={{ fontSize: '3rem' }}>🔍</span>
      <h1 style={{ color: 'var(--color-azul)' }}>Página no encontrada</h1>
      <a href="/" style={{ color: 'var(--color-azul)', fontSize: '1rem' }}>
        Volver al inicio
      </a>
    </div>
  );
}

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Root,
    children: [
      { index: true, Component: Dashboard },
      { path: 'modulos', Component: ModulesListPage },
      { path: 'modulo/:moduleId', Component: ModulePage },
      { path: 'modulo/:moduleId/leccion/:lessonId', Component: LessonPage },
      { path: 'modulo/:moduleId/quiz', Component: ModuleQuizPage },
      { path: 'asistente', Component: AIAssistantPage },
      { path: '*', Component: NotFound },
    ],
  },
]);
