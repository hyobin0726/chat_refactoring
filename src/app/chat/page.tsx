'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
interface Chat {
    saleBoardId: string
    content: string
    id: string
    senderIds: string[]
    createDate: string
    unReadCounts: Record<string, number>
}

export default function ChatTestPage() {
    const [chatList, setChatList] = useState<Chat[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const userId = 101

    useEffect(() => {
        const fetchChatList = async () => {
            try {
                const response = await fetch(`http://localhost:8080/ssadang/api/v1/chat/rooms?userId=${userId}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                })

                const data = await response.json()
                console.log('data:', data)
                setChatList(data)
                // console.log('chatList:', chatList)
            } catch (error: any) {
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
                        <Link href={`/chatRoom/${chat.id}`} passHref scroll={false}>
                            <p>채팅방 아이디: {chat.id}</p>
                            <p>상품 아이디: {chat.saleBoardId}</p>
                            <p>내용: {chat.content}</p>
                            <p>참여자: {chat.senderIds.join(', ')}</p>
                            <p>생성일: {chat.createDate}</p>
                            <p>안 읽은 메시지 수: {chat.unReadCounts[userId]}</p>
                        </Link>
                    </div>
                ))
            ) : (
                <div className="text-gray-500 text-center mt-5">채팅이 없습니다.</div>
            )}
        </div>
    )
}
