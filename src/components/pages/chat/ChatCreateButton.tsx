'use client'

export default function ChatCreateButton() {
    const handleChatCreate = async () => {
        const data = {
            sellerId: 2,
            buyerId: 1,
            chatType: 0,
            saleBoardId: 101,
        }

        try {
            const res = await fetch('http://localhost:8080/ssadang/api/v1/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            })
            console.log('res:', res)
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
