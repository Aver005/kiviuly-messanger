import { useState, useRef, useEffect } from "react"
import { Phone, Video, MessageSquare, MoreHorizontal, X, Save, Trash2, Share, Download } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"

export function ProfileSection() {
  const [isEditingNote, setIsEditingNote] = useState(false)
  const [noteContent, setNoteContent] = useState("Mollis quis a vitae leo facilisis mauris leo. Sit vitae aenean parturient tincidunt urna mollis enim aliquet tortor.")
  const [isOptionsOpen, setIsOptionsOpen] = useState(false)
  const optionsRef = useRef<HTMLDivElement>(null)

  const handleNoteEdit = () => {
    setIsEditingNote(true)
  }

  const handleNoteSave = () => {
    setIsEditingNote(false)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleNoteSave()
    }
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (optionsRef.current && !optionsRef.current.contains(event.target as Node)) {
        setIsOptionsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div className="flex flex-col h-full p-6 overflow-auto">
      <div className="text-center">
        <Avatar className="w-24 h-24 sm:w-32 sm:h-32 mx-auto">
          <AvatarImage src="/placeholder.svg" alt="Mary Freund" />
          <AvatarFallback>MF</AvatarFallback>
        </Avatar>
        <div className="mt-4 flex items-center justify-center gap-2">
          <h2 className="text-lg sm:text-xl font-semibold">@Mary Freund</h2>
          <Badge variant="secondary" className="bg-blue-500">
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none">
              <path
                d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Badge>
        </div>
      </div>

      <div className="mt-12 grid grid-cols-3 gap-4 text-center">
        <div className="space-y-1">
          <MessageSquare className="h-5 w-5 sm:h-6 sm:w-6 mx-auto" />
          <div className="text-sm">Message</div>
          <div className="text-xs text-gray-400">10:30pm</div>
        </div>
        <div className="space-y-1">
          <Phone className="h-5 w-5 sm:h-6 sm:w-6 mx-auto" />
          <div className="text-sm">Call</div>
          <div className="text-xs text-gray-400">8:00pm</div>
        </div>
        <div className="space-y-1">
          <Video className="h-5 w-5 sm:h-6 sm:w-6 mx-auto" />
          <div className="text-sm">Video Call</div>
          <div className="text-xs text-gray-400">10:00pm</div>
        </div>
      </div>

      <div className="mt-8 relative">
        <div className="flex justify-between items-center mb-2">
          <h3 className="font-medium">Notes:</h3>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsOptionsOpen(!isOptionsOpen)}
            className="text-gray-400 hover:text-white"
          >
            <MoreHorizontal className="h-5 w-5" />
          </Button>
        </div>

        {/* Выпадающее меню опций */}
        <div
          ref={optionsRef}
          className={`absolute top-8 right-0 w-48 bg-[#1c2128] rounded-lg shadow-lg transition-all duration-200 ${
            isOptionsOpen
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-2 pointer-events-none'
          }`}
        >
          <div className="grid grid-cols-2 gap-2 p-2">
            <Button variant="ghost" className="flex flex-col h-auto p-2">
              <Save className="h-4 w-4 mb-1" />
              <span className="text-xs">Save</span>
            </Button>
            <Button variant="ghost" className="flex flex-col h-auto p-2">
              <Share className="h-4 w-4 mb-1" />
              <span className="text-xs">Share</span>
            </Button>
            <Button variant="ghost" className="flex flex-col h-auto p-2">
              <Download className="h-4 w-4 mb-1" />
              <span className="text-xs">Export</span>
            </Button>
            <Button variant="ghost" className="flex flex-col h-auto p-2">
              <Trash2 className="h-4 w-4 mb-1 text-red-500" />
              <span className="text-xs text-red-500">Delete</span>
            </Button>
          </div>
        </div>

        {isEditingNote ? (
          <div className="relative">
            <Textarea
              value={noteContent}
              onChange={(e) => setNoteContent(e.target.value)}
              onKeyDown={handleKeyDown}
              onBlur={handleNoteSave}
              autoFocus
              className="pr-8"
            />
            <X
              className="absolute top-2 right-2 h-4 w-4 cursor-pointer text-gray-400"
              onClick={() => {
                setIsEditingNote(false)
                setNoteContent(noteContent)
              }}
            />
          </div>
        ) : (
          <div
            className="text-sm break-all text-gray-400 cursor-text rounded-md p-2 hover:bg-[#1c2128]"
            onDoubleClick={handleNoteEdit}
          >
            {noteContent}
          </div>
        )}
      </div>

      <Button variant="destructive" className="mt-auto">
        Block Mary Freund
      </Button>
    </div>
  )
}