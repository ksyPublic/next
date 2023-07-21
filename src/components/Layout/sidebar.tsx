import React, { useRef, useEffect } from 'react'
import { SignOut } from '@/components'
import { SideBarProps } from './types'
import { SideBarNav } from '@/components'
import cx from 'clsx'
import Image from 'next/image'

const SideBar = ({ data, defaultOpen = false, user, ...props }: SideBarProps) => {
  const innerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    defaultOpen
      ? innerRef.current?.classList.add('is-show')
      : innerRef.current?.classList.remove('is-show')
  }, [defaultOpen])

  const classes = cx(
    'sidebar w-[24.0rem] shrink-0 bg-gray-700 h-screen px-8 fixed top-0 left-0'
  )

  return (
    <div className={classes} ref={innerRef} {...props}>
      <div className="relative h-full">
        {user && (
          <div className="side-user pt-10">
            <div className="flex items-center">
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
        <SideBarNav menu={data} />
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
