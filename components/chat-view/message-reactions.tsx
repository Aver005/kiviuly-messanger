import { Smile, XIcon } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Reaction } from "@/types/interfaces"

const EMOJI_LIST = ["👍", "❤️", "🔥", "👎", "😂", "😮", "😢", "✅", "❌", "😎", "💩"]

interface MessageReactionsProps
{
    messageId: string
    reactions?: Reaction[]
    onAddReaction: (messageId: string, emoji: string) => void
    openMessageId: string | null
    setOpenMessageId: (id: string | null) => void
}

export function MessageReactions({
    messageId,
    reactions,
    onAddReaction,
    openMessageId,
    setOpenMessageId
}: MessageReactionsProps)
{
    return (
        <div className="flex gap-2 mt-2 flex-wrap left">
            {reactions?.map((reaction, index) => (
                <button
                    key={index}
                    className="flex items-center gap-1 bg-[#2d333b] px-2 py-1 rounded-lg text-xs hover:bg-[#3b424b] transition-colors"
                    onClick={() => onAddReaction(messageId, reaction.emoji)}
                >
                    <span>{reaction.emoji}</span>
                    <span className="text-gray-400">{reaction.count}</span>
                </button>
            ))}

            <Popover
                open={openMessageId === messageId}
                onOpenChange={(open) => setOpenMessageId(open ? messageId : null)}
            >
                <PopoverTrigger asChild>
                    <button className={`${reactions?.length ? "" : "absolute"} -right-6 bottom-2 opacity-0 group-hover:opacity-60 transition-opacity`}>
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
                                onClick={() => onAddReaction(messageId, emoji)}
                            >
                                {emoji}
                            </button>
                        ))}
                        <button
                            className="text-gray-400 hover:text-white ml-2"
                            onClick={() => setOpenMessageId(null)}
                        >
                            <XIcon className="h-4 w-4" />
                        </button>
                    </div>
                </PopoverContent>
            </Popover>
        </div>
    )
}