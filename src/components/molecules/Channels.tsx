import { useMemo } from 'react'
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
  return (
    <div className='px-8 py-5 flex flex-col gap-8 flex-grow overflow-y-auto'>
      <ChannelSearch />

      <div className='flex flex-col gap-6 overflow-y-auto'>
        {channels.map(({ id, firstLetters, name }) => {
          return (
            <button key={id} className='flex items-center gap-3 rounded-lg hover:bg-gray-300 transition-colors'>
              <p className='w-10 h-10 flex justify-center items-center text-white bg-gray-200 rounded-lg font-semibold text-lg tracking-[-0.035em]'>
                {firstLetters}
              </p>
              <h4>{name}</h4>
            </button>
          )
        })}
      </div>
    </div>
  )
}
