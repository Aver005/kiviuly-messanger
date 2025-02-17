'use client'
import React from 'react';
import { Button } from './ui/button';
import { MenuIcon, PlusIcon, SearchIcon } from 'lucide-react';
import { useAppContext } from '@/context/AppContext';
import { EventType } from '@/types/event-type';

const Header: React.FC<any> = ({ title, actions }) =>
{
    const { events } = useAppContext()

    return (
        <>
            <div className="flex items-center gap-4">
                <Button 
                    className="block lg:hidden"
                    variant='ghost'
                    onClick={() => events.emit(EventType.OPEN_MOBILE_SIDEBAR)}
                >
                    <MenuIcon />
                </Button>
                <h1 className="text-3xl font-semibold">{title}</h1>
            </div>
            <div className="space-x-2">
                {actions.map((action: { icon: any, action: any }) => (
                    <Button 
                        onClick={action.action}
                        className="rounded-lg border-primary text-primary" 
                        variant='outline'
                        key={action.icon}
                    >
                        <action.icon />
                    </Button>
                ))}
            </div>
        </>
    );
}

export default Header;