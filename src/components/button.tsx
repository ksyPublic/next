import { Icon } from '@/components'
type props = {
  name?: String
  type?: 'button' | 'submit' | 'reset'
  size?: 'sm' | 'md' | 'lg'
  variant?: 'primary' | 'secondary' | String
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
  className?: String
  disabled?: boolean
  width?: number
  icon?: string
  id?: string
}

const Button = ({
  name,
  type = 'button',
  size = 'md',
  variant = 'primary',
  onClick,
  className,
  disabled,
  width,
  icon,
  id
}: props) => {
  const getComputedButtonStyled = () => {
    switch (variant) {
      case 'primary':
        return 'bg-blue-800 hover:bg-blue-700 text-white font-medium text-sm h-14 py-2 px-4 rounded transition ease-in-out'

      case 'secondary':
        return 'bg-gray-500 hover:bg-gray-700 text-white font-medium text-sm py-2 px-4 rounded transition ease-in-out'

      case 'Google':
        return 'bg-gray-800 hover:bg-gray-700 text-gray-400 font-medium py-3 px-4 rounded transition ease-in-out'

      case 'Github':
        return 'bg-gray-800 hover:bg-gray-700 text-gray-400 font-medium py-3 px-4 rounded transition ease-in-out'

      case 'Facebook':
        return 'bg-gray-800 hover:bg-gray-700 text-gray-400 font-medium py-3 px-4 rounded transition ease-in-out'
    }
  }

  return (
    <div
      className={`${
        icon
          ? 'ui-button-icon absolute right-4 top-4 w-6 h-6 z-10'
          : 'ui-button'
      } ${className ? className : ''}`}
      style={{ width: `${width}px` }}
    >
      <button
        id={id}
        disabled={disabled}
        type={type}
        className={`button ${size} ${
          icon
            ? 'bg-transparent hover:bg-transparent py-0 px-0'
            : getComputedButtonStyled()
        } ${disabled ? 'disabled:bg-gray-700 text-gray-600' : ''}`}
        onClick={onClick}
        data-value={variant}
      >
        {icon && <Icon name={icon} />}
        {name}
      </button>
    </div>
  )
}

export default Button
