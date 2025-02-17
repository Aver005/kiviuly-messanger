'use client'
import { MessageCircleIcon, PhoneIcon, UserIcon, EllipsisVerticalIcon } from 'lucide-react';
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { getFullName, getInitials } from '@/lib/utils';

const ContactCard: React.FC<any> = ({ user }) =>
{
    const actions = 
    [
        {
            icon: MessageCircleIcon,
            action: () => {},
        },
        {
            icon: PhoneIcon,
            action: () => {},
        },
        {
            icon: UserIcon,
            action: () => {},
        },
        {
            icon: EllipsisVerticalIcon,
            action: () => {},
        }
    ];

    return (
        <div
            className="w-full h-52 lg:w-60 border-2 border-[rgba(75,30,133,0.5)] rounded-2xl bg-gradient-to-br from-[rgba(75,30,133,1)] to-[rgba(75,30,133,0.01)] text-white font-nunito p-4 flex justify-center items-left flex-col gap-2 backdrop-blur-[12px]"
        >
            <Avatar className="size-12">
                <AvatarImage src={"/image.png"} alt={ getInitials(user) } />
                <AvatarFallback>{ getInitials(user) }</AvatarFallback>
            </Avatar>

            <div>
                <h1 className="text-xl font-medium">{ getFullName(user) }</h1>
                <span className="text-sm text-gray-400">@{user.username}</span>
            </div>

            <div className="flex gap-3 mt-2">
                {actions.map(action => (
                    <button
                        className="h-fit w-fit p-3 rounded-xl flex justify-center items-center overflow-hidden group duration-200 backdrop-blur-[12px]"
                    >
                        <action.icon 
                            onClick={action.action}
                            className="text-gray-300 group-hover:text-white" 
                        />
                    </button>
                ))}
            </div>
        </div>
    );
}

export default ContactCard;