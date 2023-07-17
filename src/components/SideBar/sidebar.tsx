'use client'
import React, { useState, useRef, useEffect } from 'react'
import { IconButton } from '@/components'

type SideBarProps = {
  data?: Object
  defaultOpen?: boolean
}

const SideBar = ({ data, defaultOpen }: SideBarProps) => {
  const innerRef = useRef<HTMLDivElement>(null)
  const [sideOpen, setSideOpen] = useState<boolean>(false)

  useEffect(() => {}, [])

  const showHandler = () => {
    setSideOpen(!sideOpen ? sideOpen : !sideOpen)
  }

  return (
    <div ref={innerRef}>
      <IconButton onClick={showHandler} />
      <nav></nav>
    </div>
  )
}

export default SideBar

