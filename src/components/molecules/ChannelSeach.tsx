import { SearchIcon } from '../atoms'

export function ChannelSearch() {
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
          className='text-content absolute z-10 pointer-events-none w-6 left-3'
        >
          <SearchIcon />
        </div>
        <input
          type='text'
          name='channel'
          placeholder='Search'
          className='block w-full bg-gray-300 p-3 pl-11 outline-none rounded-lg text-content'
        />
      </div>
    </form>
  )
}
