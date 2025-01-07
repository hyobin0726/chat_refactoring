'use client'

import { useEffect, useState } from 'react'
import { Stomp } from '@stomp/stompjs'
import SockJS from 'sockjs-client'

interface Message {
    sender: number
    content: string
    createDate: string
}

export default function ChatRoomPage({ params }: { params: { chatId: string } }) {
    const [messages, setMessages] = useState<Message[]>([])
    const [stompClient, setStompClient] = useState<any>(null)
    const [inputMessage, setInputMessage] = useState<string>('')
    const userId = 101 // 현재 사용자 ID
    // console.log('params:', params.chatId)
    useEffect(() => {
        // 이전 메시지를 조회
        const fetchMessages = async () => {
            try {
                const response = await fetch(
                    `http://localhost:8080/ssadang/api/v1/chat/${params.chatId}/messages?userId=${userId}&page=0&size=1`,
                )
                const data = await response.json()
                setMessages(data.content)
                console.log('data:', data)
            } catch (error) {
                console.error('Failed to fetch messages:', error)
            }
        }

        fetchMessages()

        // 2. WebSocket 연결
        const socket = new SockJS('http://localhost:8080/ssadang/ws-connect') // SockJS 엔드포인트
        const client = Stomp.over(socket)

        client.connect({}, () => {
            console.log('Connected to WebSocket')

            // 채팅방 구독
            client.subscribe(`/subscribe/chat/${params.chatId}`, (message) => {
                const newMessage = JSON.parse(message.body)
                setMessages((prev) => [...prev, newMessage]) // 새 메시지를 추가
                console.log('newMessage:', newMessage)
            })
        })

        setStompClient(client)

        // 컴포넌트 언마운트 시 연결 해제
        return () => {
            if (client) {
                client.disconnect(() => {
                    console.log('Disconnected from WebSocket')
                })
            }
        }
    }, [params.chatId])

    const sendMessage = () => {
        if (stompClient && inputMessage.trim()) {
            const message = {
                sender: userId, // 현재 사용자 ID
                content: inputMessage,
            }

            stompClient.send(`/publish/chat/${params.chatId}`, {}, JSON.stringify(message))
            setInputMessage('')
        }
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column' }} className="h-[calc(100dvh-60px)]">
            <div
                style={{
                    flex: 1,
                    overflowY: 'auto',
                    padding: '10px',
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
                {messages.map((msg, index) => (
                    <div
                        key={index}
                        style={{
                            display: 'flex',
                            justifyContent: msg.sender === userId ? 'flex-end' : 'flex-start',
                            marginBottom: '10px',
                        }}
                    >
                        <div
                            style={{
                                maxWidth: '60%',
                                padding: '10px',
                                borderRadius: '10px',
                                backgroundColor: msg.sender === userId ? '' : '#f1f0f0',
                                textAlign: 'left',
                                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                            }}
                        >
                            <p style={{ margin: 0, fontWeight: 'bold' }}>보낸아이디:{msg.sender}</p>
                            <p style={{ margin: 0 }}>{msg.content}</p>
                            <p style={{ margin: 0, fontSize: '12px', color: '#888' }}>{msg.createDate}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* 메시지 입력 */}
            <div
                style={{
                    display: 'flex',
                    padding: '10px',
                    borderTop: '1px solid #ddd',
                }}
            >
                <input
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    placeholder="메시지를 입력하세요"
                    style={{
                        flex: 1,
                        padding: '10px',
                        border: '1px solid #ddd',
                        borderRadius: '5px',
                        marginRight: '10px',
                    }}
                />
                <button
                    onClick={sendMessage}
                    className="bg-hobbing-pink"
                    style={{
                        padding: '10px 20px',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer',
                        color: 'white',
                    }}
                >
                    전송
                </button>
            </div>
        </div>
    )
}
