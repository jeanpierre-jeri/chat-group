interface Props {
  userImg: string
  name: string
  createdAt: string
  message: string
}

export function UserMessage({ userImg, name, createdAt, message }: Props) {
  return (
    <li className='flex items-start gap-4 laptop:gap-7'>
      <picture className='flex flex-shrink-0'>
        <img src={userImg} alt={name} className='w-10 h-10 rounded-lg' />
      </picture>
      <div className='flex flex-col gap-2'>
        <h4 className='text-gray-100 font-bold text-lg tracking-[-0.035em] flex gap-4 items-center'>
          {name}
          <time className='text-sm font-medium'>{createdAt}</time>
        </h4>
        <p className='font-medium text-base tracking-[-0.035em] text-content leading-snug'>
          {message}
        </p>
      </div>
    </li>
  )
}
