import { ChatMessage } from '@/components/organisms'

const getDay = (date: string) => {
  const newDate = new Date(date)

  return new Intl.DateTimeFormat('en-US', {
    month: 'long',
    day: '2-digit',
    year: 'numeric'
  }).format(newDate)
}

export type MessageWithUser = {
  id: string
  created_at: string
  content: string
  users: {
    full_name: string
    avatar_url: string
  }
}

export const groupMessages = (messages: MessageWithUser[]): ChatMessage[] => {
  const newMessages = new Map()

  messages.forEach(({ created_at, id, content, users }) => {
    const day = getDay(created_at)
    const mapDateMessage = newMessages.get(day)

    if (!mapDateMessage) {
      newMessages.set(day, {
        day,
        messages: [{ created_at, id, content, users }]
      })

      return
    }

    mapDateMessage.messages.unshift({ created_at, id, content, users })
    newMessages.set(day, mapDateMessage)
  })

  return Array.from(newMessages.values())
}
