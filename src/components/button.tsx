type props = {
  name?: String
  type?: 'button' | 'submit' | 'reset'
  size?: 'sm' | 'md' | 'lg'
  variant?: 'primary' | 'secondary' | String
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
  className?: String
  disabled?: boolean
  width?: number
}

const Button = ({
  name,
  type = 'button',
  size = 'md',
  variant = 'primary',
  onClick,
  className,
  disabled,
  width
}: props) => {
  const getComputedButtonStyled = () => {
    switch (variant) {
      case 'primary':
        return 'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition ease-in-out'

      case 'secondary':
        return 'bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded transition ease-in-out'

      case 'Google':
        return 'bg-gray-800 hover:bg-gray-700 text-gray-400 font-medium py-3 px-4 rounded transition ease-in-out'

      case 'Github':
        return 'bg-gray-800 hover:bg-gray-700 text-gray-400 font-medium py-3 px-4 rounded transition ease-in-out'

      case 'Facebook':
        return 'bg-gray-800 hover:bg-gray-700 text-gray-400 font-medium py-3 px-4 rounded transition ease-in-out'
    }
  }

  return (
    <div className="ui-button" style={{ width: `${width}px` }}>
      <button
        disabled={disabled}
        type={type}
        className={`button ${size} ${getComputedButtonStyled()}  ${
          className ? className : ''
        }`}
        onClick={onClick}
        data-value={variant}
      >
        {name}
      </button>
    </div>
  )
}

export default Button
