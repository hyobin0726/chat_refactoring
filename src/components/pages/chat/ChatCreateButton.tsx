'use client'
import { useRouter } from 'next/navigation'
export default function ChatCreateButton() {
    const router = useRouter()
    const userId = 101
    const handleChatCreate = async () => {
        const data = {
            chatType: 1,
            saleBoardId: 2,
            shareBoardId: null,
            senderId: 103,
        }

        try {
            const res = await fetch(`http://localhost:8080/ssadang/api/v1/chat/room?userId=${userId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            })

            const result = await res.text()
            router.push(`/chatRoom/${result}`)
            console.log('Chat Room ID:', result)
        } catch (error) {
            console.error('error:', error)
        }
    }
    return (
        <div>
            <div
                onClick={handleChatCreate}
                className="bg-hobbing-bg-pink rounded-full h-16 w-16 flex items-center justify-center shadow-md text-gray-500 cursor-pointer"
            >
                채팅추가
            </div>
        </div>
    )
}
