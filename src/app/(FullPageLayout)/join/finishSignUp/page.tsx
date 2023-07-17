'use client'

import { useContext } from 'react'
import { Text, Button, Icon } from '@/components'
import { AuthContext } from '@/store/user/authContext'
import { useRouter } from 'next/navigation'

const FinishSignUpPage = () => {
  const router = useRouter()
  const auth = useContext(AuthContext)
  const user = auth?.user

  return (
    <div className="flex items-center justify-center w-full">
      <div className="login-wrap" aria-hidden />
      <div className="z-10 w-[680px] h-[680px] text-center flex items-center justify-center flex-col bg-black py-16 px-20 rounded-md">
        <Icon name="check-symbol" className="mb-10" />
        <Text
          as="h2"
          className="text-extra font-medium text-white text-center"
          name="회원가입이 완료되었습니다."
        />
        <Text
          as="p"
          className="text-sm font-normal text-gray-500 text-center mt-4"
          name={`회원가입시 입력하신 ${user?.email} 로 인증메일이 발송되었습니다.`}
        />
        <Text
          as="p"
          className="text-sm font-normal text-gray-500 text-center"
          name="인증을 완료하지 않으면, 서비스 이용에 불편함이 있을수 있습니다.<br/>사용자께서는 꼭 인증을 완료하여 주시기 바랍니다."
        />

        <Button
          name="홈으로"
          width={240}
          className="mt-8 text-md mx-auto py-2"
          onClick={() => {
            router.push('/main')
          }}
        />
      </div>
    </div>
  )
}

export default FinishSignUpPage
