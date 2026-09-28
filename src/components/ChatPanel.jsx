import { ChevronUp, MoreVertical, Paperclip, Star } from 'lucide-react'

const messages = [
  {
    id: 1,
    sender: 'John Doe Indra',
    color: 'blue',
    text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
  },
  {
    id: 2,
    sender: 'John Doe Indra',
    color: 'orange',
    text: 'Lorem Ips\nsnfskf\num is simply dummy text of',
  },
  { id: 3, divider: 'Sunday 09:07' },
  {
    id: 4,
    sender: 'John Doe Indra',
    color: 'blue',
    own: true,
    text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
  },
  {
    id: 5,
    sender: 'John Doe Indra',
    color: 'orange',
    text: 'Lorem Ipsum is simply dummy text of',
  },
  { id: 6, divider: 'Sunday 09:07' },
  {
    id: 7,
    sender: 'John Doe Indra',
    color: 'orange',
    text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
  },
  {
    id: 8,
    text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,",
  },
]

function MessageBubble({ message }) {
  return (
    <div>
      {message.sender && (
        <div className="flex items-center gap-3">
          <div className="size-9 shrink-0 rounded-full bg-[#ececec]" />
          <span
            className={`text-sm font-bold ${
              message.color === 'orange' ? 'text-[#f97316]' : 'text-[#2e7cf6]'
            }`}
          >
            {message.sender}
          </span>
        </div>
      )}
      <div
        className={`mt-2 max-w-md whitespace-pre-line rounded-xl px-5 py-3 text-sm leading-relaxed ${
          message.own ? 'bg-[#2e7cf6] text-white' : 'bg-[#1e1e1e] text-gray-200'
        } ${message.sender ? 'ml-12' : ''}`}
      >
        {message.text}
      </div>
    </div>
  )
}

export default function ChatPanel() {
  return (
    <section className="flex min-w-0 flex-1 flex-col rounded-2xl bg-[#121212]">
      <header className="flex items-center gap-3 p-4">
        <div className="size-10 shrink-0 rounded-full bg-[#e9e9e9]" />
        <div className="min-w-0">
          <p className="truncate text-sm text-white">Place Your Name Here</p>
          <p className="truncate text-[11px] text-gray-400">Messeger here</p>
          <p className="text-[10px] text-gray-500">06/07/24</p>
        </div>
        <div className="ml-auto flex items-center gap-3">
          <Star size={16} className="text-[#2e7cf6]" />
          <MoreVertical size={16} className="text-gray-400" />
        </div>
      </header>

      <div className="flex flex-1 flex-col gap-6 overflow-y-auto px-6 py-4">
        {messages.map((message) =>
          message.divider ? (
            <p key={message.id} className="text-center text-[10px] text-gray-500">
              {message.divider}
            </p>
          ) : (
            <MessageBubble key={message.id} message={message} />
          ),
        )}
      </div>

      <div className="p-4 pt-0">
        <div className="flex items-center gap-3 rounded-xl bg-[#1e1e1e] px-5 py-3">
          <input
            type="text"
            placeholder="Write a messege......."
            className="min-w-0 flex-1 bg-transparent text-sm text-gray-200 placeholder-gray-500 outline-none"
          />
          <Paperclip size={16} className="shrink-0 text-gray-400" />
          <button className="flex size-9 shrink-0 items-center justify-center rounded-full bg-[#7c4dff] text-white transition-colors hover:bg-[#6a3fe0]">
            <ChevronUp size={16} />
          </button>
        </div>
      </div>
    </section>
  )
}
