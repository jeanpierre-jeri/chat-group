import { useMemo, useState } from 'react'
import Head from 'next/head'

import { PlusIcon, LeftArrowIcon } from '@/components/atoms'
import {
  AddNewChannel,
  Channels,
  User,
  InfoCurrentChannel
} from '@/components/molecules'
import { Chat } from '@/components/organisms'
import { useSupabaseClient } from '@/hooks'
import { createSupabaseServer } from '@/lib'

import type { GetServerSideProps } from 'next'
import type { MessagesList } from '@/interfaces'
import type { Room, User as UserType } from '../../types'
import { useUser } from '@supabase/auth-helpers-react'

interface HomeProps {
  initialRooms: Room[]
}

const messages: MessagesList[] = []

export default function Home({ initialRooms }: HomeProps) {
  const [isOverlayActive, setIsOverlayActive] = useState(false)
  const [isAllChannelsActive, setIsAllChannelsActive] = useState(true)
  const [activeChannelId, setActiveChannelId] = useState('')
  const [rooms, setRooms] = useState(initialRooms)
  const [members, setMembers] = useState<UserType[]>([])
  const supabase = useSupabaseClient()
  const user = useUser()

  const activeChannel = useMemo(() => {
    if (activeChannelId === '') return undefined
    return rooms.find((room) => room.id === activeChannelId)
  }, [activeChannelId, rooms])

  const setUserToChannel = async (roomId: Room['id']) => {
    if (roomId === activeChannelId) return

    const { data } = await supabase
      .from('rooms_users')
      .select()
      .eq('room_id', roomId)
      .eq('user_id', user?.id)

    if (data?.length === 0) {
      const { error } = await supabase
        .from('rooms_users')
        .upsert({ room_id: roomId })

      if (error) {
        console.log(
          'Error al insertar en usuario y room id a tabla rooms_users',
          { error }
        )
      }
    }

    const { data: roomMembers } = await supabase
      .from('rooms_users')
      .select('id, created_at, users(*)')
      .eq('room_id', roomId)

    const members = roomMembers?.map(({ users }) => {
      return users
    }) as UserType[]

    setMembers(members)
  }

  return (
    <>
      <Head>
        <title>Chat Group</title>
        <meta name='description' content='Generated by create next app' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <div className='min-h-screen flex max-h-screen'>
        <aside className='w-[22.5%] flex-shrink-0 bg-secondary min-w-[20.25rem] flex flex-col'>
          {isAllChannelsActive ? (
            <>
              <div
                style={{
                  boxShadow: 'var(--shadow)'
                }}
                className='flex justify-between items-center px-8 py-4 h-16'
              >
                <h3 className='text-lg font-bold tracking-[-0.035em]'>
                  Channels
                </h3>
                <button
                  className='text-[#f2f2f2] w-8 h-8 rounded-lg bg-gray-200 flex justify-center items-center p-1'
                  onClick={() => setIsOverlayActive(true)}
                >
                  <PlusIcon />
                </button>
              </div>
              <Channels
                rooms={rooms}
                setActiveChannelId={setActiveChannelId}
                setIsAllChannelsActive={setIsAllChannelsActive}
                setUserToChannel={setUserToChannel}
              />
            </>
          ) : (
            <>
              <div
                style={{
                  boxShadow: 'var(--shadow)'
                }}
                className='flex gap-5 items-center px-8 py-4 h-16'
              >
                <button onClick={() => setIsAllChannelsActive(true)}>
                  <LeftArrowIcon />
                </button>
                <h3 className='text-lg font-bold tracking-[-0.035em]'>
                  All Chanells
                </h3>
              </div>
              <InfoCurrentChannel
                name={activeChannel?.name as string}
                description={activeChannel?.description as string}
                members={members}
              />
            </>
          )}
          <User />
        </aside>
        <main className='flex-grow flex-shrink-0 flex flex-col max-h-screen'>
          {activeChannelId ? (
            <>
              <div
                style={{ boxShadow: 'var(--shadow)' }}
                className='h-16 py-4 px-16 flex items-center flex-shrink-0'
              >
                <h1 className='text-lg font-bold tracking-[-0.035em]'>
                  {activeChannel?.name}
                </h1>
              </div>
              <Chat messages={messages} roomId={activeChannelId} />
            </>
          ) : (
            <div className='flex justify-center items-center text-center flex-grow p-4'>
              <h2 className='text-2xl font-bold'>
                Enter a channel to start chatting! 😁
              </h2>
            </div>
          )}
        </main>
      </div>
      <AddNewChannel
        setRooms={setRooms}
        isOverlayActive={isOverlayActive}
        setIsOverlayActive={setIsOverlayActive}
      />
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const supabase = createSupabaseServer(ctx)

  const { data } = await supabase.auth.getSession()
  const { session } = data

  if (!session) {
    return {
      redirect: {
        destination: '/login',
        permanent: false
      }
    }
  }

  const { data: rooms, error } = await supabase.from('rooms').select()

  if (error) {
    console.log('Error en select tabla rooms', error)
  }

  return {
    props: {
      initialSessions: session,
      user: session.user,
      initialRooms: rooms
    }
  }
}
