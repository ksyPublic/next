const Segment = ({
  children,
  className
}: {
  children?: React.ReactNode
  className?: string
}) => {
  return (
    <div className={`ui-segment ${className ? className : ''}`}>{children}</div>
  )
}

export default Segment
