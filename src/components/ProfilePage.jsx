import { useState } from 'react'
import {
  ChevronDown,
  Diamond,
  Globe,
  Layers,
  Lock,
  Mail,
  MapPin,
  Phone,
  Play,
  Settings,
  UserRound,
} from 'lucide-react'

const sections = [
  { id: 'profile', label: 'My Profile' },
  { id: 'info', label: 'Personal Info' },
  { id: 'security', label: 'Security' },
  { id: 'appearance', label: 'Appearance' },
]

const brandColors = ['#7c4dff', '#2e7cf6', '#f97316', '#22c55e', '#a855f7']

const footerColumns = [
  { title: 'Get Started', links: ['Service', 'Contact Us', 'Affiliate Program', 'About Us'] },
  { title: 'Get Started', links: ['Dashboard', 'Platform', 'Workout Library', 'App Design'] },
  { title: 'Get Started', links: ['About Us'] },
]

const defaultProfile = {
  name: 'John Doe Gym',
  email: 'Johndoegym@email',
  bio: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of a type specimen book.',
  location: 'Aceh, Indonesia',
  phone: '+62852 3874 8329',
}

function PanelHeader({ title }) {
  return (
    <div className="flex flex-col items-center gap-1">
      <p className="flex items-center gap-1 text-[10px] text-gray-400">
        <Layers size={11} className="text-[#2e7cf6]" />
        My Stacks
      </p>
      <p className="text-xs text-gray-300">{title}</p>
    </div>
  )
}

function Toggle({ on, onClick }) {
  return (
    <button
      onClick={onClick}
      aria-pressed={on}
      className={`relative h-5 w-9 shrink-0 rounded-full transition-colors ${
        on ? 'bg-[#2e7cf6]' : 'bg-[#262626]'
      }`}
    >
      <span
        className={`absolute top-0.5 size-4 rounded-full bg-white transition-all ${
          on ? 'left-[1.125rem]' : 'left-0.5'
        }`}
      />
    </button>
  )
}

function FormField({ label, icon: Icon, placeholder, value, onChange, textarea }) {
  return (
    <div className="mt-4">
      <p className="mb-1.5 text-[10px] text-gray-300">{label}</p>
      {textarea ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={4}
          placeholder={placeholder}
          className="w-full resize-none rounded-lg bg-[#191919] p-3 text-[10px] text-gray-200 placeholder-gray-500 outline-none ring-[#2e7cf6] focus:ring-1"
        />
      ) : (
        <div className="flex items-center gap-2 rounded-lg bg-[#191919] px-3 py-2.5">
          <Icon size={11} className="shrink-0 text-gray-500" />
          <input
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className="min-w-0 flex-1 bg-transparent text-[10px] text-gray-200 placeholder-gray-500 outline-none"
          />
        </div>
      )}
    </div>
  )
}

function FormActions({ onCancel, onConfirm }) {
  return (
    <div className="mt-5 flex items-center justify-center gap-3">
      <button
        onClick={onCancel}
        className="rounded-full bg-[#e9e9e9] px-5 py-2 text-[10px] font-medium text-black transition-colors hover:bg-white"
      >
        Cancel
      </button>
      <button
        onClick={onConfirm}
        className="rounded-full bg-[#191919] px-5 py-2 text-[10px] font-medium text-white ring-1 ring-[#232323] transition-colors hover:bg-[#1f1f1f]"
      >
        Confirm your action
      </button>
    </div>
  )
}

function ProfilePanel({ profile }) {
  return (
    <div className="flex flex-col items-center p-6">
      <PanelHeader title="Your Profile" />
      <div className="mt-4 size-20 rounded-full bg-[#e9e9e9]" />
      <p className="mt-3 text-lg font-semibold text-white">{profile.name}</p>
      <p className="mt-1 flex items-center gap-1 text-[10px] text-gray-400">
        <Globe size={10} className="text-[#2e7cf6]" />
        {profile.email}
      </p>
      <p className="mt-0.5 flex items-center gap-1 text-[10px] text-gray-400">
        <Mail size={10} className="text-[#2e7cf6]" />
        {profile.email}
      </p>

      <div className="mt-5 w-full rounded-xl bg-[#191919] p-4 text-center">
        <p className="text-xs font-medium text-white">Bio</p>
        <p className="mt-2 text-[10px] leading-relaxed text-gray-400">{profile.bio}</p>
      </div>

      <div className="mt-3 grid w-full grid-cols-2 gap-3">
        <div className="flex items-center gap-2 rounded-lg bg-[#191919] px-3 py-2.5">
          <MapPin size={11} className="shrink-0 text-[#2e7cf6]" />
          <span className="whitespace-nowrap text-[10px] text-gray-500">Locations :</span>
          <span className="truncate text-[10px] text-white">{profile.location}</span>
        </div>
        <div className="flex items-center gap-2 rounded-lg bg-[#191919] px-3 py-2.5">
          <Phone size={11} className="shrink-0 text-[#2e7cf6]" />
          <span className="whitespace-nowrap text-[10px] text-gray-500">Phone Number :</span>
          <span className="truncate text-[10px] text-white">{profile.phone}</span>
        </div>
      </div>
    </div>
  )
}

function InfoPanel({ profile, onSave }) {
  const [draft, setDraft] = useState({ bio: profile.bio, email: profile.email, phone: profile.phone })

  return (
    <div className="p-6">
      <PanelHeader title="Personal Info" />
      <FormField
        label="Your Bio"
        textarea
        placeholder="Your Bio"
        value={draft.bio}
        onChange={(bio) => setDraft((d) => ({ ...d, bio }))}
      />
      <FormField
        label="Email"
        icon={UserRound}
        placeholder="Frits Name"
        value={draft.email}
        onChange={(email) => setDraft((d) => ({ ...d, email }))}
      />
      <FormField
        label="Phone Number"
        icon={UserRound}
        placeholder="Frits Name"
        value={draft.phone}
        onChange={(phone) => setDraft((d) => ({ ...d, phone }))}
      />
      <FormActions
        onCancel={() => setDraft({ bio: profile.bio, email: profile.email, phone: profile.phone })}
        onConfirm={() => onSave(draft)}
      />
    </div>
  )
}

function SecurityPanel() {
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [twoFactor, setTwoFactor] = useState(true)
  const [saved, setSaved] = useState(false)

  const edit = (setter) => (v) => {
    setter(v)
    setSaved(false)
  }

  return (
    <div className="p-6">
      <PanelHeader title="Security" />
      <FormField
        label="New Password"
        icon={Lock}
        placeholder="Password"
        value={password}
        onChange={edit(setPassword)}
      />
      <FormField
        label="Confirm Password"
        icon={Lock}
        placeholder="Password"
        value={confirm}
        onChange={edit(setConfirm)}
      />
      <div className="mt-4 flex items-center justify-between rounded-lg bg-[#191919] px-3 py-3">
        <div>
          <p className="text-[10px] text-white">Two-Factor Authentication</p>
          <p className="mt-0.5 text-[10px] text-gray-500">Extra protection for your account</p>
        </div>
        <Toggle on={twoFactor} onClick={() => setTwoFactor((v) => !v)} />
      </div>
      {saved && <p className="mt-3 text-center text-[10px] text-[#22c55e]">Security updated</p>}
      <FormActions
        onCancel={() => {
          setPassword('')
          setConfirm('')
          setSaved(false)
        }}
        onConfirm={() => {
          setPassword('')
          setConfirm('')
          setSaved(true)
        }}
      />
    </div>
  )
}

function AppearancePanel() {
  const [color, setColor] = useState(brandColors[0])
  const [darkMode, setDarkMode] = useState(true)

  return (
    <div className="p-6">
      <PanelHeader title="Appearance" />
      <div className="mt-5 flex items-center justify-between">
        <div>
          <p className="text-xs text-white">Basic color</p>
          <p className="mt-0.5 text-[10px] text-gray-500">Select or customize your brand color</p>
        </div>
        <div className="flex items-center gap-2">
          {brandColors.map((hex) => (
            <button
              key={hex}
              onClick={() => setColor(hex)}
              aria-pressed={color === hex}
              style={{ backgroundColor: hex }}
              className={`size-5 rounded-full transition-transform ${
                color === hex ? 'scale-110 ring-2 ring-white ring-offset-2 ring-offset-[#121212]' : 'hover:scale-105'
              }`}
            />
          ))}
        </div>
      </div>
      <div className="mt-5 flex items-center justify-between">
        <div>
          <p className="text-xs text-white">Skin Color</p>
          <p className="mt-0.5 text-[10px] text-gray-500">Select or Active Dark Mode</p>
        </div>
        <Toggle on={darkMode} onClick={() => setDarkMode((v) => !v)} />
      </div>
    </div>
  )
}

function FooterCard() {
  const [open, setOpen] = useState(() => new Set())
  const [activeLink, setActiveLink] = useState(null)

  const toggleColumn = (i) =>
    setOpen((cur) => {
      const next = new Set(cur)
      if (next.has(i)) next.delete(i)
      else next.add(i)
      return next
    })

  return (
    <div className="flex flex-col gap-6 p-6">
      <div>
        <p className="flex items-center gap-2 text-lg font-bold text-white">
          <Diamond size={20} className="text-[#f97316]" />
          Bio Community
        </p>
        <p className="mt-3 text-[11px] leading-relaxed text-gray-400">
          Ease of shopping is our main focus. With powerful search features and customizable
          filters, you can easily find the products you are looking for.
        </p>
      </div>
      <div className="grid grid-cols-3 gap-3">
        {footerColumns.map((col, i) => (
          <div key={i} className="flex flex-col gap-2">
            <button
              onClick={() => toggleColumn(i)}
              className="flex items-center justify-between rounded-lg bg-[#191919] px-3 py-2.5 text-[11px] text-gray-200 transition-colors hover:bg-[#1f1f1f]"
              aria-expanded={open.has(i)}
            >
              {col.title}
              <ChevronDown
                size={13}
                className={`text-gray-400 transition-transform ${open.has(i) ? 'rotate-180' : ''}`}
              />
            </button>
            {open.has(i) &&
              col.links.map((link) => (
                <button
                  key={link}
                  onClick={() => setActiveLink(`${i}-${link}`)}
                  className={`rounded-lg px-3 py-2 text-left text-[10px] transition-colors ${
                    activeLink === `${i}-${link}`
                      ? 'bg-[#262626] text-[#2e7cf6]'
                      : 'text-gray-400 hover:bg-[#191919] hover:text-gray-200'
                  }`}
                >
                  {link}
                </button>
              ))}
          </div>
        ))}
      </div>
    </div>
  )
}

export default function ProfilePage() {
  const [section, setSection] = useState('profile')
  const [profile, setProfile] = useState(defaultProfile)

  return (
    <div className="flex min-w-0 flex-1 gap-4">
      <section className="flex w-[22rem] shrink-0 flex-col rounded-2xl bg-[#121212] p-4">
        <p className="flex items-center gap-2 px-1 text-sm text-white">
          <Settings size={15} className="text-gray-300" />
          Account Setting
        </p>
        <div className="mt-4 flex flex-col gap-3">
          {sections.map(({ id, label }) => {
            const active = section === id
            return (
              <button
                key={id}
                onClick={() => setSection(id)}
                className={`flex items-center gap-3 rounded-xl px-4 py-3.5 text-left text-xs transition-colors ${
                  active
                    ? 'bg-[#262626] text-white ring-1 ring-[#2e7cf6]'
                    : 'bg-[#191919] text-gray-200 hover:bg-[#1f1f1f]'
                }`}
              >
                <UserRound size={13} className={active ? 'text-[#2e7cf6]' : 'text-gray-400'} />
                {label}
                <Play size={12} className="ml-auto text-gray-400" />
              </button>
            )
          })}
        </div>
      </section>

      <section className="flex min-w-0 flex-1 flex-col gap-4 overflow-y-auto rounded-2xl bg-[#121212]">
        <div className="rounded-2xl bg-[#121212]">
          {section === 'profile' && <ProfilePanel profile={profile} />}
          {section === 'info' && (
            <InfoPanel
              profile={profile}
              onSave={(draft) => {
                setProfile((p) => ({ ...p, ...draft }))
                setSection('profile')
              }}
            />
          )}
          {section === 'security' && <SecurityPanel />}
          {section === 'appearance' && <AppearancePanel />}
        </div>
        <div className="rounded-2xl bg-[#121212]">
          <FooterCard />
        </div>
      </section>
    </div>
  )
}
