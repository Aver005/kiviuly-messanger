"use client"

import { Mic, Plus, SendHorizonal, SendIcon, Smile, XIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Message } from "@/types/interfaces"
import { useState } from "react"
import { Textarea } from "../ui/textarea"

interface ChatEditorProps 
{
    onSend: (text: string) => void;
    quotedMessage?: Message | null;
    quotedText?: string | null;
    onCancelQuote?: () => void;
}
  
export function ChatEditor({onSend, quotedMessage, quotedText, onCancelQuote,}: ChatEditorProps) 
{
    const [inputText, setInputText] = useState("")

    const handleSubmit = () => 
    {
        if (inputText.trim()) 
        {
            onSend(inputText)
            setInputText("")
        }
    }

    return (
        <div className="p-4 border-t border-[#141A23]">
            {quotedMessage && (
                <div className="mb-2 p-2 bg-[#1c2128] border-l-4 border-blue-500 rounded-t-lg flex justify-between items-center">
                    <div className="text-sm text-gray-400">
                        {quotedText ? "Цитата " : "Ответ на "}{`${quotedMessage.sender.username}: `}
                        <span className="text-gray-300">
                            {quotedText || quotedMessage.content}
                        </span>
                    </div>
                    <button
                        onClick={onCancelQuote}
                        className="text-gray-500 hover:text-gray-400 ml-2"
                    >
                        <XIcon />
                    </button>
                </div>
            )}
            <div className="flex flex-row">
                <div className="flex flex-1 items-center gap-3 bg-[#1c2128] rounded-lg p-2">
                    <Button variant="link" size="icon" className="text-gray-400 [&_svg]:size-6 hidden sm:inline-flex">
                        <Mic />
                    </Button>
                    <Textarea
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                        placeholder="Type something..."
                        className="bg-transparent border-0 min-h-0 text-lg"
                    />
                    <Button variant="link" size="icon" className="text-gray-400 [&_svg]:size-6">
                        <Smile />
                    </Button>
                    <Button variant="link" size="icon" className="text-gray-400 [&_svg]:size-6">
                        <Plus />
                    </Button>
                </div>
                {inputText.trim() && <div 
                    onClick={handleSubmit}
                    className="flex items-center px-2 ml-2 rounded-md transition-all hover:bg-blue-600"
                >
                    <Button 
                        variant="link" size="icon" 
                        className="text-gray-400 hover:text-white [&_svg]:size-6"
                    >
                        <SendHorizonal />
                    </Button>
                </div>}
            </div>
        </div>
    )
}