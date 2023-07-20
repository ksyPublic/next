'use client'
import React, { useContext, useEffect, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { AuthContext } from '@/store/user/authContext'
import Header from '../header'
import Footer from '../footer'
import cx from 'clsx'

export default function DefaultLayout({
  children
}: {
  children: React.ReactNode
}) {
  const auth = useContext(AuthContext)
  const user = auth?.user

  const adminUser = useMemo(() => {
    return user?.uid === `${process.env.NEXT_PUBLIC_ADMIN_USER}`
  }, [user])

  const classes = cx(adminUser && 'flex w-full')

  if (user !== null) {
    return (
      <div className={classes}>
        <div
          className={`flex flex-col w-full ${adminUser ? 'pl-[24.0rem]' : ''}`}
        >
          <Header admin={adminUser} />
          <main className="flex">{children}</main>
          <Footer />
        </div>
      </div>
    )
  } else {
    return null // 추가: user가 null인 경우 리턴값 필요
  }
}
