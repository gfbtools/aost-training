import React, { useState, useMemo } from 'react'
import { ROLES } from '../data/roles.js'
import { TRACKS } from '../data/modules.js'

const ADMIN_PASS = 'aost2025' // Change after deployment

// Admin reads all localStorage entries that match the AOST profile pattern
// In production, connect to Supabase — see README
function readAllProfiles() {
  const profiles = []
  try {
    // Each browser/device stores its own progress
    // For multi-device: replace with Supabase query
    const p = localStorage.getItem('aost-profile-v2')
    const prog = localStorage.getItem('aost-progress-v2')
    const quizzes = localStorage.getItem('aost-quizzes-v2')
    if (p) profiles.push({
      profile:  JSON.parse(p),
      progress: prog    ? JSON.parse(prog)    : {},
      quizzes:  quizzes ? JSON.parse(quizzes) : {},
    })
  } catch {}
  return profiles
}

function calcStats(profile, progress, quizzes) {
  const role   = ROLES.find(r => r.id === profile.roleId)
  if (!role) return { pct: 0, done: 0, total: 0 }

  const universalMods = TRACKS['universal']?.modules || []
  const roleMods = (TRACKS[profile.roleId]?.modules || []).filter(m =>
    profile.experience === 'experienced' ? m.scope === 'aost' : true
  )
  const allMods = [...universalMods, ...roleMods]

  let done = 0, total = 0
  allMods.forEach(m => {
    const tid = universalMods.includes(m) ? 'universal' : profile.roleId
    m.lessons.forEach(l => {
      total++
      if (progress[tid]?.[m.id]?.[l.id]) done++
    })
    if (m.hasQuiz) {
      total++
      if (quizzes[m.id]?.passed) done++
    }
  })
  return { pct: total > 0 ? Math.round((done / total) * 100) : 0, done, total }
}

export default function AdminDashboard({ onClose }) {
  const [pass,       setPass]    = useState('')
  const [authed,     setAuthed]  = useState(false)
  const [passErr,    setPassErr] = useState(false)

  const handleAuth = () => {
    if (pass === ADMIN_PASS) { setAuthed(true); setPassErr(false) }
    else setPassErr(true)
  }

  const entries = useMemo(() => readAllProfiles(), [])

  if (!authed) {
    return (
      <div className="modal-overlay">
        <div className="modal-box" style={{ maxWidth: 400 }}>
          <button onClick={onClose} className="btn btn-ghost btn-sm" style={{ float: 'right', marginTop: -8 }}>✕</button>
          <div className="label-sm" style={{ marginBottom: 10 }}>Admin Access</div>
          <h2 className="heading-1" style={{ marginBottom: 20 }}>Admin Dashboard</h2>
          <input
            className="input"
            type="password"
            placeholder="Admin password"
            value={pass}
            onChange={e => setPass(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleAuth()}
            style={{ marginBottom: 12 }}
          />
          {passErr && <p style={{ fontSize: 12, color: '#FF7A7A', marginBottom: 12 }}>Incorrect password.</p>}
          <button className="btn btn-primary" style={{ width: '100%' }} onClick={handleAuth}>
            Enter Admin View
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="modal-overlay" style={{ alignItems: 'flex-start', paddingTop: 40 }}>
      <div className="modal-box" style={{ maxWidth: 900, width: '100%', maxHeight: '85vh', overflowY: 'auto' }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 28 }}>
          <div>
            <div className="label-sm" style={{ marginBottom: 8 }}>AOST Training University</div>
            <h2 className="display-2">Team Progress Dashboard</h2>
            <p className="body-sm" style={{ marginTop: 6 }}>
              {entries.length} team member{entries.length !== 1 ? 's' : ''} tracked on this device
            </p>
          </div>
          <button onClick={onClose} className="btn btn-ghost">✕ Close</button>
        </div>

        {/* NOTE about multi-device */}
        <div style={{
          background: 'rgba(200,146,42,0.08)', border: '1px solid rgba(200,146,42,0.25)',
          borderRadius: 10, padding: '14px 18px', marginBottom: 24,
          fontSize: 13, color: 'rgba(255,255,255,0.65)',
        }}>
          <span style={{ color: 'var(--lgold)', fontWeight: 700 }}>Note: </span>
          Currently showing progress from this device. For full team tracking across all devices,
          connect to Supabase — see the deployment README.
        </div>

        {/* Team table */}
        {entries.length > 0 ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 28 }}>
            {entries.map(({ profile, progress, quizzes }, i) => {
              const stats = calcStats(profile, progress, quizzes)
              const role  = ROLES.find(r => r.id === profile.roleId)
              return (
                <div key={i} style={{
                  background: 'var(--navy3)', border: '1px solid var(--border)',
                  borderRadius: 10, padding: '16px 20px',
                  display: 'flex', alignItems: 'center', gap: 20, flexWrap: 'wrap',
                }}>
                  <div style={{ flex: 1, minWidth: 200 }}>
                    <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--white)', marginBottom: 3 }}>
                      {profile.name}
                    </div>
                    <div style={{ fontSize: 12, color: 'var(--muted)', display: 'flex', gap: 12 }}>
                      <span>{role?.title || profile.roleId}</span>
                      <span>·</span>
                      <span>{profile.location}</span>
                      <span>·</span>
                      <span>{profile.experience === 'experienced' ? 'Experienced hire' : 'Full path'}</span>
                    </div>
                  </div>

                  <div style={{ width: 180 }}>
                    <div style={{
                      display: 'flex', justifyContent: 'space-between',
                      fontSize: 12, color: 'var(--muted)', marginBottom: 5,
                    }}>
                      <span>{stats.done}/{stats.total} items</span>
                      <span style={{ color: stats.pct === 100 ? '#4ADB8A' : 'var(--white)', fontWeight: 600 }}>
                        {stats.pct}%
                      </span>
                    </div>
                    <div className="progress-track" style={{ height: 5 }}>
                      <div
                        className={`progress-fill ${stats.pct === 100 ? 'progress-fill-gold' : ''}`}
                        style={{ width: `${stats.pct}%` }}
                      />
                    </div>
                  </div>

                  <div>
                    {stats.pct === 100
                      ? <span className="badge badge-green">Complete</span>
                      : stats.pct > 0
                      ? <span className="badge badge-teal">In Progress</span>
                      : <span className="badge badge-muted">Not Started</span>
                    }
                  </div>
                </div>
              )
            })}
          </div>
        ) : (
          <div style={{
            textAlign: 'center', padding: '40px 20px',
            color: 'var(--muted)', fontSize: 14,
            borderRadius: 10, border: '1px dashed var(--border)', marginBottom: 28,
          }}>
            No team members tracked on this device yet.
          </div>
        )}
      </div>
    </div>
  )
}
