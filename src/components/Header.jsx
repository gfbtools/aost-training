import React, { useState, useRef, useEffect } from 'react'
const BASE = import.meta.env.BASE_URL

export default function Header({ onHome, profile, currentView, onEditProfile, onOpenAdmin, onOpenKB, onShareProgress }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const menuRef = useRef(null)

  useEffect(() => {
    if (!menuOpen) return
    const close = (e) => { if (menuRef.current && !menuRef.current.contains(e.target)) setMenuOpen(false) }
    document.addEventListener('mousedown', close)
    return () => document.removeEventListener('mousedown', close)
  }, [menuOpen])

  const menuItem = (label, onClick) => (
    <button
      onClick={() => { setMenuOpen(false); onClick() }}
      style={{
        display: 'block', width: '100%', textAlign: 'left',
        background: 'none', border: 'none', cursor: 'pointer',
        padding: '10px 14px', fontSize: 13, color: 'rgba(255,255,255,0.85)',
        borderRadius: 6,
      }}
      onMouseEnter={e => e.currentTarget.style.background = 'var(--faint)'}
      onMouseLeave={e => e.currentTarget.style.background = 'none'}
    >
      {label}
    </button>
  )

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

        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          {profile && (
            <button
              onClick={onEditProfile}
              style={{
                background: 'none', border: 'none', cursor: 'pointer',
                textAlign: 'right', padding: '4px 8px', borderRadius: 8,
                transition: 'var(--trans)',
              }}
              onMouseEnter={e => e.currentTarget.style.background = 'var(--faint)'}
              onMouseLeave={e => e.currentTarget.style.background = 'none'}
              title="Edit profile"
            >
              <div style={{ fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.8)' }}>
                {profile.name} <span style={{ opacity: 0.4, fontSize: 10 }}>✎</span>
              </div>
              <div style={{ fontSize: 10, color: 'var(--muted)' }}>{profile.location}</div>
            </button>
          )}

          {currentView !== 'dashboard' && (
            <button className="btn btn-ghost" style={{ fontSize: 12 }} onClick={onHome}>
              ← My Path
            </button>
          )}

          {/* Settings / Admin menu */}
          {(onOpenAdmin || onOpenKB || onShareProgress) && (
            <div ref={menuRef} style={{ position: 'relative' }}>
              <button
                onClick={() => setMenuOpen(o => !o)}
                title="Tools & Admin"
                style={{
                  background: menuOpen ? 'var(--faint)' : 'none',
                  border: '1px solid var(--border)',
                  borderRadius: 8, width: 34, height: 34,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  cursor: 'pointer', fontSize: 16, color: 'rgba(255,255,255,0.8)',
                }}
              >
                ⚙
              </button>
              {menuOpen && (
                <div className="scale-in" style={{
                  position: 'absolute', top: 42, right: 0, minWidth: 200,
                  background: 'var(--navy2)', border: '1px solid var(--border2)',
                  borderRadius: 10, padding: 6, boxShadow: 'var(--shadow)',
                  zIndex: 200,
                }}>
                  {onShareProgress && menuItem('📋 Share My Progress', onShareProgress)}
                  {onOpenKB        && menuItem('🧠 Knowledge Base', onOpenKB)}
                  {onOpenAdmin     && menuItem('🔐 Admin Dashboard', onOpenAdmin)}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
