import { useEffect } from 'react'
import type { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import Head from 'next/head'
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs'

import { GithubIcon, GoogleIcon } from '@/components/atoms'

export default function Login() {
  const router = useRouter()
  const supabase = useSupabaseClient()
  const session = useSession()

  useEffect(() => {
    if (session !== null) {
      router.push('/')
    }
  }, [session, router])

  const signInWithGitHub = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'github'
    })

    if (error) {
      console.error('Error iniciando sesión', error)
    }
  }

  const signInWithGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google'
    })

    if (error) {
      console.error('Error iniciando sesión', error)
    }
  }

  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      <div className='h-full bg-gradient-to-tl  w-full py-16 px-4 min-h-screen flex justify-center items-center'>
        <div className='flex flex-col items-center justify-center'>
          <div className='bg-primary shadow rounded w-fit max-w-full'>
            <h1 className='focus:outline-none text-4xl font-extrabold text-white text-center'>
              Login to Chat
            </h1>
            <p className='focus:outline-none text-sm mt-3 font-medium leading-none text-white text-center'>
              {"Don't have an account?"}
            </p>
            <div className='mt-8 flex flex-col gap-4'>
              <button
                aria-label='Continue with google'
                role='button'
                className='focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-gray-700 py-3.5 px-4 border rounded-lg border-gray-700 flex items-center w-full hover:bg-gray-300 transition-colors'
                onClick={signInWithGoogle}
              >
                <GoogleIcon />
                <p className='text-base font-medium ml-4 text-white'>
                  Continue with Google
                </p>
              </button>
              <button
                aria-label='Continue with github'
                role='button'
                className='focus:outline-none  focus:ring-2 focus:ring-offset-1 focus:ring-gray-700 py-3.5 px-4 border rounded-lg border-gray-700 flex items-center w-full hover:bg-gray-300 transition-colors'
                onClick={signInWithGitHub}
              >
                <GithubIcon />
                <p className='text-base font-medium ml-4 text-white'>
                  Continue with Github
                </p>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const supabase = createServerSupabaseClient(ctx)

  const { data } = await supabase.auth.getSession()
  const { session } = data

  if (session)
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }

  return {
    props: {}
  }
}
