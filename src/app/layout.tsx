'use client'

import './styles/main.scss'
import 'react-loading-skeleton/dist/skeleton.css'
import React, { useEffect } from 'react'
import { app, getApps } from '@/store/user'
import { AuthContextProvider } from '@/store/user/authContext'
import { Noto_Sans_KR, Lato } from 'next/font/google'
import StyledComponentsRegistry from './registry'

const noto = Noto_Sans_KR({
  weight: '500',
  subsets: ['latin'],
  variable: '--font-noto',
  display: 'swap'
})

const lato = Lato({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-lato',
  display: 'swap'
})

const metadata = {
  title: 'Next',
  description: 'Generated by create next app'
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  // 컴포넌트가 마운트될 때 Firebase 초기화
  useEffect(() => {
    if (!getApps().length) app
  }, [])

  return (
    <html lang="ko">
      <body className={`${noto.variable} ${lato.variable}`} id="app">
        <StyledComponentsRegistry>
          <AuthContextProvider>{children}</AuthContextProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  )
}
