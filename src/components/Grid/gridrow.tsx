import { GridRowProps } from './types'

const GridRow: React.FC<GridRowProps> = ({ children, className }) => {
  return <div className={`grid-row ${className || ''}`}>{children}</div>
}

export default GridRow
