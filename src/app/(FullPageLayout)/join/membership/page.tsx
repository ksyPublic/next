'use client'

import React, { useState } from 'react'
import { Button, Input, Text, MessageBox } from '@/components'
import { useRouter } from 'next/navigation'
import {
  validatePhoneNumber,
  validateEmail,
  validatePassword
} from '@/hooks/validate'

import {
  getAuth,
  FirebaseError,
  createUserWithEmailAndPassword,
  sendSignInLinkToEmail
} from '@/store/firebase'

const auth = getAuth()

const MembershipPage = () => {
  const router = useRouter()
  const [userId, setUserId] = useState<string>('')
  const [userPassword, setUserPassword] = useState<string>('')
  const [passConfirm, setPassConfirm] = useState<string>('')

  const [userType, setUserType] = useState<string>('')
  const [userIdValidate, setUserIdValidate] = useState<boolean>(false)
  const [userPassValidate, setUserPassValidate] = useState<boolean>(false)
  const [passConfirmValidate, setPassConfirmValidate] = useState<
    boolean | null
  >(null)

  const changeUserId = (value: string) => {
    setUserId(value)
  }

  const changeUserPassword = (value: string) => {
    setUserPassword(value)
  }

  const changePasswordConfirm = (value: string) => {
    setPassConfirm(value)
  }

  const checkUserId = () => {
    if (userId.length > 0) {
      validateEmail(userId) || validatePhoneNumber(userId)
        ? setUserIdValidate(false)
        : setUserIdValidate(true)

      if (validateEmail(userId)) {
        setUserType('email')
      }
    } else {
      setUserIdValidate(false)
    }
  }

  const checkUserPassword = () => {
    if (userPassword.length > 0) {
      validatePassword(userPassword)
        ? setUserPassValidate(false)
        : setUserPassValidate(true)
    } else {
      setUserPassValidate(false)
    }
  }

  const checkUserPassConfirm = () => {
    if (userPassword.length > 0 && passConfirm.length > 0) {
      if (userPassword === passConfirm) {
        setPassConfirmValidate(true)
      } else {
        setPassConfirmValidate(false)
      }
    }
  }

  const handleSignUp = () => {
    switch (userType) {
      case 'email':
        emailMemberJoin(userId, userPassword)
        break

      default:
        console.error('error')
        break
    }
  }

  const emailMemberJoin = (email: string, pass: string) => {
    createUserWithEmailAndPassword(auth, email, pass)
      .then((userCredential) => {
        const actionCodeSettings = {
          url:
            process.env.NODE_ENV === 'development'
              ? `http://${process.env.NEXT_PUBLIC_DEV_HOST}/join/finishSignUp`
              : `https://${process.env.NEXT_PUBLIC_PRODUCTION_NAME}/join/finishSignUp`,

          // URL you want to redirect back to
          handleCodeInApp: true // This must be true
        }

        sendSignInLinkToEmail(auth, email, actionCodeSettings)
          .then(() => {
            window.localStorage.setItem('emailForSignIn', email)
            router.push('/join/finishSignUp')
          })
          .catch((error) => {
            if (error instanceof FirebaseError) {
              let errorCode = error.code
              switch (errorCode) {
                case 'auth/email-already-in-use':
                  console.log(
                    '이미 회원가입이 되어있는 상태일때 : 추후 Alert 처리 예정'
                  )
                  break

                default:
                  console.error('An unknown error occurred.')
              }
            }
          })
      })
      .catch((error) => {
        console.error('에러가 어디서나는지1', error)
      })
  }

  return (
    <div className="flex items-center justify-center w-full">
      <div className="login-wrap" aria-hidden />
      <div className="z-10 w-[560px] text-center bg-black py-16 px-20 rounded-md">
        <form>
          <Text
            as="h2"
            className="text-2xl font-medium text-white text-left"
            name="회원가입"
          />
          <Input
            placeholder="아이디"
            className="mt-4"
            onChange={changeUserId}
            onBlur={checkUserId}
          />
          <MessageBox
            text={
              userIdValidate
                ? '올바른 아이디를 입력해주세요'
                : '이메일 주소를 입력해주세요.'
            }
            error={userIdValidate}
          />
          <Input
            variant="password"
            placeholder="비밀번호"
            className="mt-2"
            onChange={changeUserPassword}
            onBlur={checkUserPassword}
          />
          <MessageBox
            hidden={!userPassValidate}
            text={
              userPassValidate
                ? '유효한 비밀번호가 아닙니다. 다시 입력해주세요.'
                : '영문, 숫자, 특수문자(~!@#$%^&*) 조합 8~15 자리'
            }
            error={userPassValidate}
          />
          <Input
            type="password"
            placeholder="비밀번호 확인"
            className="mt-2"
            onChange={changePasswordConfirm}
            onBlur={checkUserPassConfirm}
          />
          <MessageBox
            text={
              !passConfirmValidate && passConfirmValidate !== null
                ? '비밀번호가 일치하지 않습니다. 다시 입력해주세요.'
                : '영문, 숫자, 특수문자(~!@#$%^&*) 조합 8~15 자리'
            }
            error={!passConfirmValidate && passConfirmValidate !== null}
          />

          <div className="mt-8">
            <Button
              disabled={
                userIdValidate || userPassValidate || !passConfirmValidate
              }
              name="가입하기"
              className="w-full font-medium text-xl mx-auto py-4"
              onClick={handleSignUp}
            />
          </div>
        </form>
      </div>
    </div>
  )
}

export default MembershipPage
