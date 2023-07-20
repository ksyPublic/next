import type { FormProps } from './types'
import FormColumn from './formcolumn'
import FormRow from './formrow'
import cx from 'clsx'

const Form: React.FC<FormProps> & {
  Row: typeof FormRow
  Column: typeof FormColumn
} = ({ children, className }) => {
  const classes = cx('ui-form', `${className ? className : ''}`)
  return <form className={classes}>{children}</form>
}

Form.Column = FormColumn
Form.Row = FormRow

export default Form
