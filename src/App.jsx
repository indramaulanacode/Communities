import Sidebar from './components/Sidebar.jsx'
import CommunityList from './components/CommunityList.jsx'
import ChatPanel from './components/ChatPanel.jsx'

export default function App() {
  return (
    <div className="h-screen bg-[#0a0a0a] p-3 font-sans antialiased">
      <div className="flex h-full gap-3">
        <Sidebar />
        <CommunityList />
        <ChatPanel />
      </div>
    </div>
  )
}
