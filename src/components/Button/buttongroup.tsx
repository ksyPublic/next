const ButtonGroup = ({
  children,
  align,
  className
}: {
  children?: React.ReactNode
  align?: string,
  className?:string
}) => {
  return <div className={`ui-button-group ${align && align} ${className ? className : ''}`}>{children}</div>
}

export { ButtonGroup }
