import React from 'react'
const BASE = import.meta.env.BASE_URL

export default function Header({ onHome, profile, currentView }) {
  return (
    <header style={{
      background: 'rgba(10,30,48,0.92)',
      backdropFilter: 'blur(12px)',
      WebkitBackdropFilter: 'blur(12px)',
      borderBottom: '1px solid var(--border)',
      position: 'sticky', top: 0, zIndex: 100,
    }}>
      <div style={{
        maxWidth: 1080, margin: '0 auto', padding: '0 24px',
        display: 'flex', alignItems: 'center',
        justifyContent: 'space-between', height: 60,
      }}>
        <button onClick={onHome} style={{
          background: 'none', border: 'none', cursor: 'pointer',
          display: 'flex', alignItems: 'center', gap: 12, padding: '4px 0',
        }}>
          <img src={`${BASE}logo.svg`} alt="AOST" style={{ height: 32 }} />
        </button>

        {/* Center tag */}
        <div style={{
          position: 'absolute', left: '50%', transform: 'translateX(-50%)',
          fontSize: 10, fontWeight: 700, color: 'var(--teal)',
          letterSpacing: '1.2px', textTransform: 'uppercase',
        }}>
          Training University
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          {profile && (
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.8)' }}>
                {profile.name}
              </div>
              <div style={{ fontSize: 10, color: 'var(--muted)' }}>{profile.location}</div>
            </div>
          )}
          {currentView !== 'dashboard' && (
            <button className="btn btn-ghost" style={{ fontSize: 12 }} onClick={onHome}>
              ← My Path
            </button>
          )}
        </div>
      </div>
    </header>
  )
}
