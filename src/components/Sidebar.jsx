import {
  LayoutGrid,
  MessagesSquare,
  MessageCircle,
  UserPlus,
  Layers,
  UserRound,
  Zap,
} from 'lucide-react'

const navItems = [
  { label: 'Dashboard', icon: LayoutGrid, page: 'dashboard' },
  { label: 'Community', icon: MessagesSquare, page: 'community' },
  { label: 'Chats', icon: MessageCircle, page: 'chats' },
  { label: 'People', icon: UserPlus },
  { label: 'Task', icon: Layers, page: 'task' },
  { label: 'Account Settingt', icon: UserRound },
]

export default function Sidebar({ activePage, onNavigate }) {
  return (
    <aside className="flex w-72 shrink-0 flex-col rounded-2xl bg-[#161616] p-5">
      <h1 className="px-1 text-lg font-semibold text-white">Chatcommunity</h1>

      <nav className="mt-6 flex flex-col gap-3">
        {navItems.map(({ label, icon: Icon, page }) => {
          const active = page === activePage
          return (
            <button
              key={label}
              onClick={() => page && onNavigate(page)}
              className={`flex items-center gap-3 rounded-lg px-4 py-3 text-left text-sm transition-colors ${
                active
                  ? 'bg-[#0d0d0d] text-[#2e7cf6]'
                  : 'bg-[#1f1f1f] text-gray-200 hover:bg-[#262626]'
              }`}
            >
              <Icon
                size={16}
                strokeWidth={1.75}
                className={active ? 'text-[#2e7cf6]' : 'text-gray-300'}
              />
              {label}
            </button>
          )
        })}
      </nav>

      <div className="mt-6 rounded-xl bg-[#1f1f1f] p-4">
        <div className="flex items-center gap-3">
          <div className="size-10 shrink-0 rounded-full bg-[#e9e9e9]" />
          <div className="min-w-0">
            <p className="truncate text-sm font-medium text-white">Paul Stain Walker</p>
            <p className="truncate text-[11px] text-gray-400">Freelancer Graphic Designer</p>
          </div>
        </div>
        <p className="mt-2 flex items-center gap-1 text-[11px] font-medium text-[#f97316]">
          <Zap size={11} className="fill-[#f97316]" />
          Level : 10
        </p>
        <p className="mt-1 text-[11px] text-gray-300">
          Follower : 500 <span className="ml-3">Following : 100</span>
        </p>
      </div>

      <div className="mt-4 flex flex-col gap-3">
        <button className="w-full rounded-md bg-[#2e7cf6] py-2 text-sm font-medium text-white transition-colors hover:bg-[#2568d4]">
          Add Account
        </button>
        <button className="w-full rounded-md bg-[#f4436c] py-2 text-sm font-medium text-white transition-colors hover:bg-[#d93a60]">
          Sign Out
        </button>
      </div>
    </aside>
  )
}
