'use client'
import React, { useContext, useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import { AuthContext } from '@/store/user/authContext'
import { SideBar } from '@/components'
import Header from '../header'
import Footer from '../footer'
import axios from 'axios'
import cx from 'clsx'

export default function DefaultLayout({
  children
}: {
  children: React.ReactNode
}) {
  const [originUser, setOriginUser] = useState<object | null>()
  const auth = useContext(AuthContext)
  const user = auth?.user
  const router = useRouter()

  const adminUser = useMemo(() => {
    console.log('@@@', user?.uid)
    return user?.uid === `${process.env.NEXT_PUBLIC_ADMIN_USER}`
  }, [user])

  const getMenu = async () => {
    await axios.get('/api/admin').then((res) => {
      try {
        if (res.status === 200) {
          console.log('success', res)
        }
      } catch (error) {
        console.error(error)
      }
    })
  }

  useEffect(() => {
    if (user === null) {
      router.push('/login')
    }

    if (adminUser) {
      setOriginUser(user)
      getMenu()
    }
  }, [user, router, adminUser, setOriginUser])

  const classes = cx(adminUser && 'flex w-full')

  if (user !== null) {
    return (
      <div className={classes}>
        {adminUser && <SideBar defaultOpen user={originUser} />}
        <div className="flex flex-col w-full">
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
