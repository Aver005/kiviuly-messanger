"use client"

import React, { useEffect, useRef, useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { useAppContext } from "@/context/AppContext"
import { EventType } from "@/types/event-type"
import { CHAT_ICONS } from "@/types/mockdata"
import { Chat, UserStatus } from "@/types/interfaces"

export function CreateChatDialog()
{
    const { events } = useAppContext()

    const [isOpen, setIsOpen] = useState(false)
    const [selectedIcon, setSelectedIcon] = useState<string | undefined>(undefined)

    const nameRef = useRef<HTMLInputElement>(null)
    const idRef = useRef<HTMLInputElement>(null)

    const handleSubmit = (e: any) =>
    {
        e.preventDefault()
        
        const name = nameRef.current?.value
        const id = idRef.current?.value

        if (name && id) 
        {
            const chat: Chat = 
            {
                id: new Date().getTime(), 
                name, 
                lastActivityTime: '', 
                avatar: '', 
                messages: [], 
                members: [], 
                type: "chat", 
                unread: 0, 
                status: UserStatus.ONLINE, 
                notificationsMuted: false, 
                icon: selectedIcon
            }

            events.emit(EventType.CREATE_CHAT, { chat })
            setIsOpen(false)
        }
    }

    useEffect(() =>
    {
        const handleOpen = () => setIsOpen(true)
        events.on(EventType.OPEN_CREATE_CHAT, handleOpen)
        return () => events.off(EventType.OPEN_CREATE_CHAT, handleOpen)
    }, 
    [events])

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>New Chat</DialogTitle>
                    <DialogDescription>
                        Create a new chat with a unique ID and an optional icon.
                    </DialogDescription>
                </DialogHeader>

                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-5 items-center gap-4">
                        <Label htmlFor="name">Name</Label>
                        <Input ref={nameRef} id="name" defaultValue="My New Chat!" className="col-span-4" />
                    </div>

                    <div className="grid grid-cols-5 items-center gap-4">
                        <Label htmlFor="id">ID</Label>
                        <Input ref={idRef} id="id" defaultValue="@new-chat-1235" className="col-span-4" />
                    </div>

                    <div className="grid grid-cols-5 items-start gap-4 mt-2">
                        <Label>Icon <span className="text-xs text-muted-foreground">(optional)</span></Label>
                        <div className="flex col-span-4 flex-wrap gap-2">
                            {CHAT_ICONS.map(({ id, Component, color }) => (
                                <Button
                                    key={id}
                                    variant={selectedIcon === id ? "default" : "outline"}
                                    size="icon"
                                    type="button"
                                    onClick={() => setSelectedIcon(id)}
                                    style=
                                    {{
                                        backgroundColor: selectedIcon === id ? color : 'transparent',
                                        borderColor: selectedIcon === id ? 'transparent' : undefined
                                    }}
                                    className={`transition duration-200 ease-in-out ${selectedIcon === id ? "shadow-lg" : ""}`} 
                                >
                                    <Component className="size-6" />
                                </Button>
                            ))}
                        </div>

                    </div>
                </div>

                <DialogFooter>
                    <Button onClick={handleSubmit} type="submit">Create</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}