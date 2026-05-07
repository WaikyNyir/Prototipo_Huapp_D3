import { useState, useCallback } from 'react';

export interface QuizResult {
  score: number;
  total: number;
  passed: boolean;
  attempts: number;
  completedAt: string;
}

export interface ProgressState {
  completedLessons: string[];
  quizResults: Record<string, QuizResult>;
  earnedBadges: string[];
  module1QuizPassed: boolean;
  fontSizeLevel: number; // 0=normal, 1=large, 2=extra-large
}

const STORAGE_KEY = 'ia-salud-progress';
const BASE_FONT_SIZE = 16;

function loadProgress(): ProgressState {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) return JSON.parse(saved);
  } catch {}
  return {
    completedLessons: [],
    quizResults: {},
    earnedBadges: [],
    module1QuizPassed: false,
    fontSizeLevel: 1, // default to large (18px)
  };
}

function saveProgress(state: ProgressState) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {}
}

export function useProgress() {
  const [progress, setProgress] = useState<ProgressState>(loadProgress);

  const updateProgress = useCallback((updater: (prev: ProgressState) => ProgressState) => {
    setProgress(prev => {
      const next = updater(prev);
      saveProgress(next);
      return next;
    });
  }, []);

  const markLessonComplete = useCallback((lessonId: string) => {
    updateProgress(prev => ({
      ...prev,
      completedLessons: prev.completedLessons.includes(lessonId)
        ? prev.completedLessons
        : [...prev.completedLessons, lessonId],
    }));
  }, [updateProgress]);

  const saveQuizResult = useCallback((quizId: string, score: number, total: number) => {
    const passed = score >= Math.ceil(total * 0.7);
    updateProgress(prev => {
      const existing = prev.quizResults[quizId];
      const newAttempts = (existing?.attempts ?? 0) + 1;
      const newResult: QuizResult = {
        score,
        total,
        passed,
        attempts: newAttempts,
        completedAt: new Date().toISOString(),
      };

      // Check if this is module 1 final quiz
      const isModule1Quiz = quizId === 'module-1-final';
      const newBadges = [...prev.earnedBadges];
      
      // Award module badges
      if (passed) {
        if (quizId === 'module-1-final' && !newBadges.includes('badge-1')) {
          newBadges.push('badge-1');
        }
        if (quizId === 'module-2-final' && !newBadges.includes('badge-2')) {
          newBadges.push('badge-2');
        }
      }

      return {
        ...prev,
        quizResults: { ...prev.quizResults, [quizId]: newResult },
        earnedBadges: newBadges,
        module1QuizPassed: isModule1Quiz && passed ? true : prev.module1QuizPassed,
      };
    });
  }, [updateProgress]);

  const isLessonCompleted = useCallback((lessonId: string) => {
    return progress.completedLessons.includes(lessonId);
  }, [progress.completedLessons]);

  const getModuleProgress = useCallback((moduleId: number, totalLessons: number) => {
    const completed = progress.completedLessons.filter(id => id.startsWith(`${moduleId}-`)).length;
    return { completed, total: totalLessons, percentage: totalLessons > 0 ? Math.round((completed / totalLessons) * 100) : 0 };
  }, [progress.completedLessons]);

  const getTotalProgress = useCallback(() => {
    const total = 12; // 6 + 6 lessons
    const completed = progress.completedLessons.filter(id => !id.startsWith('3-')).length;
    return { completed, total, percentage: Math.round((completed / total) * 100) };
  }, [progress.completedLessons]);

  const setFontSize = useCallback((level: number) => {
    const clampedLevel = Math.max(0, Math.min(2, level));
    const sizes = [16, 18, 22];
    document.documentElement.style.setProperty('--font-size', `${sizes[clampedLevel]}px`);
    updateProgress(prev => ({ ...prev, fontSizeLevel: clampedLevel }));
  }, [updateProgress]);

  // Apply font size on mount
  const applyFontSize = useCallback(() => {
    const sizes = [16, 18, 22];
    const level = progress.fontSizeLevel ?? 1;
    document.documentElement.style.setProperty('--font-size', `${sizes[level]}px`);
  }, [progress.fontSizeLevel]);

  const resetProgress = useCallback(() => {
    const empty: ProgressState = {
      completedLessons: [],
      quizResults: {},
      earnedBadges: [],
      module1QuizPassed: false,
      fontSizeLevel: 1,
    };
    saveProgress(empty);
    setProgress(empty);
  }, []);

  return {
    progress,
    markLessonComplete,
    saveQuizResult,
    isLessonCompleted,
    getModuleProgress,
    getTotalProgress,
    setFontSize,
    applyFontSize,
    resetProgress,
  };
}
