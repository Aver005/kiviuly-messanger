import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DownloadIcon, EyeIcon, File, Play, VideoIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Message } from "@/types/interfaces"
import { formatDuration, getFullName, getInitials } from "@/lib/utils"
import { MessageReactions } from "./message-reactions"

interface MessageItemProps
{
    message: Message
    onAddReaction: (messageId: string, emoji: string) => void
    openReactionMessageId: string | null
    setOpenReactionMessageId: (id: string | null) => void
    onDoubleClick: () => void
    replyToMessage?: Message | null
    "data-message-id": string
}

export function ChatMessage({
    message,
    onAddReaction,
    openReactionMessageId,
    setOpenReactionMessageId,
    onDoubleClick,
    replyToMessage,
    "data-message-id": messageId,
}: MessageItemProps)
{
    return (
        <div 
            className="flex gap-3 group relative"
            onDoubleClick={onDoubleClick}
            data-message-id={messageId}
        >
            <Avatar className="w-8 h-8 hidden sm:block">
                <AvatarImage src="/placeholder.svg" alt={message.sender.username} />
                <AvatarFallback>{ getInitials(message.sender) }</AvatarFallback>
            </Avatar>
            <div>
                <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-300">{ getFullName(message.sender) }</span>
                    <span className="text-xs text-gray-500">{message.timestamp}</span>
                </div>
                
                {replyToMessage && (
                    <div className="m-1 border-l-2 border-blue-500 pl-2 text-sm text-gray-500">
                        Ответ на {replyToMessage.sender.username}:{" "}
                        {message.replyTo?.quotedText || replyToMessage.content}
                    </div>
                )}
                <div className="mt-2 relative">
                    {message.type === "text" && (
                        <div className="bg-[#1c2128] text-sm text-gray-200 rounded-2xl p-3 inline-block text-sm">
                            {message.content}
                        </div>
                    )}

                    {message.type === "voice" && (
                        <div className="bg-[#1c2128] w-full rounded-2xl p-3 inline-flex items-center gap-2">
                            <Button variant="link" size="icon" className="h-6 w-6 p-0">
                                <Play className="h-4 w-4" />
                            </Button>
                            <span className="text-sm text-gray-400">
                                {formatDuration(message.duration || 0)}
                            </span>
                        </div>
                    )}

                    {message.type === "file" && (
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

                    {message.type === "image" && (
                        <img
                            src={message.url}
                            alt="Attachment"
                            className="rounded-2xl max-w-xs mt-2 object-cover"
                        />
                    )}

                    {message.type === "video" && (
                        <div className="bg-[#1c2128] rounded-2xl p-2 mt-2">
                            <video
                                controls
                                className="rounded-xl max-w-xs"
                                src={message.url}
                            />
                            <div className="flex items-center gap-2 mt-2 text-sm text-gray-400">
                                <VideoIcon className="ml-1 h-5 w-5" />
                                Video file
                            </div>
                        </div>
                    )}

                    <MessageReactions
                        messageId={message.id}
                        reactions={message.reactions}
                        onAddReaction={onAddReaction}
                        openMessageId={openReactionMessageId}
                        setOpenMessageId={setOpenReactionMessageId}
                    />
                </div>
            </div>
        </div>
    )
}