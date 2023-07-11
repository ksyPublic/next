'use client'
import React, { useEffect, useContext, useState } from 'react'
import { AuthContext } from '@/store/authContext'
import {
  signInWithPopup,
  getAuth,
  signInWithEmailAndPassword,
  FirebaseError
} from '@/store/firebase'
import { getProvider, firebaseAuth } from '@/store/auth'
import { Button, Input, Text, Checkbox, MessageBox } from '@/components'
import {
  validatePhoneNumber,
  validateEmail,
  validatePassword
} from '@/hooks/validate'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

const getId = getAuth()
const LoginPage = () => {
  const JoinMemberShip = '../join/membership'
  const auth = useContext(AuthContext)
  const user = auth?.user
  const [userId, setUserId] = useState<string>('')
  const [userPassword, setUserPassword] = useState<string>('')
  const [userType, setUserType] = useState<string>('')
  const [userIdValidate, setUserIdValidate] = useState<boolean>(false)
  const [userPassValidate, setUserPassValidate] = useState<boolean>(false)
  const router = useRouter()

  const changeUserId = (value: string) => {
    setUserId(value)
  }

  const changeUserPassword = (value: string) => {
    setUserPassword(value)
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

  const onLogin = async () => {
    switch (userType) {
      case 'email':
        emailLogin(userId, userPassword)
        break

      case 'phone':
        break

      default:
        break
    }
  }

  const emailLogin = async (id: string, pass: string) => {
    try {
      await signInWithEmailAndPassword(getId, id, pass)
    } catch (error) {
      if (error instanceof FirebaseError) {
        let errorCode = error.code
        switch (errorCode) {
          case 'auth/wrong-password':
            setUserPassValidate(true)
            break
          case 'auth/user-not-found':
            setUserIdValidate(true)
            break
          default:
            console.log('An unknown error occurred.')
        }
      }
    }
  }

  const onSocialLogin = async (event: any) => {
    const getDataValue = event.target.getAttribute('data-value')
    const provider = getProvider(getDataValue)
    try {
      const result = await signInWithPopup(firebaseAuth, provider)
      // 로그인에 성공한 후의 작업을 수행합니다.
      router.push('/main')
    } catch (error) {
      // 에러 처리를 합니다.
      console.error('로그인 실패', error)
    }
  }

  useEffect(() => {
    if (user) {
      router.push('/main')
    } else {
      return
    }
  })

  return (
    <div className="flex items-center justify-center w-full">
      <div className="login-wrap" aria-hidden />
      <div className="z-10 w-[480px] text-center bg-black py-16 px-20 rounded-md">
        <Text
          as="h2"
          className="text-2xl font-medium text-white text-left"
          name="로그인"
        />
        <Input
          placeholder="휴대폰번호 또는 이메일을 입력해주세요."
          className="mt-4"
          onChange={changeUserId}
          onBlur={checkUserId}
        />
        <MessageBox
          hidden={!userIdValidate}
          text={
            userIdValidate
              ? '올바른 아이디를 입력해주세요'
              : '휴대폰번호 또는 이메일 주소'
          }
          error={userIdValidate}
        />
        <Input
          type="password"
          placeholder="비밀번호를 입력해주세요."
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
        <div className="flex justify-between mt-4">
          <Checkbox name="로그인 정보 저장" position="right" />
          <Link href="" className="text-sm text-gray-500 underline">
            도움이 필요하십니까?
          </Link>
        </div>
        <div className="text-left mt-4">
          <Text
            as="span"
            name="회원이 아니신가요?"
            className="text-gray-500 font-normal text-sm"
          />
          <Link
            href={JoinMemberShip}
            className="text-white ml-2 font-medium hover:underline"
          >
            지금 가입하세요
          </Link>
        </div>
        <Button
          name="로그인"
          className="w-full mt-8 font-medium mx-auto py-3 bg-blue-800 hover:bg-blue-700"
          onClick={onLogin}
        />
        <Button
          name="Sign in with Google"
          variant="Google"
          onClick={onSocialLogin}
          className="w-full mt-10"
        />
        <Button
          name="Sign in with Github"
          variant="Github"
          onClick={onSocialLogin}
          className="w-full mt-2"
        />

        <Button
          name="Sign in with Facebook"
          variant="Facebook"
          onClick={onSocialLogin}
          className="w-full mt-2"
        />
      </div>
    </div>
  )
}

export default LoginPage
