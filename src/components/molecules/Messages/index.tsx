import { type Dispatch, type SetStateAction, useEffect } from 'react'
import { useAutoAnimate } from '@formkit/auto-animate/react'
import { ChatMessage, useSupabaseClient } from '@/hooks'
import { UserMessage } from '../UserMessage'
import { groupMessages, type MessageWithUser } from '@/lib/groupMessages'
import styles from './styles.module.css'

interface Props {
  messages: ChatMessage[]
  roomId: string
  setMessages: Dispatch<SetStateAction<ChatMessage[]>>
}

export function Messages({ messages, roomId, setMessages }: Props) {
  const [parent] = useAutoAnimate<HTMLUListElement>()
  const supabase = useSupabaseClient()

  useEffect(() => {
    const channel = supabase
      .channel('realtime chat')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'messages',
          filter: `room_id=eq.${roomId}`
        },
        async (payload) => {
          const { data } = await supabase
            .from('messages')
            .select('id, created_at, content, users(full_name, avatar_url)')
            .eq('room_id', payload.new.room_id)
            .order('created_at', { ascending: false })
            .range(0, 100)

          setMessages(() => groupMessages(data as MessageWithUser[]))
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [supabase, setMessages, roomId])

  return (
    <section
      className={`pt-24 px-16 flex-grow gap-9 flex flex-col-reverse overflow-y-auto ${styles.messages}`}
    >
      {messages?.map(({ day, messages }) => {
        return (
          <ul key={day} className='flex flex-col gap-8'>
            <li className={styles.DateGroup}>
              <time className='bg-primary px-5'>{day}</time>
            </li>
            <li>
              <ul className='flex flex-col gap-9' ref={parent}>
                {messages.map(({ id, created_at, content, users }) => {
                  const { avatar_url, full_name } = users
                  return (
                    <UserMessage
                      key={id}
                      createdAt={created_at}
                      message={content}
                      name={full_name}
                      userImg={avatar_url}
                    />
                  )
                })}
              </ul>
            </li>
          </ul>
        )
      })}
    </section>
  )
}
