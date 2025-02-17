'use client'

import { useAppContext } from '@/context/AppContext'
import { EventType } from '@/types/event-type'
import { VIEWS } from '@/types/views'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

const MobileSidebar: React.FC = () =>
{
    const { events } = useAppContext()
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    useEffect(() =>
    {
        const handleSwitch = () => setIsMenuOpen(prev => !prev)
        events.on(EventType.OPEN_MOBILE_SIDEBAR, handleSwitch)
        return () => events.off(EventType.OPEN_MOBILE_SIDEBAR, handleSwitch)
    }, 
    [events])

    return (
        <div className={`
            transition-all duration-300 overflow-hidden
            bg-[#0d1117] w-full
            ${isMenuOpen ? "max-h-[300px]" : "max-h-0"}
        `}>
            <div className="text-gray-300 py-4 border-b-2">
                <div className="grid grid-cols-2 space-y-2 mr-4">
                    {VIEWS.filter(view => view.sidebar).map(view => (
                        <Link
                            key={view.name}
                            href={view.path[0]}
                            className={"flex text-sm items-center justify-center p-4 gap-2 text-gray-400 hover:text-white"}
                        >
                            <view.icon className="h-4 w-4" />
                            {view.name}
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default MobileSidebar