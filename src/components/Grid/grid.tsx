import React from 'react'
import { GridProps } from './types'
import GridRow from './gridrow'
import GridColumn from './gridcolumn'

const Grid: React.FC<GridProps> & {
  Row: typeof GridRow
  Column: typeof GridColumn
} = ({ children, divider = 'bidirectional', className, style }) => {
  let containsOnlyColumns = true

  React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      if (child.type !== GridColumn) {
        containsOnlyColumns = false
      }
    }
  })

  const dividerClass =
    typeof divider === 'boolean' && divider
      ? 'bidirectional'
      : typeof divider === 'string'
      ? divider
      : ''

  return (
    <div
      style={style}
      className={`grid ${dividerClass} ${className || ''} ${
        containsOnlyColumns ? 'only-column' : ''
      }`}
    >
      {children}
    </div>
  )
}

Grid.Column = GridColumn
Grid.Row = GridRow

export default Grid
