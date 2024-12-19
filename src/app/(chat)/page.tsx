'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
interface Chat {
    chatId: number
    saleBoardId: string
}

export default function ChatTestPage() {
    const [chatList, setChatList] = useState<Chat[]>([])
    const [loading, setLoading] = useState<boolean>(true)

    useEffect(() => {
        const fetchChatList = async () => {
            try {
                const response = await fetch('http://localhost:8080/ssadang/api/v1/chat/1', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                })
                const data = await response.json()
                console.log('data:', data)
                setChatList(data)
                // console.log('chatList:', chatList)
            } catch (error) {
                console.error('채팅 데이터를 가져오는 중 오류가 발생했습니다:', error)
            } finally {
                setLoading(false)
            }
        }

        fetchChatList()
    }, [])

    if (loading) {
        return <div>로딩 중...</div>
    }

    return (
        <div className="bg-[#FBFBFD] h-[calc(100dvh-140px)] overflow-y-scroll scrollbar-hide">
            {chatList.length ? (
                chatList.map((chat: Chat, index: number) => (
                    <div key={index} className="p-4 border-b border-gray-200">
                        <Link href={`/chatRoom/${chat.chatId}`} passHref scroll={false}>
                            <p>채팅방 아이디: {chat.chatId}</p>
                            <p>상품 아이디: {chat.saleBoardId}</p>
                        </Link>
                    </div>
                ))
            ) : (
                <div className="text-gray-500 text-center mt-5">채팅이 없습니다.</div>
            )}
        </div>
    )
}
