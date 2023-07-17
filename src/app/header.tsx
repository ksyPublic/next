'use client'
import React, { useContext, useMemo } from 'react'
import { Button } from '@/components'
import { AuthContext } from '@/store/user/authContext'
import { signOut } from '@/store/user'
import { firebaseAuth } from '@/store/user/auth'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import Image from 'next/image'
import Link from 'next/link'

export default function Header() {
  const auth = useContext(AuthContext)
  const user = auth?.user
  const router = useRouter()

  const logoutHandler = async () => {
    await signOut(firebaseAuth)

    try {
      const response = await axios.post(
        process.env.NODE_ENV === 'development'
          ? `http://${process.env.NEXT_PUBLIC_DEV_HOST}/api/main`
          : `${process.env.NEXT_PUBLIC_APP_DOMAIN}`
      )

      if (response.status === 200) {
        router.push('/login')
      }
    } catch (error) {
      console.error('Logout failed', error)
    }
  }

  const adminUser = useMemo(() => {
    return user?.uid === `${process.env.NEXT_PUBLIC_ADMIN_USER}`
  }, [user])

  return (
    <header className="flex">
      <div className="h-32 px-10 w-full flex items-center justify-between">
        {!adminUser && (
          <h1>
            <Link
              href={'/'}
              className="relative z-10 text-white font-bold text-extra tracking-tighter shadow-lg shadow-black lato"
            >
              NEXTLIFE
            </Link>
          </h1>
        )}

        {user ? (
          <ul className={`flex items-center ${adminUser ? 'ml-auto' : ''}`}>
            <li>
              <Link href="/profile">
                <Image
                  className="rounded-full"
                  alt="user profile"
                  width={40}
                  height={40}
                  src={`${user?.photoURL || `/images/icon/icon-account.svg`}`}
                />
              </Link>
            </li>
            <li className="mr-4 ml-2 font-medium text-white">
              {adminUser
                ? '환영합니다 관리자님'
                : `환영합니다 ${
                    user?.displayName ? user?.displayName + '님' : ''
                  }`}
            </li>
            <li className="last:mr-0">
              <Button onClick={logoutHandler} size="sm">
                로그아웃
              </Button>
            </li>
          </ul>
        ) : (
          <ul className="flex items-center">
            <li>
              <Link href="/login">로그인</Link>
            </li>
          </ul>
        )}
      </div>
    </header>
  )
}
