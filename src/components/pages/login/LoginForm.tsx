'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import RightArrow from '@/components/images/RightArrow'
import DeleteCircle from '@/components/images/DeleteCircle'

export default function LoginForm({ loginError, id, pw }: { loginError: boolean; id: string; pw: string }) {
    const [inputId, setInputId] = useState<string>(id)
    const [inputPassword, setInputPassword] = useState<string>(pw)
    const router = useRouter()
    const handleLogin = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        router.push('/chat')
    }

    return (
        <>
            <form className={`w-full h-auto ${loginError == true ? 'space-y-3' : 'space-y-4'}`} onSubmit={handleLogin}>
                <div className="h-auto divide-y divide-inherit">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="ID"
                            onChange={(e) => setInputId(e.target.value)}
                            value={inputId}
                            className="bg-white w-full h-[60px] rounded-t-xl pl-5 pr-[50px] font-Pretendard text-[15px] caret-hobbing-red focus:outline-none"
                            maxLength={20}
                        />
                        <div
                            onClick={() => setInputId('')}
                            className="absolute h-[60px] w-[50px] top-0 right-0 flex justify-center items-center"
                        >
                            <DeleteCircle width={30} height={30} />
                        </div>
                    </div>
                    <div className="relative">
                        <input
                            type="password"
                            placeholder="Password"
                            onChange={(e) => setInputPassword(e.target.value)}
                            value={inputPassword}
                            className="bg-white w-full h-[60px] rounded-b-xl pl-5 pr-[50px] font-Pretendard text-[15px] caret-hobbing-red focus:outline-none"
                            maxLength={20}
                            autoComplete="off"
                        />
                        <div
                            onClick={() => setInputPassword('')}
                            className="absolute h-[60px] w-[50px] top-0 right-0 flex justify-center items-center"
                        >
                            <DeleteCircle width={30} height={30} />
                        </div>
                    </div>
                </div>
                {loginError == true && (
                    <p className="text-[15px] text-hobbing-red font-bold text-center">
                        ** 아이디/비밀번호를 다시 입력해주세요 **
                    </p>
                )}
                <button
                    type="submit"
                    className="bg-hobbing-red h-[60px] w-full rounded-xl flex flex-row justify-between items-center px-8 text-[15px] font-bold text-white"
                >
                    로그인
                    <RightArrow width={15} height={15} />
                </button>
            </form>
        </>
    )
}
