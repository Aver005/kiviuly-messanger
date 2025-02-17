import { useCallback, useEffect, useRef, useState } from "react"
import { Chat, Message } from "@/types/interfaces"
import { ChatHeader } from "./chat-header"
import { ChatEvent } from "./chat-event"
import { ChatMessage } from "./chat-message"
import { ChatEditor } from "./chat-editor"
import { ArrowDown, LockIcon } from "lucide-react"

interface ChatViewProps
{
    onBack?: () => void
    chat: Chat
}

export function ChatView({ onBack, chat }: ChatViewProps)
{
    const [messages, setMessages] = useState(chat.messages || [])
    const [openReactionMessageId, setOpenReactionMessageId] = useState<string | null>(null)
    const [isScrolledAwayFromBottom, setIsScrolledAwayFromBottom] = useState(false)
    const [quotedMessage, setQuotedMessage] = useState<Message | null>(null)
    const [quotedText, setQuotedText] = useState<string | null>(null)
    const [showReplyButton, setShowReplyButton] = useState(false)
    const [replyButtonPosition, setReplyButtonPosition] = useState({ x: 0, y: 0 })
    const [selectedMessageForReply, setSelectedMessageForReply] = useState<Message | null>(null)

    const messagesContainerRef = useRef<HTMLDivElement>(null)
    const prevChatIdRef = useRef(chat.id)
    const prevMessagesLengthRef = useRef(messages.length)

    const handleAddReaction = (messageId: string, emoji: string) =>
    {
        const updatedMessages = messages.map(msg =>
        {
            if (msg.id === messageId)
            {
                const existingReaction = msg.reactions?.find(r => r.emoji === emoji)
                if (existingReaction)
                
                    return {
                        ...msg,
                        reactions: msg.reactions?.map(r =>
                            r.emoji === emoji ? { ...r, count: r.count + 1 } : r
                        )
                    }
                
                return {
                    ...msg,
                    reactions: [...(msg.reactions || []), { emoji, count: 1 }]
                }
            }
            return msg
        })

        setMessages(updatedMessages)
        setOpenReactionMessageId(null)
    }

    const isScrolledToBottom = useCallback((container: HTMLDivElement) =>
    {
        const epsilon = 1
        return container.scrollTop + container.clientHeight >= container.scrollHeight - epsilon
    }, 
    [])

    const scrollToBottom = useCallback((smooth: boolean) =>
    {
        const container = messagesContainerRef.current
        if (container)
        
            container.scrollTo({
                top: container.scrollHeight,
                behavior: smooth ? "smooth" : "auto",
            })
        
    }, [])

    const handleScroll = useCallback(() =>
    {
        if (showReplyButton) setShowReplyButton(false)
        const container = messagesContainerRef.current
        if (!container) return
        setIsScrolledAwayFromBottom(!isScrolledToBottom(container))
    }, 
    [isScrolledToBottom, showReplyButton])

    const handleQuoteMessage = useCallback((message: Message, text: string | null) => 
    {
        setQuotedMessage(message)
        setQuotedText(text)
    }, 
    [])

    const handleMessagesContainerMouseUp = useCallback((e: any) => 
    {
        const selection = window.getSelection()
        if (!selection || selection.toString().trim() === "") return
        
        const range = selection.getRangeAt(0)
        const container = messagesContainerRef.current
        if (!container) return
    
        let element = range.commonAncestorContainer as HTMLElement | null
        while (element && (!element.dataset || !element.dataset.messageId)) 
            element = element.parentElement
        
        if (!element) return
        if (!element.dataset) return
        if (!element.dataset.messageId) return
        
        const messageId = element.dataset.messageId
        const message = messages.find((msg) => msg.id === messageId)
        if (!message) return
        
        const rangeRect = range.getBoundingClientRect()
        const x = rangeRect.left 
        const y = rangeRect.top 
        setReplyButtonPosition({ x, y })
        setSelectedMessageForReply(message)
        setShowReplyButton(true)
        setQuotedText(selection.toString().trim())
    }, 
    [messages])
    
    const handleSendMessage = useCallback((text: string) => 
    {
        if (!text.trim()) return

        const newMessage: Message = 
        {
            id: Date.now().toString(),
            content: text,
            type: "text",
            sender:
            {
                id: "me",
                username: "You",
                firstName: "You",
                lastName: ""
            },
            timestamp: new Date().toISOString(),
            replyTo: quotedMessage ? 
                {
                    messageId: quotedMessage.id,
                    quotedText: quotedText || undefined,
                } : undefined,
        }

        setMessages((prev) => [...prev, newMessage])
        setQuotedMessage(null)
        setQuotedText(null)
        setTimeout(() => scrollToBottom(true), 100)
    }, 
    [quotedMessage, quotedText])

    useEffect(() =>
    {
        setMessages(chat.messages || [])
        setTimeout(() => scrollToBottom(false), 100)
    }, 
    [chat])

    useEffect(() =>
    {
        const container = messagesContainerRef.current
        if (!container) return

        if (prevChatIdRef.current !== chat.id)
        {
            prevChatIdRef.current = chat.id
            scrollToBottom(true)
        } 
        else
        
            if (messages.length > prevMessagesLengthRef.current)
            {
                const wasAtBottom = isScrolledToBottom(container)
                if (wasAtBottom) scrollToBottom(true)
            }
        
        prevMessagesLengthRef.current = messages.length
    }, 
    [messages, chat, scrollToBottom, isScrolledToBottom])

    useEffect(() =>
    {
        const container = messagesContainerRef.current
        if (!container) return
        setIsScrolledAwayFromBottom(!isScrolledToBottom(container))
    }, 
    [isScrolledToBottom])

    return (
        <div className="h-screen flex flex-col">
            <ChatHeader chat={chat} onBack={onBack} />

            <div className="flex-1 min-h-0 relative">
                {messages.length > 0 ? <div
                    ref={messagesContainerRef}
                    onScroll={handleScroll}
                    onMouseUp={handleMessagesContainerMouseUp}
                    className="h-full overflow-auto p-6 space-y-6"
                >
                    {messages.map((message) => 
                    {
                        const replyToMessage = message.replyTo ? 
                            messages.find((m) => m.id === message.replyTo?.messageId) : null

                        return message.type === "event" ? (
                            <ChatEvent key={message.id} content={message.content} />
                        ) : (
                            <ChatMessage
                                key={message.id}
                                message={message}
                                replyToMessage={replyToMessage}
                                onDoubleClick={() => handleQuoteMessage(message, null)}
                                onAddReaction={handleAddReaction}
                                openReactionMessageId={openReactionMessageId}
                                setOpenReactionMessageId={setOpenReactionMessageId}
                                data-message-id={message.id}
                            />
                        )
                    })}

                    {showReplyButton && (
                        <button
                            className="fixed bg-blue-500 text-white px-3 py-1 rounded-xl shadow-lg text-sm z-50"
                            style=
                                {{
                                    left: replyButtonPosition.x,
                                    top: replyButtonPosition.y,
                                }}
                            onClick={() => 
                            { 
                                setShowReplyButton(false)
                                if (!selectedMessageForReply) return
                                handleQuoteMessage(selectedMessageForReply, quotedText)
                            }}
                        >
                            <span>Reply to</span>
                        </button>
                    )}
                </div> : 
                <div className="flex flex-col gap-6 justify-center items-center text-center h-full">
                    <div className="space-y-2">
                        <h2 className="text-2xl font-medium text-gray-500 dark:text-gray-400">
                            No messages yet
                        </h2>
                        <p className="text-gray-300 dark:text-gray-300 text-sm">
                            Be the first to start the conversation!
                        </p>
                    </div>
                    
                    <div className="w-16 h-16 mx-auto relative mt-4">
                        <div className="w-16 h-[8px] bg-blue-200 dark:bg-blue-800 absolute top-16 left-0 rounded-[50%] animate-shadow"></div>
                        <div className="w-full h-full bg-blue-500 dark:bg-blue-600 absolute -top-4 left-0 rounded animate-jump"></div>
                    </div>
                    
                    <p className="text-sm text-gray-300 dark:text-blue-400 mt-4 flex items-center gap-2">
                        <svg className="w-4 h-4 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"/>
                        </svg>
                        Type your message below
                    </p>
                </div>}

                {isScrolledAwayFromBottom && (
                    <div className="flex flex-col gap-4 absolute bottom-4 right-6">
                        <button
                            onClick={() => scrollToBottom(true)}
                            className="flex justify-center items-center size-10 p-2 bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-600 transition-colors z-10"
                        >
                            <LockIcon className="size-4" />
                        </button>

                        <button
                            onClick={() => scrollToBottom(true)}
                            className="flex justify-center items-center size-10 p-2 bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-600 transition-colors z-10"
                        >
                            <ArrowDown className="size-5" />
                        </button>
                    </div>
                )}
            </div>

            <ChatEditor 
                onSend={handleSendMessage}
                quotedMessage={quotedMessage}
                quotedText={quotedText}
                onCancelQuote={() => 
                {
                    setQuotedMessage(null)
                    setQuotedText(null)
                }}
            />
        </div>
    )
}