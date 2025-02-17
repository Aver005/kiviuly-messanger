"use client"

import React, { useEffect, useState } from "react"
import { ChevronDown, ChevronUp, Circle, PlusIcon, Search } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Category, Chat, UserStatus } from "@/types/interfaces"
import { CHAT_ICONS, INIT_CATEGORIES } from "@/types/mockdata"
import { useAppContext } from "@/context/AppContext"
import { EventType } from "@/types/event-type"
import MobileSidebar from "./mobile-sidebar"
import Header from "./header"


interface ChatListProps {}

export function ChatList({ }: ChatListProps) 
{
    const { events } = useAppContext()
    const [categories, setCategories] = useState<Category[]>(INIT_CATEGORIES)

    const renderChat = (chat: Chat) => (
        <div
            key={chat.id}
            className="flex items-center gap-4 px-4 py-3 hover:bg-[#1c2128] cursor-pointer"
            onClick={() => handleChatSelect(chat)}
        >
            <div className="relative">
                { getAvatar(chat) }

                {chat.type === 'direct' && <div className="absolute bottom-0 right-0">
                    <Circle
                        className={`h-3 w-3 stroke-2 ${chat.status === UserStatus.ONLINE
                            ? "text-green-500 fill-green-500"
                            : chat.status === UserStatus.AWAY
                                ? "text-yellow-500 fill-yellow-500"
                                : "text-gray-500 fill-gray-500"
                        }`}
                    />
                </div>}
            </div>

            <div className="flex flex-col flex-1 min-w-0 gap-1">
                <div className="flex items-center gap-2">
                    <span className="font-medium">{chat.name}</span>
                    {chat.verified && (
                        <span className="text-xs bg-blue-500 text-white px-1 rounded">
                            ✔
                        </span>
                    )}
                </div>
                <p className="text-sm text-gray-400 truncate">
                    { getLastMessage(chat) }
                </p>
            </div>

            {chat.unread > 0 ? (
                <span className="bg-blue-500 text-white rounded-full px-2 py-1 text-xs">
                    {chat.unread}
                </span>
            ) : (
                <span className="text-xs text-gray-400">
                    {chat.lastActivityTime}
                </span>
            )}
        </div>
    )

    const getAvatar = (chat: Chat) => 
    {
        if (chat.type === "chat" && chat.icon) 
        {
            const icon = CHAT_ICONS.find(icon => icon.id === chat.icon)
            if (icon) return (
                <Avatar className="justify-center items-center" style={{ background: icon.color }}>
                    <icon.Component />
                </Avatar>
            )
        } 

        return (
            <Avatar>
                <AvatarImage src={chat.avatar} alt={chat.name} />
                <AvatarFallback>{chat.name[0]}</AvatarFallback>
            </Avatar>
        )
    }
    

    const toggleCategory = (categoryId: string) =>
    {
        setCategories(cats =>
            cats.map(cat =>
                cat.id === categoryId ? { ...cat, isOpen: !cat.isOpen } : cat
            )
        )
    }

    const getLastMessage = (chat: Chat) =>
    {
        const size = chat.messages.length
        if (size <= 0) return ""
        const msg = chat.messages[size-1]
        if (msg.content) return msg.content
        return ""
    }

    const handleChatSelect = (chat: Chat) => 
        events.emit(EventType.SELECT_CHAT, { chat })

    const handleChatCreate = () =>
        events.emit(EventType.OPEN_CREATE_CHAT)

    useEffect(() =>
    {
        const handleChatCreating = ({ chat }: { chat: Chat }) => 
        {
            setCategories(prevCategories => 
            {
                const uncategorizedCategory = prevCategories.find(category => category.id === "uncategorized");
        
                if (uncategorizedCategory) 
                {
                    return prevCategories.map(category => 
                    {
                        if (category.id === "uncategorized") 
                        {
                            return {
                                ...category,
                                chats: [...category.chats, chat]
                            }
                        }

                        return category;
                    });
                } 
                else 
                {
                    const newCategory: Category = 
                    {
                        name: "Uncategorized",
                        chats: [chat],
                        id: "uncategorized",
                        isOpen: true
                    }

                    return [...prevCategories, newCategory]
                }
            });
        
            // Вызываем функцию для выбора чата
            handleChatSelect(chat);
        };
        

        events.on(EventType.CREATE_CHAT, handleChatCreating)
        return () => events.off(EventType.CREATE_CHAT, handleChatCreating)
    }, 
    [events])

    return (
        <div className="flex flex-col h-full bg-[#0d1117]">
            <div className="p-4">
                <div className="flex items-center justify-between mb-4">
                    <Header 
                        title="Messages" 
                        actions={[{ icon: PlusIcon, action: handleChatCreate }]} 
                    />
                </div>
                <div className="relative">
                    <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                    <Input placeholder="Search" className="pl-9 bg-[#1c2128] border-0" />
                </div>
            </div>

            <div className="flex-1 flex flex-col overflow-hidden">
                <MobileSidebar />
                <div className="flex-1 overflow-auto">
                    {categories.filter(category => category.id !== "uncategorized").map(category => (
                        <div key={category.id}>
                            <div
                                className="flex items-center justify-between p-4 hover:bg-[#1c2128] cursor-pointer"
                                onClick={() => toggleCategory(category.id)}
                            >
                                <div className="flex items-center gap-2">
                                    <span className="font-medium">{category.name}</span>
                                    <span className="text-xs text-gray-400">
                                        {category.chats.length}
                                    </span>
                                </div>
                                {category.isOpen ? (
                                    <ChevronUp className="h-4 w-4 text-gray-400" />
                                ) : (
                                    <ChevronDown className="h-4 w-4 text-gray-400" />
                                )}
                            </div>

                            {category.isOpen && category.chats.map(renderChat)}
                        </div>
                    ))}
                    {categories.find(category => category.id === "uncategorized")?.chats.map(renderChat)}
                </div>
            </div>
        </div>
    )
}