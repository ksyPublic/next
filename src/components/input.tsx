import React, { ChangeEvent, useState, useEffect, useRef } from 'react'
import { v4 as uuidv4 } from 'uuid'

type props = {
  placeholder?: string
  className?: string
  onChange?: (value: string) => void
  onBlur?: (e: ChangeEvent<HTMLInputElement>) => void
  onFocus?: (e: ChangeEvent<HTMLInputElement>) => void
  type?: string
  id?: string
}

const Input = ({
  placeholder,
  className,
  type = 'text',
  onChange,
  onBlur,
  onFocus,
  id
}: props) => {
  const [value, setValue] = useState('')
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

  return (
    <div
      className={`ui-input relative ${className ? className : ''} ${
        value === '' && isFocused ? 'is-focused' : ''
      }`}
      ref={inputRef}
    >
      <input
        id={uniqueId}
        type={type}
        value={value}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        className={`w-full h-14 text-sm px-4 rounded-md text-white border-solid bg-gray-700`}
        autoComplete={'off'}
      />
      <label
        htmlFor={uniqueId}
        className={`ui-input-label absolute block left-4 top-[17px] text-gray-400 z-1 text-sm`}
      >
        {placeholder}
      </label>
    </div>
  )
}

export default Input
