export function ChatEvent({ content }: { content: string })
{
    return (
        <div className="flex justify-center">
            <span className="text-sm text-gray-400 italic">
                {content}
            </span>
        </div>
    )
}