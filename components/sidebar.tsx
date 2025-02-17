"use client"

import React from "react"
import Link from "next/link"
import { VIEWS } from "@/types/views"
import { usePathname } from "next/navigation"
import { Settings } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useAppContext } from "@/context/AppContext"
import { EventType } from "@/types/event-type"

export function Sidebar()
{
    const pathname = usePathname()
    const { events } = useAppContext()

    return (
        <div className="hidden lg:flex w-[72px] bg-[#0d1117] border-r h-full border-[#141A23] flex-col items-center py-4">
            <nav className="flex-1 flex flex-col gap-10 mt-2">
                {VIEWS.filter(view => view.sidebar).map((view) =>
                {
                    const isActive = view.path.some(path => path === pathname)
                    const IconComponent = view.icon

                    return isActive ? (
                        <button 
                            key={view.name}
                            className="text-blue-500"
                            onClick={() => events.emit(EventType.CLOSE_VIEW)}
                        >
                            <IconComponent className="h-6 w-6" />
                        </button>
                    ) : (
                        <Link
                            key={view.name}
                            href={view.path[0]}
                            className={"text-gray-400 hover:text-white"}
                        >
                            <IconComponent className="h-6 w-6" />
                        </Link>
                    )
                })}
            </nav>

            <div className="flex flex-col items-center gap-8">
                <Link href="/settings" className="text-gray-400 hover:text-white">
                    <Settings className="h-6 w-6" />
                </Link>
                <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder.svg" alt="Alexis" />
                    <AvatarFallback>A</AvatarFallback>
                </Avatar>
            </div>
        </div>
    );
}