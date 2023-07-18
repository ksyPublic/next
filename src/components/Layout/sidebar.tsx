import Skeleton from 'react-loading-skeleton'
import React, { useState, useRef, useEffect, Suspense } from 'react'
import { IconButton, SignOut } from '@/components'
import { SideBarProps } from './types'
import cx from 'clsx'
import Image from 'next/image'
import dynamic from 'next/dynamic'

const DynamicSidebarNav = dynamic(
  () =>
    import('../../components/Layout/sidebarnav').then((mod) => mod.SideBarNav) // 'SidebarNav'는 실제 컴포넌트 이름을 사용해야 합니다.
)
const SideBar = ({ data, defaultOpen = false, user }: SideBarProps) => {
  const innerRef = useRef<HTMLDivElement>(null)
  const [sideOpen, setSideOpen] = useState<boolean>(false)
  const showHandler = () => {
    setSideOpen((prevState) => {
      return !prevState ? sideOpen : !sideOpen
    })
  }

  useEffect(() => {
    defaultOpen
      ? innerRef.current?.classList.add('is-show')
      : innerRef.current?.classList.remove('is-show')
  }, [defaultOpen])

  const classes = cx(
    'sidebar w-[24.0rem] shrink-0 bg-gray-700 relative h-screen px-8'
  )

  return (
    <div className={classes} ref={innerRef}>
      <div className="relative h-full">
        <IconButton onClick={showHandler} />

        {user && (
          <div className="side-user">
            <div className="flex items-center mt-32">
              <Image
                src={user.photoURL!}
                alt={'관리자 이미지'}
                width={40}
                height={40}
                className="rounded-full mr-4"
              />
              <h1 className="text-sm text-white">환영합니다 관리자님</h1>
            </div>
          </div>
        )}
        <Suspense fallback={<Skeleton />}>
          <DynamicSidebarNav menu={data} />
        </Suspense>
        <SignOut
          name="로그아웃"
          size="sm"
          variant="secondary"
          className="absolute bottom-10 left-0 w-full"
        />
      </div>
    </div>
  )
}

export { SideBar }
