import React from 'react'

type props = {
  name?: string
  className?: string
}

const Icon = ({ name, className }: props) => {
  return <i className={`ui-icon ${name} ${className}`} aria-hidden />
}

export default Icon
