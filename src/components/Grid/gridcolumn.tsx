import { GridColumnProps } from './types'

const GridColumn: React.FC<GridColumnProps> = ({
  children,
  className,
  style
}) => {
  return (
    <div className={`grid-column ${className || ''}`} style={style}>
      {children}
    </div>
  )
}

export default GridColumn
