export type ButtonSize = {
  size?: 'sm' | 'md' | 'lg'
}

export type IconSize = {
  size?: 'sm' | 'md' | 'lg'
}

export type IconButtonProps = {
  size?: IconSize | string
  icon?: string
  name?: string
  className?: string
  variant?: 'primary' | 'secondary' | string
  type?: 'button' | 'submit' | 'reset'
}

export type ButtonProps = {
  name?: string
  type?: 'button' | 'submit' | 'reset'
  size?: ButtonSize | string
  variant?: 'primary' | 'secondary' | string
  className?: string
  disabled?: boolean
  width?: number
  icon?: string
  id?: string
  children?: React.ReactNode
}