import { useState } from 'react'
import { Bell, Search, Settings, UserRound } from 'lucide-react'

const tabs = [
  { label: 'Home', page: 'dashboard' },
  { label: 'Task', page: 'task' },
  { label: 'Calender' },
  { label: 'Appearance', page: 'profile' },
]

export default function TopBar({ activePage, onNavigate }) {
  const [query, setQuery] = useState('')
  const [calActive, setCalActive] = useState(false)
  const [bellOn, setBellOn] = useState(false)
  const [gearOn, setGearOn] = useState(false)

  return (
    <header className="flex shrink-0 flex-wrap items-center gap-3 rounded-2xl bg-[#121212] px-5 py-3">
      <nav className="flex min-w-0 items-center gap-5 overflow-x-auto">
        {tabs.map(({ label, page }) => {
          const active = page ? page === activePage : calActive
          return (
            <button
              key={label}
              onClick={() => (page ? onNavigate(page) : setCalActive((v) => !v))}
              className={`shrink-0 text-sm font-semibold transition-colors ${
                active ? 'text-[#2e7cf6]' : 'text-white hover:text-gray-300'
              }`}
            >
              {label}
            </button>
          )
        })}
      </nav>

      <div className="flex min-w-0 flex-1 items-center justify-center gap-2 rounded-lg bg-[#0a0a0a] px-3 py-2 sm:max-w-md sm:mx-auto">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search"
          className="min-w-0 flex-1 bg-transparent text-xs text-gray-200 placeholder-gray-500 outline-none"
        />
        <Search size={12} className="shrink-0 text-gray-500" />
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={() => setBellOn((v) => !v)}
          aria-pressed={bellOn}
          className={`relative rounded-lg p-2 transition-colors ${
            bellOn ? 'bg-[#262626] text-white' : 'bg-[#1f1f1f] text-gray-300 hover:bg-[#262626]'
          }`}
        >
          <Bell size={14} />
          {!bellOn && (
            <span className="absolute -right-0.5 -top-0.5 size-2 rounded-full bg-[#f4436c]" />
          )}
        </button>
        <button
          onClick={() => setGearOn((v) => !v)}
          aria-pressed={gearOn}
          className={`rounded-lg p-2 transition-colors ${
            gearOn ? 'bg-[#262626] text-white' : 'bg-[#1f1f1f] text-gray-300 hover:bg-[#262626]'
          }`}
        >
          <Settings size={14} />
        </button>
        <button
          onClick={() => onNavigate('profile')}
          aria-label="Open profile"
          className="flex size-8 items-center justify-center rounded-full bg-[#e9e9e9] text-[#191919] transition-colors hover:bg-white"
        >
          <UserRound size={14} />
        </button>
      </div>
    </header>
  )
}
