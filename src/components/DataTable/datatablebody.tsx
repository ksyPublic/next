import React from 'react'

export type DataTableBodyProps = {
  children: React.ReactNode
}

const DataTableBody: React.FC<DataTableBodyProps> = ({ children }) => {
  return <tbody>{children}</tbody>
}

export default DataTableBody
