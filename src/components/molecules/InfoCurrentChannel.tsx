import { Member } from '@/interfaces'

interface InfoCurrentChannelProps {
  name: string
  description: string
  members: Member[]
}
export const InfoCurrentChannel = ({
  name,
  description,
  members
}: InfoCurrentChannelProps) => {
  return (
    <div className='px-8 py-5 flex flex-col gap-8 flex-grow'>
      <div className='flex flex-col gap-4 mt-6'>
        <h4 className='font-bold text-lg'>{name}</h4>
        <p>{description}</p>
      </div>
      <h5 className='font-bold text-lg text-white uppercase tracking-[-0.035em]'>
        Members
      </h5>
      <ul className='flex flex-col gap-6 flex-grow overflow-y-auto'>
        {members.map(({ id, name, userImg }) => (
          <li key={id} className='flex gap-7 items-center'>
            <picture className='flex flex-shrink-0'>
              <img src={userImg} alt={name} className='w-10 h-10 rounded-lg' />
            </picture>
            <p className='font-bold text-lg text-gray-100 tracking-[-0.035em]'>
              {name}
            </p>
          </li>
        ))}
      </ul>
    </div>
  )
}
