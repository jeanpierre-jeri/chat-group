import type { ChatMessage } from '@/hooks'

export type MessageWithUser = {
  id: string
  created_at: string
  content: string
  users: {
    full_name: string
    avatar_url: string
  }
}

export function groupMessages(messages: MessageWithUser[]): ChatMessage[] {
  const newMessages = new Map()

  messages.forEach(({ created_at, id, content, users }) => {
    const day = getDay(created_at)
    const mapDateMessage = newMessages.get(day)

    if (!mapDateMessage) {
      newMessages.set(day, {
        day,
        messages: [{ created_at: formatTime(created_at), id, content, users }]
      })

      return
    }

    mapDateMessage.messages.unshift({
      created_at: formatTime(created_at),
      id,
      content,
      users
    })
    newMessages.set(day, mapDateMessage)
  })

  return Array.from(newMessages.values())
}

function getDay(date: string) {
  const newDate = new Date(date)

  return new Intl.DateTimeFormat('en-US', {
    month: 'long',
    day: '2-digit',
    year: 'numeric'
  }).format(newDate)
}

function formatTime(date: string): string {
  const newDate = new Date(date)

  const time = new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: 'numeric'
  }).format(newDate)
  if (newDate.toDateString() === new Date().toDateString())
    return `today at ${time}`

  const yesterday = new Date()
  yesterday.setDate(yesterday.getDate() - 1)

  if (yesterday.toDateString() === newDate.toDateString())
    return `yesterday at ${time}`

  return new Intl.DateTimeFormat('en-US', {
    month: '2-digit',
    year: '2-digit',
    day: '2-digit',
    hour: 'numeric',
    minute: 'numeric'
  }).format(newDate)
}
