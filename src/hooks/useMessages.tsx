import { useEffect, useState } from 'react'
import { useSupabaseClient } from './useSupabaseClient'
import { Room } from '../../types'
import { groupMessages, type MessageWithUser } from '@/lib/groupMessages'

export type ChatMessage = {
  day: string
  messages: {
    id: string
    created_at: string
    content: string
    users: {
      full_name: string
      avatar_url: string
    }
  }[]
}

export function useMessages(roomId: Room['id']) {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const supabase = useSupabaseClient()

  useEffect(() => {
    if (roomId === '') return

    const getMessages = async () => {
      const { data } = await supabase
        .from('messages')
        .select('id, created_at, content, users(full_name, avatar_url)')
        .eq('room_id', roomId)
        .order('created_at', { ascending: false })

      setMessages(() => groupMessages(data as MessageWithUser[]))
    }

    getMessages()
  }, [roomId, supabase])

  return { messages, setMessages }
}
