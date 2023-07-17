export type ButtonSize = {
  size?: 'sm' | 'md' | 'lg'
}

export type IconSize = {
  size?: 'sm' | 'md' | 'lg'
}

export type IconButtonProps = {
  size?: IconSize
  icon? : string
  type?: 'button' | 'submit' | 'reset'
}

export type ButtonProps = {
  name?: string
  type?: 'button' | 'submit' | 'reset'
  size?: ButtonSize
  variant?: 'primary' | 'secondary' | string
  className?: string
  disabled?: boolean
  width?: number
  icon?: string
  id?: string
  children?: React.ReactNode
}