import PersonalChatsList from './PersonalChatsList.jsx'
import ChatPanel from './ChatPanel.jsx'
import { useState } from 'react'

export default function ChatsPage() {
  const [activeChat, setActiveChat] = useState(null)

  return (
    <div className="flex min-w-0 flex-1 gap-4">
      <PersonalChatsList onSelect={setActiveChat} />
      <ChatPanel chat={activeChat} />
    </div>
  )
}
