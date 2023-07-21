'use client'
import { useEffect, useState, useMemo, useContext, useCallback } from 'react'
import type { MenuItem } from '@/components'
import { AuthContext } from '@/store/user/authContext'
import dynamic from 'next/dynamic'

type AdminLayoutProps = {
  children?: React.ReactNode
}

const SideBarComponent = dynamic(() =>
  import('@/components').then((mod) => mod.SideBar)
)

export default function AdminLayout({ children }: AdminLayoutProps) {
  const [originUser, setOriginUser] = useState<object | null>()
  const [menuData, setMenuData] = useState<Array<MenuItem>>([])
  const auth = useContext(AuthContext)
  const user = auth?.user

  const adminUser = useMemo(() => {
    return user?.uid === `${process.env.NEXT_PUBLIC_ADMIN_USER}`
  }, [user])

  const getMenu = useCallback(async () => {
    const token = user?.getIdToken()
    const res = await fetch('/api/admin', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}` // Authorization 헤더에 토큰을 포함
      }
    })
    if (!res.ok) {
      throw new Error(res.statusText) // 에러가 발생한 경우 처리
    }

    if (res) {
      setMenuData(await res.json())
    }
  }, [user])

  useEffect(() => {
    if (adminUser) {
      setOriginUser(user)
      getMenu()
    }
  }, [adminUser, user, getMenu])

  return (
    <>
      {adminUser && (
        <SideBarComponent defaultOpen user={originUser} data={menuData} />
      )}
      {children}
    </>
  )
}
