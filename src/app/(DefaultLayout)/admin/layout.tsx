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
    const res = await axios.get('/api/admin')
    console.log('???', res)
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
