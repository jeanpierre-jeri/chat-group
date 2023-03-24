import { useRef } from 'react'
import { useSupabaseClient } from '@/hooks'
import { Room } from '../../../types'

interface AddNewChannelProps {
  isOverlayActive: boolean
  setIsOverlayActive: (isOverlayActive: boolean) => void
  setRooms: React.Dispatch<React.SetStateAction<Room[]>>
}

type NewRoom = Pick<Room, 'name' | 'description'>

export const AddNewChannel = ({
  isOverlayActive,
  setIsOverlayActive,
  setRooms
}: AddNewChannelProps) => {
  const form = useRef<HTMLFormElement>(null)
  const supabase = useSupabaseClient()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const form = e.currentTarget

    form.style.pointerEvents = 'none'

    const formData = Object.fromEntries(new FormData(form)) as NewRoom

    const { error, data } = await supabase
      .from('rooms')
      .insert(formData)
      .select()

    if (error) {
      console.error('Error creando room', error)
      form.style.pointerEvents = 'auto'
      return
    }

    setRooms((prev) => [...prev, data[0]])
    setIsOverlayActive(false)
    form.reset()
    form.style.pointerEvents = 'auto'
  }

  const handleCloseModal = () => {
    setIsOverlayActive(false)
    form.current?.reset()
  }

  return (
    <>
      <div
        className={`fixed inset-0 z-10  bg-black/70 transition-opacity duration-300  ${
          isOverlayActive
            ? 'opacity-100 pointer-events-auto'
            : 'pointer-events-none opacity-0'
        } `}
        onClick={handleCloseModal}
      ></div>
      <div
        className={`fixed top-1/2 left-1/2 translate-x-[-50%] w-[41rem] max-w-[80%] translate-y-[-50%] rounded-3xl bg-secondary px-11 py-8 z-10 transition-opacity duration-300 ${
          isOverlayActive
            ? 'opacity-100 pointer-events-auto'
            : 'pointer-events-none opacity-0'
        }`}
      >
        <h3 className='mb-8 font-bold uppercase text-white text-lg tracking-tight'>
          New Channel
        </h3>
        <form
          className='flex flex-col gap-7'
          onSubmit={handleSubmit}
          ref={form}
        >
          <input
            type='text'
            name='name'
            id='name'
            placeholder='Channel name'
            className='bg-gray-300 placeholder:text-gray-100 rounded-[8px] py-3 px-4 outline-none border-none'
          />
          <textarea
            name='description'
            id='description'
            cols={30}
            rows={5}
            placeholder='Channel Description'
            className='bg-gray-300 placeholder:text-gray-100 outline-none border-none rounded-[8px] py-3 px-4 resize-none'
          ></textarea>
          <div className='flex justify-end items-center'>
            <button
              type='submit'
              className='inline-block rounded-[8px] font-medium text-lg py-2 px-8 text-center text-white bg-[#2F80ED]'
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </>
  )
}
