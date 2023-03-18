import { ExpandIcon } from '../atoms'

export function User() {
  return (
    <div className='bg-dark py-4 px-7 flex gap-7 items-center'>
      <picture className='flex'>
        <img className='w-10 h-10 rounded-lg ' src='/no-user.webp' alt='No user' />
      </picture>

      <h3>Xanthe Neal</h3>

      <button className='text-gray-400 w-6 h-6 flex justify-center items-center ml-auto'>
        <ExpandIcon />
      </button>
    </div>
  )
}
