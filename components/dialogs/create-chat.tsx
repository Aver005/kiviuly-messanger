"use client"

import React, { useEffect, useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { useAppContext } from "@/context/AppContext"
import { EventType } from "@/types/event-type"

export function CreateChatDialog()
{
    const { events } = useAppContext()
    const [isOpen, setIsOpen] = useState(false)

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
                        This action cannot be undone. This will permanently delete your account
                        and remove your data from our servers.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-5 items-center gap-4">
                        <Label htmlFor="name">Name</Label>
                        <Input id="name" defaultValue="My New Chat!" className="col-span-4" />
                    </div>
                    <div className="grid grid-cols-5 items-center gap-4">
                        <Label htmlFor="username">ID</Label>
                        <Input id="username" defaultValue="@new-chat-1235" className="col-span-4" />
                    </div>
                    <div className="grid grid-cols-5 items-center gap-4">
                        <Label htmlFor="username">Icon <span className="text-xs py-1 text-gray-400">(optional)</span></Label>
                        <Input id="username" defaultValue="@new-chat-1235" className="col-span-4" />
                    </div>
                </div>
                <DialogFooter>
                    <Button type="submit">Create</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}