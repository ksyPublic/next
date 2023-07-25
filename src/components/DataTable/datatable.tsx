export type DataTableProps = {
  children: React.ReactNode
  bordered?: boolean
  width?: string
  height?: string
  size?: 'md' | 'sm'
  striped?: boolean
  caption: string
  className?: string
  style?: React.CSSProperties
}

export const DataTable: React.FC<DataTableProps> = ({
  children,
  width,
  height,
  bordered = true,
  size = 'md',
  striped = false,
  caption,
  className,
  style
}) => {
  return (
    <div
      className={`data-tbl ${bordered ? 'bordered' : ''} ${
        size === 'md' ? 's-md' : 's-sm'
      } ${striped ? 'striped' : ''} ${className ? className : ''}`}
      style={{
        width: width || '100%',
        height: height || 'auto',
        ...style
      }}
    >
      <table>
        <caption>{caption}</caption>
        {children}
      </table>
    </div>
  )
}

export default DataTable
