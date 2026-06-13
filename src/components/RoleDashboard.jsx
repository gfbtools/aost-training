import React, { useMemo } from 'react'
import { getRoleById } from '../data/roles.js'
import { TRACKS } from '../data/modules.js'

export default function RoleDashboard({ profile, onSelectModule, prog }) {
  const role = getRoleById(profile.roleId)
  const { moduleProgress, isQuizPassed, isUniversalComplete, trackProgress } = prog

  const universalTrack = TRACKS['universal']
  const roleTrack      = TRACKS[profile.roleId]
  const uniComplete    = isUniversalComplete(universalTrack.modules)

  // Filter role modules by experience
  const roleModules = useMemo(() => {
    if (!roleTrack) return []
    if (profile.experience === 'experienced') {
      return roleTrack.modules.filter(m => m.scope === 'aost')
    }
    return roleTrack.modules
  }, [roleTrack, profile.experience])

  // Combined totals
  const totalDone = useMemo(() => {
    let done = 0, total = 0
    universalTrack.modules.forEach(m => {
      const p = moduleProgress('universal', m)
      done += p.done; total += p.total
      if (m.hasQuiz && isQuizPassed(m.id)) done += 1
      if (m.hasQuiz) total += 1
    })
    roleModules.forEach(m => {
      const p = moduleProgress(profile.roleId, m)
      done += p.done; total += p.total
      if (m.hasQuiz && isQuizPassed(m.id)) done += 1
      if (m.hasQuiz) total += 1
    })
    return { done, total, pct: total > 0 ? Math.round((done / total) * 100) : 0 }
  }, [universalTrack, roleModules, moduleProgress, isQuizPassed, profile.roleId])

  if (!role) return null

  return (
    <div className="page" style={{ padding: '40px 24px 80px' }}>
      {/* Hero */}
      <div className="fade-up" style={{ marginBottom: 48 }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: 20 }}>
          <div>
            <div className="label-sm" style={{ marginBottom: 10 }}>Your Training Path</div>
            <h1 className="display-1" style={{ marginBottom: 6 }}>
              {profile.name.split(' ')[0]}'s Journey
            </h1>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: 12 }}>
              <span className="badge badge-teal">{role.title}</span>
              <span className="badge badge-muted">{profile.location}</span>
              {profile.experience === 'experienced' && (
                <span className="badge badge-gold">Experienced Hire Path</span>
              )}
            </div>
          </div>

          {/* Overall progress ring-ish */}
          <div style={{
            background: 'var(--navy2)',
            border: '1px solid var(--border)',
            borderRadius: 14,
            padding: '20px 28px',
            textAlign: 'center',
            minWidth: 140,
          }}>
            <div style={{
              fontSize: 42, fontWeight: 800,
              color: totalDone.pct === 100 ? '#4ADB8A' : 'var(--teal)',
              lineHeight: 1,
              fontFamily: "'Playfair Display', serif",
            }}>
              {totalDone.pct}<span style={{ fontSize: 20 }}>%</span>
            </div>
            <div className="label-sm" style={{ marginTop: 8 }}>Overall</div>
            <div style={{ fontSize: 11, color: 'var(--muted)', marginTop: 4 }}>
              {totalDone.done} / {totalDone.total} items
            </div>
          </div>
        </div>

        {/* Progress bar */}
        <div style={{ marginTop: 24 }}>
          <div className="progress-track" style={{ height: 5 }}>
            <div className="progress-fill" style={{ width: `${totalDone.pct}%` }} />
          </div>
        </div>
      </div>

      {/* Tracks */}
      {[
        { track: universalTrack, trackId: 'universal', modules: universalTrack.modules, locked: false },
        ...(roleTrack ? [{ track: roleTrack, trackId: profile.roleId, modules: roleModules, locked: !uniComplete }] : []),
      ].map(({ track, trackId, modules, locked }) => (
        <TrackSection
          key={trackId}
          track={track}
          trackId={trackId}
          modules={modules}
          locked={locked}
          role={role}
          prog={prog}
          profile={profile}
          onSelectModule={onSelectModule}
          experience={profile.experience}
        />
      ))}
    </div>
  )
}

function TrackSection({ track, trackId, modules, locked, role, prog, profile, onSelectModule, experience }) {
  const { moduleProgress, isQuizPassed, isLessonDone } = prog
  const isUniversal = trackId === 'universal'
  const accentColor = isUniversal ? 'var(--teal)' : role.color

  return (
    <div className="fade-up" style={{ marginBottom: 52 }}>
      {/* Track header */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        borderBottom: `2px solid ${accentColor}`,
        paddingBottom: 14, marginBottom: 20,
      }}>
        <div>
          <div className="label-sm" style={{ color: accentColor, marginBottom: 5 }}>
            {isUniversal ? 'Required — All Team Members' : `${role.title} — ${experience === 'experienced' ? 'AOST Standards' : 'Full Path'}`}
          </div>
          <h2 className="heading-1">{track.title}</h2>
        </div>
        {locked && (
          <span className="badge badge-muted">🔒 Complete Core first</span>
        )}
      </div>

      {/* Module cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {modules.map((mod, mi) => {
          const mp      = moduleProgress(trackId, mod)
          const qPassed = mod.hasQuiz ? isQuizPassed(mod.id) : true
          const allLessonsDone = mod.lessons.every(l => isLessonDone(trackId, mod.id, l.id))
          const fullyDone = allLessonsDone && qPassed

          // Lock logic: first module always open (if track not locked), subsequent modules lock if prev not done
          const prevMod = mi > 0 ? modules[mi - 1] : null
          const prevDone = !prevMod || (() => {
            const pmp = moduleProgress(trackId, prevMod)
            const pq  = prevMod.hasQuiz ? isQuizPassed(prevMod.id) : true
            return prevMod.lessons.every(l => isLessonDone(trackId, prevMod.id, l.id)) && pq
          })()

          const isLocked = locked || (!prevDone && mi > 0)

          return (
            <ModuleCard
              key={mod.id}
              mod={mod}
              index={mi}
              trackId={trackId}
              locked={isLocked}
              fullyDone={fullyDone}
              allLessonsDone={allLessonsDone}
              quizPassed={qPassed}
              mp={mp}
              accentColor={accentColor}
              onSelect={() => !isLocked && onSelectModule(trackId, mod.id)}
            />
          )
        })}
      </div>
    </div>
  )
}

function ModuleCard({ mod, index, locked, fullyDone, allLessonsDone, quizPassed, mp, accentColor, onSelect }) {
  const showQuizBadge = mod.hasQuiz && allLessonsDone && !quizPassed
  const borderColor = fullyDone ? 'rgba(74,219,138,0.4)' : locked ? 'transparent' : accentColor + '55'

  return (
    <button
      onClick={onSelect}
      disabled={locked}
      style={{
        background: fullyDone
          ? 'linear-gradient(135deg, rgba(26,122,74,0.10), rgba(26,122,74,0.04))'
          : locked ? 'rgba(255,255,255,0.02)' : 'var(--navy2)',
        border: `1px solid ${fullyDone ? 'rgba(74,219,138,0.25)' : locked ? 'var(--border)' : 'var(--border)'}`,
        borderLeft: `3px solid ${fullyDone ? '#4ADB8A' : locked ? 'rgba(255,255,255,0.08)' : accentColor}`,
        borderRadius: 10,
        padding: '18px 22px',
        textAlign: 'left',
        cursor: locked ? 'not-allowed' : 'pointer',
        opacity: locked ? 0.55 : 1,
        transition: 'var(--trans)',
        display: 'flex', alignItems: 'center', gap: 18,
      }}
      onMouseEnter={e => !locked && !fullyDone && (e.currentTarget.style.transform = 'translateX(3px)')}
      onMouseLeave={e => (e.currentTarget.style.transform = 'none')}
    >
      {/* Number / Status */}
      <div style={{
        width: 36, height: 36, borderRadius: '50%', flexShrink: 0,
        background: fullyDone ? '#1A7A4A' : locked ? 'rgba(255,255,255,0.04)' : accentColor + '22',
        border: `1px solid ${fullyDone ? 'rgba(74,219,138,0.4)' : locked ? 'rgba(255,255,255,0.08)' : accentColor + '44'}`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: fullyDone ? 15 : 13, fontWeight: 700,
        color: fullyDone ? '#4ADB8A' : locked ? 'var(--muted)' : 'var(--white)',
      }}>
        {fullyDone ? '✓' : locked ? '🔒' : index + 1}
      </div>

      {/* Content */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap', marginBottom: 5 }}>
          <span style={{
            fontSize: 15, fontWeight: 600,
            color: locked ? 'var(--muted)' : 'var(--white)',
          }} className="truncate">
            {mod.title}
          </span>
          {mod.levelLabel && (
            <span className="badge badge-muted" style={{ fontSize: 9 }}>{mod.levelLabel}</span>
          )}
          {showQuizBadge && (
            <span className="badge badge-gold" style={{ fontSize: 9 }}>Quiz Ready</span>
          )}
          {mod.scope === 'foundations' && (
            <span className="badge badge-blue" style={{ fontSize: 9 }}>Foundations</span>
          )}
        </div>
        <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.3)', display: 'flex', gap: 16 }}>
          <span>⏱ {mod.duration}</span>
          <span>{mod.lessons.length} lesson{mod.lessons.length !== 1 ? 's' : ''}</span>
          {mod.hasQuiz && <span>{quizPassed ? '✓ Quiz passed' : '+ Assessment'}</span>}
          {mp.done > 0 && !fullyDone && <span style={{ color: accentColor }}>{mp.done}/{mp.total} complete</span>}
        </div>
      </div>

      {/* Right side */}
      <div style={{ flexShrink: 0 }}>
        {fullyDone ? (
          <span className="badge badge-green">Complete</span>
        ) : !locked && mp.done > 0 ? (
          <div style={{ width: 52, textAlign: 'right' }}>
            <div className="progress-track" style={{ height: 3, marginBottom: 4 }}>
              <div className="progress-fill" style={{ width: `${mp.pct}%` }} />
            </div>
            <div style={{ fontSize: 10, color: 'var(--muted)' }}>{mp.pct}%</div>
          </div>
        ) : !locked && (
          <span style={{ fontSize: 16, color: 'var(--muted)' }}>→</span>
        )}
      </div>
    </button>
  )
}
