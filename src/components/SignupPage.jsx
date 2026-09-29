import { useState } from 'react'
import { Search, MessageSquare, Users } from 'lucide-react'

function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-4 shrink-0" aria-hidden="true">
      <path
        fill="#4285F4"
        d="M23.5 12.27c0-.85-.08-1.66-.22-2.45H12v4.64h6.45a5.52 5.52 0 0 1-2.4 3.62v3h3.87c2.26-2.09 3.58-5.16 3.58-8.81Z"
      />
      <path
        fill="#34A853"
        d="M12 24c3.24 0 5.96-1.07 7.94-2.91l-3.87-3c-1.07.72-2.44 1.15-4.07 1.15-3.13 0-5.78-2.11-6.73-4.96H1.29v3.09A12 12 0 0 0 12 24Z"
      />
      <path
        fill="#FBBC05"
        d="M5.27 14.28a7.2 7.2 0 0 1 0-4.56V6.63H1.29a12 12 0 0 0 0 10.74l3.98-3.09Z"
      />
      <path
        fill="#EA4335"
        d="M12 4.77c1.76 0 3.34.6 4.58 1.79l3.44-3.44A11.98 11.98 0 0 0 1.29 6.63l3.98 3.09C6.22 6.88 8.87 4.77 12 4.77Z"
      />
    </svg>
  )
}

function Field({ label, type = 'text', value, onChange, placeholder }) {
  return (
    <label className="block">
      <span className="text-[11px] text-gray-300">{label}</span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="mt-1.5 w-full rounded-lg border border-[#232323] bg-[#111111] px-4 py-3 text-sm text-gray-200 placeholder-gray-500 outline-none transition-colors focus:border-[#2e7cf6]"
      />
    </label>
  )
}

function PreviewCollage() {
  return (
    <div className="relative mt-8 h-72 w-full max-w-md">
      <div className="absolute left-1/2 top-0 w-64 -translate-x-1/2 rounded-xl bg-[#191919] p-4 shadow-xl">
        <p className="flex items-center justify-center gap-2 text-[11px] text-gray-300">
          <Users size={12} className="text-[#2e7cf6]" />
          Your Community
        </p>
        <div className="mt-3 flex items-center gap-2 rounded-lg bg-[#0a0a0a] px-3 py-2">
          <span className="flex-1 text-[10px] text-gray-500">Search</span>
          <Search size={11} className="text-gray-500" />
        </div>
        <div className="mt-3 flex items-center gap-3 rounded-lg bg-[#1e1e1e] p-3">
          <span className="flex size-8 items-center justify-center rounded-lg bg-[#2e7cf6]">
            <MessageSquare size={13} className="text-white" />
          </span>
          <span className="min-w-0">
            <span className="block truncate text-[10px] text-white">App Dev Community</span>
            <span className="block truncate text-[9px] text-gray-500">Messenger here</span>
          </span>
        </div>
      </div>

      <div className="absolute left-0 top-24 w-44 -rotate-3 rounded-xl bg-[#191919] p-3 shadow-xl">
        <p className="text-center text-[10px] text-gray-300">Job Desk</p>
        <div className="mt-2 flex flex-col gap-1.5">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="flex items-center gap-2 rounded-md bg-[#1e1e1e] p-2">
              <MessageSquare size={10} className="shrink-0 text-[#ef4444]" />
              <span className="h-1.5 flex-1 rounded bg-[#2a2a2a]" />
            </div>
          ))}
        </div>
      </div>

      <div className="absolute right-0 top-28 w-44 rotate-3 rounded-xl bg-[#191919] p-3 shadow-xl">
        <p className="text-center text-[10px] text-gray-300">Rave Reviews Showcase</p>
        <div className="mt-2 flex flex-col gap-1.5">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="flex items-center gap-2 rounded-md bg-[#1e1e1e] p-2">
              <span className="size-5 shrink-0 rounded-full bg-[#e9e9e9]" />
              <span className="h-1.5 flex-1 rounded bg-[#2a2a2a]" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function SignupPage({ onNavigate }) {
  const [form, setForm] = useState({
    first: '',
    last: '',
    username: '',
    email: '',
    password: '',
  })
  const [remember, setRemember] = useState(false)
  const [forgotPressed, setForgotPressed] = useState(false)

  const set = (key) => (value) => setForm((cur) => ({ ...cur, [key]: value }))

  const submit = () => onNavigate('dashboard')

  return (
    <div className="flex min-h-screen w-full flex-col bg-[#0a0a0a] lg:flex-row">
      <section className="flex min-w-0 flex-1 flex-col items-center justify-center px-6 py-12 lg:px-16">
        <div className="w-full max-w-md">
          <h1 className="text-center text-2xl font-medium text-white">
            Welcome to <span className="font-semibold">Community</span>
          </h1>
          <p className="mx-auto mt-3 max-w-sm text-center text-[11px] leading-relaxed text-gray-400">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the
          </p>

          <form
            className="mt-8 flex flex-col gap-4"
            onSubmit={(e) => {
              e.preventDefault()
              submit()
            }}
          >
            <div className="grid grid-cols-2 gap-4">
              <Field
                label="First Name"
                placeholder="First Name"
                value={form.first}
                onChange={set('first')}
              />
              <Field
                label="Last Name"
                placeholder="Last Name"
                value={form.last}
                onChange={set('last')}
              />
            </div>
            <Field
              label="Username"
              placeholder="Username"
              value={form.username}
              onChange={set('username')}
            />
            <Field
              label="Email"
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={set('email')}
            />
            <Field
              label="Password"
              type="password"
              placeholder="Password"
              value={form.password}
              onChange={set('password')}
            />

            <div className="flex items-center justify-between">
              <label className="flex cursor-pointer items-center gap-2 text-[11px] text-gray-300">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                  className="size-3.5 rounded border-[#232323] bg-[#111111] accent-[#2e7cf6]"
                />
                Remember me
              </label>
              <button
                type="button"
                onClick={() => setForgotPressed((p) => !p)}
                aria-pressed={forgotPressed}
                className={`text-[11px] transition-colors ${
                  forgotPressed ? 'text-white underline' : 'text-[#2e7cf6] hover:text-[#5ea2ff]'
                }`}
              >
                Forgot password
              </button>
            </div>

            <button
              type="submit"
              className="mt-2 w-full rounded-lg bg-[#2e7cf6] py-3 text-sm font-medium text-white transition-colors hover:bg-[#2568d4]"
            >
              Register
            </button>
            <button
              type="button"
              onClick={submit}
              className="flex w-full items-center justify-center gap-3 rounded-lg bg-[#1e1e1e] py-3 text-sm text-gray-200 transition-colors hover:bg-[#262626]"
            >
              <GoogleIcon />
              Continue with Google
            </button>
          </form>
        </div>
      </section>

      <section className="flex min-w-0 flex-1 flex-col items-center justify-center bg-[#121212] px-6 py-12 lg:px-16">
        <h2 className="max-w-md text-center text-xl font-medium leading-snug text-white">
          Join a community according to your job at Bio Community
        </h2>
        <p className="mx-auto mt-3 max-w-sm text-center text-[11px] leading-relaxed text-gray-400">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text
          ever since the
        </p>
        <PreviewCollage />
      </section>
    </div>
  )
}
