import { Icon } from '@/components'
import cx from 'clsx'
import React, { forwardRef, useRef } from 'react'
import { IconButtonProps } from './types'
import { useRefObjectAsForwardedRef } from '../hooks/useRefObjectAsForwardedRef'
import { ForwardRefComponent as PolymorphicForwardRefComponent } from '../utils/polymorphic'
import getElementType from '../utils/getElementType'

const IconButton = forwardRef(
  ({ icon, type = 'button', ...props }, forwardedRef) => {
    const IconButtonRef = useRef<HTMLButtonElement>(null)
    useRefObjectAsForwardedRef(forwardedRef, IconButtonRef)
    const ElementType = getElementType(IconButton, props, () => 'button')
    const classes = cx('ui-button-icon absolute right-6 top-7 w-10 h-10 z-10')
    return (
      <ElementType
        type={type}
        {...props}
        ref={IconButtonRef}
        className={classes}
      >
        {icon ? <Icon icon={icon} /> : ''}
      </ElementType>

      // bg-transparent hover:bg-transparent py-0 px-0

      // <div
      //   className={`${
      //     icon
      //       ? 'ui-button-icon absolute right-6 top-7 w-10 h-10 z-10'
      //       : 'ui-button'
      //   } ${className ? className : ''}`}
      //   style={{ width: `${width}px` }}
      // >

      // </div>
    )
  }
) as PolymorphicForwardRefComponent<'button' | 'a', IconButtonProps>
IconButton.displayName = 'iconbutton'

export { IconButton }
