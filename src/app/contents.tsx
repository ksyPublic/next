import React from 'react'

interface ContentsProps {
    children : React.ReactNode
}

export default function Contents({children}: ContentsProps) {
    return (
        <div className='ly-contents'>{children}</div>
    )
}