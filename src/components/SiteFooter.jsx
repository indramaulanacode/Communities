import { Diamond, LayoutGrid } from 'lucide-react'
import useActive from '../hooks/useActive.js'

function LogoStrip() {
  const [active, toggle] = useActive()
  const logos = [
    {
      key: 'blo',
      node: (
        <span className="flex items-center gap-4">
          <Diamond size={30} className="text-gray-300" />
          <span className="text-2xl font-bold text-white">Blo Community</span>
        </span>
      ),
    },
    { key: 'php', node: <span className="text-4xl font-black italic">php</span> },
    {
      key: 'slack',
      node: (
        <span className="flex items-center gap-2 text-3xl font-bold">
          <LayoutGrid size={26} />
          slack
        </span>
      ),
    },
    { key: 'percy', node: <span className="text-3xl font-bold">percy</span> },
    { key: 'paysafe', node: <span className="text-3xl font-bold">Paysafe:</span> },
  ]
  return (
    <div className="flex shrink-0 flex-wrap items-center gap-x-14 gap-y-4 rounded-2xl bg-[#161616] px-10 py-7">
      {logos.map(({ key, node }) => (
        <button
          key={key}
          onClick={() => toggle(key)}
          className={`transition-colors ${
            active === key ? 'text-white' : 'text-[#4b4b4b] hover:text-gray-300'
          }`}
        >
          {node}
        </button>
      ))}
    </div>
  )
}

function Footer() {
  const columns = [
    ['Service', 'Contact Us', 'Affilate Program', 'About Us'],
    ['Dashboard', 'Platform', 'Worksci Library', 'App Design'],
    ['About Us'],
  ]
  const [active, toggle] = useActive()
  return (
    <div className="flex shrink-0 flex-wrap gap-x-20 gap-y-8 rounded-2xl bg-[#161616] p-10">
      <div className="max-w-sm">
        <span className="flex items-center gap-4">
          <Diamond size={32} className="text-[#f97316]" />
          <span className="text-3xl font-bold text-white">Blo Community</span>
        </span>
        <p className="mt-5 text-sm leading-relaxed text-gray-400">
          Ease of shopping is our main focus. With powerful search features and
          customizable filters, you can easily find the products you are looking
          for.
        </p>
      </div>
      {columns.map((links, i) => (
        <div key={i}>
          <p className="text-sm font-semibold text-white">Get Started</p>
          <ul className="mt-4 space-y-3">
            {links.map((link) => {
              const key = `${i}-${link}`
              return (
                <li key={link}>
                  <button
                    onClick={() => toggle(key)}
                    className={`text-xs transition-colors ${
                      active === key ? 'text-white' : 'text-gray-400 hover:text-gray-200'
                    }`}
                  >
                    {link}
                  </button>
                </li>
              )
            })}
          </ul>
        </div>
      ))}
    </div>
  )
}

export default function SiteFooter() {
  return (
    <div className="flex shrink-0 flex-col gap-4">
      <LogoStrip />
      <Footer />
    </div>
  )
}
