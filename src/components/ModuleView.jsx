import React, { useState } from 'react'
import { TRACKS } from '../data/modules.js'
import { getRoleById } from '../data/roles.js'
import QuizModal from './QuizModal.jsx'

export default function ModuleView({ trackId, moduleId, roleId, prog, onSelectLesson, onBack }) {
  const { isLessonDone, moduleProgress, isQuizPassed, getQuizResult, saveQuizResult } = prog
  const [showQuiz, setShowQuiz] = useState(false)

  const track = TRACKS[trackId]
  const mod   = track?.modules.find(m => m.id === moduleId)
  const role  = getRoleById(roleId)

  if (!mod) return null

  const mp          = moduleProgress(trackId, mod)
  const allDone     = mod.lessons.every(l => isLessonDone(trackId, moduleId, l.id))
  const qPassed     = mod.hasQuiz ? isQuizPassed(mod.id) : true
  const fullyDone   = allDone && qPassed
  const quizReady   = allDone && mod.hasQuiz && !qPassed
  const accentColor = trackId === 'universal' ? 'var(--teal)' : (role?.color || 'var(--teal)')

  return (
    <div className="page-sm" style={{ padding: '32px 24px 64px' }}>
      {/* Back */}
      <button className="btn btn-ghost" style={{ marginBottom: 28, fontSize: 12 }} onClick={onBack}>
        ← My Training Path
      </button>

      {/* Module header */}
      <div className="fade-up" style={{ marginBottom: 36 }}>
        <div className="label-sm" style={{ color: accentColor, marginBottom: 10 }}>
          {track.title}{mod.levelLabel ? ` · ${mod.levelLabel}` : ''}
        </div>
        <h1 className="display-2" style={{ marginBottom: 16 }}>{mod.title}</h1>

        {/* Progress */}
        <div style={{
          background: 'var(--navy2)', border: '1px solid var(--border)',
          borderRadius: 10, padding: '14px 18px', display: 'flex', alignItems: 'center', gap: 16,
        }}>
          <div style={{ flex: 1 }}>
            <div className="progress-track">
              <div className="progress-fill" style={{ width: `${mp.pct}%` }} />
            </div>
          </div>
          <span style={{ fontSize: 12, color: 'var(--muted)', flexShrink: 0 }}>
            {mp.done}/{mp.total} lessons
          </span>
          {mod.hasQuiz && (
            <span style={{ fontSize: 12, color: qPassed ? '#4ADB8A' : 'var(--muted)', flexShrink: 0 }}>
              {qPassed ? '✓ Assessment passed' : 'Assessment required'}
            </span>
          )}
          {fullyDone && <span className="badge badge-green">Complete</span>}
        </div>
      </div>

      {/* Lessons */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 24 }}>
        {mod.lessons.map((lesson, i) => {
          const done      = isLessonDone(trackId, moduleId, lesson.id)
          const prevDone  = i === 0 || isLessonDone(trackId, moduleId, mod.lessons[i - 1].id)
          const canAccess = prevDone

          return (
            <button key={lesson.id}
              onClick={() => canAccess && onSelectLesson(trackId, moduleId, lesson.id)}
              style={{
                background: done ? 'rgba(26,122,74,0.08)' : 'var(--navy2)',
                border: `1px solid ${done ? 'rgba(74,219,138,0.2)' : 'var(--border)'}`,
                borderLeft: `3px solid ${done ? '#4ADB8A' : canAccess ? accentColor : 'rgba(255,255,255,0.08)'}`,
                borderRadius: 10, padding: '18px 22px', textAlign: 'left',
                cursor: canAccess ? 'pointer' : 'not-allowed',
                opacity: canAccess ? 1 : 0.5, transition: 'var(--trans)',
                display: 'flex', alignItems: 'center', gap: 18,
              }}
              onMouseEnter={e => canAccess && !done && (e.currentTarget.style.transform = 'translateX(3px)')}
              onMouseLeave={e => (e.currentTarget.style.transform = 'none')}
            >
              <div style={{
                width: 36, height: 36, borderRadius: '50%', flexShrink: 0,
                background: done ? '#1A7A4A' : `${accentColor}22`,
                border: `1px solid ${done ? 'rgba(74,219,138,0.4)' : `${accentColor}44`}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 14, fontWeight: 700,
                color: done ? '#4ADB8A' : canAccess ? 'var(--white)' : 'var(--muted)',
              }}>
                {done ? '✓' : canAccess ? i + 1 : '🔒'}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 15, fontWeight: 600, color: 'var(--white)', marginBottom: 3 }}>
                  {lesson.title}
                </div>
                <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.3)' }}>
                  {lesson.content.length} sections
                </div>
              </div>
              {done
                ? <span className="badge badge-green">Done</span>
                : canAccess && <span style={{ fontSize: 16, color: 'var(--muted)' }}>→</span>
              }
            </button>
          )
        })}
      </div>

      {/* Quiz CTA */}
      {quizReady && (
        <div style={{
          background: 'rgba(200,146,42,0.10)', border: '1px solid rgba(200,146,42,0.3)',
          borderRadius: 12, padding: '20px 24px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16,
        }}>
          <div>
            <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--lgold)', marginBottom: 4 }}>
              Module Assessment Ready
            </div>
            <div className="body-sm">
              You've completed all lessons. Take the assessment to advance.
            </div>
          </div>
          <button className="btn btn-gold" onClick={() => setShowQuiz(true)}>
            Start Assessment →
          </button>
        </div>
      )}

      {showQuiz && (
        <QuizModal
          moduleId={mod.id}
          moduleName={mod.title}
          existingResult={getQuizResult(mod.id)}
          onClose={() => setShowQuiz(false)}
          onPass={saveQuizResult}
        />
      )}
    </div>
  )
}
