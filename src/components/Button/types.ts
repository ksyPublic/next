export type ButtonProps = {
  name?: String
  type?: 'button' | 'submit' | 'reset'
  size?: 'sm' | 'md' | 'lg'
  variant?: 'primary' | 'secondary' | String
  className?: String
  disabled?: boolean
  width?: number
  icon?: string
  id?: string
  children?: React.ReactNode
}