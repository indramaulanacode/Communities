import { useState } from 'react'

export default function useActive(initial = null) {
  const [active, setActive] = useState(initial)
  return [active, (id) => setActive((cur) => (cur === id ? null : id))]
}
