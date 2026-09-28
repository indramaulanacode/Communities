import PersonalChatsList from './PersonalChatsList.jsx'
import ChatPanel from './ChatPanel.jsx'

export default function ChatsPage() {
  return (
    <div className="flex min-w-0 flex-1 gap-4">
      <PersonalChatsList />
      <ChatPanel />
    </div>
  )
}
