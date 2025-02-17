import React from "react"
import { ChevronLeft, MoreVerticalIcon, PhoneIcon, SearchIcon, UserIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Chat, UserStatusDetails } from "@/types/interfaces"
import { useAppContext } from "@/context/AppContext"
import { EventType } from "@/types/event-type"

interface ChatHeaderProps
{
    chat: Chat
    onBack?: () => void
}

export function ChatHeader({ chat, onBack }: ChatHeaderProps)
{
    const { events } = useAppContext()

    return (
        <div className="flex items-center gap-4 p-4 border-b border-[#141A23]">
            {onBack && (
                <Button variant="link" size="xs" className="md:hidden [&_svg]:size-6" onClick={onBack}>
                    <ChevronLeft />
                </Button>
            )}
            <Avatar>
                <AvatarImage src="/placeholder.svg" alt={chat.name} />
                <AvatarFallback>{chat.name[0] || "U"}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
                <h2 className="font-semibold">{chat.name}</h2>
                {chat.type === 'direct' && 
                    <span className={`text-sm ${UserStatusDetails[chat.status].textColor}`}>{chat.status}</span>
                }
                {chat.type === 'chat' && 
                    <span className="text-sm text-blue-500">{`${chat.members.length} members`}</span>
                }
            </div>
            <div className="flex items-center">
                <div className="hidden sm:flex">
                    <Button variant="link" className="text-gray-200 [&_svg]:size-6">
                        <SearchIcon />
                    </Button>
                    <Button variant="link" className="text-gray-200 [&_svg]:size-6">
                        <PhoneIcon />
                    </Button>
                </div>
                <Button 
                    variant="link" 
                    className="text-gray-200 [&_svg]:size-6"
                    onClick={() => events.emit(EventType.OPEN_PROFILE, { chat })}
                >
                    <UserIcon />
                </Button>
                <Button variant="link" className="text-gray-200 [&_svg]:size-6">
                    <MoreVerticalIcon />
                </Button>
            </div>
        </div>
    )
}