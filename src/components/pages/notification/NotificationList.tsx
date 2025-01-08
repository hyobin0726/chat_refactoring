'use client'
import TopSliderModal from '@/components/common/TopSliderModal'
import Image from 'next/image'
import Delete from '@/components/images/Delete'

interface NotificationData {
    id: string
    content: string
    createdAt: string
    isRead: boolean
}

export default function NotificationList({
    isModalOpen,
    modalController,
    notificationData,
    onDeleteNotification,
    onMarkAsRead,
}: {
    isModalOpen: boolean
    modalController: () => void
    notificationData: NotificationData[]
    onDeleteNotification: (notificationId: string) => void
    onMarkAsRead: (notificationId: string) => void
}) {
    const handleDelete = async (notificationId: string) => {
        try {
            const response = await fetch(`http://localhost:8080/ssadang/api/v1/notifications/${notificationId}/read`, {
                method: 'PUT',
            })
            if (response.ok) {
                onDeleteNotification(notificationId)
            } else {
                console.error('Failed to delete notification')
            }
        } catch (error) {
            console.error('Error deleting notification:', error)
        }
    }

    const handleMarkAsRead = async (notificationId: string) => {
        try {
            const response = await fetch(`http://localhost:8080/ssadang/api/v1/notifications/${notificationId}/read`, {
                method: 'PUT',
            })
            if (response.ok) {
                onMarkAsRead(notificationId)
            } else {
                console.error('Failed to mark notification as read')
            }
        } catch (error) {
            console.error('Error marking notification as read:', error)
        }
    }

    return (
        <div className="z-[950] fixed flex items-end justify-center">
            <TopSliderModal isModalOpen={isModalOpen} onChangeModal={modalController} backgroundClose={true} top={true}>
                <div className="h-[500px] space-y-4 p-3 overflow-y-scroll scrollbar-hide w-full">
                    <div className="flex justify-between px-2">
                        <p className="text-xl font-bold">알림</p>
                        <button className="text-[#FD7A23] text-[20px] font-bold" onClick={modalController}>
                            X
                        </button>
                    </div>
                    {notificationData.map((notification) => (
                        <div
                            key={notification.id}
                            className={`flex items-center justify-between p-2 border-b ${
                                notification.isRead ? 'opacity-50' : ''
                            }`}
                            onClick={() => handleMarkAsRead(notification.id)}
                        >
                            <div className="flex flex-row space-x-2 w-[80%] items-center">
                                <div className="flex flex-col">
                                    <p className="font-bold">{notification.content}</p>
                                    <p className="text-xs text-gray-400">
                                        {new Date(notification.createdAt).toLocaleString('ko-KR')}
                                    </p>
                                </div>
                            </div>
                            <div
                                className="w-4 h-4"
                                onClick={(e) => {
                                    e.stopPropagation()
                                    handleDelete(notification.id)
                                }}
                            >
                                <Delete />
                            </div>
                        </div>
                    ))}
                </div>
            </TopSliderModal>
        </div>
    )
}
