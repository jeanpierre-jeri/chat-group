import { SendIcon } from '@/components/atoms'
import { UserMessage } from '@/components/molecules'
import { useMessages, useSupabaseClient } from '@/hooks'
import { groupMessages, MessageWithUser } from '@/lib/groupMessages'
import { useAutoAnimate } from '@formkit/auto-animate/react'
import { useEffect } from 'react'
import { Room } from '../../../../types'
import styles from './styles.module.css'

interface ChatProps {
  roomId: Room['id']
}

export function Chat({ roomId }: ChatProps) {
  const { messages, setMessages } = useMessages(roomId)
  const supabase = useSupabaseClient()
  const [parent] = useAutoAnimate<HTMLUListElement>()

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

          setMessages(() => groupMessages(data as MessageWithUser[]))
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [supabase, setMessages, roomId])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const form = e.currentTarget

    form.style.pointerEvents = 'none'

    const { content } = Object.fromEntries(new FormData(form)) as {
      content: string
    }

    const { error } = await supabase
      .from('messages')
      .insert({ content, room_id: roomId })

    if (error) {
      console.log('Hubo un error creando el mensaje', error)
    }

    form.style.pointerEvents = 'auto'

    form.reset()
  }
  return (
    <div className='pb-10 overflow-y-auto flex flex-col gap-12 flex-grow'>
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
      <form onSubmit={handleSubmit} className='px-16'>
        <div className='relative'>
          <input
            type='text'
            className='flex w-full rounded-lg bg-gray-300 p-4 pr-14 text-sm tracking-[-0.035em] font-medium'
            placeholder='Type a message here'
            name='content'
          />
          <button
            type='submit'
            className={`${styles.send} absolute w-[2.4rem] h-[2.4rem] rounded-lg flex items-center justify-center p-2`}
          >
            <SendIcon />
          </button>
        </div>
      </form>
    </div>
  )
}
