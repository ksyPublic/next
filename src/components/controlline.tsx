export type ControlLineProps = {
  vertical?: 'start' | 'center' | 'end'
  position?: 'left' | 'right'
  className?: string
  content?: React.ReactNode
  controls?: React.ReactNode
}

const ControlLine: React.FC<ControlLineProps> = ({
  vertical = 'center',
  className,
  content,
  controls,
  position = 'right'
}) => {
  return (
    <div
      className={`control-line ${vertical} ${className || ''} ${
        position === 'left' ? 'reverse' : ''
      }`}
    >
      <div className="control-column child">{content}</div>
      {controls && <div className="control-column controller">{controls}</div>}
    </div>
  )
}

export default ControlLine
