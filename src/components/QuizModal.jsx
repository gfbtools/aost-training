import React, { useState } from 'react'
import { QUIZZES } from '../data/quizzes.js'

export default function QuizModal({ moduleId, moduleName, onClose, onPass, existingResult }) {
  const quiz = QUIZZES[moduleId]
  const [answers,  setAnswers]  = useState({})
  const [submitted, setSubmit]  = useState(false)
  const [result,   setResult]   = useState(existingResult || null)

  if (!quiz) return null

  const totalQ    = quiz.questions.length
  const answered  = Object.keys(answers).length
  const allDone   = answered === totalQ

  const handleSubmit = () => {
    let correct = 0
    quiz.questions.forEach((q, i) => { if (answers[i] === q.correct) correct++ })
    const score  = Math.round((correct / totalQ) * 100)
    const passed = score >= quiz.passPct
    const res    = { score, passed, correct, total: totalQ }
    setResult(res)
    setSubmit(true)
    onPass(moduleId, score, passed)
  }

  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal-box" style={{ maxWidth: 620, maxHeight: '90vh', overflowY: 'auto' }}>
        {/* Header */}
        <div style={{ marginBottom: 28 }}>
          <div className="label-sm" style={{ marginBottom: 8 }}>Module Assessment</div>
          <h2 className="heading-1" style={{ marginBottom: 4 }}>{quiz.title}</h2>
          {!submitted && (
            <p className="body-sm">
              {totalQ} questions · {quiz.passPct}% to pass
              {quiz.passPct === 100 && ' · All correct required'}
            </p>
          )}
        </div>

        {/* Results view */}
        {submitted && result && (
          <div className="scale-in">
            <div style={{
              textAlign: 'center', padding: '28px 0 24px',
              borderBottom: '1px solid var(--border)', marginBottom: 24,
            }}>
              <div style={{
                fontSize: 64, fontWeight: 800,
                color: result.passed ? '#4ADB8A' : '#FF7A7A',
                fontFamily: "'Playfair Display', serif",
                lineHeight: 1,
              }}>
                {result.score}%
              </div>
              <div style={{
                fontSize: 18, fontWeight: 700, marginTop: 12,
                color: result.passed ? '#4ADB8A' : '#FF7A7A',
              }}>
                {result.passed ? '✓ Passed' : '✗ Not Yet'}
              </div>
              <div className="body-sm" style={{ marginTop: 8 }}>
                {result.correct} of {result.total} correct · {quiz.passPct}% required
              </div>
            </div>

            {/* Answer review */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24 }}>
              {quiz.questions.map((q, i) => {
                const userAns  = answers[i]
                const isRight  = userAns === q.correct
                return (
                  <div key={i} style={{
                    background: isRight ? 'rgba(26,122,74,0.10)' : 'rgba(139,26,26,0.10)',
                    border: `1px solid ${isRight ? 'rgba(74,219,138,0.3)' : 'rgba(255,122,122,0.3)'}`,
                    borderRadius: 10, padding: '14px 16px',
                  }}>
                    <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--white)', marginBottom: 8 }}>
                      {i + 1}. {q.q}
                    </div>
                    <div style={{ fontSize: 12, color: isRight ? '#4ADB8A' : '#FF7A7A', marginBottom: 4 }}>
                      {isRight ? '✓' : '✗'} Your answer: {q.options[userAns] ?? 'Not answered'}
                    </div>
                    {!isRight && (
                      <div style={{ fontSize: 12, color: '#4ADB8A', marginBottom: 6 }}>
                        ✓ Correct: {q.options[q.correct]}
                      </div>
                    )}
                    <div style={{
                      fontSize: 12, color: 'rgba(255,255,255,0.5)',
                      borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: 8, marginTop: 4,
                      fontStyle: 'italic',
                    }}>
                      {q.explanation}
                    </div>
                  </div>
                )
              })}
            </div>

            <div style={{ display: 'flex', gap: 12 }}>
              {!result.passed && (
                <button
                  className="btn btn-secondary"
                  style={{ flex: 1 }}
                  onClick={() => { setAnswers({}); setSubmit(false); setResult(null) }}
                >
                  Retake Quiz
                </button>
              )}
              <button
                className="btn btn-primary"
                style={{ flex: 1 }}
                onClick={onClose}
              >
                {result.passed ? 'Continue →' : 'Close'}
              </button>
            </div>
          </div>
        )}

        {/* Question view */}
        {!submitted && (
          <>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 24, marginBottom: 28 }}>
              {quiz.questions.map((q, qi) => (
                <div key={qi}>
                  <div style={{
                    fontSize: 14, fontWeight: 600, color: 'var(--white)',
                    marginBottom: 12, lineHeight: 1.5,
                  }}>
                    <span style={{ color: 'var(--teal)', marginRight: 8, fontWeight: 700 }}>
                      {qi + 1}.
                    </span>
                    {q.q}
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {q.options.map((opt, oi) => (
                      <button
                        key={oi}
                        onClick={() => setAnswers(a => ({ ...a, [qi]: oi }))}
                        style={{
                          background: answers[qi] === oi
                            ? 'rgba(14,124,123,0.20)'
                            : 'var(--faint)',
                          border: `1px solid ${answers[qi] === oi ? 'var(--teal)' : 'var(--border)'}`,
                          borderRadius: 8, padding: '11px 16px',
                          textAlign: 'left', cursor: 'pointer', transition: 'var(--trans)',
                          display: 'flex', alignItems: 'center', gap: 12,
                        }}
                      >
                        <div style={{
                          width: 20, height: 20, borderRadius: '50%', flexShrink: 0,
                          border: `2px solid ${answers[qi] === oi ? 'var(--teal)' : 'rgba(255,255,255,0.2)'}`,
                          background: answers[qi] === oi ? 'var(--teal)' : 'transparent',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                        }}>
                          {answers[qi] === oi && (
                            <div style={{ width: 7, height: 7, borderRadius: '50%', background: 'white' }} />
                          )}
                        </div>
                        <span style={{ fontSize: 13, color: answers[qi] === oi ? 'var(--white)' : 'rgba(255,255,255,0.7)' }}>
                          {opt}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Progress indicator */}
            <div style={{ marginBottom: 20 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: 'var(--muted)', marginBottom: 6 }}>
                <span>{answered} of {totalQ} answered</span>
                {!allDone && <span>Answer all questions to submit</span>}
              </div>
              <div className="progress-track">
                <div className="progress-fill" style={{ width: `${(answered / totalQ) * 100}%` }} />
              </div>
            </div>

            <div style={{ display: 'flex', gap: 12 }}>
              <button className="btn btn-secondary" onClick={onClose}>Cancel</button>
              <button
                className="btn btn-primary"
                style={{ flex: 1 }}
                disabled={!allDone}
                onClick={handleSubmit}
              >
                Submit Assessment
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
