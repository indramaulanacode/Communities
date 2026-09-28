import { useState } from 'react'
import Sidebar from './components/Sidebar.jsx'
import Dashboard from './components/Dashboard.jsx'
import CommunityPage from './components/CommunityPage.jsx'
import ChatsPage from './components/ChatsPage.jsx'
import TaskPage from './components/TaskPage.jsx'
import PeoplePage from './components/PeoplePage.jsx'

export default function App() {
  const [page, setPage] = useState('dashboard')

  return (
    <div className="h-screen bg-[#0a0a0a] p-3 font-sans antialiased">
      <div className="flex h-full gap-4">
        <Sidebar activePage={page} onNavigate={setPage} />
        {page === 'community' && <CommunityPage />}
        {page === 'chats' && <ChatsPage />}
        {page === 'task' && <TaskPage />}
        {page === 'people' && <PeoplePage onNavigate={setPage} />}
        {page === 'dashboard' && <Dashboard onNavigate={setPage} />}
      </div>
    </div>
  )
}
