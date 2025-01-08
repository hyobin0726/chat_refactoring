import MainNavigation from '@/components/layouts/MainNavigation'
import MainHeader from '@/components/layouts/MainHeader'
import ChatCreateButton from '@/components/pages/chat/ChatCreateButton'
import NotificationButton from '@/components/pages/notification/NotificationButton'

export default function ChatLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <MainHeader title="채팅방">
                <NotificationButton />
            </MainHeader>
            {children}
            <aside className=" bottom-24 right-2 fixed z-[900]">
                <ChatCreateButton />
            </aside>
            <MainNavigation />
        </>
    )
}
