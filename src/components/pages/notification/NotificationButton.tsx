'use client'
import Notification from '@/components/images/Notification'
import { useEffect, useState } from 'react'
import NotificationList from './NotificationList'
import { EventSourcePolyfill } from 'event-source-polyfill'

interface NotificationData {
    id: string
    content: string
    createdAt: string
    isRead: boolean
}

export default function NotificationButton() {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
    const [notificationData, setNotificationData] = useState<NotificationData[]>([])
    const userId = 1

    const modalController = () => {
        setIsModalOpen(!isModalOpen)
    }

    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const response = await fetch(
                    `http://localhost:8080/ssadang/api/v1/notifications/unread?userId=${userId}`,
                )
                if (response.ok) {
                    const data = await response.json()
                    setNotificationData(data)
                } else {
                    console.error('Failed to fetch notifications')
                }
            } catch (error) {
                console.error('Error fetching notifications:', error)
            }
        }
        fetchNotifications()
    }, [])

    const handleDeleteNotification = (notificationId: string) => {
        setNotificationData((prevData) => prevData.filter((notification) => notification.id !== notificationId))
    }

    const handleMarkAsRead = (notificationId: string) => {
        setNotificationData((prevData) =>
            prevData.map((notification) =>
                notification.id === notificationId ? { ...notification, isRead: true } : notification,
            ),
        )
    }

    useEffect(() => {
        const connectToSSE = () => {
            const EventSource = EventSourcePolyfill
            const eventSource = new EventSource(
                `http://localhost:8080/ssadang/api/v1/notifications/subscribe?userId=${userId}`,
                {
                    withCredentials: true,
                },
            )
            eventSource.onmessage = (event: any) => {
                const newNotification: NotificationData = JSON.parse(event.data)
                setNotificationData((prevData) => [newNotification, ...prevData])
            }
            eventSource.onerror = () => {
                eventSource.close()
                setTimeout(() => connectToSSE(), 5000)
            }
            return eventSource
        }

        const eventSource = connectToSSE()
        return () => {
            eventSource.close()
        }
    }, [])

    return (
        <>
            <button onClick={modalController}>
                <div className="w-5 h-full">
                    <Notification />
                </div>
                {notificationData.length > 0 && (
                    <div className="w-2.5 h-2.5 rounded-full bg-hobbing-red absolute top-4 right-4" />
                )}
            </button>
            <NotificationList
                isModalOpen={isModalOpen}
                modalController={modalController}
                notificationData={notificationData}
                onDeleteNotification={handleDeleteNotification}
                onMarkAsRead={handleMarkAsRead}
            />
        </>
    )
}
