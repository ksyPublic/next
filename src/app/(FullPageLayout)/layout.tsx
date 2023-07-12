import React, { Fragment } from 'react'
import Link from 'next/link'

export default function DefaultLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <Fragment>
      <Link
        href={'/'}
        className="absolute left-10 top-10 z-10 text-blue-700 font-extrabold text-4xl tracking-tighter shadow-lg shadow-black"
      >
        NEXTLIFE
      </Link>
      <main className="flex w-full justify-center h-screen">{children}</main>
    </Fragment>
  )
}
