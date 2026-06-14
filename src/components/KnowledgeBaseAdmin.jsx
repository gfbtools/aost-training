import React, { useState, useEffect, useCallback } from 'react'

// Configure via .env: VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY

const CATEGORIES = [
  { id: 'scheduling',        label: 'Scheduling & Surgical Calendar' },
  { id: 'insurance',         label: 'Insurance & Billing' },
  { id: 'referrals',         label: 'Referral Network' },
  { id: 'financial',         label: 'Financial Presentation' },
  { id: 'surgical-setup',    label: 'Surgical Suite & Preference Cards' },
  { id: 'sedation',          label: 'Sedation Protocols' },
  { id: 'sterilization',     label: 'Sterilization Equipment' },
  { id: 'hr-policies',       label: 'HR & Personnel' },
  { id: 'location-specific', label: 'Location-Specific Information' },
  { id: 'software-systems',  label: 'Software & Systems' },
  { id: 'general',           label: 'General Operations' },
]

const LOCATIONS = ['All Locations', 'Tampa', "Land O'Lakes", 'Wesley Chapel', 'Valrico']

async function sb(path, opts = {}) {
  if (!SUPABASE_URL || !SUPABASE_KEY) throw new Error('Supabase not configured')
  const res = await fetch(`${SUPABASE_URL}/rest/v1/${path}`, {
    ...opts,
    headers: {
      apikey: SUPABASE_KEY,
      Authorization: `Bearer ${SUPABASE_KEY}`,
      'Content-Type': 'application/json',
      Prefer: opts.prefer || 'return=representation',
      ...opts.headers,
    },
  })
  if (!res.ok) throw new Error(await res.text())
  const text = await res.text()
  return text ? JSON.parse(text) : null
}

export default function KnowledgeBaseAdmin({ onClose }) {
  const [tab, setTab] = useState('pending') // pending | entries | add
  const [pending, setPending] = useState([])
  const [entries,  setEntries] = useState([])
  const [loading,  setLoading] = useState(true)
  const [error,    setError]   = useState(null)
  const [configured, setConfigured] = useState(!!(SUPABASE_URL && SUPABASE_KEY))

  const load = useCallback(async () => {
    if (!configured) { setLoading(false); return }
    setLoading(true)
    setError(null)
    try {
      const [pendingRes, entriesRes] = await Promise.all([
        sb('kb_unanswered_log?status=eq.pending&order=asked_at.desc&limit=50'),
        sb('kb_entries?order=documented_at.desc&limit=100'),
      ])
      setPending(pendingRes || [])
      setEntries(entriesRes || [])
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }, [configured])

  useEffect(() => { load() }, [load])

  if (!configured) {
    return (
      <div className="modal-overlay">
        <div className="modal-box" style={{ maxWidth: 480 }}>
          <button onClick={onClose} className="btn btn-ghost btn-sm" style={{ float: 'right', marginTop: -8 }}>✕</button>
          <div className="label-sm" style={{ marginBottom: 10 }}>Knowledge Base</div>
          <h2 className="heading-1" style={{ marginBottom: 16 }}>Not Yet Connected</h2>
          <p className="body-md" style={{ marginBottom: 16 }}>
            The institutional knowledge base requires Supabase. Add these to your <code>.env</code> file:
          </p>
          <pre style={{
            background: 'var(--navy3)', border: '1px solid var(--border)',
            borderRadius: 8, padding: '12px 16px', fontSize: 12, color: 'var(--teal)',
            overflowX: 'auto',
          }}>
{`VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key`}
          </pre>
          <p className="body-sm" style={{ marginTop: 12 }}>
            See <code>supabase/knowledge_base_schema.sql</code> for the database setup script.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="modal-overlay" style={{ alignItems: 'flex-start', paddingTop: 40 }}>
      <div className="modal-box" style={{ maxWidth: 920, width: '100%', maxHeight: '85vh', overflowY: 'auto' }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24 }}>
          <div>
            <div className="label-sm" style={{ marginBottom: 8 }}>The Institutional Knowledge Base</div>
            <h2 className="display-2">Virtual Knowledge Manager</h2>
            <p className="body-sm" style={{ marginTop: 6 }}>
              Review questions the AI couldn't answer, and document the answers AOST's team needs.
            </p>
          </div>
          <button onClick={onClose} className="btn btn-ghost">✕ Close</button>
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 24, borderBottom: '1px solid var(--border)' }}>
          {[
            { id: 'pending', label: `Pending Questions${pending.length ? ` (${pending.length})` : ''}` },
            { id: 'entries', label: `Documented Answers (${entries.length})` },
            { id: 'add',     label: '+ Add New Entry' },
          ].map(t => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              style={{
                background: 'none', border: 'none', cursor: 'pointer',
                padding: '10px 16px', fontSize: 13, fontWeight: 600,
                color: tab === t.id ? 'var(--teal)' : 'var(--muted)',
                borderBottom: tab === t.id ? '2px solid var(--teal)' : '2px solid transparent',
                marginBottom: -1,
              }}
            >
              {t.label}
            </button>
          ))}
        </div>

        {error && (
          <div style={{
            background: 'rgba(139,26,26,0.10)', border: '1px solid rgba(139,26,26,0.3)',
            borderRadius: 8, padding: '12px 16px', marginBottom: 16, fontSize: 13, color: '#FF7A7A',
          }}>
            {error}
          </div>
        )}

        {loading ? (
          <div style={{ textAlign: 'center', padding: 40 }}><div className="spinner" style={{ margin: '0 auto' }} /></div>
        ) : (
          <>
            {tab === 'pending' && <PendingTab pending={pending} onReload={load} />}
            {tab === 'entries' && <EntriesTab entries={entries} onReload={load} />}
            {tab === 'add'     && <AddEntryTab onReload={load} onDone={() => setTab('entries')} />}
          </>
        )}
      </div>
    </div>
  )
}

// ── PENDING QUESTIONS TAB ────────────────────────────────────────────────
function PendingTab({ pending, onReload }) {
  const [answering, setAnswering] = useState(null)

  if (pending.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '40px 20px', color: 'var(--muted)' }}>
        No pending questions. When team members ask the AI assistant something AOST-specific
        that isn't documented yet, it shows up here.
      </div>
    )
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      {pending.map(q => (
        <div key={q.id} style={{
          background: 'var(--navy3)', border: '1px solid var(--border)',
          borderRadius: 10, padding: '16px 20px',
        }}>
          <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--white)', marginBottom: 8 }}>
            "{q.question}"
          </div>
          <div style={{ fontSize: 12, color: 'var(--muted)', marginBottom: 12, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            {q.asked_by_name && <span>Asked by: {q.asked_by_name}</span>}
            {q.asked_by_role && <span>· {q.asked_by_role}</span>}
            {q.asked_by_location && <span>· {q.asked_by_location}</span>}
            <span>· {new Date(q.asked_at).toLocaleDateString()}</span>
            {q.context && <span>· During: {q.context}</span>}
          </div>

          {answering === q.id ? (
            <AnswerForm
              question={q}
              onCancel={() => setAnswering(null)}
              onSaved={() => { setAnswering(null); onReload() }}
            />
          ) : (
            <div style={{ display: 'flex', gap: 8 }}>
              <button className="btn btn-primary btn-sm" onClick={() => setAnswering(q.id)}>
                Document Answer
              </button>
              <button
                className="btn btn-secondary btn-sm"
                onClick={async () => {
                  await sb(`kb_unanswered_log?id=eq.${q.id}`, {
                    method: 'PATCH',
                    prefer: 'return=minimal',
                    body: JSON.stringify({ status: 'dismissed' }),
                  })
                  onReload()
                }}
              >
                Dismiss
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

// ── ANSWER FORM (used inline within pending) ─────────────────────────────
function AnswerForm({ question, onCancel, onSaved }) {
  const [category, setCategory] = useState('general')
  const [location, setLocation] = useState('All Locations')
  const [answer,   setAnswer]   = useState('')
  const [docBy,    setDocBy]    = useState('')
  const [saving,   setSaving]   = useState(false)

  const handleSave = async () => {
    if (!answer.trim() || !docBy.trim()) return
    setSaving(true)
    try {
      const newEntry = await sb('kb_entries', {
        method: 'POST',
        body: JSON.stringify({
          category_id: category,
          location: location === 'All Locations' ? null : location,
          question: question.question,
          answer: answer.trim(),
          documented_by: docBy.trim(),
        }),
      })
      // Mark the pending question as answered and link it
      await sb(`kb_unanswered_log?id=eq.${question.id}`, {
        method: 'PATCH',
        prefer: 'return=minimal',
        body: JSON.stringify({
          status: 'answered',
          resolved_kb_entry_id: newEntry?.[0]?.id,
          resolved_at: new Date().toISOString(),
        }),
      })
      onSaved()
    } catch (e) {
      alert('Error saving: ' + e.message)
    } finally {
      setSaving(false)
    }
  }

  return (
    <div style={{ borderTop: '1px solid var(--border)', paddingTop: 14, marginTop: 4 }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 10 }}>
        <div>
          <label className="label-sm" style={{ display: 'block', marginBottom: 5 }}>Category</label>
          <select className="input" value={category} onChange={e => setCategory(e.target.value)}>
            {CATEGORIES.map(c => <option key={c.id} value={c.id}>{c.label}</option>)}
          </select>
        </div>
        <div>
          <label className="label-sm" style={{ display: 'block', marginBottom: 5 }}>Location</label>
          <select className="input" value={location} onChange={e => setLocation(e.target.value)}>
            {LOCATIONS.map(l => <option key={l} value={l}>{l}</option>)}
          </select>
        </div>
      </div>
      <label className="label-sm" style={{ display: 'block', marginBottom: 5 }}>The Answer</label>
      <textarea
        className="input"
        placeholder="Document the actual AOST protocol or answer here..."
        value={answer}
        onChange={e => setAnswer(e.target.value)}
        style={{ height: 90, marginBottom: 10, fontSize: 13 }}
      />
      <label className="label-sm" style={{ display: 'block', marginBottom: 5 }}>Documented By</label>
      <input
        className="input"
        placeholder="e.g. Practice Administrator, Lead Surgical Assistant"
        value={docBy}
        onChange={e => setDocBy(e.target.value)}
        style={{ marginBottom: 12 }}
      />
      <div style={{ display: 'flex', gap: 8 }}>
        <button className="btn btn-secondary btn-sm" onClick={onCancel}>Cancel</button>
        <button className="btn btn-primary btn-sm" disabled={saving || !answer.trim() || !docBy.trim()} onClick={handleSave}>
          {saving ? 'Saving...' : 'Save to Knowledge Base'}
        </button>
      </div>
    </div>
  )
}

// ── DOCUMENTED ENTRIES TAB ────────────────────────────────────────────────
function EntriesTab({ entries, onReload }) {
  const [filter, setFilter] = useState('all')

  const filtered = filter === 'all' ? entries : entries.filter(e => e.category_id === filter)

  if (entries.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '40px 20px', color: 'var(--muted)' }}>
        No entries yet. Document answers from the Pending Questions tab, or add entries directly.
      </div>
    )
  }

  return (
    <div>
      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 16 }}>
        <button
          onClick={() => setFilter('all')}
          className={`badge ${filter === 'all' ? 'badge-teal' : 'badge-muted'}`}
          style={{ cursor: 'pointer', border: 'none' }}
        >
          All ({entries.length})
        </button>
        {CATEGORIES.map(c => {
          const count = entries.filter(e => e.category_id === c.id).length
          if (count === 0) return null
          return (
            <button
              key={c.id}
              onClick={() => setFilter(c.id)}
              className={`badge ${filter === c.id ? 'badge-teal' : 'badge-muted'}`}
              style={{ cursor: 'pointer', border: 'none' }}
            >
              {c.label} ({count})
            </button>
          )
        })}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {filtered.map(e => (
          <div key={e.id} style={{
            background: 'var(--navy3)', border: '1px solid var(--border)',
            borderRadius: 10, padding: '14px 18px',
          }}>
            <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 6, flexWrap: 'wrap' }}>
              <span className="badge badge-teal">{CATEGORIES.find(c => c.id === e.category_id)?.label || e.category_id}</span>
              {e.location && <span className="badge badge-muted">{e.location}</span>}
              {e.status === 'needs_review' && <span className="badge badge-gold">Needs Review</span>}
            </div>
            <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--white)', marginBottom: 6 }}>{e.question}</div>
            <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)', lineHeight: 1.6, marginBottom: 8 }}>{e.answer}</div>
            <div style={{ fontSize: 11, color: 'var(--muted)' }}>
              Documented by {e.documented_by} · {new Date(e.documented_at).toLocaleDateString()}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ── ADD NEW ENTRY TAB ──────────────────────────────────────────────────────
function AddEntryTab({ onReload, onDone }) {
  const [category, setCategory] = useState('general')
  const [location, setLocation] = useState('All Locations')
  const [question, setQuestion] = useState('')
  const [answer,   setAnswer]   = useState('')
  const [docBy,    setDocBy]    = useState('')
  const [saving,   setSaving]   = useState(false)

  const handleSave = async () => {
    if (!question.trim() || !answer.trim() || !docBy.trim()) return
    setSaving(true)
    try {
      await sb('kb_entries', {
        method: 'POST',
        prefer: 'return=minimal',
        body: JSON.stringify({
          category_id: category,
          location: location === 'All Locations' ? null : location,
          question: question.trim(),
          answer: answer.trim(),
          documented_by: docBy.trim(),
        }),
      })
      setQuestion(''); setAnswer(''); setDocBy('')
      onReload()
      onDone()
    } catch (e) {
      alert('Error saving: ' + e.message)
    } finally {
      setSaving(false)
    }
  }

  return (
    <div style={{ maxWidth: 600 }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 14 }}>
        <div>
          <label className="label-sm" style={{ display: 'block', marginBottom: 6 }}>Category</label>
          <select className="input" value={category} onChange={e => setCategory(e.target.value)}>
            {CATEGORIES.map(c => <option key={c.id} value={c.id}>{c.label}</option>)}
          </select>
        </div>
        <div>
          <label className="label-sm" style={{ display: 'block', marginBottom: 6 }}>Location</label>
          <select className="input" value={location} onChange={e => setLocation(e.target.value)}>
            {LOCATIONS.map(l => <option key={l} value={l}>{l}</option>)}
          </select>
        </div>
      </div>

      <label className="label-sm" style={{ display: 'block', marginBottom: 6 }}>Question / Topic</label>
      <input
        className="input"
        placeholder="e.g. What payers require prior auth for implant placement?"
        value={question}
        onChange={e => setQuestion(e.target.value)}
        style={{ marginBottom: 14 }}
      />

      <label className="label-sm" style={{ display: 'block', marginBottom: 6 }}>Answer / Protocol</label>
      <textarea
        className="input"
        placeholder="Document the actual AOST answer here — be as specific as possible..."
        value={answer}
        onChange={e => setAnswer(e.target.value)}
        style={{ height: 120, marginBottom: 14, fontSize: 13 }}
      />

      <label className="label-sm" style={{ display: 'block', marginBottom: 6 }}>Documented By</label>
      <input
        className="input"
        placeholder="e.g. Practice Administrator, Lead Surgical Assistant"
        value={docBy}
        onChange={e => setDocBy(e.target.value)}
        style={{ marginBottom: 18 }}
      />

      <button
        className="btn btn-primary"
        disabled={saving || !question.trim() || !answer.trim() || !docBy.trim()}
        onClick={handleSave}
      >
        {saving ? 'Saving...' : 'Add to Knowledge Base'}
      </button>
    </div>
  )
}
