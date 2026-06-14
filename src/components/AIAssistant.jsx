import React, { useState, useRef, useEffect } from 'react'

// Replace with your deployed Cloudflare Worker URL
const WORKER_URL = import.meta.env.VITE_AI_WORKER_URL || 'https://aost-training-ai.YOUR-SUBDOMAIN.workers.dev'

export default function AIAssistant({ profile, currentTrack, currentModule }) {
  const [open,     setOpen]     = useState(false)
  const [messages, setMessages] = useState([])
  const [input,    setInput]    = useState('')
  const [loading,  setLoading]  = useState(false)
  const [error,    setError]    = useState(null)
  const bottomRef  = useRef(null)
  const inputRef   = useRef(null)

  // Scroll to bottom on new messages
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  // Focus input when opened
  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 100)
  }, [open])

  // Initial greeting when chat opens with no messages
  const initialGreeting = profile
    ? `Hi ${profile.name.split(' ')[0]}! I'm your AOST Training Assistant. Ask me anything about what you're learning — procedures, compliance, patient care, or how things work at our practice. I can also quiz you on what you've covered.`
    : `Hi! I'm your AOST Training Assistant. Ask me about oral surgery practice, patient care, compliance, or anything from your training.`

  const sendMessage = async () => {
    const text = input.trim()
    if (!text || loading) return

    const userMsg = { role: 'user', content: text }
    const newMessages = [...messages, userMsg]
    setMessages(newMessages)
    setInput('')
    setLoading(true)
    setError(null)

    try {
      const res = await fetch(WORKER_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: newMessages,
          context: {
            name:    profile?.name,
            role:    profile?.roleId,
            loc:     profile?.location,
            track:   currentTrack,
            module:  currentModule,
            mode:    profile?.roleId ? 'training' : 'quick-ask',
          },
        }),
      })

      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const data = await res.json()
      const reply = data.content?.[0]?.text || data.reply || 'I\'m having trouble responding right now.'
      setMessages(m => [...m, { role: 'assistant', content: reply }])
    } catch (e) {
      setError('Connection issue. Make sure the AI worker is deployed.')
    } finally {
      setLoading(false)
    }
  }

  const handleKey = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage() }
  }

  return (
    <>
      {/* Floating toggle button */}
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          position: 'fixed', bottom: 28, right: 28, zIndex: 90,
          width: 56, height: 56, borderRadius: '50%',
          background: open ? 'var(--navy2)' : 'var(--teal)',
          border: `1px solid ${open ? 'var(--border2)' : 'var(--teal2)'}`,
          cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 4px 20px rgba(0,0,0,0.4)',
          transition: 'var(--trans)',
          fontSize: 22,
        }}
        title="AI Training Assistant"
      >
        {open ? '✕' : '🤖'}
      </button>

      {/* Chat panel */}
      {open && (
        <div className="scale-in" style={{
          position: 'fixed', bottom: 96, right: 28, zIndex: 90,
          width: 380, maxWidth: 'calc(100vw - 56px)',
          height: 520, maxHeight: 'calc(100vh - 120px)',
          background: 'var(--navy2)',
          border: '1px solid var(--border2)',
          borderRadius: 18,
          boxShadow: 'var(--shadow-lg)',
          display: 'flex', flexDirection: 'column',
          overflow: 'hidden',
        }}>
          {/* Header */}
          <div style={{
            padding: '16px 20px', borderBottom: '1px solid var(--border)',
            display: 'flex', alignItems: 'center', gap: 12,
            background: 'var(--navy3)',
          }}>
            <div style={{
              width: 36, height: 36, borderRadius: '50%',
              background: 'linear-gradient(135deg, var(--teal), var(--blue))',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 18, flexShrink: 0,
            }}>🤖</div>
            <div>
              <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--white)' }}>
                AOST Training Assistant
              </div>
              <div style={{ fontSize: 11, color: 'var(--teal)' }}>
                Powered by AI · Ask anything
              </div>
            </div>
          </div>

          {/* Messages */}
          <div style={{
            flex: 1, overflowY: 'auto', padding: '16px 16px 8px',
            display: 'flex', flexDirection: 'column', gap: 12,
          }}>
            {/* Greeting */}
            <Bubble role="assistant" text={initialGreeting} />

            {messages.map((m, i) => (
              <Bubble key={i} role={m.role} text={m.content} />
            ))}

            {loading && (
              <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                <div style={{
                  width: 36, height: 36, borderRadius: '50%',
                  background: 'rgba(14,124,123,0.2)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, flexShrink: 0,
                }}>🤖</div>
                <div style={{
                  background: 'var(--navy3)', border: '1px solid var(--border)',
                  borderRadius: '4px 14px 14px 14px', padding: '10px 14px',
                  display: 'flex', gap: 5, alignItems: 'center',
                }}>
                  {[0,1,2].map(i => (
                    <div key={i} style={{
                      width: 6, height: 6, borderRadius: '50%',
                      background: 'var(--teal)',
                      animation: 'pulse 1.2s ease infinite',
                      animationDelay: `${i * 0.2}s`,
                    }} />
                  ))}
                </div>
              </div>
            )}

            {error && (
              <div style={{
                background: 'rgba(139,26,26,0.15)', border: '1px solid rgba(139,26,26,0.4)',
                borderRadius: 8, padding: '10px 14px', fontSize: 12, color: '#FF7A7A',
              }}>
                {error}
              </div>
            )}

            <div ref={bottomRef} />
          </div>

          {/* Suggested prompts if no messages */}
          {messages.length === 0 && (
            <div style={{ padding: '0 12px 8px', display: 'flex', gap: 6, flexWrap: 'wrap' }}>
              {[
                'Quiz me on HIPAA',
                'Explain dual insurance billing',
                'What makes OMS different from dentistry?',
              ].map(prompt => (
                <button key={prompt}
                  onClick={() => { setInput(prompt); setTimeout(() => inputRef.current?.focus(), 50) }}
                  style={{
                    background: 'rgba(14,124,123,0.12)', border: '1px solid rgba(14,124,123,0.25)',
                    borderRadius: 20, padding: '5px 12px', fontSize: 11,
                    color: 'var(--teal)', cursor: 'pointer', whiteSpace: 'nowrap',
                  }}
                >
                  {prompt}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <div style={{
            padding: '12px 14px',
            borderTop: '1px solid var(--border)',
            background: 'var(--navy3)',
            display: 'flex', gap: 10, alignItems: 'flex-end',
          }}>
            <textarea
              ref={inputRef}
              className="input"
              placeholder="Ask anything about your training..."
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKey}
              rows={1}
              style={{
                flex: 1, resize: 'none', minHeight: 38, maxHeight: 100,
                padding: '9px 13px', lineHeight: 1.5, fontSize: 13,
              }}
            />
            <button
              className="btn btn-primary btn-sm"
              onClick={sendMessage}
              disabled={!input.trim() || loading}
              style={{ height: 38, borderRadius: 8, padding: '0 16px' }}
            >
              ↑
            </button>
          </div>
        </div>
      )}
    </>
  )
}

function Bubble({ role, text }) {
  const isUser = role === 'user'
  return (
    <div style={{
      display: 'flex', gap: 10, alignItems: 'flex-start',
      flexDirection: isUser ? 'row-reverse' : 'row',
    }}>
      {!isUser && (
        <div style={{
          width: 28, height: 28, borderRadius: '50%', flexShrink: 0,
          background: 'rgba(14,124,123,0.25)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14,
        }}>🤖</div>
      )}
      <div style={{
        maxWidth: '80%',
        background: isUser ? 'var(--teal)' : 'var(--navy3)',
        border: isUser ? 'none' : '1px solid var(--border)',
        borderRadius: isUser ? '14px 4px 14px 14px' : '4px 14px 14px 14px',
        padding: '10px 14px',
        fontSize: 13, lineHeight: 1.6,
        color: 'rgba(255,255,255,0.88)',
        whiteSpace: 'pre-wrap',
      }}>
        {text}
      </div>
    </div>
  )
}
