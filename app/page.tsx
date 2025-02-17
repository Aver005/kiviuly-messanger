"use client"

import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import { ChatList } from "@/components/chat-list"
import { ChatView } from "@/components/chat-view/chat-view"
import { ProfileSection } from "@/components/profile-section"
import { Sheet, SheetClose, SheetContent } from "@/components/ui/sheet"
import { useAppContext } from "@/context/AppContext"
import { useIsMobile } from "@/hooks/use-mobile"
import { EventType } from "@/types/event-type"
import { Chat, User } from "@/types/interfaces"

export default function Page()
{
    const { events } = useAppContext()
    const isMobile = useIsMobile()
    const [showProfile, setShowProfile] = useState(false)
    const [activeChat, setActiveChat] = useState<Chat | undefined>(undefined)
    const [activeUser, setActiveUser] = useState<User | undefined>(undefined)

    useEffect(() =>
    {
        const handleChatSelect = ({ chat }: { chat: Chat }) =>
        {
            setActiveChat(chat)
        }

        const handleOpenProfile = ({ chat }: { chat: Chat }) =>
        {
            if (showProfile && chat.members[0].id === activeUser?.id)
            {
                setShowProfile(false)
                return
            }

            setActiveUser(chat.members[0])
            setShowProfile(true)
        }

        const handleCloseView = () =>
        {
            setActiveChat(undefined)
            setActiveUser(undefined)
            setShowProfile(false)
        }

        events.on(EventType.SELECT_CHAT, handleChatSelect)
        events.on(EventType.OPEN_PROFILE, handleOpenProfile)
        events.on(EventType.CLOSE_VIEW, handleCloseView)

        return () =>
        {
            events.off(EventType.SELECT_CHAT, handleChatSelect)
            events.off(EventType.OPEN_PROFILE, handleOpenProfile)
            events.off(EventType.CLOSE_VIEW, handleCloseView)
        }
    }, [events, activeUser, showProfile])

    return (
        <>
            {/* Mobile Chat View Sheet */}
            {isMobile && (
                <Sheet open={!!activeChat} onOpenChange={(open) => !open && setActiveChat(undefined)}>
                    <SheetContent hideClose side="right" className="w-full p-0 bg-[#0d1117] border-l border-[#141A23]">
                        {activeChat && (
                            <ChatView
                                chat={activeChat}
                                onBack={() => setActiveChat(undefined)}
                            />
                        )}
                    </SheetContent>
                </Sheet>
            )}

            {/* Mobile Profile Sheet */}
            {isMobile && (
                <Sheet open={showProfile} onOpenChange={setShowProfile}>
                    <SheetContent side="right" className="w-full p-0 bg-[#0d1117] border-l border-[#141A23]">
                        {activeUser && <ProfileSection user={activeUser} />}
                    </SheetContent>
                </Sheet>
            )}

            {/* Chat List (always visible) */}
            <div className="w-full lg:w-[380px] border-r border-[#141A23] h-full">
                <ChatList />
            </div>

            {/* Desktop Chat View */}
            {!isMobile && activeChat && (
                <div className="hidden lg:flex flex-1 flex-col h-full">
                    <div className="flex-1">
                        <ChatView
                            chat={activeChat}
                            onBack={() => setActiveChat(undefined)}
                        />
                    </div>
                </div>
            )}

            {/* Desktop Profile Section */}
            <div
                className={cn(
                    "hidden xl:block overflow-hidden",
                    "transition-all duration-300 ease-in-out",
                    "flex-shrink-0",
                    showProfile ? "max-w-[380px]" : "max-w-0"
                )}
            >
                <div className="w-[380px] border-l border-[#141A23] h-full">
                    {activeUser && <ProfileSection user={activeUser} />}
                </div>
            </div>
        </>
    )
}