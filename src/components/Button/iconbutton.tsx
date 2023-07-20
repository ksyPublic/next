import { Icon } from '@/components'
import cx from 'clsx'
import React, { forwardRef, useRef, useMemo } from 'react'
import { IconButtonProps } from './types'
import { useRefObjectAsForwardedRef } from '../hooks/useRefObjectAsForwardedRef'
import { ForwardRefComponent as PolymorphicForwardRefComponent } from '../utils/polymorphic'
import getElementType from '../utils/getElementType'

const IconButton = forwardRef(
  (
    {
      icon,
      type = 'button',
      children,
      name,
      size = 'md',
      variant = 'primary',
      className,
      onClick,
      ...props
    },
    forwardedRef
  ) => {
    const IconButtonRef = useRef<HTMLButtonElement>(null)
    useRefObjectAsForwardedRef(forwardedRef, IconButtonRef)
    const ElementType = getElementType(IconButton, props, () => 'button')

    const colorStyled = useMemo(() => {
      switch (variant) {
        case 'primary':
          return 'bg-blue-800 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded transition ease-in-out'

        case 'secondary':
          return 'bg-gray-800 hover:bg-gray-900 text-gray-400 font-medium py-2 px-4 rounded transition ease-in-out'

        case 'accordion':
          return 'bg-gray-900 hover:bg-gray-800 text-white text-start font-medium py-2 px-4 rounded transition ease-in-out'

        case 'Google':
          return 'bg-gray-800 hover:bg-gray-700 text-gray-400 font-medium py-3 px-4 h-20 rounded transition ease-in-out'

        case 'Github':
          return 'bg-gray-800 hover:bg-gray-700 text-gray-400 font-medium py-3 px-4 h-20 rounded transition ease-in-out'

        case 'Facebook':
          return 'bg-gray-800 hover:bg-gray-700 text-gray-400 font-medium py-3 px-4 h-20 rounded transition ease-in-out'
      }
    }, [variant])

    const sizeStyled = useMemo(() => {
      switch (size) {
        case 'sm':
          return 'h-12 text-sm'

        case 'md':
          return 'h-24 text-md'

        case 'lg':
          return 'h-48 text-lg'

        default:
          'md'
      }
    }, [size])

    const classes = useMemo(() => {
      return cx(
        'ui-button-icon z-10',
        `${icon ? 'w-10 h-10' : `${sizeStyled} ${colorStyled}`}`,
        className
      )
    }, [icon, colorStyled, sizeStyled, className])

    return (
      <ElementType
        {...props}
        type={type}
        ref={IconButtonRef}
        className={classes}
        onClick={onClick}
        data-value={variant}
      >
        {name || children}
        {icon ? <Icon icon={icon} /> : ''}
      </ElementType>
    )
  }
) as PolymorphicForwardRefComponent<'button' | 'a', IconButtonProps>
IconButton.displayName = 'iconbutton'

export { IconButton }
