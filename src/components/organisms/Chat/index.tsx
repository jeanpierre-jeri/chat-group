import { SendIcon } from '@/components/atoms'
import { Messages } from '@/components/molecules'
import { useMessages, useSupabaseClient } from '@/hooks'
import { useRef } from 'react'
import { Room } from '../../../../types'
import styles from './styles.module.css'

interface ChatProps {
  roomId: Room['id']
}

export function Chat({ roomId }: ChatProps) {
  const { messages, setMessages } = useMessages(roomId)
  const supabase = useSupabaseClient()
  const inputRef = useRef<HTMLInputElement>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget

    const content = inputRef.current?.value.trim() as string

    if (content === '') return

    const { error } = await supabase
      .from('messages')
      .insert({ content, room_id: roomId })

    if (error) {
      console.log('Hubo un error creando el mensaje', error)
    }

    form.reset()
    inputRef.current?.focus()
  }

  return (
    <div className='pb-6 md:pb-10 overflow-y-auto flex flex-col gap-8 md:gap-12 flex-grow'>
      <Messages messages={messages} setMessages={setMessages} roomId={roomId} />
      <form onSubmit={handleSubmit} className='px-5 md:px-16'>
        <div className='relative'>
          <input
            ref={inputRef}
            type='text'
            className='flex w-full rounded-lg bg-gray-300 p-4 pr-14 text-xs md:text-sm tracking-[-0.035em] font-medium'
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
