import React, { useState } from 'react'
import { TRACKS } from '../data/modules.js'
import { QUIZZES } from '../data/quizzes.js'
import { getRoleById } from '../data/roles.js'
import ContentBlocks from './ContentBlocks.jsx'
import QuizModal from './QuizModal.jsx'

export default function LessonView({ trackId, moduleId, lessonId, roleId, prog, onBack, onNext, onModuleComplete }) {
  const { isLessonDone, completeLesson, saveQuizResult, getQuizResult, isQuizPassed } = prog
  const [marking,   setMarking]  = useState(false)
  const [showQuiz,  setShowQuiz] = useState(false)

  const track  = TRACKS[trackId]
  const mod    = track?.modules.find(m => m.id === moduleId)
  const lesson = mod?.lessons.find(l => l.id === lessonId)
  const role   = getRoleById(roleId)

  if (!lesson || !mod) return null

  const done       = isLessonDone(trackId, moduleId, lessonId)
  const allDone    = mod.lessons.every(l => isLessonDone(trackId, moduleId, l.id))
  const quizPassed = mod.hasQuiz ? isQuizPassed(mod.id) : true
  const modDone    = allDone && quizPassed

  const lessonIdx  = mod.lessons.findIndex(l => l.id === lessonId)
  const nextLesson = mod.lessons[lessonIdx + 1]
  const allMods    = track.modules
  const modIdx     = allMods.findIndex(m => m.id === moduleId)
  const nextMod    = allMods[modIdx + 1]

  const accentColor = trackId === 'universal' ? 'var(--teal)' : (role?.color || 'var(--teal)')

  const handleMarkComplete = () => {
    setMarking(true)
    completeLesson(trackId, moduleId, lessonId)
    setTimeout(() => {
      setMarking(false)
      // After marking, check what's next
      const nowAllDone = mod.lessons.every((l, i) => i === lessonIdx ? true : isLessonDone(trackId, moduleId, l.id))
      if (nextLesson) {
        onNext(trackId, moduleId, nextLesson.id)
      } else if (nowAllDone && mod.hasQuiz && !isQuizPassed(mod.id)) {
        setShowQuiz(true)
      } else if (nowAllDone && quizPassed) {
        onModuleComplete(trackId, nextMod?.id || null)
      } else {
        onBack()
      }
    }, 400)
  }

  const handleContinueAfterLesson = () => {
    if (nextLesson) {
      onNext(trackId, moduleId, nextLesson.id)
    } else if (allDone && mod.hasQuiz && !isQuizPassed(mod.id)) {
      setShowQuiz(true)
    } else if (modDone) {
      onModuleComplete(trackId, nextMod?.id || null)
    } else {
      onBack()
    }
  }

  return (
    <div className="page-sm" style={{ padding: '32px 24px 80px' }}>
      {/* Breadcrumb */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 32, flexWrap: 'wrap' }}>
        <button className="btn btn-ghost" style={{ padding: '6px 10px', fontSize: 12 }} onClick={onBack}>
          ← {mod.title}
        </button>
        <span style={{ fontSize: 12, color: 'var(--muted)' }}>›</span>
        <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)' }} className="truncate">{lesson.title}</span>
      </div>

      {/* Lesson header */}
      <div className="fade-up" style={{ marginBottom: 36 }}>
        <div className="label-sm" style={{ color: accentColor, marginBottom: 10 }}>
          {track.title}{mod.levelLabel ? ` · ${mod.levelLabel}` : ''}
        </div>
        <h1 className="display-2" style={{ marginBottom: 12 }}>{lesson.title}</h1>
        {done && <span className="badge badge-green">✓ Completed</span>}
      </div>

      {/* Lesson content */}
      <div className="fade-in">
        <ContentBlocks blocks={lesson.content} />
      </div>

      {/* Bottom action */}
      <div style={{
        marginTop: 52, paddingTop: 28, borderTop: '1px solid var(--border)',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16,
      }}>
        <button className="btn btn-secondary" onClick={onBack}>← Back</button>

        {done ? (
          <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            {allDone && mod.hasQuiz && !isQuizPassed(mod.id) && (
              <button className="btn btn-gold" onClick={() => setShowQuiz(true)}>
                Take Assessment →
              </button>
            )}
            {nextLesson && (
              <button className="btn btn-primary" onClick={handleContinueAfterLesson}>
                Next Lesson →
              </button>
            )}
            {!nextLesson && modDone && (
              <button className="btn btn-primary" onClick={() => onModuleComplete(trackId, nextMod?.id || null)}>
                {nextMod ? 'Next Module →' : 'Complete Track ✓'}
              </button>
            )}
            {!nextLesson && !modDone && mod.hasQuiz && !isQuizPassed(mod.id) && (
              <button className="btn btn-gold" onClick={() => setShowQuiz(true)}>
                Take Module Assessment →
              </button>
            )}
          </div>
        ) : (
          <button
            className="btn btn-primary btn-lg"
            disabled={marking}
            onClick={handleMarkComplete}
            style={{ minWidth: 220 }}
          >
            {marking ? '...' : '✓ Complete & Continue'}
          </button>
        )}
      </div>

      {/* Lesson progress dots */}
      {mod.lessons.length > 1 && (
        <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginTop: 32 }}>
          {mod.lessons.map((l, i) => (
            <div key={l.id} style={{
              width: i === lessonIdx ? 24 : 8, height: 8, borderRadius: 4,
              background: l.id === lessonId
                ? accentColor
                : isLessonDone(trackId, moduleId, l.id) ? '#4ADB8A' : 'rgba(255,255,255,0.10)',
              transition: 'var(--trans)',
            }} />
          ))}
        </div>
      )}

      {/* Quiz Modal */}
      {showQuiz && (
        <QuizModal
          moduleId={mod.id}
          moduleName={mod.title}
          existingResult={getQuizResult(mod.id)}
          onClose={() => {
            setShowQuiz(false)
            if (isQuizPassed(mod.id)) onModuleComplete(trackId, nextMod?.id || null)
          }}
          onPass={saveQuizResult}
        />
      )}
    </div>
  )
}
