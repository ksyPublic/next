import cx from 'clsx'
import {
  useState,
  useCallback,
  ChangeEventHandler,
  forwardRef,
  useRef
} from 'react'
import { useRefObjectAsForwardedRef } from './hooks/useRefObjectAsForwardedRef'
import { ForwardRefComponent as PolymorphicForwardRefComponent } from './utils/polymorphic'
import getElementType from './utils/getElementType'

type textareaProps = {
  className?: string
  placeholder?: string
  readOnly?: boolean
  disabled?: boolean
  rows?: number
}

const Textarea = forwardRef(
  (
    { className, placeholder, readOnly, disabled, onChange, rows, ...props },
    forwardedRef
  ) => {
    const [value, setValue] = useState<string>('')
    const handleChange: ChangeEventHandler<HTMLTextAreaElement> = useCallback(
      (event) => {
        onChange && onChange(event)
        setValue(event.target.value)
      },
      [onChange, setValue]
    )

    const textAreaRef = useRef<HTMLTextAreaElement>(null)
    useRefObjectAsForwardedRef(forwardedRef, textAreaRef)
    const classes = cx('ui-textarea', `${className ? className : ''}`)
    const ElementType = getElementType(Textarea, props)
    return (
      <ElementType {...props} className={classes} ref={textAreaRef}>
        <textarea
          {...props}
          rows={rows}
          placeholder={placeholder}
          readOnly={readOnly}
          disabled={disabled}
          value={value}
          onChange={handleChange}
        />
      </ElementType>
    )
  }
) as PolymorphicForwardRefComponent<'textarea', textareaProps>

Textarea.displayName = 'textarea'

export { Textarea }

export default Textarea
