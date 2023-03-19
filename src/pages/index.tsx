import Head from 'next/head'
import { useState } from 'react'

import { LeftArrowIcon, PlusIcon } from '@/components/atoms'
import {
  AddNewChannel,
  Channels,
  InfoCurrentChannel,
  User
} from '@/components/molecules'
import { Chat } from '@/components/organisms'
import { Member, MessagesList } from '@/interfaces'

const ALL_CHANNELS = [
  {
    id: 1,
    name: 'FRONT-END DEVELOPERS',
    description:
      "Welcome to our web development channel, where we cover a wide range of topics related to building websites and web applications. From front-end technologies like HTML, CSS, and JavaScript to back-end languages and frameworks like PHP, Node.js, and Ruby on Rails, our channel offers expert tutorials, code walkthroughs, and live coding sessions to help you stay up-to-date with the latest tools and practices in the industry. Whether you're a seasoned developer or just starting out, join our community of like-minded developers and discover new ways to build better, faster, and more scalable web applications.",
    members: [
      {
        id: 5,
        name: 'Nellie Francis',
        userImg: 'https://randomuser.me/api/portraits/women/1.jpg'
      },
      {
        id: 6,
        name: 'Shaunna Firth',
        userImg: 'https://randomuser.me/api/portraits/women/3.jpg'
      },
      {
        id: 7,
        name: 'Denzel Barrett',
        userImg: 'https://randomuser.me/api/portraits/men/4.jpg'
      }
    ],
    messagesList: [
      {
        id: 2,
        date: 'August 3, 2020',
        messages: [
          {
            id: 5,
            name: 'Nellie Francis',
            createdAt: 'today at 2:29 AM',
            message:
              'Class aptent taciti sociosqu ad litora torquent per conubia nostra 😀',
            userImg: 'https://randomuser.me/api/portraits/women/1.jpg'
          },
          {
            id: 6,
            name: 'Shaunna Firth',
            createdAt: 'today at 1:29 PM',
            message:
              'Orci varius natoque penatibus et magnis dis parturient montes 😀',
            userImg: 'https://randomuser.me/api/portraits/women/3.jpg'
          },
          {
            id: 7,
            name: 'Denzel Barrett',
            createdAt: 'today at 2:39 PM',
            message:
              'Aenean tempus nibh vel est lobortis euismod. Vivamus laoreet viverra nunc 🐶',
            userImg: 'https://randomuser.me/api/portraits/men/4.jpg'
          }
        ]
      },
      {
        id: 1,
        date: 'August 2, 2020',
        messages: [
          {
            id: 1,
            name: 'Nellie Francis',
            createdAt: 'yesterday at 2:29 AM',
            message:
              'Suspendisse enim tellus, elementum quis dictum sed, sodales at mauris 😀',
            userImg: 'https://randomuser.me/api/portraits/women/1.jpg'
          },
          {
            id: 2,
            name: 'Annaliese Huynh',
            createdAt: 'yesterday at 2:29 AM',
            message:
              'Orci varius natoque penatibus et magnis dis parturient montes 😀',
            userImg: 'https://randomuser.me/api/portraits/women/2.jpg'
          },
          {
            id: 3,
            name: 'Xanthe Neal',
            createdAt: 'yesterday at 1:29 PM',
            message:
              'Etiam eleifend fermentum ipsum eu rhoncus. In non justo aliquam, imperdiet metus id, tincidunt orci 😍',
            userImg: 'https://randomuser.me/api/portraits/men/3.jpg'
          },
          {
            id: 4,
            name: 'Denzel Barrett',
            createdAt: 'yesterday at 2:39 PM',
            message: 'Proin pretium id nunc eu molestie. Nam consectetur',
            userImg: 'https://randomuser.me/api/portraits/men/4.jpg'
          }
        ]
      }
    ]
  },
  {
    id: 2,
    name: 'RANDOM',
    description:
      "Welcome to our random channel, where you never know what you're going to get! From bizarre memes to funny videos, strange news stories to unusual hobbies, our channel is a hodgepodge of eclectic content that will keep you entertained and engaged. Join our community of fellow curious minds and discover something new every day. Whether you're looking for a laugh, a mind-bending experience, or just a little bit of randomness in your life, our channel has something for everyone. ",
    members: [
      {
        id: 1,
        name: 'Nellie Francis',
        userImg: 'https://randomuser.me/api/portraits/women/1.jpg'
      },
      {
        id: 2,
        name: 'Annaliese Huynh',
        userImg: 'https://randomuser.me/api/portraits/women/2.jpg'
      },
      {
        id: 3,
        name: 'Xanthe Neal',
        userImg: 'https://randomuser.me/api/portraits/men/3.jpg'
      }
    ],
    messagesList: [
      {
        id: 2,
        date: 'August 3, 2020',
        messages: [
          {
            id: 5,
            name: 'Nellie Francis',
            createdAt: 'today at 2:29 AM',
            message:
              'Class aptent taciti sociosqu ad litora torquent per conubia nostra 😀',
            userImg: 'https://randomuser.me/api/portraits/women/1.jpg'
          },
          {
            id: 6,
            name: 'Shaunna Firth',
            createdAt: 'today at 1:29 PM',
            message:
              'Orci varius natoque penatibus et magnis dis parturient montes 😀',
            userImg: 'https://randomuser.me/api/portraits/women/3.jpg'
          },
          {
            id: 7,
            name: 'Denzel Barrett',
            createdAt: 'today at 2:39 PM',
            message:
              'Aenean tempus nibh vel est lobortis euismod. Vivamus laoreet viverra nunc 🐶',
            userImg: 'https://randomuser.me/api/portraits/men/4.jpg'
          }
        ]
      },
      {
        id: 1,
        date: 'August 2, 2020',
        messages: [
          {
            id: 1,
            name: 'Nellie Francis',
            createdAt: 'yesterday at 2:29 AM',
            message:
              'Suspendisse enim tellus, elementum quis dictum sed, sodales at mauris 😀',
            userImg: 'https://randomuser.me/api/portraits/women/1.jpg'
          },
          {
            id: 2,
            name: 'Annaliese Huynh',
            createdAt: 'yesterday at 2:29 AM',
            message:
              'Orci varius natoque penatibus et magnis dis parturient montes 😀',
            userImg: 'https://randomuser.me/api/portraits/women/2.jpg'
          },
          {
            id: 3,
            name: 'Xanthe Neal',
            createdAt: 'yesterday at 1:29 PM',
            message:
              'Etiam eleifend fermentum ipsum eu rhoncus. In non justo aliquam, imperdiet metus id, tincidunt orci 😍',
            userImg: 'https://randomuser.me/api/portraits/men/3.jpg'
          },
          {
            id: 4,
            name: 'Denzel Barrett',
            createdAt: 'yesterday at 2:39 PM',
            message: 'Proin pretium id nunc eu molestie. Nam consectetur',
            userImg: 'https://randomuser.me/api/portraits/men/4.jpg'
          }
        ]
      }
    ]
  },
  {
    id: 3,
    name: 'BACK-END',
    description:
      'Welcome to our backend development channel, where we dive deep into the world of server-side programming and database management. Our channel is dedicated to helping you master the tools and techniques you need to build robust, scalable, and secure applications. From language-specific topics like Python, Java, and C#, to cross-platform frameworks like Node.js and Django, we cover a wide range of topics that are essential for any backend developer. Join our community of like-minded professionals and discover new ways to optimize your code, streamline your workflows, and take your backend development skills to the next level.',
    members: [
      {
        id: 4,
        name: 'Xanthe Neal',
        userImg: 'https://randomuser.me/api/portraits/men/3.jpg'
      },
      {
        id: 5,
        name: 'Nellie Francis',
        userImg: 'https://randomuser.me/api/portraits/women/1.jpg'
      },
      {
        id: 6,
        name: 'Annaliese Huynh',
        userImg: 'https://randomuser.me/api/portraits/women/2.jpg'
      }
    ],
    messagesList: [
      {
        id: 2,
        date: 'August 3, 2020',
        messages: [
          {
            id: 5,
            name: 'Nellie Francis',
            createdAt: 'today at 2:29 AM',
            message:
              'Class aptent taciti sociosqu ad litora torquent per conubia nostra 😀',
            userImg: 'https://randomuser.me/api/portraits/women/1.jpg'
          },
          {
            id: 6,
            name: 'Shaunna Firth',
            createdAt: 'today at 1:29 PM',
            message:
              'Orci varius natoque penatibus et magnis dis parturient montes 😀',
            userImg: 'https://randomuser.me/api/portraits/women/3.jpg'
          },
          {
            id: 7,
            name: 'Denzel Barrett',
            createdAt: 'today at 2:39 PM',
            message:
              'Aenean tempus nibh vel est lobortis euismod. Vivamus laoreet viverra nunc 🐶',
            userImg: 'https://randomuser.me/api/portraits/men/4.jpg'
          }
        ]
      },
      {
        id: 1,
        date: 'August 2, 2020',
        messages: [
          {
            id: 1,
            name: 'Nellie Francis',
            createdAt: 'yesterday at 2:29 AM',
            message:
              'Suspendisse enim tellus, elementum quis dictum sed, sodales at mauris 😀',
            userImg: 'https://randomuser.me/api/portraits/women/1.jpg'
          },
          {
            id: 2,
            name: 'Annaliese Huynh',
            createdAt: 'yesterday at 2:29 AM',
            message:
              'Orci varius natoque penatibus et magnis dis parturient montes 😀',
            userImg: 'https://randomuser.me/api/portraits/women/2.jpg'
          },
          {
            id: 3,
            name: 'Xanthe Neal',
            createdAt: 'yesterday at 1:29 PM',
            message:
              'Etiam eleifend fermentum ipsum eu rhoncus. In non justo aliquam, imperdiet metus id, tincidunt orci 😍',
            userImg: 'https://randomuser.me/api/portraits/men/3.jpg'
          },
          {
            id: 4,
            name: 'Denzel Barrett',
            createdAt: 'yesterday at 2:39 PM',
            message: 'Proin pretium id nunc eu molestie. Nam consectetur',
            userImg: 'https://randomuser.me/api/portraits/men/4.jpg'
          }
        ]
      }
    ]
  },
  {
    id: 4,
    name: 'CATS AND DOGS',
    description:
      "Welcome to our cats and dogs channel, where we celebrate our furry friends and all the joy they bring to our lives. From adorable puppy videos to funny cat memes, heartwarming adoption stories to expert pet care advice, our channel is the ultimate destination for pet lovers everywhere. Join our community of fellow animal enthusiasts and share your own photos, videos, and stories of your beloved pets. Whether you're a cat person or a dog person (or both!), our channel has everything you need to keep your tail wagging and your purr motor running.",
    members: [
      {
        id: 7,
        name: 'Denzel Barrett',
        userImg: 'https://randomuser.me/api/portraits/men/4.jpg'
      },
      {
        id: 8,
        name: 'Annaliese Huynh',
        userImg: 'https://randomuser.me/api/portraits/women/2.jpg'
      }
    ],
    messagesList: [
      {
        id: 2,
        date: 'August 3, 2020',
        messages: [
          {
            id: 5,
            name: 'Nellie Francis',
            createdAt: 'today at 2:29 AM',
            message:
              'Class aptent taciti sociosqu ad litora torquent per conubia nostra 😀',
            userImg: 'https://randomuser.me/api/portraits/women/1.jpg'
          },
          {
            id: 6,
            name: 'Shaunna Firth',
            createdAt: 'today at 1:29 PM',
            message:
              'Orci varius natoque penatibus et magnis dis parturient montes 😀',
            userImg: 'https://randomuser.me/api/portraits/women/3.jpg'
          },
          {
            id: 7,
            name: 'Denzel Barrett',
            createdAt: 'today at 2:39 PM',
            message:
              'Aenean tempus nibh vel est lobortis euismod. Vivamus laoreet viverra nunc 🐶',
            userImg: 'https://randomuser.me/api/portraits/men/4.jpg'
          }
        ]
      },
      {
        id: 1,
        date: 'August 2, 2020',
        messages: [
          {
            id: 1,
            name: 'Nellie Francis',
            createdAt: 'yesterday at 2:29 AM',
            message:
              'Suspendisse enim tellus, elementum quis dictum sed, sodales at mauris 😀',
            userImg: 'https://randomuser.me/api/portraits/women/1.jpg'
          },
          {
            id: 2,
            name: 'Annaliese Huynh',
            createdAt: 'yesterday at 2:29 AM',
            message:
              'Orci varius natoque penatibus et magnis dis parturient montes 😀',
            userImg: 'https://randomuser.me/api/portraits/women/2.jpg'
          },
          {
            id: 3,
            name: 'Xanthe Neal',
            createdAt: 'yesterday at 1:29 PM',
            message:
              'Etiam eleifend fermentum ipsum eu rhoncus. In non justo aliquam, imperdiet metus id, tincidunt orci 😍',
            userImg: 'https://randomuser.me/api/portraits/men/3.jpg'
          },
          {
            id: 4,
            name: 'Denzel Barrett',
            createdAt: 'yesterday at 2:39 PM',
            message: 'Proin pretium id nunc eu molestie. Nam consectetur',
            userImg: 'https://randomuser.me/api/portraits/men/4.jpg'
          }
        ]
      }
    ]
  },
  {
    id: 5,
    name: 'WELCOME',
    description:
      "Welcome to our welcome channel, where we believe that everyone deserves a warm and friendly greeting. Whether you're new to our community or a longtime member, our channel is dedicated to making you feel right at home. From helpful tips and introductions to inspiring stories and community events, we're here to help you connect with others and find your place in our community. Join us as we welcome new members, celebrate our diversity, and build a strong, supportive, and inclusive community that values everyone's unique contributions.",
    members: [
      {
        id: 9,
        name: 'Nellie Francis',
        userImg: 'https://randomuser.me/api/portraits/women/1.jpg'
      },
      {
        id: 10,
        name: 'Annaliese Huynh',
        userImg: 'https://randomuser.me/api/portraits/women/2.jpg'
      }
    ],
    messagesList: [
      {
        id: 2,
        date: 'August 3, 2020',
        messages: [
          {
            id: 5,
            name: 'Nellie Francis',
            createdAt: 'today at 2:29 AM',
            message:
              'Class aptent taciti sociosqu ad litora torquent per conubia nostra 😀',
            userImg: 'https://randomuser.me/api/portraits/women/1.jpg'
          },
          {
            id: 6,
            name: 'Shaunna Firth',
            createdAt: 'today at 1:29 PM',
            message:
              'Orci varius natoque penatibus et magnis dis parturient montes 😀',
            userImg: 'https://randomuser.me/api/portraits/women/3.jpg'
          },
          {
            id: 7,
            name: 'Denzel Barrett',
            createdAt: 'today at 2:39 PM',
            message:
              'Aenean tempus nibh vel est lobortis euismod. Vivamus laoreet viverra nunc 🐶',
            userImg: 'https://randomuser.me/api/portraits/men/4.jpg'
          }
        ]
      },
      {
        id: 1,
        date: 'August 2, 2020',
        messages: [
          {
            id: 1,
            name: 'Nellie Francis',
            createdAt: 'yesterday at 2:29 AM',
            message:
              'Suspendisse enim tellus, elementum quis dictum sed, sodales at mauris 😀',
            userImg: 'https://randomuser.me/api/portraits/women/1.jpg'
          },
          {
            id: 2,
            name: 'Annaliese Huynh',
            createdAt: 'yesterday at 2:29 AM',
            message:
              'Orci varius natoque penatibus et magnis dis parturient montes 😀',
            userImg: 'https://randomuser.me/api/portraits/women/2.jpg'
          },
          {
            id: 3,
            name: 'Xanthe Neal',
            createdAt: 'yesterday at 1:29 PM',
            message:
              'Etiam eleifend fermentum ipsum eu rhoncus. In non justo aliquam, imperdiet metus id, tincidunt orci 😍',
            userImg: 'https://randomuser.me/api/portraits/men/3.jpg'
          },
          {
            id: 4,
            name: 'Denzel Barrett',
            createdAt: 'yesterday at 2:39 PM',
            message: 'Proin pretium id nunc eu molestie. Nam consectetur',
            userImg: 'https://randomuser.me/api/portraits/men/4.jpg'
          }
        ]
      }
    ]
  }
]

export default function Home() {
  const [isOverlayActive, setIsOverlayActive] = useState(false)
  const [isAllChannelsActive, setIsAllChannelsActive] = useState(true)
  const [currentIdChannel, setCurrentIdChannel] = useState(0)

  const currentChannel = ALL_CHANNELS.find(
    (channel) => channel.id === currentIdChannel
  )

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
                setCurrentIdChannel={setCurrentIdChannel}
                setIsAllChannelsActive={setIsAllChannelsActive}
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
                <div
                  onClick={() => setIsAllChannelsActive(true)}
                  className='cursor-pointer'
                >
                  <LeftArrowIcon />
                </div>
                <h3 className='text-lg font-bold tracking-[-0.035em]'>
                  All Chanells
                </h3>
              </div>
              <InfoCurrentChannel
                name={currentChannel?.name as string}
                description={currentChannel?.description as string}
                members={currentChannel?.members as Member[]}
              />
            </>
          )}
          <User />
        </aside>
        <main className='flex-grow flex-shrink-0 flex flex-col max-h-screen'>
          {!isAllChannelsActive ? (
            <>
              <div
                style={{ boxShadow: 'var(--shadow)' }}
                className='h-16 py-4 px-16 flex items-center flex-shrink-0'
              >
                <h1 className='text-lg font-bold tracking-[-0.035em]'>
                  {currentChannel?.name}
                </h1>
              </div>
              <Chat messages={currentChannel?.messagesList as MessagesList[]} />
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
        isOverlayActive={isOverlayActive}
        setIsOverlayActive={setIsOverlayActive}
      />
    </>
  )
}
