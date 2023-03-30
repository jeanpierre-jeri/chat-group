import { useMemo, useState } from 'react'
import { useAutoAnimate } from '@formkit/auto-animate/react'

import { ChannelSearch } from '../ChannelSearch'
import { Room } from '../../../../types'

import styles from './styles.module.css'

interface ChannelProps {
  setActiveChannelId: (id: Room['id']) => void
  setIsAllChannelsActive: (isAllChannelsActive: boolean) => void
  setUserToChannel: (id: Room['id']) => void
  setIsAsideActive: (isAsideActive: boolean) => void
  rooms: Room[]
}

export function Channels({
  rooms,
  setActiveChannelId,
  setIsAllChannelsActive,
  setUserToChannel,
  setIsAsideActive
}: ChannelProps) {
  const [search, setSearch] = useState('')
  const [parent] = useAutoAnimate<HTMLUListElement>()

  const channels = useMemo(() => {
    return rooms.map((channel) => {
      return {
        ...channel,
        firstLetters: channel.name
          .split(' ')
          .map((name) => name.slice(0, 1))
          .slice(0, 2)
          .join('')
      }
    })
  }, [rooms])

  const filteredChannels = useMemo(() => {
    if (search === '') return channels

    return channels?.filter((channel) =>
      channel.name.toLowerCase().includes(search.toLowerCase())
    )
  }, [channels, search])

  const handleCurrentChannel = (id: Room['id']) => {
    setActiveChannelId(id)
    setIsAllChannelsActive(false)
    setUserToChannel(id)
    setIsAsideActive(false)
  }

  return (
    <div className='px-8 py-5 flex flex-col gap-8 flex-grow overflow-y-auto'>
      <ChannelSearch setSearch={setSearch} />

      <ul
        className={`flex flex-col gap-6 flex-grow overflow-y-auto ${styles.channels}`}
        ref={parent}
      >
        {filteredChannels.map(({ id, firstLetters, name }) => {
          return (
            <li key={id}>
              <button
                onClick={() => handleCurrentChannel(id)}
                className='flex items-center gap-3 rounded-lg hover:bg-gray-300 transition-colors w-full'
              >
                <p className='w-10 h-10 flex justify-center items-center text-white bg-gray-200 rounded-lg font-semibold text-lg tracking-[-0.035em] uppercase'>
                  {firstLetters}
                </p>
                <h4 className='text-start'>{name}</h4>
              </button>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
