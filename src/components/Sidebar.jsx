import {
  LayoutGrid,
  MessagesSquare,
  MessageCircle,
  UserPlus,
  Layers,
  UserRound,
  Zap,
} from 'lucide-react'
import { useState } from 'react'

const navItems = [
  { label: 'Dashboard', icon: LayoutGrid, page: 'dashboard' },
  { label: 'Community', icon: MessagesSquare, page: 'community' },
  { label: 'Chats', icon: MessageCircle, page: 'chats' },
  { label: 'People', icon: UserPlus, page: 'people' },
  { label: 'Task', icon: Layers, page: 'task' },
  { label: 'Account Settingt', icon: UserRound, page: 'profile' },
]

export default function Sidebar({ activePage, onNavigate }) {
  const [accountPressed, setAccountPressed] = useState(false)
  const [signOutPressed, setSignOutPressed] = useState(false)

  return (
    <aside className="flex w-full shrink-0 flex-col rounded-2xl bg-[#161616] p-5 lg:min-h-0 lg:w-72 lg:overflow-y-auto">
      <h1 className="px-1 text-lg font-semibold text-white">Chatcommunity</h1>

      <nav className="mt-6 flex gap-3 overflow-x-auto pb-1 lg:flex-col lg:overflow-visible lg:pb-0">
        {navItems.map(({ label, icon: Icon, page }) => {
          const active = page === activePage
          return (
            <button
              key={label}
              onClick={() => page && onNavigate(page)}
              className={`flex shrink-0 items-center gap-3 whitespace-nowrap rounded-lg px-4 py-3 text-left text-sm transition-colors lg:shrink ${
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

      <button
        onClick={() => onNavigate('profile')}
        className={`mt-6 hidden rounded-xl p-4 text-left transition-colors lg:block ${
          activePage === 'profile'
            ? 'bg-[#1f1f1f] ring-1 ring-[#2e7cf6]'
            : 'bg-[#1f1f1f] hover:bg-[#262626]'
        }`}
      >
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
      </button>

      <div className="mt-4 flex flex-row gap-3 lg:flex-col">
        <button
          onClick={() => setAccountPressed((p) => !p)}
          aria-pressed={accountPressed}
          className={`w-full rounded-md py-2 text-sm font-medium text-white transition-colors ${
            accountPressed ? 'bg-[#1d4ed8] ring-1 ring-[#2e7cf6]' : 'bg-[#2e7cf6] hover:bg-[#2568d4]'
          }`}
        >
          Add Account
        </button>
        <button
          onClick={() => setSignOutPressed((p) => !p)}
          aria-pressed={signOutPressed}
          className={`w-full rounded-md py-2 text-sm font-medium text-white transition-colors ${
            signOutPressed ? 'bg-[#a3264a] ring-1 ring-[#f4436c]' : 'bg-[#f4436c] hover:bg-[#d93a60]'
          }`}
        >
          Sign Out
        </button>
      </div>
    </aside>
  )
}
