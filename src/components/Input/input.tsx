'use client'
import React, {
  useState,
  useEffect,
  useRef,
  useMemo,
  useCallback,
  FocusEventHandler,
  ChangeEventHandler
} from 'react'
import cx from 'clsx'
import { v4 as uuidv4 } from 'uuid'
import { useRefObjectAsForwardedRef } from '../hooks/useRefObjectAsForwardedRef'
import { ForwardRefComponent as PolymorphicForwardRefComponent } from '../utils/polymorphic'
import { InputProps } from './types'
import { IconButton } from '@/components'
import getElementType from '../utils/getElementType'

const InputComponent = React.forwardRef(
  (
    {
      size = 'md',
      placeholder,
      className,
      type = 'text',
      onChange,
      onBlur,
      onFocus,
      id,
      variant,
      ...props
    },
    forwardedRef
  ) => {
    const [value, setValue] = useState<string>('')
    const [useType, setUseType] = useState<string>(variant ? variant : type)
    const [isFocused, setIsFocused] = useState(false)
    const [uniqueId, setUniqueId] = useState(id)

    const inputRef = useRef<HTMLInputElement>(null)
    useRefObjectAsForwardedRef(forwardedRef, inputRef)

    const handleFocus: FocusEventHandler<HTMLInputElement> = useCallback(
      (event) => {
        onFocus && onFocus(event)
        setIsFocused(true)
      },
      [onFocus, setIsFocused]
    )

    const handleBlur: FocusEventHandler<HTMLInputElement> = useCallback(
      (event) => {
        onBlur && onBlur(event)
        setIsFocused(false)
      },
      [onBlur, setIsFocused]
    )

    const handleChange: ChangeEventHandler<HTMLInputElement> = useCallback(
      (event) => {
        onChange && onChange(event)
        setValue(event.target.value)
      },
      [onChange, setValue]
    )

    const passToggle = () => {
      setUseType((prevType: string) =>
        prevType === 'password' ? 'text' : 'password'
      )
    }

    useEffect(() => {
      if (!id) {
        setUniqueId(uuidv4().slice(0, 8))
      }

      value === ''
        ? inputRef?.current?.classList.remove('is-focused')
        : inputRef?.current?.classList.add('is-focused')
    }, [id, value])

    const ElementType = getElementType(InputComponent, props)

    const classes = useMemo(() => {
      return cx('ui-input', className, {
        'is-focused': value === '' && isFocused
      })
    }, [className, isFocused, value])

    const InputSizeStyled = useMemo(() => {
      switch (size) {
        case 'sm':
          return 'h-16'

        case 'md':
          return 'h-24'

        case 'lg':
          return 'h-32'

        default:
          'md'
      }
    }, [size])

    const InputClasses = useMemo(() => {
      return cx(
        'w-full rounded-md text-white border-solid bg-gray-700 px-8',
        {
          'pl-8 pr-20': variant === 'password'
        },
        InputSizeStyled
      )
    }, [InputSizeStyled, variant])

    const LabelSizeStyled = useMemo(() => {
      switch (size) {
        case 'sm':
          return 'top-[9px]'

        case 'md':
          return 'top-[18px]'

        case 'lg':
          return 'top-[27px]'

        default:
          'md'
      }
    }, [size])

    const LabelClasses = `ui-input-label absolute block left-8 text-gray-400 z-1 text-sm pointer-events-none ${LabelSizeStyled}`

    return (
      <ElementType {...props} className={classes} ref={inputRef}>
        <input
          {...props}
          id={uniqueId}
          type={useType}
          value={value}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          className={InputClasses}
          autoComplete={'off'}
        />
        <label htmlFor={uniqueId} className={LabelClasses}>
          {placeholder}
        </label>
        {variant === 'password' && (
          <IconButton
            className="absolute right-6 top-7 z-10"
            icon={`${variant && useType === 'password' ? 'eye' : 'eye-on'}`}
            type="button"
            aria-label="패스워드 보기"
            onClick={passToggle}
          />
        )}
      </ElementType>
    )
  }
) as PolymorphicForwardRefComponent<'input', InputProps>

InputComponent.displayName = 'Input'

export { InputComponent }
