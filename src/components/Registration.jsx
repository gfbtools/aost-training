import React, { useState } from 'react'
import { ROLES } from '../data/roles.js'

const BASE = import.meta.env.BASE_URL
const LOCATIONS = ['Tampa', "Land O'Lakes", 'Wesley Chapel', 'Valrico']

export default function Registration({ onComplete }) {
  const [step, setStep]       = useState(1) // 1: name/role  2: experience
  const [name, setName]       = useState('')
  const [roleId, setRoleId]   = useState('')
  const [location, setLoc]    = useState('')
  const [experience, setExp]  = useState('') // 'new' | 'experienced'
  const [error, setError]     = useState('')

  const role = ROLES.find(r => r.id === roleId)

  const handleStep1 = () => {
    if (!name.trim() || !roleId || !location) {
      setError('Please complete all fields to continue.')
      return
    }
    setError('')
    setStep(2)
  }

  const handleComplete = () => {
    if (!experience) { setError('Please select your experience level.'); return }
    onComplete({ name: name.trim(), roleId, location, experience })
  }

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '32px 24px',
      background: 'linear-gradient(160deg, var(--navy3) 0%, #0C1E2E 100%)',
    }}>
      {/* Logo */}
      <img src={`${BASE}logo.svg`} alt="AOST" style={{ height: 44, marginBottom: 40, opacity: 0.95 }} />

      <div className="scale-in" style={{
        width: '100%', maxWidth: 480,
        background: 'var(--navy2)',
        border: '1px solid var(--border2)',
        borderRadius: 18,
        padding: '40px 36px',
        boxShadow: 'var(--shadow-lg)',
      }}>
        {/* Progress dots */}
        <div style={{ display: 'flex', gap: 8, justifyContent: 'center', marginBottom: 32 }}>
          {[1, 2].map(s => (
            <div key={s} style={{
              width: s === step ? 28 : 8,
              height: 8,
              borderRadius: 4,
              background: s <= step ? 'var(--teal)' : 'var(--faint)',
              transition: 'var(--trans)',
            }} />
          ))}
        </div>

        {step === 1 && (
          <div className="fade-in">
            <div className="label-sm" style={{ marginBottom: 8 }}>Step 1 of 2</div>
            <h2 className="display-2" style={{ marginBottom: 6 }}>Welcome to AOST Training</h2>
            <p className="body-sm" style={{ marginBottom: 32 }}>
              Tell us a little about yourself so we can personalize your path.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div>
                <label className="label-sm" style={{ display: 'block', marginBottom: 7 }}>Your Name</label>
                <input
                  className="input"
                  placeholder="First and last name"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleStep1()}
                />
              </div>

              <div>
                <label className="label-sm" style={{ display: 'block', marginBottom: 7 }}>Your Role at AOST</label>
                <select className="input" value={roleId} onChange={e => setRoleId(e.target.value)}>
                  <option value="">Select your role</option>
                  {ROLES.map(r => (
                    <option key={r.id} value={r.id}>{r.title} — {r.subtitle}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="label-sm" style={{ display: 'block', marginBottom: 7 }}>Your Location</label>
                <select className="input" value={location} onChange={e => setLoc(e.target.value)}>
                  <option value="">Select your location</option>
                  {LOCATIONS.map(l => <option key={l} value={l}>{l}</option>)}
                </select>
              </div>

              {error && <p style={{ fontSize: 13, color: '#FF7A7A', marginTop: 4 }}>{error}</p>}

              <button className="btn btn-primary btn-lg" onClick={handleStep1} style={{ marginTop: 8 }}>
                Continue →
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="fade-in">
            <div className="label-sm" style={{ marginBottom: 8 }}>Step 2 of 2</div>
            <h2 className="display-2" style={{ marginBottom: 6 }}>
              Your Background
            </h2>
            <p className="body-sm" style={{ marginBottom: 28 }}>
              This helps us tailor which modules you see. Either path covers all AOST-specific content.
            </p>

            {role && (
              <div style={{
                display: 'flex',
                gap: 14,
                flexDirection: 'column',
                marginBottom: 28,
              }}>
                {[
                  {
                    val: 'experienced',
                    title: `I have experience as a ${role.title}`,
                    desc: "You'll complete AOST-specific modules: our standards, protocols, systems, and culture. Skip the general role foundations.",
                  },
                  {
                    val: 'new',
                    title: 'This is a new role for me',
                    desc: "You'll complete the full path — role foundations plus all AOST-specific content. Everything you need to succeed here.",
                  },
                ].map(opt => (
                  <button
                    key={opt.val}
                    onClick={() => setExp(opt.val)}
                    style={{
                      background: experience === opt.val
                        ? `rgba(${role.colorRgb || '14,124,123'},0.15)`
                        : 'var(--faint)',
                      border: `2px solid ${experience === opt.val ? (role.color || 'var(--teal)') : 'var(--border)'}`,
                      borderRadius: 12,
                      padding: '18px 20px',
                      textAlign: 'left',
                      cursor: 'pointer',
                      transition: 'var(--trans)',
                    }}
                  >
                    <div style={{
                      fontSize: 14, fontWeight: 700,
                      color: experience === opt.val ? 'var(--white)' : 'rgba(255,255,255,0.75)',
                      marginBottom: 6,
                    }}>
                      {opt.title}
                    </div>
                    <div className="body-sm" style={{ lineHeight: 1.5 }}>{opt.desc}</div>
                  </button>
                ))}
              </div>
            )}

            {error && <p style={{ fontSize: 13, color: '#FF7A7A', marginBottom: 12 }}>{error}</p>}

            <div style={{ display: 'flex', gap: 12 }}>
              <button className="btn btn-secondary" onClick={() => { setStep(1); setError('') }}>← Back</button>
              <button className="btn btn-primary" style={{ flex: 1 }} onClick={handleComplete}>
                Start My Training →
              </button>
            </div>
          </div>
        )}
      </div>

      <p className="body-sm" style={{ marginTop: 24, textAlign: 'center', opacity: 0.5, maxWidth: 400 }}>
        Your progress is saved automatically. You can return to this training at any time and pick up where you left off.
      </p>
    </div>
  )
}
