import React, { useState } from 'react'
import { ROLES } from '../data/roles.js'

const LOCATIONS = ['Tampa', "Land O'Lakes", 'Wesley Chapel', 'Valrico']

export default function EditProfileModal({ profile, onSave, onClose }) {
  const [name,       setName]   = useState(profile.name)
  const [roleId,     setRoleId] = useState(profile.roleId)
  const [location,   setLoc]    = useState(profile.location)
  const [experience, setExp]    = useState(profile.experience)

  const role = ROLES.find(r => r.id === roleId)
  const roleChanged = roleId !== profile.roleId

  const handleSave = () => {
    onSave({ name: name.trim() || profile.name, roleId, location, experience })
    onClose()
  }

  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal-box" style={{ maxWidth: 480 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24 }}>
          <div>
            <div className="label-sm" style={{ marginBottom: 8 }}>Profile Settings</div>
            <h2 className="heading-1">Edit Your Profile</h2>
          </div>
          <button onClick={onClose} className="btn btn-ghost btn-sm">✕</button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div>
            <label className="label-sm" style={{ display: 'block', marginBottom: 7 }}>Your Name</label>
            <input className="input" value={name} onChange={e => setName(e.target.value)} />
          </div>

          <div>
            <label className="label-sm" style={{ display: 'block', marginBottom: 7 }}>Your Role</label>
            <select className="input" value={roleId} onChange={e => setRoleId(e.target.value)}>
              {ROLES.map(r => (
                <option key={r.id} value={r.id}>{r.title} — {r.subtitle}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="label-sm" style={{ display: 'block', marginBottom: 7 }}>Your Location</label>
            <select className="input" value={location} onChange={e => setLoc(e.target.value)}>
              {LOCATIONS.map(l => <option key={l} value={l}>{l}</option>)}
            </select>
          </div>

          <div>
            <label className="label-sm" style={{ display: 'block', marginBottom: 7 }}>Experience Level</label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[
                { val: 'experienced', title: 'Experienced in this role', desc: 'AOST-specific modules only' },
                { val: 'new', title: 'New to this role', desc: 'Full path including foundations' },
              ].map(opt => (
                <button
                  key={opt.val}
                  onClick={() => setExp(opt.val)}
                  style={{
                    background: experience === opt.val ? `rgba(${role?.colorRgb || '14,124,123'},0.15)` : 'var(--faint)',
                    border: `2px solid ${experience === opt.val ? (role?.color || 'var(--teal)') : 'var(--border)'}`,
                    borderRadius: 10, padding: '12px 16px', textAlign: 'left', cursor: 'pointer', transition: 'var(--trans)',
                  }}
                >
                  <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--white)' }}>{opt.title}</div>
                  <div className="body-sm">{opt.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {roleChanged && (
            <div style={{
              background: 'rgba(27,108,168,0.10)', border: '1px solid rgba(27,108,168,0.25)',
              borderRadius: 8, padding: '12px 14px', fontSize: 12, color: 'rgba(255,255,255,0.7)',
            }}>
              Switching roles won't erase your progress. Each role track keeps its own progress —
              if you've worked on {ROLES.find(r=>r.id===roleId)?.title} before, you'll pick up right where you left off.
            </div>
          )}

          <div style={{ display: 'flex', gap: 12, marginTop: 8 }}>
            <button className="btn btn-secondary" onClick={onClose}>Cancel</button>
            <button className="btn btn-primary" style={{ flex: 1 }} onClick={handleSave}>
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
