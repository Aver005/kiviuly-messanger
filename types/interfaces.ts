export interface Reaction 
{
    emoji: string
    count: number
}
  
export interface Message 
{
    id: string
    type: "text" | "voice" | "file" | "image" | "video" | "event"
    sender: User
    timestamp: string
    content: string
    url?: string
    fileName?: string
    fileSize?: string
    duration?: number
    reactions?: Reaction[]
    replyTo?: 
    {
        messageId: string
        quotedText?: string
    }
}

export enum UserStatus
{
    ONLINE = 'Online 🔹',
    AWAY = 'Away',
    OFFLINE = 'Offline 🔸',
}

export const UserStatusDetails =
{
    [UserStatus.ONLINE]: { textColor: 'text-blue-500'},
    [UserStatus.AWAY]: { textColor: 'text-yellow-500'},
    [UserStatus.OFFLINE]: { textColor: 'text-gray-500'},
}

export interface User
{
    id: string
    username: string
    firstName?: string | undefined
    lastName?: string | undefined
    status?: UserStatus
}

export interface Chat
{
    id: number
    name: string
    lastActivityTime: string
    avatar: string
    verified?: boolean
    unread: number
    status: UserStatus
    notificationsMuted: boolean
    messages: Message[]
    members: User[]
    type: 'direct' | 'chat' | 'channel'
}

export interface Category
{
    id: string
    name: string
    isOpen: boolean
    chats: Chat[]
}