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
      } else if (validatePhoneNumber(userId)) {
        setUserType('phone')
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
        emailLogin(userId, userPassword)
        break
      case 'phone':
        phoneLogin()
        break
      default:
        console.error('error')
        break
    }
  }

  const emailLogin = (email: string, pass: string) => {
    createUserWithEmailAndPassword(auth, email, pass)
      .then((userCredential) => {
        const actionCodeSettings = {
          url:
            process.env.NODE_ENV === 'development'
              ? `http://localhost:${process.env.DEV_HOST}/join/finishSignUp`
              : `https://${process.env.PRODUCTION_NAME}/join/finishSignUp`,

          // URL you want to redirect back to
          handleCodeInApp: true // This must be true
        }

        sendSignInLinkToEmail(auth, email, actionCodeSettings)
          .then(() => {
            window.localStorage.setItem('emailForSignIn', email)
            console.log('Verification email sent.')

            router.push('/join/finishSignUp')
          })
          .catch((error) => {
            console.error(error)
          })
      })
      .catch((error) => {
        console.error(error)
      })
  }

  const phoneLogin = () => {
    //
  }

  return (
    <div className="flex items-center justify-center w-full">
      <div className="login-wrap" aria-hidden />
      <div className="z-10 w-[680px] text-center bg-black py-16 px-20 rounded-md">
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
              : '휴대폰번호 또는 이메일 주소'
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
            className="w-full font-medium text-xl mx-auto py-4 bg-blue-800 hover:bg-blue-700 disabled:bg-gray-700 text-gray-600"
            onClick={handleSignUp}
          />
        </div>
      </div>
    </div>
  )
}

export default MembershipPage
