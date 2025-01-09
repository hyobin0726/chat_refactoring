import { reissueAccessToken } from './ReissueAccessToken'
let isRefreshing = false
let refreshSubscribers: Array<(token: string) => void> = []
export async function auth(input: RequestInfo, init: RequestInit = {}) {
    const accessToken = localStorage.getItem('accessToken')
    init.headers = {
        ...init.headers,
        Authorization: `Bearer ${accessToken}`,
    }

    const response = await fetch(input, init)
    if (response.status === 401) {
        if (!isRefreshing) {
            isRefreshing = true
            try {
                const newAccessToken = await reissueAccessToken()
                localStorage.setItem('accessToken', newAccessToken)

                refreshSubscribers.forEach((callback) => callback(newAccessToken))
                refreshSubscribers = []
                isRefreshing = false
                console.log('토큰 재발행 성공')
            } catch (error) {
                isRefreshing = false
                console.error('Error:', error)
                window.location.href = '/'
                throw error
            }
        }

        return new Promise((resolve, reject) => {
            refreshSubscribers.push((token: string) => {
                init.headers = {
                    ...init.headers,
                    Authorization: `Bearer ${token}`,
                }
                fetch(input, init).then(resolve).catch(reject)
            })
        })
    }
    return response
}
