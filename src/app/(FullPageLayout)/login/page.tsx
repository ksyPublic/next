'use client'
import React, { useEffect, useState } from 'react'
import {
  signInWithPopup,
  getAuth,
  signInWithEmailAndPassword,
  signInWithPhoneNumber,
  RecaptchaVerifier,
  FirebaseError,
  getRedirectResult,
  auth
} from '@/store/user'
import { ConfirmationResult } from 'firebase/auth'
import { getProvider, firebaseAuth } from '@/store/user/auth'
import { Button, Input, Text, Checkbox, MessageBox } from '@/components'
import {
  validatePhoneNumber,
  validateEmail,
  validatePassword,
  toPhoneKR
} from '@/hooks/validate'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

const authInstance = getAuth()
const LoginPage = () => {
  const JoinMemberShip = '/join/membership'
  const router = useRouter()

  const [recaptchaVerifier, setRecaptchaVerifier] =
    useState<RecaptchaVerifier | null>(null)
  const [userId, setUserId] = useState<string>('')
  const [userPassword, setUserPassword] = useState<string>('')
  const [code, setCode] = useState<string>('')
  const [confirmUi, setConfirmUi] = useState<ConfirmationResult | undefined>()
  const [userType, setUserType] = useState<string>('')
  const [userIdValidate, setUserIdValidate] = useState<boolean>(false)
  const [userPassValidate, setUserPassValidate] = useState<boolean>(false)
  const [loginAuthSave, setLoginAuthSave] = useState<boolean>(false)
  const loginAuthSaveUpdate = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginAuthSave(e.target.checked)
  }

  const changeUserId = (value: string) => {
    setUserId(value)

    if (value.length > 0) {
      if (validateEmail(value)) {
        setUserType('email')
      } else if (validatePhoneNumber(value)) {
        setUserType('phone')
      }
    } else {
      setUserType('')
    }
  }

  const changeUserPassword = (value: string) => {
    setUserPassword(value)
  }

  const checkUserId = () => {
    if (userId.length > 0) {
      validateEmail(userId) || validatePhoneNumber(userId)
        ? setUserIdValidate(false)
        : setUserIdValidate(true)
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
        phoneLogin()
        break

      default:
        console.error('로그인 타입이 지정되지 않았습니다.')
        break
    }
  }

  const phoneLogin = async () => {
    await confirmUi
      ?.confirm(code)
      .then((result: { user: any }) => {
        const user = result.user
      })
      .catch((error: any) => {
        console.error(error)
      })
  }

  const phoneConfirmMsg = async (id: string) => {
    const krID = toPhoneKR(id)
    if (recaptchaVerifier) {
      await signInWithPhoneNumber(authInstance, krID, recaptchaVerifier)
        .then((confirmationResult) => {
          return setConfirmUi(confirmationResult)
        })

        .catch((error) => {
          // reCAPTCHA 컨테이너 비우기
          const recaptchaContainer = document.getElementById(
            'recaptcha-container'
          )

          if (recaptchaContainer) {
            recaptchaContainer.innerHTML = ''

            // 새로운 RecaptchaVerifier 인스턴스 생성
            const newRecaptchaVerifier = new RecaptchaVerifier(
              'recaptcha-container',
              {
                size: 'invisible',
                callback: (response: any) => {
                  // reCAPTCHA 검증 성공 시 실행할 콜백 함수
                }
              },
              authInstance
            )

            // 기존의 recaptchaVerifier.current에 새로운 인스턴스 할당
            setRecaptchaVerifier(newRecaptchaVerifier)
          }

          console.error('로그인 실패', error)
        })
    }
  }

  const emailLogin = async (id: string, pass: string) => {
    try {
      await signInWithEmailAndPassword(authInstance, id, pass).then(() => {
        router.push('/main')
      })
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
      if (result) {
        router.push('/main')
      }
    } catch (error) {
      // 에러 처리를 합니다.
      console.error('로그인 실패', error)
    }
  }

  const getCodeFromUserInput = (value: string) => {
    setCode(value)
  }

  useEffect(() => {
    setRecaptchaVerifier(
      new RecaptchaVerifier(
        'recaptcha-container',
        {
          size: 'invisible',
          callback: (response: any) => {}
        },
        authInstance
      )
    )

    //외부서비스 outh 가져오기 추후사용예정
    getRedirectResult(auth).then(async (userCred) => {
      if (!userCred) {
        return
      }
      fetch('/api/login', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${await userCred.user.getIdToken()}`
        }
      }).then((response) => {
        if (response.status === 200) {
          router.push('/main')
        }
      })
    })
  }, [router])

  return (
    <div className="flex items-center justify-center w-full">
      <div className="login-wrap" aria-hidden />
      <div className="z-10 w-[560px] text-center bg-black py-16 px-20 rounded-md">
        <form>
          <Text
            as="h2"
            className="text-2xl font-medium text-white text-left"
            name="로그인"
          />
          <Input
            placeholder="휴대폰번호 또는 이메일 주소"
            className="mt-4"
            onChange={changeUserId}
            onBlur={checkUserId}
          />
          <div
            className={`flex ${
              userType && userType === 'phone' ? 'block' : 'hidden'
            }`}
          >
            <Input
              placeholder="인증번호를 입력해주세요."
              className={`mt-2 mr-2 flex-1`}
              onChange={getCodeFromUserInput}
            />
            <Button
              variant="primary"
              className={`mt-2 whitespace-nowrap`}
              name="인증번호발송"
              onClick={(e) => phoneConfirmMsg(userId)}
            />
          </div>

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
            variant="password"
            placeholder="비밀번호를 입력해주세요."
            className={`mt-2 ${
              userType && userType === 'phone' ? 'hidden' : 'block'
            }`}
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
            <Checkbox
              name="로그인 정보 저장"
              position="right"
              checked={loginAuthSave}
              onChange={loginAuthSaveUpdate}
            />
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
              className="text-white text-md ml-2 font-medium underline"
            >
              지금 가입하세요
            </Link>
            <Text
              as="p"
              name="이 페이지는 Google reCAPTCHA의 보호를 받아 사용자가 로봇이 아님을 확인합니다."
              className="text-gray-500 text-sm mt-4"
            />
            <div id="recaptcha-container" className="relative" aria-hidden />
          </div>
        </form>
        <Button
          name="로그인"
          className="w-full mt-8 font-medium mx-auto"
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
