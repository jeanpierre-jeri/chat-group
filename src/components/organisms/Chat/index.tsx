import { SendIcon } from '@/components/atoms'
import { UserMessage } from '@/components/molecules'
import styles from './styles.module.css'

const MESSAGES = [
  {
    id: 2,
    date: 'August 3, 2020',
    messages: [
      {
        id: 5,
        name: 'Nellie Francis',
        createdAt: 'today at 2:29 AM',
        message: 'Class aptent taciti sociosqu ad litora torquent per conubia nostra 😀',
        userImg: 'https://randomuser.me/api/portraits/women/1.jpg'
      },
      {
        id: 6,
        name: 'Shaunna Firth',
        createdAt: 'today at 1:29 PM',
        message: 'Orci varius natoque penatibus et magnis dis parturient montes 😀',
        userImg: 'https://randomuser.me/api/portraits/women/3.jpg'
      },
      {
        id: 7,
        name: 'Denzel Barrett',
        createdAt: 'today at 2:39 PM',
        message: 'Aenean tempus nibh vel est lobortis euismod. Vivamus laoreet viverra nunc 🐶',
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
        message: 'Suspendisse enim tellus, elementum quis dictum sed, sodales at mauris 😀',
        userImg: 'https://randomuser.me/api/portraits/women/1.jpg'
      },
      {
        id: 2,
        name: 'Annaliese Huynh',
        createdAt: 'yesterday at 2:29 AM',
        message: 'Orci varius natoque penatibus et magnis dis parturient montes 😀',
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

export function Chat() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
  }
  return (
    <div className='pb-10 overflow-y-auto flex flex-col gap-12'>
      <section className={`pt-24 px-16 flex-grow gap-9 flex flex-col-reverse overflow-y-auto ${styles.messages}`}>
        {MESSAGES.map(({ id, date, messages }) => {
          return (
            <ul key={id} className='flex flex-col gap-8'>
              <li className={styles.DateGroup}>
                <time className='bg-primary px-5'>{date}</time>
              </li>
              <ul className='flex flex-col gap-9'>
                {messages.map(({ id, createdAt, message, name, userImg }) => {
                  return <UserMessage key={id} createdAt={createdAt} message={message} name={name} userImg={userImg} />
                })}
              </ul>
            </ul>
          )
        })}
      </section>
      <form onSubmit={handleSubmit} className='px-16'>
        <div className='relative'>
          <input
            type='text'
            className='flex w-full rounded-lg bg-gray-300 p-4 pr-14 text-sm tracking-[-0.035em] font-medium'
            placeholder='Type a message here'
          />
          <button
            type='submit'
            className={`${styles.send} absolute w-[2.4rem] h-[2.4rem] rounded-lg flex items-center justify-center p-2`}
          >
            <SendIcon />
          </button>
        </div>
      </form>
    </div>
  )
}