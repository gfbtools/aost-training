import { useState, useCallback, useEffect } from 'react'

const STORAGE_KEY  = 'aost-progress-v2'
const PROFILE_KEY  = 'aost-profile-v2'
const QUIZ_KEY     = 'aost-quizzes-v2'

const load = (key, fallback = {}) => {
  try { const r = localStorage.getItem(key); return r ? JSON.parse(r) : fallback }
  catch { return fallback }
}
const save = (key, data) => {
  try { localStorage.setItem(key, JSON.stringify(data)) } catch {}
}

export function useProgress() {
  const [progress,  setProgress]  = useState(() => load(STORAGE_KEY))
  const [quizzes,   setQuizzes]   = useState(() => load(QUIZ_KEY))
  const [profile,   setProfile]   = useState(() => load(PROFILE_KEY, null))

  // ── Profile ───────────────────────────────────────────────────────
  const saveProfile = useCallback((data) => {
    save(PROFILE_KEY, data)
    setProfile(data)
  }, [])

  // ── Lessons ───────────────────────────────────────────────────────
  const completeLesson = useCallback((trackId, moduleId, lessonId) => {
    setProgress(prev => {
      const next = {
        ...prev,
        [trackId]: {
          ...(prev[trackId] || {}),
          [moduleId]: {
            ...((prev[trackId] || {})[moduleId] || {}),
            [lessonId]: true,
          },
        },
      }
      save(STORAGE_KEY, next)
      return next
    })
  }, [])

  const isLessonDone    = useCallback((tid, mid, lid) => !!(progress[tid]?.[mid]?.[lid]), [progress])
  const isModuleDone    = useCallback((tid, mod) => mod.lessons.every(l => isLessonDone(tid, mod.id, l.id)), [isLessonDone])

  const moduleProgress  = useCallback((tid, mod) => {
    const done = mod.lessons.filter(l => isLessonDone(tid, mod.id, l.id)).length
    return { done, total: mod.lessons.length, pct: Math.round((done / mod.lessons.length) * 100) }
  }, [isLessonDone])

  const trackProgress   = useCallback((tid, modules) => {
    const all  = modules.flatMap(m => m.lessons.map(l => ({ mid: m.id, lid: l.id })))
    const done = all.filter(({ mid, lid }) => isLessonDone(tid, mid, lid)).length
    return { done, total: all.length, pct: Math.round((done / all.length) * 100) }
  }, [isLessonDone])

  const allLessonsInModuleDone = useCallback((tid, mod) =>
    mod.lessons.every(l => isLessonDone(tid, mod.id, l.id))
  , [isLessonDone])

  // ── Quizzes ───────────────────────────────────────────────────────
  const saveQuizResult  = useCallback((moduleId, score, passed) => {
    setQuizzes(prev => {
      const next = {
        ...prev,
        [moduleId]: { score, passed, completedAt: Date.now() },
      }
      save(QUIZ_KEY, next)
      return next
    })
  }, [])

  const getQuizResult   = useCallback((moduleId) => quizzes[moduleId] || null, [quizzes])
  const isQuizPassed    = useCallback((moduleId) => !!(quizzes[moduleId]?.passed), [quizzes])

  // Universal track completion
  const isUniversalComplete = useCallback((universalModules) => {
    return universalModules.every(m => {
      const lessonsOk = m.lessons.every(l => isLessonDone('universal', m.id, l.id))
      const quizOk = m.hasQuiz ? isQuizPassed(m.id) : true
      return lessonsOk && quizOk
    })
  }, [isLessonDone, isQuizPassed])

  // ── Reset ─────────────────────────────────────────────────────────
  const resetAll = useCallback(() => {
    setProgress({})
    setQuizzes({})
    save(STORAGE_KEY, {})
    save(QUIZ_KEY, {})
  }, [])

  return {
    profile, saveProfile,
    completeLesson, isLessonDone, isModuleDone, moduleProgress, trackProgress,
    allLessonsInModuleDone,
    saveQuizResult, getQuizResult, isQuizPassed,
    isUniversalComplete,
    resetAll,
  }
}
