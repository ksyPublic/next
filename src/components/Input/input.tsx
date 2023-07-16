'use client'
import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  FocusEventHandler,
  ChangeEventHandler
} from 'react'
import { InputProps } from './types'
import { Button } from '@/components'
import { v4 as uuidv4 } from 'uuid'
import { useRefObjectAsForwardedRef } from '../hooks/useRefObjectAsForwardedRef'
import { ForwardRefComponent as PolymorphicForwardRefComponent } from '../utils/polymorphic'

const InputComponent = React.forwardRef(
  (
    {
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

    useEffect(() => {
      value === ''
        ? inputRef?.current?.classList.remove('is-focused')
        : inputRef?.current?.classList.add('is-focused')
    }, [value])

    const passToggle = () => {
      setUseType((prevType: string) =>
        prevType === 'password' ? 'text' : 'password'
      )
    }

    useEffect(() => {
      if (!id) {
        setUniqueId(uuidv4().slice(0, 8))
      }
    }, [id])

    return (
      <div
        className={`ui-input relative ${className ? className : ''} ${
          value === '' && isFocused ? 'is-focused' : ''
        }`}
        ref={inputRef}
      >
        <input
          {...props}
          id={uniqueId}
          type={useType}
          value={value}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          className={`w-full h-14 text-sm rounded-md text-white border-solid bg-gray-700 ${
            variant === 'password' ? 'pl-4 pr-12' : 'px-4'
          }`}
          autoComplete={'off'}
        />
        <label
          htmlFor={uniqueId}
          className={`ui-input-label absolute block left-4 top-[17px] text-gray-400 z-1 text-sm pointer-events-none`}
        >
          {placeholder}
        </label>
        {variant === 'password' && (
          <Button
            icon={`${variant && useType === 'password' ? 'eye' : 'eye-on'}`}
            type="button"
            aria-label="패스워드 보기"
            onClick={passToggle}
          />
        )}
      </div>
    )
  }
) as PolymorphicForwardRefComponent<'input', InputProps>

InputComponent.displayName = 'Input'

export { InputComponent }
