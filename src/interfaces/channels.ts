export interface Channels {
  id: number
  name: string
  description: string
  members: Member[]
  messagesList: MessagesList[]
}

export interface Member {
  id: number
  name: string
  userImg: string
}

export interface MessagesList {
  id: number
  date: string
  messages: Message[]
}

export interface Message {
  id: number
  name: string
  createdAt: string
  message: string
  userImg: string
}
