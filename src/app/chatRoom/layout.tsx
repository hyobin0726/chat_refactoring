import MainHeader from '@/components/layouts/MainHeader'

export default function ChatRoomLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <MainHeader title="채팅방"></MainHeader>
            {children}
    
        </>
    )
}
