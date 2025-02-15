import
{
    ChevronLeft,
    DownloadIcon,
    EyeIcon,
    File,
    Mic,
    MoreVerticalIcon,
    PhoneIcon,
    Play,
    Plus,
    SearchIcon,
    Smile,
    VideoIcon,
    XIcon
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover"

interface Reaction 
{
    emoji: string
    count: number
}

export interface Message
{
    id: string
    type: 'text' | 'voice' | 'file' | 'image' | 'video' | 'event'
    sender: string
    timestamp: string
    content: string
    url?: string
    fileName?: string
    fileSize?: string
    duration?: number
    reactions?: Reaction[]
}

interface ChatWindowProps
{
    credits: number
    setCredits: (credits: number) => void
    onBack?: () => void
    messages: Message[]
}

function formatDuration(duration: number): string
{
    const minutes = Math.floor(duration / 60)
    const seconds = duration % 60
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
}

const EMOJI_LIST = ['👍', '❤️', '🔥', '👎', '😂', '😮', '😢', '✅', '❌', '😎', '💩']

export function ChatWindow({ credits, setCredits, onBack, messages }: ChatWindowProps)
{
    const [messagesD, setMessages] = useState(messages);
    const [openReactionMessageId, setOpenReactionMessageId] = useState<string | null>(null)

    const handleAddReaction = (messageId: string, emoji: string) =>
    {
        const updatedMessages = messagesD.map(msg =>
        {
            if (msg.id === messageId)
            {
                const existingReaction = msg.reactions?.find(r => r.emoji === emoji)
                if (existingReaction)
                {
                    return {
                        ...msg,
                        reactions: msg.reactions?.map(r =>
                            r.emoji === emoji ? { ...r, count: r.count + 1 } : r
                        )
                    }
                }
                return {
                    ...msg,
                    reactions: [...(msg.reactions || []), { emoji, count: 1 }]
                }
            }
            return msg
        })

        setMessages(updatedMessages);
        setOpenReactionMessageId(null)
    }

    return (
        <div className="h-screen flex flex-col">
            <div className="flex items-center gap-4 p-4 pl-6 border-b border-[#141A23]">
                {onBack && (
                    <Button variant="link" size="icon" className="md:hidden" onClick={onBack}>
                        <ChevronLeft className="h-5 w-5" />
                    </Button>
                )}
                <Avatar>
                    <AvatarImage src="/placeholder.svg" alt="Frances Swann" />
                    <AvatarFallback>FS</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                    <h2 className="font-semibold">Frances Swann</h2>
                    <span className="text-sm text-blue-500">online 🔹</span>
                </div>
                <div className="hidden sm:flex items-center">
                    <Button variant="link" className="text-gray-200 [&_svg]:w-6 [&_svg]:h-6">
                        <SearchIcon />
                    </Button>
                    <Button variant="link" className="text-gray-200 [&_svg]:w-6 [&_svg]:h-6">
                        <PhoneIcon />
                    </Button>
                    <Button variant="link" className="text-gray-200 [&_svg]:w-6 [&_svg]:h-6">
                        <MoreVerticalIcon />
                    </Button>
                </div>
            </div>

            <div className="flex-1 min-h-0 overflow-auto p-6 space-y-6">
                {messagesD.map((message) =>
                {
                    if (message.type === 'event')
                    {
                        return (
                            <div key={message.id} className="flex justify-center">
                                <span className="text-sm text-gray-400 italic">
                                    {message.content}
                                </span>
                            </div>
                        )
                    }

                    return (
                        <div 
                            key={message.id}
                            className="flex gap-3 group relative"
                            onMouseEnter={() => setOpenReactionMessageId(null)}
                        >
                            <Avatar className="w-8 h-8 hidden sm:block">
                                <AvatarImage src="/placeholder.svg" alt={message.sender} />
                                <AvatarFallback>
                                    {message.sender.slice(0, 2).toUpperCase()}
                                </AvatarFallback>
                            </Avatar>
                            <div>
                                <div className="flex items-center gap-2">
                                    <span className="text-sm">{message.sender}</span>
                                    <span className="text-xs text-gray-400">{message.timestamp}</span>
                                </div>
                                <div className="mt-2 relative">
                                    {message.type === 'text' && (
                                        <div className="bg-[#1c2128] rounded-2xl p-3 inline-block text-sm">
                                            {message.content}
                                        </div>
                                    )}

                                    {message.type === 'voice' && (
                                        <div className="bg-[#1c2128] w-full rounded-2xl p-3 inline-flex items-center gap-2">
                                            <Button variant="link" size="icon" className="h-6 w-6 p-0">
                                                <Play className="h-4 w-4" />
                                            </Button>
                                            <span className="text-sm text-gray-400">
                                                {formatDuration(message.duration || 0)}
                                            </span>
                                        </div>
                                    )}

                                    {message.type === 'file' && (
                                        <div className="bg-[#1c2128] rounded-2xl p-3 inline-flex items-center gap-3">
                                            <File className="h-6 w-6 flex-shrink-0" />
                                            <div>
                                                <div className="font-medium">{message.fileName}</div>
                                                <div className="text-sm text-gray-400">{message.fileSize}</div>
                                            </div>
                                            <div>
                                                <Button variant='link' size='xs'>
                                                    <DownloadIcon className="text-gray-400" />
                                                </Button>
                                                <Button variant='link' size='xs'>
                                                    <EyeIcon className="text-gray-400" />
                                                </Button>
                                            </div>
                                        </div>
                                    )}

                                    {message.type === 'image' && (
                                        <img
                                            src={message.url}
                                            alt="Attachment"
                                            className="rounded-2xl max-w-xs mt-2 object-cover"
                                        />
                                    )}

                                    {message.type === 'video' && (
                                        <div className="bg-[#1c2128] rounded-2xl p-2 mt-2">
                                            <video
                                                controls
                                                className="rounded-xl max-w-xs"
                                                src={message.url}
                                            />
                                            <div className="flex items-center gap-2 mt-2 text-sm text-gray-400">
                                                <VideoIcon className="h-5 w-5" />
                                                Video file
                                            </div>
                                        </div>
                                    )}

                                    {/* Реакции */}
                                    <div className="flex gap-2 mt-2 flex-wrap left">
                                        {message.reactions && message.reactions.length > 0
                                            && message.reactions.map((reaction, index) => (
                                            <button
                                                key={index}
                                                className="flex items-center gap-1 bg-[#2d333b] px-2 py-1 rounded-lg text-xs hover:bg-[#3b424b] transition-colors"
                                                onClick={() => handleAddReaction(message.id, reaction.emoji)}
                                            >
                                                <span>{reaction.emoji}</span>
                                                <span className="text-gray-400">{reaction.count}</span>
                                            </button>
                                        ))}
                                        

                                        {/* Кнопка добавления реакции */}
                                        <Popover
                                            open={openReactionMessageId === message.id}
                                            onOpenChange={(open) => setOpenReactionMessageId(open ? message.id : null)}
                                        >
                                            <PopoverTrigger asChild>
                                                <button className={`${(message.reactions && message.reactions.length > 0) ? '' : 'absolute'} -right-6 bottom-2 opacity-0 group-hover:opacity-60 transition-opacity`}>
                                                    <Smile className="h-4 w-4 text-gray-400" />
                                                </button>
                                            </PopoverTrigger>
                                            
                                            <PopoverContent 
                                                side="top"
                                                align="start"
                                                className="w-auto p-2 bg-[#1c2128] border-[#2d333b] rounded-xl"
                                            >
                                                <div className="flex gap-1">
                                                    {EMOJI_LIST.map(emoji => (
                                                        <button
                                                            key={emoji}
                                                            className="hover:scale-125 transition-transform"
                                                            onClick={() => handleAddReaction(message.id, emoji)}
                                                        >
                                                            {emoji}
                                                        </button>
                                                    ))}
                                                    <button
                                                        className="text-gray-400 hover:text-white ml-2"
                                                        onClick={() => setOpenReactionMessageId(null)}
                                                    >
                                                        <XIcon className="h-4 w-4" />
                                                    </button>
                                                </div>
                                            </PopoverContent>
                                        </Popover>
                                    </div>
                                </div>
                            </div>

                        </div>
                    )
                })}
            </div>

            <div className="p-4 border-t border-[#141A23]">
                <div className="flex items-center gap-3 bg-[#1c2128] rounded-lg p-2">
                    <Button variant="link" size="icon" className="text-gray-400 [&_svg]:w-6 [&_svg]:h-6 hidden sm:inline-flex">
                        <Mic />
                    </Button>
                    <Input placeholder="Type something..." className="bg-transparent border-0" />
                    <Button variant="link" size="icon" className="text-gray-400 [&_svg]:w-6 [&_svg]:h-6">
                        <Smile />
                    </Button>
                    <Button variant="link" size="icon" className="text-gray-400 [&_svg]:w-6 [&_svg]:h-6">
                        <Plus />
                    </Button>
                </div>
            </div>
        </div>
    )
}