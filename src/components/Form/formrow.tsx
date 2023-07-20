import type { FormRowProps } from './types'
import cx from 'clsx'

const FormRow = ({ children, className }: FormRowProps) => {
  const classes = cx('ui-form-row', `${className ? className : ''}`)
  return <div className={classes}>{children}</div>
}

export default FormRow
