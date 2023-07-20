import SelectOption from './selectoption'
import type { SelectProps } from './types'
import cx from 'clsx'
const Select: React.FC<SelectProps> & {
  Option: typeof SelectOption
} = ({ children, className }) => {
  const classes = cx('ui-select', `${className ? className : ''}`)
  return <select className={classes}>{children}</select>
}

Select.Option = SelectOption

export default Select
