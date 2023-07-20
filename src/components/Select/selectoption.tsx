import type { SelectOptionProps } from './types'

const SelectOption = ({ children, value, selected }: SelectOptionProps) => {
  return (
    <option value={value} selected={selected}>
      {children}
    </option>
  )
}

export default SelectOption
