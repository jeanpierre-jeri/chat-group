import { SearchIcon } from '../atoms'

interface Props {
  setSearch: (value: string) => void
}

export function ChannelSearch({ setSearch }: Props) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
  }
  return (
    <form onSubmit={handleSubmit}>
      <div className='relative'>
        <div
          style={{
            top: '50%',
            transform: 'translateY(-50%'
          }}
          className='text-content absolute pointer-events-none w-6 left-3'
        >
          <SearchIcon />
        </div>
        <input
          onInput={(e) => setSearch(e.currentTarget.value)}
          type='text'
          name='channel'
          placeholder='Search'
          className='block w-full bg-gray-300 p-3 pl-11 rounded-lg text-content text-sm'
        />
      </div>
    </form>
  )
}
