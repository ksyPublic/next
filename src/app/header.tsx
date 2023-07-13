'use client'
import React, { useContext } from 'react'
import { AuthContext } from '@/store/user/authContext'
import { signOut } from '@/store/user'
import { firebaseAuth } from '@/store/user/auth'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function Header() {
  const auth = useContext(AuthContext)
  const user = auth?.user
  const router = useRouter()

  async function logoutHandler() {
    //Sign out with the Firebase client
    await signOut(firebaseAuth)

    //Clear the cookies in the server
    const response = await fetch('http://localhost:5001/api/signOut', {
      method: 'POST'
    })

    if (response.status === 200) {
      router.push('/login')
    }
  }

  return (
    <header className="flex">
      <div className="h-20 px-10 w-full flex items-center justify-between border-b-[1px]">
        <h1>
          <Link className="font-semibold text-xl" href="/">
            FrontDev.
          </Link>
        </h1>

        {user ? (
          <ul className="flex items-center">
            <li>
              <Image
                className="rounded-full"
                alt="user profile"
                width={40}
                height={40}
                src={`${user?.photoURL || ''}`}
              />
            </li>
            <li className="mr-4 ml-4 font-medium">
              환영합니다 {`${user?.displayName}`} 님
            </li>
            <li className="last:mr-0">
              <button type="button" onClick={logoutHandler}>
                로그아웃
              </button>
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
