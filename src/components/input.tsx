'use client'
import React, { ChangeEvent, useState, useEffect, useRef } from 'react'
import { Button } from '@/components'
import { v4 as uuidv4 } from 'uuid'

type props = {
  placeholder?: string
  className?: string
  onChange?: (value: string) => void
  onBlur?: (e: ChangeEvent<HTMLInputElement>) => void
  onFocus?: (e: ChangeEvent<HTMLInputElement>) => void
  type?: string
  id?: string
  variant?: string
}

const Input = ({
  placeholder,
  className,
  type = 'text',
  onChange,
  onBlur,
  onFocus,
  id,
  variant
}: props) => {
  const [value, setValue] = useState<string>('')
  const [useType, setUseType] = useState<string>(variant ? variant : type)
  const [isFocused, setIsFocused] = useState(false)
  const [uniqueId, setUniqueId] = useState(id)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (!id) {
      setUniqueId(uuidv4().slice(0, 8))
    }
  }, [id])

  const handleFocus = (e: ChangeEvent<HTMLInputElement>) => {
    setIsFocused(true)
    if (onFocus) {
      onFocus(e)
    }
  }

  const handleBlur = (e: ChangeEvent<HTMLInputElement>) => {
    setIsFocused(false)
    if (onBlur) {
      onBlur(e)
    }
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
    if (onChange) {
      onChange(e.target.value)
    }
  }

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

  return (
    <div
      className={`ui-input relative ${className ? className : ''} ${
        value === '' && isFocused ? 'is-focused' : ''
      }`}
      ref={inputRef}
    >
      <input
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

export default Input
