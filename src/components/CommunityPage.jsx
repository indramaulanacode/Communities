import CommunityListSection from './CommunityListSection.jsx'
import ChatPanel from './ChatPanel.jsx'

export default function CommunityPage() {
  return (
    <div className="flex min-h-0 min-w-0 flex-1 flex-col gap-4 overflow-y-auto lg:flex-row lg:overflow-visible">
      <CommunityListSection />
      <ChatPanel />
    </div>
  )
}
