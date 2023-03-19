import { useMemo, useState } from 'react'
import { useAutoAnimate } from '@formkit/auto-animate/react'

import { ChannelSearch } from './ChannelSeach'

const ALL_CHANNELS = [
  {
    id: 1,
    name: 'FRONT-END DEVELOPERS'
  },
  {
    id: 2,
    name: 'RANDOM'
  },
  {
    id: 3,
    name: 'BACK-END'
  },
  {
    id: 4,
    name: 'CATS AND DOGS'
  },
  {
    id: 5,
    name: 'WELCOME'
  }
]

export function Channels() {
  const [search, setSearch] = useState('')
  const [parent] = useAutoAnimate<HTMLUListElement>()

  const channels = useMemo(() => {
    return ALL_CHANNELS.map((channel) => {
      return {
        ...channel,
        firstLetters: channel.name
          .split(' ')
          .map((name) => name.slice(0, 1))
          .slice(0, 2)
          .join('')
      }
    })
  }, [])

  const filteredChannels = useMemo(() => {
    if (search === '') return channels

    return channels?.filter((channel) => channel.name.toLocaleLowerCase().includes(search.toLocaleLowerCase()))
  }, [channels, search])

  return (
    <div className='px-8 py-5 flex flex-col gap-8 flex-grow'>
      <ChannelSearch setSearch={setSearch} />

      <ul className='flex flex-col gap-6 flex-grow overflow-y-auto' ref={parent}>
        {filteredChannels.map(({ id, firstLetters, name }) => {
          return (
            <li key={id}>
              <button className='flex items-center gap-3 rounded-lg hover:bg-gray-300 transition-colors w-full'>
                <p className='w-10 h-10 flex justify-center items-center text-white bg-gray-200 rounded-lg font-semibold text-lg tracking-[-0.035em] uppercase'>
                  {firstLetters}
                </p>
                <h4>{name}</h4>
              </button>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
