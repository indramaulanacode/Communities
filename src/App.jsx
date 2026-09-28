import { useState } from 'react'
import Sidebar from './components/Sidebar.jsx'
import TopBar from './components/TopBar.jsx'
import Dashboard from './components/Dashboard.jsx'
import CommunityPage from './components/CommunityPage.jsx'
import ChatsPage from './components/ChatsPage.jsx'
import TaskPage from './components/TaskPage.jsx'
import PeoplePage from './components/PeoplePage.jsx'
import ProfilePage from './components/ProfilePage.jsx'

export default function App() {
  const [page, setPage] = useState('dashboard')

  return (
    <div className="h-screen bg-[#0a0a0a] p-3 font-sans antialiased">
      <div className="flex h-full flex-col gap-4 lg:flex-row">
        <Sidebar activePage={page} onNavigate={setPage} />
        <main className="relative flex min-w-0 flex-1 flex-col gap-4">
          {page !== 'dashboard' && <TopBar activePage={page} onNavigate={setPage} />}
          {page === 'community' && <CommunityPage />}
          {page === 'chats' && <ChatsPage />}
          {page === 'task' && <TaskPage />}
          {page === 'people' && <PeoplePage onNavigate={setPage} />}
          {page === 'profile' && <ProfilePage />}
          {page === 'dashboard' && <Dashboard onNavigate={setPage} />}
        </main>
      </div>
    </div>
  )
}
