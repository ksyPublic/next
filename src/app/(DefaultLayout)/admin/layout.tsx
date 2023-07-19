'use client'

import { useEffect, useState, useMemo, useContext } from 'react'
import axios from 'axios'
import { SideBar } from '@/components'
import { AuthContext } from '@/store/user/authContext'

export default function AdminLayout({
  children
}: {
  children: React.ReactNode
}) {
  const [originUser, setOriginUser] = useState<object | null>()
  const auth = useContext(AuthContext)
  const user = auth?.user

  console.log('!!!', auth)

  const adminUser = useMemo(() => {
    return user?.uid === `${process.env.NEXT_PUBLIC_ADMIN_USER}`
  }, [user])

  const getMenu = async () => {
    const res = await fetch('/api/admin', { method: 'GET' })
    if (!res.ok) {
      throw new Error(res.statusText) // 에러가 발생한 경우 처리
    }

    const data = await res.json() // 데이터를 JSON 형식으로 변환

    console.log('???', data)
  }

  useEffect(() => {
    if (adminUser) {
      setOriginUser(user)
      getMenu()
    }
  }, [adminUser, user])

  return (
    <>
      {adminUser && <SideBar defaultOpen user={originUser} />}
      {children}
    </>
  )
}
