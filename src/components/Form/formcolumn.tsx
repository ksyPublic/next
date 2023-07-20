import cx from 'clsx'
import type { FormColumnProps } from './types'

const FormColumn = ({ className, children }: FormColumnProps) => {
  const classes = cx('ui-form-column', `${className ? className : ''}`)
  return <div className={classes}>{children}</div>
}

export default FormColumn
