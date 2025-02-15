"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp, Circle, Plus, Search } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import
{
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "./ui/label"


interface ChatListProps
{
    onSelectChat: () => void
    onCreateChat: () => void
}

interface Chat
{
    id: number
    name: string
    message: string
    lastActivityTime: string
    avatar: string
    verified?: boolean
    unread: number
    status: "online" | "offline" | "away"
    notificationsMuted: boolean
}

interface Category
{
    id: string
    name: string
    isOpen: boolean
    chats: Chat[]
}

const categoriesInitial: Category[] =
[
    {
        id: "friends",
        name: "Friends",
        isOpen: true,
        chats:
        [
            {
                id: 1,
                name: "Angelina Froster",
                message: "Let's go on a date tomorrow 💫",
                lastActivityTime: "1 min ago",
                avatar: "/placeholder.svg",
                unread: 2,
                status: "online",
                notificationsMuted: false,
            },
            {
                id: 2,
                name: "Frances Swann",
                message: "YOU: Okay, let's do it.",
                lastActivityTime: "yesterday",
                avatar: "/placeholder.svg",
                verified: true,
                unread: 0,
                status: "away",
                notificationsMuted: true,
            },
        ],
    },
    // Add more categories...
]

export function ChatList({ onSelectChat, onCreateChat }: ChatListProps) 
{
    const [categories, setCategories] = useState<Category[]>(categoriesInitial)

    const toggleCategory = (categoryId: string) =>
    {
        setCategories(cats =>
            cats.map(cat =>
                cat.id === categoryId ? { ...cat, isOpen: !cat.isOpen } : cat
            )
        )
    }

    return (
        <div className="flex flex-col h-full bg-[#0d1117]">
            <div className="p-4">
                <div className="flex items-center justify-between mb-4">
                    <h1 className="text-xl font-semibold">Messages</h1>

                    <Dialog>
                        <DialogTrigger>
                            <Plus className="h-5 w-5" />
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Chat creation</DialogTitle>
                                <DialogDescription>
                                    This action cannot be undone. This will permanently delete your account
                                    and remove your data from our servers.
                                </DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                                <div className="grid grid-cols-5 items-center gap-4">
                                    <Label htmlFor="name">Name</Label>
                                    <Input id="name" value="My New Chat!" className="col-span-4" />
                                </div>
                                <div className="grid grid-cols-5 items-center gap-4">
                                    <Label htmlFor="username">ID</Label>
                                    <Input id="username" value="@new-chat-1235" className="col-span-4" />
                                </div>
                            </div>
                            <DialogFooter>
                                <Button type="submit">Create</Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>

                </div>
                <div className="relative">
                    <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                    <Input placeholder="Search" className="pl-9 bg-[#1c2128] border-0" />
                </div>
            </div>

            <div className="flex-1 overflow-auto">
                {categories.map(category => (
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

                        {category.isOpen && category.chats.map(chat => (
                            <div
                                key={chat.id}
                                className="flex items-center gap-4 px-4 py-3 hover:bg-[#1c2128] cursor-pointer"
                                onClick={onSelectChat}
                            >
                                <div className="relative">
                                    <Avatar>
                                        <AvatarImage src={chat.avatar} alt={chat.name} />
                                        <AvatarFallback>{chat.name[0]}</AvatarFallback>
                                    </Avatar>

                                    {/* Notification icon */}
                                    {/* <div className="absolute top-[-10px] left-[-10px]">
                                        {chat.notificationsMuted ? (
                                        <BellOff className="h-3 w-3 text-red-500" />
                                        ) : (
                                        <Bell className="h-3 w-3 text-green-500" />
                                        )}
                                    </div> */}

                                    {/* Status indicator */}
                                    <div className="absolute bottom-0 right-0">
                                        <Circle
                                            className={`h-3 w-3 stroke-2 ${chat.status === "online"
                                                ? "text-green-500 fill-green-500"
                                                : chat.status === "away"
                                                    ? "text-yellow-500 fill-yellow-500"
                                                    : "text-gray-500 fill-gray-500"
                                                }`}
                                        />
                                    </div>
                                </div>

                                <div className="flex flex-col flex-1 min-w-0 gap-1">
                                    <div className="flex items-center gap-2">
                                        <span className="font-medium">{chat.name}</span>
                                        {chat.verified && (
                                            <span className="text-xs bg-blue-500 text-white px-1 rounded">
                                                PRO
                                            </span>
                                        )}
                                    </div>
                                    <p className="text-sm text-gray-400 truncate">
                                        {chat.message}
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
                        ))}
                    </div>
                ))}
            </div>
        </div>
    )
}