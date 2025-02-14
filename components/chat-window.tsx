import { Mic, Smile, Plus, ChevronLeft, MoreVerticalIcon, PhoneIcon, SearchIcon, UserIcon } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface ChatWindowProps {
  credits: number
  setCredits: (credits: number) => void
  onBack?: () => void
}

export function ChatWindow({ credits, setCredits, onBack }: ChatWindowProps) {
    return (
        <div className="flex flex-col h-full">
            <div className="flex items-center gap-4 p-4 pl-6 border-b border-[#141A23]">
                {onBack && (
                    <Button variant="ghost" size="icon" className="md:hidden" onClick={onBack}>
                        <ChevronLeft className="h-5 w-5" />
                    </Button>
                )}
                <Avatar>
                    <AvatarImage src="/placeholder.svg" alt="Frances Swann" />
                    <AvatarFallback>FS</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                    <h2 className="font-semibold">Frances Swann</h2>
                    <span className="text-sm text-blue-500">online 🔹</span>
                </div>
                <div className="hidden sm:flex items-center">
                    <Button variant="link" className="text-gray-200 [&_svg]:w-6 [&_svg]:h-6">
                        <SearchIcon />
                    </Button>
                    <Button variant="link" className="text-gray-200 [&_svg]:w-6 [&_svg]:h-6">
                        <PhoneIcon />
                    </Button>
                    <Button variant="link" className="text-gray-200 [&_svg]:w-6 [&_svg]:h-6">
                        <MoreVerticalIcon />
                    </Button>
                </div>
            </div>

            <div className="flex-1 overflow-auto p-6 space-y-4">
                <div className="flex gap-3">
                    <Avatar className="hidden sm:block">
                        <AvatarImage src="/placeholder.svg" alt="Ricky Smith" />
                        <AvatarFallback>RS</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                        <div className="flex items-center gap-2">
                            <span className="font-medium">Ricky Smith</span>
                            <span className="text-sm text-gray-400">11:00 AM</span>
                        </div>
                        <div className="mt-3 bg-[#1c2128] rounded-2xl p-3 inline-block">Hi! How are you? 😊</div>
                    </div>
                </div>

                {/* Add more messages */}
            </div>

            <div className="p-4 border-t border-[#141A23]">
                <div className="flex items-center gap-3 bg-[#1c2128] rounded-lg p-2">
                    <Button variant="link" size="icon" className="text-gray-400 [&_svg]:w-6 [&_svg]:h-6 hidden sm:inline-flex">
                        <Mic />
                    </Button>
                    <Input placeholder="Type something..." className="bg-transparent border-0" />
                    <Button variant="link" size="icon" className="text-gray-400 [&_svg]:w-6 [&_svg]:h-6">
                        <Smile />
                    </Button>
                    <Button variant="link" size="icon" className="text-gray-400 [&_svg]:w-6 [&_svg]:h-6">
                        <Plus />
                    </Button>
                </div>
            </div>
        </div>
    )
}

