import React, { useMemo, useRef } from 'react'
import cx from 'clsx'
import { ButtonProps } from './types'
import { useRefObjectAsForwardedRef } from '../hooks/useRefObjectAsForwardedRef'
import { ForwardRefComponent as PolymorphicForwardRefComponent } from '../utils/polymorphic'
import getElementType from '../utils/getElementType'

const ButtonComponent = React.forwardRef(
  (
    {
      name,
      type = 'button',
      size = 'md',
      variant = 'primary',
      onClick,
      className,
      disabled,
      width,
      id,
      children,
      ...props
    },
    forwardedRef
  ) => {
    const colorStyled = useMemo(() => {
      switch (variant) {
        case 'primary':
          return 'bg-blue-800 hover:bg-blue-700 text-white font-medium rounded transition ease-in-out'

        case 'secondary':
          return 'hover:bg-gray-700 border-[0.1rem] border-gray-600 text-white font-medium rounded transition ease-in-out'

        case 'tertiary':
          return 'bg-white hover:bg-gray-200 text-gray-700 font-medium rounded transition ease-in-out'

        case 'accordion':
          return 'bg-gray-900 hover:bg-gray-800 text-white text-start font-medium rounded transition ease-in-out'

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
          return 'h-12 text-sm py-2 px-4'

        case 'md':
          return 'h-24 text-lg py-2 px-10'

        case 'lg':
          return 'h-48 text-xlg'

        default:
          'md'
      }
    }, [size])
    const buttonRef = useRef<HTMLButtonElement>(null)
    useRefObjectAsForwardedRef(forwardedRef, buttonRef)

    const classes = useMemo(() => {
      return cx(
        'button w-full',
        sizeStyled,
        colorStyled,
        disabled && 'disabled:bg-gray-700 text-gray-600'
      )
    }, [sizeStyled, colorStyled, disabled])

    const ElementType = getElementType(ButtonComponent, props)

    return (
      <ElementType {...props} className={className} ref={buttonRef}>
        <button
          {...props}
          id={id}
          disabled={disabled}
          type={type}
          style={{ width: `${width}px` }}
          className={classes}
          onClick={onClick}
          data-value={variant}
        >
          {name || children}
        </button>
      </ElementType>
    )
  }
) as PolymorphicForwardRefComponent<'button', ButtonProps>

ButtonComponent.displayName = 'button'

export { ButtonComponent }
