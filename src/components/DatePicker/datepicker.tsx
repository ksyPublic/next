import React, { forwardRef } from 'react'
import dateFormat from 'dateformat'
import ko from 'date-fns/locale/ko'
import DatePicker, { registerLocale } from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

export type DatePickerProps = {
  value: string
  onChange: (date: string) => void
  type?: 'normal' | 'year' | 'month'
}

registerLocale('ko', ko)

const Datepicker = forwardRef<HTMLDivElement, DatePickerProps>((props, ref) => {
  const { type = 'normal', value, onChange } = props
  const getFormat = () => {
    let rv = 'yyyy.MM.dd'
    switch (type) {
      case 'normal':
        break
      case 'year':
        rv = 'yyyy'
        break
      case 'month':
        rv = 'yyyy.MM'
        break
      default:
        break
    }
    return rv
  }

  return (
    <div className={`form-item datepicker-${type}`} ref={ref}>
      <DatePicker
        {...props}
        className="form-text"
        locale="ko"
        showMonthYearPicker={type === 'month'}
        showYearPicker={type === 'year'}
        dateFormat={getFormat()}
        selected={new Date(value)}
        onChange={(date: Date) => {
          onChange(dateFormat(date, getFormat().toLowerCase()))
        }}
      />
    </div>
  )
})

Datepicker.displayName = 'Div'

export { Datepicker }
