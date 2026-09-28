import PersonalChatsList from './PersonalChatsList.jsx'
import ChatPanel from './ChatPanel.jsx'
import { useState } from 'react'

export default function ChatsPage() {
  const [activeChat, setActiveChat] = useState(null)

  return (
    <div className="flex min-h-0 min-w-0 flex-1 flex-col gap-4 overflow-y-auto lg:flex-row lg:overflow-visible">
      <PersonalChatsList onSelect={setActiveChat} />
      <ChatPanel chat={activeChat} />
    </div>
  )
}
