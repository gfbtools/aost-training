import React, { useState } from 'react'
import { useProgress } from './hooks/useProgress.js'
import Registration from './components/Registration.jsx'
import Header from './components/Header.jsx'
import RoleDashboard from './components/RoleDashboard.jsx'
import ModuleView from './components/ModuleView.jsx'
import LessonView from './components/LessonView.jsx'
import AIAssistant from './components/AIAssistant.jsx'
import AdminDashboard from './components/AdminDashboard.jsx'
import EditProfileModal from './components/EditProfileModal.jsx'
import KnowledgeBaseAdmin from './components/KnowledgeBaseAdmin.jsx'

export default function App() {
  const prog = useProgress()
  const { profile, saveProfile } = prog

  const [view,     setView]    = useState('dashboard')
  const [trackId,  setTrack]   = useState(null)
  const [moduleId, setModule]  = useState(null)
  const [lessonId, setLesson]  = useState(null)
  const [adminOpen,setAdmin]   = useState(false)
  const [editOpen, setEdit]    = useState(false)
  const [kbOpen,   setKB]      = useState(false)

  const nav = (v, t = null, m = null, l = null) => {
    setView(v); setTrack(t); setModule(m); setLesson(l)
    window.scrollTo({ top: 0, behavior: 'instant' })
  }

  // Not registered yet
  if (!profile) {
    return <Registration onComplete={saveProfile} />
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header
        onHome={() => nav('dashboard')}
        profile={profile}
        currentView={view}
        onEditProfile={() => setEdit(true)}
        onOpenAdmin={() => setAdmin(true)}
        onOpenKB={() => setKB(true)}
      />

      <main style={{ flex: 1 }}>
        {view === 'dashboard' && (
          <RoleDashboard
            profile={profile}
            onSelectModule={(tid, mid) => nav('module', tid, mid)}
            prog={prog}
          />
        )}

        {view === 'module' && trackId && moduleId && (
          <ModuleView
            trackId={trackId}
            moduleId={moduleId}
            roleId={profile.roleId}
            prog={prog}
            onSelectLesson={(t, m, l) => nav('lesson', t, m, l)}
            onBack={() => nav('dashboard')}
          />
        )}

        {view === 'lesson' && trackId && moduleId && lessonId && (
          <LessonView
            trackId={trackId}
            moduleId={moduleId}
            lessonId={lessonId}
            roleId={profile.roleId}
            prog={prog}
            onBack={() => nav('module', trackId, moduleId)}
            onNext={(t, m, l) => nav('lesson', t, m, l)}
            onModuleComplete={(t, nextModId) => {
              if (nextModId) nav('module', t, nextModId)
              else nav('dashboard')
            }}
          />
        )}
      </main>

      {/* Footer */}
      <footer style={{
        borderTop: '1px solid var(--border)',
        padding: '16px 24px',
        textAlign: 'center',
      }}>
        <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.2)' }}>
          Advanced Oral Surgery of Tampa · Training University · Internal Use Only
        </span>
      </footer>

      {/* AI Assistant - always visible when registered */}
      <AIAssistant
        profile={profile}
        currentTrack={trackId}
        currentModule={moduleId}
      />

      {/* Admin Dashboard Modal */}
      {adminOpen && (
        <AdminDashboard onClose={() => setAdmin(false)} />
      )}

      {/* Edit Profile Modal */}
      {editOpen && (
        <EditProfileModal
          profile={profile}
          onClose={() => setEdit(false)}
          onSave={(updated) => {
            saveProfile(updated)
            nav('dashboard')
          }}
        />
      )}

      {/* Knowledge Base Admin Modal */}
      {kbOpen && (
        <KnowledgeBaseAdmin onClose={() => setKB(false)} />
      )}
    </div>
  )
}
