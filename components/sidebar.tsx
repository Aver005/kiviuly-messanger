import { Bell, DollarSign, MessageSquare, Phone, Settings, Users } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Link from "next/link"

export function Sidebar() 
{
    return (
        <div className="w-[72px] bg-[#0d1117] border-r h-full border-[#141A23] flex flex-col items-center py-4">
            <nav className="flex-1 flex flex-col gap-10 mt-2">
                <Link href="/messages" className="text-blue-500">
                    <MessageSquare className="h-6 w-6" />
                </Link>
                <Link href="/notifications" className="text-gray-400 hover:text-white">
                    <Bell className="h-6 w-6" />
                </Link>
                <Link href="/calls" className="text-gray-400 hover:text-white">
                    <Phone className="h-6 w-6" />
                </Link>
                <Link href="/contacts" className="text-gray-400 hover:text-white">
                    <Users className="h-6 w-6" />
                </Link>
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
    )
}

