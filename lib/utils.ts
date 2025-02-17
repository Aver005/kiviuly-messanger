import { Message, User } from "@/types/interfaces"
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) 
{
    return twMerge(clsx(inputs))
}

export function formatDuration(duration: number): string
{
    const minutes = Math.floor(duration / 60)
    const seconds = duration % 60
    return `${minutes}:${seconds.toString().padStart(2, "0")}`
}

export const getInitials = (sender: User) =>
{
    if (!sender) return "U"
    let initials = ""
    if (sender.firstName) initials += sender.firstName[0]
    if (sender.lastName) initials += sender.lastName[0]
    if (initials === "") initials = sender.username[0]
    return initials
}

export const getFullName = (sender: User) =>
{
    if (!sender) return "Unknown"
    const fullName = []
    if (sender.firstName) fullName.push(sender.firstName)
    if (sender.lastName) fullName.push(sender.lastName)
    if (fullName.length === 0) fullName.push(sender.username)
    return fullName.join(" ")
}