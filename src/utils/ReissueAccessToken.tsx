export async function reissueAccessToken() {
    try {
        const response = await fetch('http://localhost:8080/ssadang/user/reissue', {
            method: 'POST',
            credentials: 'include',
        })

        if (!response.ok) {
            throw new Error('토큰 재발행 실패')
        }
        const data = await response.json()
        return data.accessToken
    } catch (error) {
        console.error('Error:', error)
    }
}
