"use client"

import { Sidebar } from "@/components/sidebar"
import { ChatList } from "@/components/chat-list"
import { ChatWindow, Message } from "@/components/chat-window"
import { ProfileSection } from "@/components/profile-section"
import { useState } from "react"
import { Sheet, SheetContent } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Menu, Users } from "lucide-react"

export const MESSAGES: Message[] = 
[
    {
        id: '1',
        type: 'text',
        sender: 'Ricky Smith',
        timestamp: '11:00 AM',
        content: 'Hi! How are you? 😊'
    },
    {
        id: '2',
        type: 'voice',
        sender: 'Ricky Smith',
        timestamp: '11:02 AM',
        content: 'Voice message',
        duration: 30
    },
    {
        id: '3',
        type: 'file',
        sender: 'Ricky Smith',
        timestamp: '11:05 AM',
        fileName: 'document.pdf',
        fileSize: '2.5 MB',
        content: ""
    },
    {
        id: '4',
        type: 'image',
        sender: 'Ricky Smith',
        timestamp: '11:10 AM',
        url: 'https://cdn.culture.ru/images/f3ff4fc7-778d-5288-ad7b-30cb8ee401b7',
        content: ""
    },
    {
        id: '5',
        type: 'event',
        sender: 'system',
        timestamp: '11:15 AM',
        content: 'Ricky Smith renamed room to "Hello World"'
    },
    {
        id: '6',
        type: 'event',
        sender: 'system',
        timestamp: '11:15 AM',
        content: 'Ricky Smith renamed room to "Hello World"'
    },
    {
        id: '7',
        type: 'video',
        sender: 'system',
        timestamp: '11:15 AM',
        content: 'Ricky Smith renamed room to "Hello World"'
    },
];

export function MessagingInterface() 
{
    const [credits, setCredits] = useState(5)
    const [showMessages, setShowMessages] = useState(false)
    const [showProfile, setShowProfile] = useState(false)
    const [activeView, setActiveView] = useState<"messages" | "chat">("messages")

    return (
        <div className="flex h-full text-white">
            {/* Mobile Navigation */}
            {/* <div className="lg:hidden fixed top-0 left-0 right-0 h-14 bg-[#0d1117] border-b border-[#141A23] flex items-center px-4 z-50">
                <Button variant="ghost" size="icon" onClick={() => setShowMessages(true)}>
                    <Menu className="h-5 w-5" />
                </Button>
                <div className="flex-1 text-center font-semibold">Messages</div>
                <Button variant="ghost" size="icon" onClick={() => setShowProfile(true)}>
                    <Users className="h-5 w-5" />
                </Button>
            </div> */}

            {/* Main content wrapper */}
            <div className="flex flex-1 h-full">
                {/* Sidebar - Hidden on mobile */}
                <div className="hidden lg:block h-full">
                    <Sidebar />
                </div>

                {/* Messages List Sheet - Mobile */}
                <Sheet open={showMessages} onOpenChange={setShowMessages}>
                    <SheetContent side="left" className="w-full p-0 bg-[#0d1117] border-r border-[#141A23]">
                        <ChatList
                            onSelectChat={() => 
                            {
                                setShowMessages(false)
                                setActiveView("chat")
                            }} 
                            onCreateChat={() => 
                            {
                                setShowMessages(false)
                                setActiveView("chat")
                            }}
                        />
                    </SheetContent>
                </Sheet>

                {/* Profile Sheet - Mobile */}
                <Sheet open={showProfile} onOpenChange={setShowProfile}>
                    <SheetContent side="right" className="w-full p-0 bg-[#0d1117] border-l border-[#141A23]">
                        <ProfileSection />
                    </SheetContent>
                </Sheet>

                {/* Messages List - Desktop/Tablet */}
                <div className="hidden lg:block w-[380px] border-r border-[#141A23] h-full">
                    <ChatList 
                        onCreateChat={() => setActiveView("chat")} 
                        onSelectChat={() => setActiveView("chat")} 
                    />
                </div>

                {/* Main Content Area */}
                <div className="flex-1 flex flex-col h-full">
                    <div className={`flex-1 ${activeView === "messages" ? "md:hidden" : ""}`}>
                        <ChatWindow 
                            credits={credits} 
                            setCredits={setCredits} 
                            onBack={() => setShowMessages(true)} 
                            messages={MESSAGES}
                        />
                    </div>
                </div>

                {/* Profile Section - Desktop only */}
                <div className="hidden xl:block w-[380px] border-l border-[#141A23] h-full">
                    <ProfileSection />
                </div>
            </div>
        </div>
    )
}

