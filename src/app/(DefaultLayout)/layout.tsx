'use client'
import React, { Fragment, useContext, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { AuthContext } from '@/store/user/authContext'
import Header from '../header'
import Footer from '../footer'

export default function DefaultLayout({
  children
}: {
  children: React.ReactNode
}) {
  const auth = useContext(AuthContext)
  const user = auth?.user
  const router = useRouter()

  useEffect(() => {
    if (user === null) {
      router.push('/login')
    }
  }, [user, router])

  if (user !== null) {
    return (
      <Fragment>
        <Header />
        <main className="flex">{children}</main>
        <Footer />
      </Fragment>
    )
  } else {
    return null // 추가: user가 null인 경우 리턴값 필요
  }
}
