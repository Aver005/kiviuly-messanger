"use client"

import React from "react"
import ContactCard from "@/components/contacts/contact-card"
import { MenuIcon, PlusIcon, SearchIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { USERS } from "@/types/mockdata"
import MobileSidebar from "@/components/mobile-sidebar"
import { EventType } from "@/types/event-type"
import { useAppContext } from "@/context/AppContext"
import Header from "@/components/header"

const Page: React.FC = () => 
{
    const { events } = useAppContext()

    return (
        <div className='flex flex-col m-4'>
            <div className="flex items-center justify-between lg:justify-start gap-4">
                <Header 
                    title="Contacts" 
                    actions={[{ icon: SearchIcon }, { icon: PlusIcon }]} 
                />
            </div>
            <div className="flex gap-5 flex-wrap my-2">
                <MobileSidebar />
                {Object.values(USERS).map(user => (
                    <ContactCard key={user.username} user={user} />
                ))}
            </div>
        </div>
    )
}

export default Page