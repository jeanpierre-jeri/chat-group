import { useRouter } from 'next/router'
import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react'
import { LogoutIcon } from '../atoms'

export function User() {
  const router = useRouter()
  const supabase = useSupabaseClient()
  const user = useUser()

  async function signout() {
    const { error } = await supabase.auth.signOut()
    if (error) {
      console.error(error)
      return
    }
    router.push('/login')
  }

  return (
    <div className='bg-dark py-4 px-7 flex gap-7 items-center'>
      <picture className='flex'>
        <img
          className='w-10 h-10 rounded-lg '
          src={user?.user_metadata.avatar_url}
          alt='No user'
        />
      </picture>

      <h3>{user?.user_metadata.name}</h3>

      <button
        onClick={signout}
        className='text-[#EB5757] w-6 h-6 flex justify-center items-center ml-auto hover:outline-1 hover:outline hover:outline-offset-4 hover:outline-red-500 rounded'
      >
        <LogoutIcon />
      </button>
    </div>
  )
}
