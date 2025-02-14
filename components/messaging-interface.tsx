"use client"

import { Sidebar } from "@/components/sidebar"
import { MessagesList } from "@/components/messages-list"
import { ChatWindow } from "@/components/chat-window"
import { ProfileSection } from "@/components/profile-section"
import { useState } from "react"
import { Sheet, SheetContent } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Menu, Users } from "lucide-react"

export function MessagingInterface() 
{
    const [credits, setCredits] = useState(5)
    const [showMessages, setShowMessages] = useState(false)
    const [showProfile, setShowProfile] = useState(false)
    const [activeView, setActiveView] = useState<"messages" | "chat">("messages")

    return (
        <div className="flex h-full text-white">
            {/* Mobile Navigation */}
            <div className="lg:hidden fixed top-0 left-0 right-0 h-14 bg-[#0d1117] border-b border-[#141A23] flex items-center px-4 z-50">
                <Button variant="ghost" size="icon" onClick={() => setShowMessages(true)}>
                    <Menu className="h-5 w-5" />
                </Button>
                <div className="flex-1 text-center font-semibold">Messages</div>
                <Button variant="ghost" size="icon" onClick={() => setShowProfile(true)}>
                    <Users className="h-5 w-5" />
                </Button>
            </div>

            {/* Main content wrapper */}
            <div className="flex flex-1 h-full pt-14 lg:pt-0">
                {/* Sidebar - Hidden on mobile */}
                <div className="hidden lg:block h-full">
                    <Sidebar />
                </div>

                {/* Messages List Sheet - Mobile */}
                <Sheet open={showMessages} onOpenChange={setShowMessages}>
                    <SheetContent side="left" className="w-full p-0 bg-[#0d1117] border-r border-[#141A23]">
                        <MessagesList
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
                    <MessagesList 
                        onCreateChat={() => setActiveView("chat")} 
                        onSelectChat={() => setActiveView("chat")} 
                    />
                </div>

                {/* Main Content Area */}
                <div className="flex-1 flex flex-col h-full">
                    <div className={`flex-1 ${activeView === "messages" ? "md:hidden" : ""}`}>
                        <ChatWindow credits={credits} setCredits={setCredits} onBack={() => setActiveView("messages")} />
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

